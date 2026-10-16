export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* GET /api/proposal?id=  — the couple's view of their proposal and its status. */
import { json, bad, getRec, publicView } from "@/lib/weddings/shared.js";
export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  const rec = await getRec(id);
  if (!rec) { return bad("Not found", 404); }
  return json(publicView(rec));
}
