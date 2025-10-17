import React, { Suspense } from 'react';

import Loading from '@/components/Loading/Loading';
import { followedArtistsReleasesI18n } from '@/i18n';
import { getFollowedArtistsReleases } from '@/lib/getFollowedArtistsReleases';

import FollowedArtistsReleases from './FollowedArtistsReleases';

const FollowedArtistsReleasesServer = async () => {
  const releases = await getFollowedArtistsReleases();

  return (
    <Suspense fallback={<Loading />}>
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={releases} />
    </Suspense>
  );
};

export default FollowedArtistsReleasesServer;
