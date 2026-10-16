export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* GET /api/weddings/cron/holds — hourly (GitHub Action). Sends AmiDayne's 48-hour note and ends 72-hour holds.
 * Safe to call any time: each step happens only when it is due and only once, so no secret is needed. Returns no data. */
import { json, allRecs } from "@/lib/weddings/shared.js";
import { holds } from "@/lib/weddings/jobs.js";
export async function GET() {
  await holds(await allRecs(), Date.now());
  return json({ ok: true });
}
