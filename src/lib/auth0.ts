import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client();
// TODO add audience and scope for connecting to API
/*{
  authorizationParameters: {
    scope: 'openid profile email',
    audience: 'urn:my:api',
  },
}*/
