import React, { Suspense } from 'react';

import FollowedArtistList from '@/components/FollowedArtistList/FollowedArtistList';
import Recommendations from '@/components/Recommendations/Recommendations';
import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton/RecommendationsSkeleton';
import Search from '@/components/Search/Search';
import ArtistsListProvider from '@/contexts/ArtistsList/ArtistsListProvider';
import SearchProvider from '@/contexts/Search/SearchProvider';
import { searchI18n } from '@/i18n';

export default async function Page() {
  return (
    <ArtistsListProvider>
      <SearchProvider>
        <Search i18n={searchI18n} />
        <div className="flex flex-auto flex-col h24">
          <FollowedArtistList />
          <Suspense fallback={<RecommendationsSkeleton />}>
            <Recommendations />
          </Suspense>
        </div>
      </SearchProvider>
    </ArtistsListProvider>
  );
}
