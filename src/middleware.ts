import { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(req: NextRequest) {
  let accessToken = null;
  const authRes = await auth0.middleware(req);

  try {
    // console.warn(req.nextUrl.pathname);
    accessToken = await auth0.getAccessToken(req, authRes);
    accessToken?.token && authRes.headers.set('Authorization', `Bearer ${accessToken.token}`);
  } catch (e) {
    console.warn(e);
  }

  return authRes;
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
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|noflash.js).*)',
  ],
};
