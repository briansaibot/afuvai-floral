/* Booking and payment state changes, shared by the Stripe webhook and the hourly job. All are safe to run twice. */
import { cfg, E, getRec, putRec, log, stripe, bookDate, releaseDate, sendEmail, admins, money, sd, coupleNames, firstName, scheduleText, payLink } from "./shared.js";

const replyTo = () => process.env.AMI_EMAIL || cfg.business.email;

/* First payment went through (or a bank transfer started): reserve the date and set up the schedule. */
export async function markBooked(proposalId, session, cleared) {
  const rec = await getRec(proposalId);
  if (!rec) { return; }
  const pend = rec.pendingCheckout && rec.pendingCheckout.sessionId === session.id ? rec.pendingCheckout : rec.pendingCheckout;
  if (!rec.schedule && pend) {
    rec.plan = pend.plan;
    rec.schedule = pend.payments.map((p, i) => ({ key: p.key, label: p.label, amt: p.amt, due: p.due, paid: i === 0 && cleared, paidAt: i === 0 && cleared ? new Date().toISOString() : null, attempts: 0 }));
    rec.bookedAt = new Date().toISOString();
  } else if (rec.schedule && cleared && !rec.schedule[0].paid) {
    rec.schedule[0].paid = true; rec.schedule[0].paidAt = new Date().toISOString();
  } else if (rec.schedule && rec.status === (cleared ? "booked" : "processing")) { return; }
  rec.status = cleared ? "booked" : "processing";
  const piId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent && session.payment_intent.id;
  if (piId) {
    try { const pi = await stripe().paymentIntents.retrieve(piId); if (pi.payment_method) { rec.paymentMethod = typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method.id; } } catch (e) { console.log("pi lookup failed", e.message); }
  }
  delete rec.pendingCheckout;
  log(rec, cleared ? "booked, first payment received" : "booked, bank transfer clearing");
  await putRec(rec);
  await bookDate(rec);
  if (cleared || rec.events.filter((e) => /^booked/.test(e.what)).length === 1) {
    const wd = E.parseDate(rec.date), P = cfg.payments;
    await sendEmail({ to: rec.couple.email, replyTo: replyTo(), subject: "Your date is reserved · AFUVAI Floral Society",
      text: "Hi " + firstName(rec) + ",\n\nYour wedding on " + sd(rec.date) + " is reserved. Thank you for trusting us with your flowers.\n\n" +
        (cleared ? "" : "Your bank transfer is clearing, which usually takes up to four business days.\n\n") +
        "YOUR PAYMENTS\n" + scheduleText(rec.schedule) + "\n\n" +
        (rec.plan === "full" && P.fullPerk ? P.fullPerk.name + " are reserved for your first anniversary.\n\n" : "") +
        (rec.plan !== "full" ? "Scheduled payments are charged automatically, and we email you " + P.reminderDaysBefore + " days before each one.\n\n" : "") +
        "KEY DATES\n  Final design and guest count: " + sd(E.iso(E.addDays(wd, -P.lockDaysBefore))) + "\n  Last day to add pieces: " + sd(E.iso(E.addDays(wd, -P.addUntilDaysBefore))) + "\n\n" +
        "Your proposal and agreement: " + rec.link + "\n\nAmiDayne\nAFUVAI Floral Society · " + cfg.business.phone });
    await sendEmail({ to: admins(), subject: "BOOKED · " + coupleNames(rec) + " · " + sd(rec.date) + " · " + money(rec.total) + " (" + rec.plan + ")",
      text: coupleNames(rec) + " booked " + sd(rec.date) + ".\nPlan: " + rec.plan + "\n\n" + scheduleText(rec.schedule) + "\n\n" + rec.link });
  }
}

/* Any later payment (autopay or a pay link) succeeded. */
export async function markPaid(proposalId, key, piId) {
  const rec = await getRec(proposalId);
  if (!rec || !rec.schedule) { return; }
  const s = rec.schedule.find((x) => x.key === key);
  if (!s || s.paid) { return; }
  s.paid = true; s.paidAt = new Date().toISOString(); s.failed = false; s.processing = false; s.piId = piId || s.piId;
  if (rec.status === "processing" && rec.schedule[0].paid) { rec.status = "booked"; }
  if (rec.status === "failed") { rec.status = "booked"; }
  log(rec, s.label + " paid");
  const done = rec.schedule.every((x) => x.paid);
  await putRec(rec);
  await sendEmail({ to: rec.couple.email, replyTo: replyTo(), subject: "Payment received · " + money(s.amt),
    text: "Hi " + firstName(rec) + ",\n\nWe received your " + s.label.toLowerCase() + " of " + money(s.amt) + ". " + (done ? "Your wedding flowers are paid in full." : "") + "\n\n" + scheduleText(rec.schedule) + "\n\nAmiDayne" });
  if (done) { await sendEmail({ to: admins(), subject: "Paid in full · " + coupleNames(rec) + " · " + sd(rec.date), text: rec.link }); }
}

/* A payment failed: tell the couple with a link to pay another way, tell the team, retry in 3 days (the hourly job). */
export async function markFailed(proposalId, key, reason) {
  const rec = await getRec(proposalId);
  if (!rec) { return; }
  if (!key) { /* the first payment (a bank transfer at booking) bounced: undo the booking */
    rec.status = rec.signature ? "signed" : "sent"; delete rec.pendingCheckout; delete rec.schedule; delete rec.plan; delete rec.bookedAt;
    log(rec, "first payment failed: " + reason);
    await putRec(rec); await releaseDate(rec);
    await sendEmail({ to: rec.couple.email, replyTo: replyTo(), subject: "Your payment did not go through", text: "Hi " + firstName(rec) + ",\n\nYour bank transfer to reserve " + sd(rec.date) + " did not go through, so your date is not reserved yet. You can try again with any card or bank account here:\n\n" + rec.link + "\n\nAmiDayne" });
    await sendEmail({ to: admins(), subject: "First payment failed · " + coupleNames(rec), text: reason + "\nThe date is released.\n\n" + rec.link });
    return;
  }
  const s = rec.schedule.find((x) => x.key === key);
  if (!s || s.paid) { return; }
  if (key === rec.schedule[0].key) { rec.status = "failed"; }
  s.failed = true; s.processing = false; s.lastAttempt = new Date().toISOString(); s.reason = reason;
  if (rec.status === "booked") { rec.status = "failed"; }
  log(rec, s.label + " failed: " + reason);
  let link = rec.link;
  try { link = await payLink(rec, s); } catch (e) { console.log("pay link failed", e.message); }
  await putRec(rec);
  await sendEmail({ to: rec.couple.email, replyTo: replyTo(), subject: "Your payment did not go through",
    text: "Hi " + firstName(rec) + ",\n\nYour " + s.label.toLowerCase() + " of " + money(s.amt) + " for your wedding on " + sd(rec.date) + " did not go through. Nothing to worry about yet: you can pay here with any card or bank account:\n\n" + link + "\n\nIf you do nothing, we will try your saved payment method again in 3 days. Questions? Just reply.\n\nAmiDayne" });
  await sendEmail({ to: admins(), subject: "Payment failed · " + coupleNames(rec) + " · " + money(s.amt), text: s.label + " failed: " + reason + "\nPay link sent to the couple.\n\n" + rec.link });
}

/* Charge one scheduled payment off-session with the saved card or bank account. */
export async function charge(rec, s) {
  s.attempts = (s.attempts || 0) + 1; s.lastAttempt = new Date().toISOString();
  await putRec(rec);
  if (!rec.paymentMethod || !rec.stripeCustomer) { return markFailed(rec.id, s.key, "No saved payment method"); }
  try {
    const pi = await stripe().paymentIntents.create({
      amount: Math.round(s.amt * 100), currency: "usd", customer: rec.stripeCustomer, payment_method: rec.paymentMethod,
      off_session: true, confirm: true, description: "AFUVAI " + rec.ref + " " + s.label,
      metadata: { proposalId: rec.id, paymentKey: s.key }
    }, { idempotencyKey: rec.id + "-" + s.key + "-" + s.attempts });
    if (pi.status === "succeeded") { return markPaid(rec.id, s.key, pi.id); }
    if (pi.status === "processing") { const r2 = await getRec(rec.id); const s2 = r2.schedule.find((x) => x.key === s.key); s2.processing = true; s2.piId = pi.id; log(r2, s.label + " processing"); await putRec(r2); return; }
    return markFailed(rec.id, s.key, "Payment needs the customer (" + pi.status + ")");
  } catch (e) {
    return markFailed(rec.id, s.key, (e && e.message) || "Card declined");
  }
}
