import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear session cookies
  response.cookies.delete('adminSession');
  response.cookies.delete('adminUser');

  return response;
}
