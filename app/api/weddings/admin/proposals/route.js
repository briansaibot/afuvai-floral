export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* GET /api/admin/proposals (admin) — every proposal for the status board. */
import { json, bad, isAdmin, allRecs, liveStatus } from "@/lib/weddings/shared.js";
export async function GET(req) {
  if (!isAdmin(req)) { return bad("Admin key required", 401); }
  const list = (await allRecs()).map((r) => Object.assign({}, r, { status: liveStatus(r), schedule: r.schedule || null }));
  list.forEach((r) => { delete r.events; delete r.paymentMethod; delete r.pendingCheckout; if (r.signature) { delete r.signature.ip; delete r.signature.ua; } });
  return json({ ok: true, proposals: list });
}
