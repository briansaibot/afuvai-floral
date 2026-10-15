/* GET /api/weddings/cron — runs every hour (GitHub Action) and daily (Vercel cron). Needs Authorization: Bearer CRON_SECRET.
 *  - 48 hours into a hold: AmiDayne's short note goes to the couple (reply-to AmiDayne).
 *  - 72 hours: the hold ends, the date is released, the team is told.
 *  - Once a day after 9 AM Las Vegas time: autopay reminders 3 days ahead, charges on the due date, retries 3 days after a failure (3 tries). */
import { cfg, E, allRecs, putRec, log, releaseDate, sendEmail, admins, money, sd, coupleNames, firstName, vegasNow, meta } from "@/lib/weddings/shared.js";
import { charge } from "@/lib/weddings/payments.js";

const P = cfg.payments;
const daysBetween = (a, b) => Math.round((E.parseDate(b) - E.parseDate(a)) / 86400000);

export async function holds(recs, now) {
  for (const rec of recs) {
    if (rec.status !== "sent" && rec.status !== "signed") { continue; }
    const age = (now - new Date(rec.created).getTime()) / 3600000;
    if (now >= new Date(rec.holdUntil).getTime()) {
      rec.status = "expired"; rec.expiredAt = new Date(now).toISOString(); log(rec, "hold ended");
      await putRec(rec); await releaseDate(rec);
      await sendEmail({ to: admins(), subject: "Hold ended · " + coupleNames(rec) + " · " + sd(rec.date), text: "The " + P.holdHours + "-hour hold ended without a booking. " + sd(rec.date) + " is open again.\n\n" + rec.link });
      continue;
    }
    if (age >= P.noteAtHours && !rec.noteSentAt) {
      const left = Math.max(1, Math.round((new Date(rec.holdUntil).getTime() - now) / 3600000));
      const text = cfg.booking.holdNote.replace("{first}", firstName(rec)).replace("{date}", sd(rec.date)).replace("{hours}", left).replace("{link}", rec.link);
      await sendEmail({ to: rec.couple.email, replyTo: process.env.AMI_EMAIL || cfg.business.email, subject: "Still holding " + sd(rec.date) + " for you", text });
      rec.noteSentAt = new Date(now).toISOString(); log(rec, "48-hour note sent");
      await putRec(rec);
    }
  }
}

export async function payments(recs, today) {
  for (const rec of recs) {
    if (!rec.schedule || ["booked", "processing", "failed"].indexOf(rec.status) < 0) { continue; }
    for (const s of rec.schedule) {
      if (s.paid || s.processing) { continue; }
      const until = daysBetween(today, s.due);
      if (until === P.reminderDaysBefore && !s.reminded) {
        s.reminded = true; log(rec, "reminder for " + s.label); await putRec(rec);
        await sendEmail({ to: rec.couple.email, replyTo: process.env.AMI_EMAIL || cfg.business.email, subject: "Upcoming payment on " + sd(s.due),
          text: "Hi " + firstName(rec) + ",\n\nA friendly reminder: your " + s.label.toLowerCase() + " of " + money(s.amt) + " for your wedding on " + sd(rec.date) + " will be charged on " + sd(s.due) + " to the payment method you saved.\n\nNeed to change it? Just reply.\n\nAmiDayne" });
      }
      if (until > 0) { continue; }
      const sinceTry = s.lastAttempt ? (Date.now() - new Date(s.lastAttempt).getTime()) / 86400000 : 99;
      if (!s.attempts || (s.failed && sinceTry >= 3 && s.attempts < 3)) { await charge(rec, s); }
      break; /* one charge per wedding per day */
    }
  }
}

 
