export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/weddings/lead — the calculator's "Send my estimate". Saves the lead and emails AmiDayne and NOVA (reply goes to the couple). */
import { json, bad, leads, sendEmail, admins } from "@/lib/weddings/shared.js";

export async function POST(req) {
  let body; try { body = await req.json(); } catch (e) { return bad("Bad request"); }
  const f = body.fields || {};
  if (f.company) { return json({ ok: true }); } /* honeypot */
  if (!f.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email || "")) { return bad("Name and email required"); }
  const ref = String(body.ref || "").slice(0, 40) || ("AFV-" + Date.now());
  const clip = (v, n) => String(v || "").slice(0, n);
  const rec = { ref, created: new Date().toISOString(), fields: Object.fromEntries(Object.entries(f).map(([k, v]) => [k, clip(v, 8000)])), score: body.score || null, lead: body.lead || null, consult: body.consult || null };
  try { await leads().setJSON(ref, rec); } catch (e) { console.log("lead save failed", e.message); }
  const rating = clip(f.lead_rating, 80).split(" (")[0].toUpperCase();
  const to = admins().length ? admins() : [process.env.AMI_EMAIL].filter(Boolean);
  await sendEmail({ to, replyTo: f.email, subject: "New wedding estimate · " + clip(f.name, 80) + " · " + clip(f.wedding_date, 40) + (rating ? " · " + rating : ""),
    text: clip(f.full_details, 8000) + "\n\nEstimate link: " + clip(f.estimate_link, 4000) });
  return json({ ok: true, ref });
}
