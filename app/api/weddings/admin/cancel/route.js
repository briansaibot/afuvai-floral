export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/weddings/admin/cancel {id} (admin) — cancels a proposal or booking, stops scheduled autopay and releases the date.
 * Refunds are not issued here; do those in Stripe (Payments → the charge → Refund). */
import { json, bad, isAdmin, getRec, putRec, log, releaseDate, sendEmail, admins, coupleNames, sd } from "@/lib/weddings/shared.js";
export async function POST(req) {
  if (!isAdmin(req)) { return bad("Admin key required", 401); }
  let body; try { body = await req.json(); } catch (e) { return bad("Bad request"); }
  const rec = await getRec(body.id);
  if (!rec) { return bad("Not found", 404); }
  if (rec.status === "cancelled") { return json({ ok: true }); }
  rec.status = "cancelled"; rec.cancelledAt = new Date().toISOString();
  (rec.schedule || []).forEach((s) => { if (!s.paid) { s.cancelled = true; s.processing = false; } });
  log(rec, "cancelled" + (body.reason ? ": " + String(body.reason).slice(0, 200) : ""));
  await putRec(rec);
  await releaseDate(rec);
  await sendEmail({ to: admins(), subject: "Cancelled · " + coupleNames(rec) + " · " + sd(rec.date), text: sd(rec.date) + " is open again. Scheduled payments are stopped. Issue any refund in Stripe.\n\n" + rec.link });
  return json({ ok: true });
}
