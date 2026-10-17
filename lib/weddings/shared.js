/* Shared helpers for the AFUVAI wedding booking API (app/api/weddings/*).
 * Environment variables (Vercel > Project > Settings > Environment Variables):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY   storage (table wedding_kv)
 *   CRON_SECRET            protects /api/weddings/cron (Vercel cron and the hourly GitHub Action send it)
 *   ADMIN_KEY              long random string; Consult Mode and the status board ask for it once per device
 *   STRIPE_SECRET_KEY      sk_live_... (sk_test_... while testing)
 *   STRIPE_WEDDINGS_WEBHOOK_SECRET  whsec_... from the Stripe webhook pointing at /api/weddings/stripe-webhook
 *   RESEND_API_KEY         for email (resend.com); without it emails are logged, not sent
 *   MAIL_FROM              e.g. "AFUVAI Floral Society <admin@afuvai.com>" (domain verified in Resend)
 *   ADMIN_EMAILS           comma-separated: AmiDayne and NOVA, for alerts
 *   AMI_EMAIL              reply-to on AmiDayne's hold note (defaults to config business.email)
 */
import { getStore } from "./kv.js";
import Stripe from "stripe";
import crypto from "node:crypto";
import cfg from "../../public/wedding-calculator/js/config.js";
import E from "../../public/wedding-calculator/js/engine.js";

export { cfg, E };
export const proposals = () => getStore("proposals");
export const calendar = () => getStore("calendar");
export const meta = () => getStore("booking-meta");
export const leads = () => getStore("leads");
let _stripe = null;
export const stripe = () => (_stripe = _stripe || new Stripe(process.env.STRIPE_SECRET_KEY));

export const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
export const bad = (msg, status = 400) => json({ ok: false, error: msg }, status);
export const cronOk = (req) => {
  const want = process.env.CRON_SECRET || "", got = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return !!want && got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
};
export const isAdmin = (req) => {
  const k = req.headers.get("x-admin-key") || "", want = process.env.ADMIN_KEY || "";
  if (!want || k.length !== want.length) { return false; }
  return crypto.timingSafeEqual(Buffer.from(k), Buffer.from(want));
};
export const newId = () => crypto.randomBytes(9).toString("base64url");
export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || cfg.business.siteUrl).replace(/\/$/, "");
export const proposalLink = (id) => siteUrl() + "/weddings/contract?id=" + id;
export const clientIp = (req) => (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "").split(",")[0].trim();

export async function getRec(id) { return id ? await proposals().get(id, { type: "json" }) : null; }
export async function putRec(rec) { rec.updated = new Date().toISOString(); await proposals().setJSON(rec.id, rec); return rec; }
export async function allRecs() { return (await proposals().values()).map((r) => r.value).filter(Boolean); }
export function log(rec, what) { (rec.events = rec.events || []).push({ at: new Date().toISOString(), what }); }

/* Status with the hold clock applied. */
export function liveStatus(rec) {
  if ((rec.status === "sent" || rec.status === "signed") && Date.now() > new Date(rec.holdUntil).getTime()) { return "expired"; }
  return rec.status;
}
export function publicView(rec) {
  const p = Object.assign({}, rec);
  ["events", "stripeCustomer", "paymentMethod", "pendingCheckout", "noteSentAt"].forEach((k) => delete p[k]);
  const sig = rec.signature ? { name: rec.signature.name, partner: rec.signature.partner, at: rec.signature.at } : null;
  delete p.signature;
  return { ok: true, proposal: p, status: liveStatus(rec), signature: sig, plan: rec.plan || null,
    schedule: (rec.schedule || []).map((s) => ({ key: s.key, label: s.label, amt: s.amt, due: s.due, paid: !!s.paid })) };
}

/* Calendar: one wedding per day. A date is "held" while a proposal's hold runs, "booked" once paid. */
export async function dateTaken(date, exceptId) {
  const c = await calendar().get(date, { type: "json" });
  if (!c || c.proposalId === exceptId) { return null; }
  if (c.status === "booked") { return c; }
  if (c.status === "held" && Date.now() < new Date(c.holdUntil).getTime()) {
    const other = await getRec(c.proposalId);
    if (other && (other.status === "sent" || other.status === "signed")) { return c; }
  }
  return null;
}
export const holdDate = (rec) => calendar().setJSON(rec.date, { status: "held", proposalId: rec.id, holdUntil: rec.holdUntil, name: rec.couple && rec.couple.name });
export const bookDate = (rec) => calendar().setJSON(rec.date, { status: "booked", proposalId: rec.id, name: rec.couple && rec.couple.name });
export async function releaseDate(rec) {
  const c = await calendar().get(rec.date, { type: "json" });
  if (c && c.proposalId === rec.id) { await calendar().delete(rec.date); }
}

/* ---------- Email ---------- */
export const admins = () => (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim()).filter(Boolean);
export async function sendEmail({ to, subject, text, replyTo }) {
  to = [].concat(to || []).filter(Boolean);
  if (!to.length) { return; }
  if (!process.env.RESEND_API_KEY) { console.log("[email not sent: RESEND_API_KEY missing]", to.join(","), subject); return; }
  const from = process.env.MAIL_FROM || "AFUVAI Floral Society <admin@afuvai.com>";
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY.trim().replace(/^["']|["']$/g, ""), "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text, reply_to: replyTo || undefined })
  });
  if (!r.ok) { console.log("[email failed]", r.status, await r.text()); }
}
export const money = (n) => { n = Math.round(n); return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US"); };
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const sd = (iso) => { const d = E.parseDate(String(iso || "").slice(0, 10)); return d ? MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; };
export const coupleNames = (rec) => [rec.couple && rec.couple.name, rec.couple && rec.couple.partner].filter(Boolean).join(" & ") || "Couple";
export const firstName = (rec) => ((rec.couple && rec.couple.name) || "").split(" ")[0] || "there";
export const scheduleText = (sched) => (sched || []).map((s) => "  " + (s.paid ? "Paid      " : sd(s.due).padEnd(10)) + "  " + s.label.padEnd(28) + money(s.amt)).join("\n");

/* Today in Las Vegas, as YYYY-MM-DD, and the current Las Vegas hour. */
export function vegasNow() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false }).formatToParts(new Date());
  const g = (t) => parts.find((p) => p.type === t).value;
  return { date: g("year") + "-" + g("month") + "-" + g("day"), hour: +g("hour") % 24 };
}

/* A Stripe Checkout link for one scheduled payment (used when autopay fails). */
export async function payLink(rec, s) {
  const session = await stripe().checkout.sessions.create({
    mode: "payment", customer: rec.stripeCustomer || undefined,
    payment_method_types: ["card", "us_bank_account"],
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: Math.round(s.amt * 100), product_data: { name: s.label + " · " + coupleNames(rec) + " · " + sd(rec.date) } } }],
    payment_intent_data: { metadata: { proposalId: rec.id, paymentKey: s.key }, setup_future_usage: "off_session" },
    metadata: { proposalId: rec.id, paymentKey: s.key, kind: "scheduled" },
    success_url: proposalLink(rec.id) + "&paid=1", cancel_url: proposalLink(rec.id)
  });
  return session.url;
}

/* The electronic signature: typed name(s), time, agreement version, IP and device. */
export function cleanSig(sig, req) {
  if (!sig || String(sig.name || "").trim().length < 3) { return null; }
  return { name: String(sig.name).trim().slice(0, 80), partner: String(sig.partner || "").trim().slice(0, 80), at: new Date().toISOString(),
    version: cfg.booking.agreementVersion, ip: clientIp(req), ua: (req.headers.get("user-agent") || "").slice(0, 200) };
}
