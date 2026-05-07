import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './lib/auth';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Lindungi halaman /admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // Belum login, arahkan ke halaman login
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    const payload = await verifyJwt(token);

    if (!payload) {
      // Token tidak valid atau kadaluarsa
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    // Cek Role (Hanya ADMIN_SKPD atau SUPER_ADMIN)
    if (payload.role !== 'ADMIN_SKPD' && payload.role !== 'SUPER_ADMIN') {
      // User login tapi bukan admin, arahkan ke dashboard reguler
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Cegah user yang sudah login mengakses halaman login
  if (pathname === '/login' && token) {
    const payload = await verifyJwt(token);
    if (payload) {
      if (payload.role === 'ADMIN_SKPD' || payload.role === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Hanya jalankan middleware ini pada path berikut:
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
