const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  async rewrites() {
    return createRewritePaths([
      '/me/:path*',
      '/artist/:path*',
      '/artists/:path*',
      '/auth/:path*',
      '/raccoon-user:path*',
    ]);
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_AUDIENCE: process.env.API_AUDIENCE,
    API_SCOPE: process.env.API_SCOPE,
  },
});

function createRewritePaths(paths) {
  return paths.map(path => ({ source: path, destination: `/api${path}` }));
}
