import React from 'react';

import FollowedArtistList from '@/components/FollowedArtistList/FollowedArtistList';
import FollowedArtistsReleasesServer from '@/components/FollowedArtistsReleases/FollowedArtistsReleasesServer';
import Recommendations from '@/components/Recommendations/Recommendations';
import Search from '@/components/Search/Search';
import Tabs from '@/components/Tabs/Tabs';
import ArtistsListProvider from '@/contexts/ArtistsList/ArtistsListProvider';
import SearchProvider from '@/contexts/Search/SearchProvider';
import { searchI18n } from '@/i18n';

export default async function Page(_: Readonly<PageProps<'/profile'>>) {
  const tabs = [
    {
      label: 'New Releases',
      content: <FollowedArtistsReleasesServer />,
    },
    {
      label: 'Followed Artists',
      content: <FollowedArtistList />,
    },
    {
      label: 'Recommendations',
      content: <Recommendations />,
    },
  ];

  return (
    <ArtistsListProvider>
      <SearchProvider>
        <Search i18n={searchI18n} />
        <Tabs tabs={tabs} />
      </SearchProvider>
    </ArtistsListProvider>
  );
}
