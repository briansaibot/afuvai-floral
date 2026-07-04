import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { allow_auto_reorder, name, description, price } = body;

    const product = await supabase
      .from('products')
      .update({
        ...(allow_auto_reorder !== undefined && { allow_auto_reorder }),
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (product.error) {
      return NextResponse.json({ error: product.error.message }, { status: 500 });
    }

    return NextResponse.json(product.data);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
