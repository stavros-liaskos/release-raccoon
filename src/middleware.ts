import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0/edge';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  let accessToken = null;

  try {
    ({ accessToken } = await getAccessToken(req, res));
    res.headers.set('Authorization', `Bearer ${accessToken}`);
  } catch (e) {}

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
