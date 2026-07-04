import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const products = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (products.error) {
      return NextResponse.json({ error: products.error.message }, { status: 500 });
    }

    return NextResponse.json(products.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, allow_auto_reorder } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const product = await supabase
      .from('products')
      .insert({
        name,
        description,
        price,
        allow_auto_reorder: allow_auto_reorder || false,
      })
      .select()
      .single();

    if (product.error) {
      return NextResponse.json({ error: product.error.message }, { status: 500 });
    }

    return NextResponse.json(product.data, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
