import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: `openid profile email ${process.env.API_SCOPE}`, // TODO limit permissions
    audience: process.env.API_AUDIENCE,
    authorizationParams: {
      scope: process.env.API_SCOPE, // TODO: Can SPAs simply omit this? Otherwise, limit permissions
    },
  },
});
