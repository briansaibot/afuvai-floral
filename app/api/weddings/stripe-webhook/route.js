export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* POST /api/weddings/stripe-webhook — Stripe tells us when payments succeed or fail.
 * In Stripe: Developers > Webhooks > add endpoint https://<site>/api/weddings/stripe-webhook with these events:
 * checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed,
 * payment_intent.succeeded, payment_intent.payment_failed */
import { stripe, json, bad } from "@/lib/weddings/shared.js";
import { markBooked, markPaid, markFailed } from "@/lib/weddings/payments.js";

export async function POST(req) {
  const raw = await req.text();
  let ev;
  try { ev = stripe().webhooks.constructEvent(raw, req.headers.get("stripe-signature"), process.env.STRIPE_WEDDINGS_WEBHOOK_SECRET); }
  catch (e) { return bad("Bad signature", 400); }
  const o = ev.data.object, md = o.metadata || {};
  if (!md.proposalId) { return json({ ok: true, ignored: true }); }
  switch (ev.type) {
    case "checkout.session.completed":
      if (md.kind === "booking") { await markBooked(md.proposalId, o, o.payment_status === "paid"); }
      break;
    case "checkout.session.async_payment_succeeded":
      if (md.kind === "booking") { await markBooked(md.proposalId, o, true); }
      break;
    case "checkout.session.async_payment_failed":
      if (md.kind === "booking") { await markFailed(md.proposalId, null, "Bank transfer failed"); }
      break;
    case "payment_intent.succeeded":
      if (md.paymentKey) { await markPaid(md.proposalId, md.paymentKey, o.id); }
      break;
    case "payment_intent.payment_failed":
      if (md.paymentKey && !md.plan) { await markFailed(md.proposalId, md.paymentKey, (o.last_payment_error && o.last_payment_error.message) || "Payment failed"); }
      break;
  }
  return json({ ok: true });
}
