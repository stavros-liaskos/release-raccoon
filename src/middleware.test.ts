import { Paths } from './types/endpoints';

// TODO properly test this
const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|sw.js|workbox|favicon.ico|sitemap.xml|robots.txt|manifest.json|noflash.js).*)',
  ],
};

describe('Middleware', () => {
  it('matcher should match paths', () => {
    [...Object.values(Paths), ...['/somepath', '/']].forEach(path => {
      expect(config.matcher.some(pattern => new RegExp(pattern).test(path))).toBe(true);
    });
  });

  it('matcher should not match paths', () => {
    const pathsNotToMatch = [
      '/favicon.ico',
      '/sitemap.xml',
      '/robots.txt',
      '/manifest.json',
      '/sw.js',
      '/noflash.js',
      '/workbox-15135124.js',
    ];

    pathsNotToMatch.forEach(path => {
      expect(config.matcher.some(pattern => new RegExp(pattern).test(path))).toBe(false);
    });
  });
});
