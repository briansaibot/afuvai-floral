export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/proposals  (admin) — Consult Mode creates a price-locked proposal and starts the 72-hour date hold.
 * Prices are recomputed here from the selections; the browser's numbers are never trusted. */
import { cfg, E, json, bad, isAdmin, newId, proposalLink, putRec, log, dateTaken, holdDate, sendEmail, admins, money, sd, coupleNames } from "@/lib/weddings/shared.js";

export async function POST(req) {
  if (!isAdmin(req)) { return bad("Admin key required", 401); }
  let body; try { body = await req.json(); } catch (e) { return bad("Bad request"); }
  const st = E.unpack(cfg, body.state);
  const c = body.couple || {};
  if (!c.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email || "")) { return bad("Add the couple's name and email."); }
  const info = E.dateInfo(cfg, st.date);
  if (!info || info.days < 0) { return bad("Add a wedding date that has not passed."); }
  const taken = await dateTaken(st.date);
  if (taken) { return bad(sd(st.date) + " is already " + taken.status + (taken.name ? " (" + taken.name + ")" : "") + ".", 409); }
  const adj = body.adj && +body.adj.amt ? { label: String(body.adj.label || "").slice(0, 80), amt: Math.max(-50000, Math.min(50000, Math.round(+body.adj.amt))) } : null;
  const pr = E.makeProposal(cfg, st, {
    couple: { name: String(c.name).slice(0, 80), partner: String(c.partner || "").slice(0, 80), email: String(c.email).slice(0, 120), phone: String(c.phone || "").slice(0, 30) },
    note: String(body.note || "").slice(0, 1200), adj
  });
  if (!pr.lines.length) { return bad("Add pieces first."); }
  const rec = Object.assign({ id: newId() }, pr);
  rec.link = proposalLink(rec.id);
  log(rec, "created");
  await putRec(rec);
  await holdDate(rec);
  await sendEmail({ to: admins(), subject: "Contract sent · " + coupleNames(rec) + " · " + sd(rec.date) + " · " + money(rec.total),
    text: coupleNames(rec) + "\n" + sd(rec.date) + " · " + rec.tierName + " · " + money(rec.total) + "\nDate held until " + new Date(rec.holdUntil).toLocaleString("en-US", { timeZone: "America/Los_Angeles" }) + "\n\n" + rec.link });
  return json({ ok: true, id: rec.id, url: rec.link, proposal: pr });
}
