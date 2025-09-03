import { NextRequest } from 'next/server';

export const unfollowRequestMock = {
  method: 'DELETE',
  url: 'https://localhost:3000/api/me/unfollow/1700',
  headers: new Headers({
    host: 'localhost:3000',
    connection: 'keep-alive',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    accept: '*/*',
    origin: 'https://localhost:3000',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    referer: 'https://localhost:3000/',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9,el;q=0.8,de;q=0.7',
    'x-forwarded-host': 'localhost:3000',
    'x-forwarded-port': '3000',
    'x-forwarded-proto': 'https',
    'x-forwarded-for': '::1',
    'set-cookie':
      '__session=super-secret; Path=/; Expires=Wed, 25 Jun 2025 16:44:28 GMT; Max-Age=86400; Secure; HttpOnly; SameSite=lax, appSession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'x-middleware-set-cookie':
      '__session=super-secret; Path=/; Expires=Wed, 25 Jun 2025 16:44:28 GMT; Max-Age=86400; Secure; HttpOnly; SameSite=lax,appSession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  }),
  destination: '',
  referrer: 'about:client',
  referrerPolicy: '',
  mode: 'cors',
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  integrity: '',
  keepalive: false,
  isReloadNavigation: false,
  isHistoryNavigation: false,
} as unknown as NextRequest;
