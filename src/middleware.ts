import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(req: NextRequest) {
  let accessToken = null;
  const authRes = await auth0.middleware(req);

  // console.warn(authRes.cookies);
  if (req.nextUrl.pathname.startsWith('/auth')) {
    console.log(`\nAUTH Middleware called for url: ${req.url}\n`);
    return authRes;
  }

  const response = NextResponse.next();
  console.log(`\nMiddleware called for url: ${req.url}\n`);

  try {
    accessToken = await auth0.getAccessToken(req, authRes);

    accessToken?.token && response.headers.set('Authorization', `Bearer ${accessToken.token}`);
    // @ts-ignore
    accessToken?.scope && response.headers.set('x-scope', `${accessToken.scope}`);
  } catch (e) {
    // @ts-ignore
    console.error(e?.message);
  }

  let cookie = req.cookies.get('__session');
  if (cookie?.value) {
    response.headers.set('cookie', `__session=${cookie.value}`);
  }
  console.log(`Authorization header set to: ${response.headers.get('Authorization')}`);
  console.log(`x-scope header set to: ${response.headers.get('x-scope')}`);
  console.log(`origin header set to: ${response.headers.get('origin')}`);
  console.log(`cookie set to: ${response.headers.get('cookie')}`);
  return response;
}

export const config = {
  matcher: [
    // '/auth/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|sw.js|workbox|app_icons|favicon.ico|sitemap.xml|robots.txt|manifest.json|noflash.js).*)',
  ],
};
