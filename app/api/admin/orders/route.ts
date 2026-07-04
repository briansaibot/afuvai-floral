import { NextRequest, NextResponse } from 'next/server';
import { mockOrders, mockCustomers } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');

    // Merge orders with customer data
    let results = mockOrders.map(order => ({
      ...order,
      customers: mockCustomers.find(c => c.id === order.customer_id),
    }));

    // Filter by status
    if (status) {
      results = results.filter(order => order.status === status);
    }

    // Filter by tier
    if (tier) {
      results = results.filter(order => order.customers?.tier === tier);
    }

    // Sort by created_at descending
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
