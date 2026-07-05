import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow access to login page without session
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('adminSession')?.value;

    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const sessionData = JSON.parse(session);
      const expiresAt = new Date(sessionData.expiresAt);

      if (expiresAt < new Date()) {
        // Session expired, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('adminSession');
        response.cookies.delete('adminUser');
        return response;
      }
    } catch (e) {
      // Invalid session, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
