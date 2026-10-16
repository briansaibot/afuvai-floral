export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* GET /api/weddings/cron — every hour (GitHub Action) and daily (Vercel cron). Needs Authorization: Bearer CRON_SECRET.
 * Hold notes and expiries every run; autopay reminders and charges once a day after 9 AM Las Vegas time. */
import { cronOk, json, allRecs, vegasNow, meta } from "@/lib/weddings/shared.js";
import { holds, payments } from "@/lib/weddings/jobs.js";
export async function GET(req) {
  if (!cronOk(req)) { return json({ ok: false }, 401); }
  const now = Date.now(), recs = await allRecs();
  await holds(recs, now);
  const v = vegasNow(), m = meta(), last = await m.get("lastPaymentsRun", { type: "json" });
  let ran = false;
  if (v.hour >= 9 && last !== v.date) {
    await m.setJSON("lastPaymentsRun", v.date);
    await payments(await allRecs(), v.date); ran = true;
  }
  return json({ ok: true, proposals: recs.length, payments: ran });
}
