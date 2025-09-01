'use client';
import React, { useEffect, useRef } from 'react';

import Button from '@/components/Button/Button';
import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton/RecommendationsSkeleton';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { recommendationsI18n } from '@/i18n';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = () => {
  const { recommendedArtistList, loadingRecommended, getRecommendedArtists } = useArtistsListContext();
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
      <div className="flex justify-center mt-4">
        <Button handleClick={() => getRecommendedArtists('previous')} className="btn-large rounded-r-none">
          {recommendationsI18n.pagination.previous}
        </Button>
        <Button handleClick={() => getRecommendedArtists('next')} className="btn-large rounded-l-none">
          {recommendationsI18n.pagination.next}
        </Button>
      </div>
    </>
  );
};

export default Recommendations;
