// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
export function middleware() {
  // const currentUser = !!request.cookies.get('appSession')?.value;

  console.warn('\n\nMIDDLEWARE CALLED\n\n');

  // const requestHeaders = new Headers(request.headers);
  // const response = NextResponse.next({
  //   request: {
  //     // New request headers
  //     headers: requestHeaders,
  //   },
  // });
  // return response;

  // if (request.nextUrl.pathname.startsWith('/')) {
  //   console.warn('search goes here\n');
  //   return response;
  // }
  // if (currentUser && !request.nextUrl.pathname.startsWith('/me')) {
  //   return Response.redirect(new URL('/me', request.url));
  // }
  //
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
    },
  ],
};