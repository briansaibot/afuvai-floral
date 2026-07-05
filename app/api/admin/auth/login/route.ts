import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { session } = await request.json();

    if (!session) {
      return NextResponse.json({ error: 'No session provided' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });

    // Set httpOnly cookie for middleware validation
    response.cookies.set('adminSession', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/admin',
    });

    return response;
  } catch (error) {
    console.error('Auth login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
