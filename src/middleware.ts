import { SessionData } from '@auth0/nextjs-auth0/types';
import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  // user is not authenticated in protected pages, redirect to login page
  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  if (!isTokenExpired(session)) {
    await auth0.updateSession(request, authRes, {
      ...session,
      user: {
        ...session!.user,
        updatedAt: Date.now(),
      },
    } as SessionData);
  }

  // forward access token to API routes
  if (session && request.nextUrl.pathname.includes('api')) {
    const accessToken = await auth0.getAccessToken(request, authRes);
    authRes.headers.set('Authorization', `Bearer ${accessToken.token}`);
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}

function isTokenExpired(session: SessionData | null): boolean {
  return !session || new Date(`${session.tokenSet.expiresAt * 1000}`) > new Date();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|sw.js|workbox|app_icons|favicon.ico|favicon.svg|sitemap.xml|robots.txt|manifest.json|noflash.js).*)',
  ],
};
