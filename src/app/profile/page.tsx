import React, { Suspense } from 'react';

import FollowedArtistList from '@/components/FollowedArtistList/FollowedArtistList';
import Recommendations from '@/components/Recommendations/Recommendations';
import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton/RecommendationsSkeleton';
import Search from '@/components/Search/Search';
import Tabs from '@/components/Tabs/Tabs';
import ArtistsListProvider from '@/contexts/ArtistsList/ArtistsListProvider';
import SearchProvider from '@/contexts/Search/SearchProvider';
import { searchI18n } from '@/i18n';

export default async function Page() {
  const tabs = [
    {
      label: 'Followed Artists',
      content: <FollowedArtistList />,
    },
    {
      label: 'Recommendations',
      content: (
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations />
        </Suspense>
      ),
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
