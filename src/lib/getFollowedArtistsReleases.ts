import { auth0 } from '@/lib/auth0';
import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

export const getFollowedArtistsReleases = async (): Promise<
  components['schemas']['FollowedArtistsReleaseResponse']
> => {
  const accessToken = await auth0.getAccessToken();

  const response = await fetch(`${process.env.APP_BASE_URL}/${Paths.FollowedArtistsReleases}`, {
    headers: {
      Authorization: `Bearer ${accessToken.token}`,
    },
  });
  return await response.json();
};
