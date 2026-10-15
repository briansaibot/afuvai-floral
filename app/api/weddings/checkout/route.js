export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/checkout {id, plan, signature}  — records the signature and opens Stripe Checkout for the first payment.
 * Standard and Monthly save the card or bank account for the scheduled autopay charges. */
import { cfg, E, json, bad, getRec, putRec, liveStatus, log, stripe, proposalLink, coupleNames, sd, dateTaken, cleanSig } from "@/lib/weddings/shared.js";

export async function POST(req) {
  let body; try { body = await req.json(); } catch (e) { return bad("Bad request"); }
  const rec = await getRec(body.id);
  if (!rec) { return bad("Not found", 404); }
  const st = liveStatus(rec);
  if (st === "expired") { return bad("Your date hold has ended. Contact " + cfg.business.designer + " to check your date.", 409); }
  if (st !== "sent" && st !== "signed") { return bad("This proposal is already booked.", 409); }
  if (await dateTaken(rec.date, rec.id)) { return bad("This date was just booked. Contact " + cfg.business.designer + ".", 409); }
  if (!rec.signature) {
    const sig = cleanSig(body.signature, req);
    if (!sig) { return bad("Type your full name to sign."); }
    rec.signature = sig; log(rec, "signed by " + sig.name);
  }
  const plans = E.plans(cfg, rec.total, rec.date, new Date(), rec.perkCredit);
  const plan = plans[body.plan];
  if (!plan) { return bad("That payment plan is not available for your date."); }
  const first = plan.payments[0];
  const s = stripe();
  try {
  if (!rec.stripeCustomer) {
    const cu = await s.customers.create({ email: rec.couple.email, name: coupleNames(rec), phone: rec.couple.phone || undefined, metadata: { proposalId: rec.id, ref: rec.ref } });
    rec.stripeCustomer = cu.id;
  }
  const save = plan.key !== "full" && plan.payments.length > 1;
  const session = await s.checkout.sessions.create({
    mode: "payment", customer: rec.stripeCustomer,
    payment_method_types: ["card", "us_bank_account"],
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: Math.round(first.amt * 100),
      product_data: { name: first.label + " · " + coupleNames(rec) + " · " + sd(rec.date), description: "AFUVAI Floral Society wedding flowers, " + rec.tierName + " level. Ref " + rec.ref } } }],
    payment_intent_data: Object.assign({ metadata: { proposalId: rec.id, paymentKey: first.key, plan: plan.key }, description: "AFUVAI " + rec.ref + " " + first.label },
      save ? { setup_future_usage: "off_session" } : {}),
    metadata: { proposalId: rec.id, plan: plan.key, kind: "booking" },
    success_url: proposalLink(rec.id) + "&paid=1", cancel_url: proposalLink(rec.id)
  });
  rec.pendingCheckout = { sessionId: session.id, plan: plan.key, payments: plan.payments, at: new Date().toISOString() };
  log(rec, "checkout opened (" + plan.key + ")");
  await putRec(rec);
  return json({ ok: true, url: session.url });
  } catch (e) {
    console.log("checkout failed", e && e.message);
    return bad("We could not open secure checkout just now. Please try again in a minute, or call " + cfg.business.phone + ".", 502);
  }
}
