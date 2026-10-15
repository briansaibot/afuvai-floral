export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* GET /api/availability?date= — the calculator's live date check: booked dates and active 72-hour holds. */
import { cfg, E, json, bad, dateTaken } from "@/lib/weddings/shared.js";
export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date") || "";
  const base = E.availability(cfg, date);
  if (!base) { return bad("Bad date"); }
  if (base.status === "past") { return json(base); }
  const t = await dateTaken(date);
  if (t && t.status === "booked") { return json({ status: "booked", label: "This date is booked. Send your request and we will add you to the waitlist." }); }
  if (t) { return json({ status: "limited", label: "Another couple is holding this date right now. Send your request and we will tell you within 72 hours." }); }
  return json(base);
}
