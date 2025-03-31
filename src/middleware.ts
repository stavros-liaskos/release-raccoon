import { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(req: NextRequest) {
  let accessToken = null;
  const authRes = await auth0.middleware(req);

  try {
    accessToken = await auth0.getAccessToken(req, authRes);
    accessToken?.token && authRes.headers.set('Authorization', `Bearer ${accessToken.token}`);
    // @ts-ignore
    accessToken?.scope && authRes.headers.set('x-scope', `${accessToken.scope}`);
  } catch (e) {
    console.warn(e);
  }

  console.log(`Middleware called for url: ${req.url}`);
  console.warn(authRes.headers); // TODO debug only
  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|sw.js|workbox|favicon.ico|sitemap.xml|robots.txt|manifest.json|noflash.js).*)',
  ],
};
