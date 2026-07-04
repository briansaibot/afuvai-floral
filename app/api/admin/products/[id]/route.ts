import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { allow_auto_reorder, name, description, price } = body;

    // Mock: find and update product
    const product = mockProducts.find(p => p.id === params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update mock product
    if (allow_auto_reorder !== undefined) product.allow_auto_reorder = allow_auto_reorder;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    product.updated_at = new Date().toISOString();

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
