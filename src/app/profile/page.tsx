import React, { Suspense } from 'react';

import FollowedArtistList from '@/components/FollowedArtistList/FollowedArtistList';
import Recommendations from '@/components/Recommendations/Recommendations';
import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton/RecommendationsSkeleton';
import Scrapers from '@/components/Scrape/Scrapers';
import Search from '@/components/Search/Search';
import ArtistsListProvider from '@/contexts/ArtistsList/ArtistsListProvider';
import SearchProvider from '@/contexts/Search/SearchProvider';
import { searchI18n } from '@/i18n';
import { auth0 } from '@/lib/auth0';

export default async function Page() {
  const session = await auth0.getSession();

  return (
    <ArtistsListProvider>
      <SearchProvider>
        <Search i18n={searchI18n} />
        {session?.user?.email && <Scrapers userEmail={session.user.email} />}
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
