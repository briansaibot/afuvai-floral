export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/sign {id, signature}  — the couple signs now and someone else (often a parent) pays from the same link. */
import { json, bad, getRec, putRec, liveStatus, log, cleanSig, sendEmail, admins, coupleNames, sd, cfg } from "@/lib/weddings/shared.js";
export async function POST(req) {
  let body; try { body = await req.json(); } catch (e) { return bad("Bad request"); }
  const rec = await getRec(body.id);
  if (!rec) { return bad("Not found", 404); }
  const st = liveStatus(rec);
  if (st === "expired") { return bad("Your date hold has ended. Contact " + cfg.business.designer + " to check your date.", 409); }
  if (st === "cancelled") { return bad("This contract was cancelled. Contact " + cfg.business.designer + ".", 409); }
  if (st !== "sent" && st !== "signed") { return bad("This contract is already booked.", 409); }
  const sig = cleanSig(body.signature, req);
  if (!sig) { return bad("Type your full name to sign."); }
  rec.signature = sig; rec.status = "signed"; log(rec, "signed by " + sig.name);
  await putRec(rec);
  await sendEmail({ to: admins(), subject: "Signed · " + coupleNames(rec) + " · " + sd(rec.date), text: sig.name + " signed. Payment is coming from someone else on the same link.\n\n" + rec.link });
  return json({ ok: true });
}
