import { Auth0Client } from '@auth0/nextjs-auth0/server';

import { NavigationPaths } from '@/types/endpoints';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: process.env.API_SCOPE,
    audience: process.env.API_AUDIENCE,
  },
  signInReturnToPath: NavigationPaths.Profile,
});
