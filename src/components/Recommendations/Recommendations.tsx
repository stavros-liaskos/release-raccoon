'use client';
import React, { useEffect, useRef } from 'react';

import Pagination, { TDirection } from '@/components/Pagination/Pagination';
import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { recommendationsI18n } from '@/i18n';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = () => {
  const { recommendedArtistList, loadingRecommended, getRecommendedArtists, recommendedArtistsCurrentPage } =
    useArtistsListContext();
  const areRecommendedArtistsInitialised = useRef(false);

  useEffect(() => {
    if (!areRecommendedArtistsInitialised.current) {
      getRecommendedArtists();
      areRecommendedArtistsInitialised.current = true;
    }
  }, [getRecommendedArtists]);

  if (loadingRecommended) {
    return <RecommendationsSkeleton />;
  }

  return (
    <>
      <h3 className="h3">{recommendationsI18n.title}</h3>

      <ArtistsList
        i18n={recommendationsI18n.artistList}
        artistsList={recommendedArtistList}
        buttonAction={ButtonAction.Follow}
      />
      <Pagination
        handleClick={(page: TDirection) => getRecommendedArtists(page)}
        previousI18n={recommendationsI18n.pagination.previous}
        nextI18n={recommendationsI18n.pagination.next}
        disablePrevious={recommendedArtistsCurrentPage === 1}
      />
    </>
  );
};

export default Recommendations;
