import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');

    let query = supabase
      .from('orders')
      .select(`
        *,
        customers:customer_id (id, email, name, tier, lifetime_value),
        order_items (id, quantity, product_id, price_at_purchase)
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (tier) {
      query = query.eq('customers.tier', tier);
    }

    const orders = await query;

    if (orders.error) {
      return NextResponse.json({ error: orders.error.message }, { status: 500 });
    }

    return NextResponse.json(orders.data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
