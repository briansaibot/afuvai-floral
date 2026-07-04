import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle payment_intent.succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Extract metadata from Stripe
      const { customer_email, customer_name, delivery_method, total_amount, items } = 
        paymentIntent.metadata || {};

      // Find or create customer
      let customer = await supabase
        .from('customers')
        .select('id')
        .eq('email', customer_email)
        .single();

      let customerId: string;

      if (customer.error) {
        // Create new customer
        const newCustomer = await supabase
          .from('customers')
          .insert({
            email: customer_email,
            name: customer_name || 'Guest',
          })
          .select('id')
          .single();

        customerId = newCustomer.data.id;
      } else {
        customerId = customer.data.id;
      }

      // Create order (trigger will auto-mark complete)
      const order = await supabase
        .from('orders')
        .insert({
          stripe_payment_intent_id: paymentIntent.id,
          customer_id: customerId,
          total_amount: parseFloat(total_amount || '0'),
          delivery_method: delivery_method || 'photo',
          status: 'pending', // Trigger will change to 'completed'
          delivery_fee: 5.00,
          tax: (parseFloat(total_amount || '0') * 0.0875),
        })
        .select('id')
        .single();

      if (order.error) {
        console.error('Failed to create order:', order.error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
      }

      console.log('✅ Order created and auto-marked complete:', order.data.id);
      return NextResponse.json({ success: true, orderId: order.data.id });
    }

    // Handle payment_intent.payment_failed
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('❌ Payment failed:', paymentIntent.id);
      // Log failure, don't create order
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
