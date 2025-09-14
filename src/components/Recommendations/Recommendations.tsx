'use client';
import React, { useEffect } from 'react';

import ArtistListSkeleton from '@/components/ArtistsList/components/ArtistListSkeleton';
import Pagination, { TDirection } from '@/components/Pagination/Pagination';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { recommendationsI18n } from '@/i18n';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = () => {
  const { recommendedArtistsList, isLoadingRecommended, getRecommendedArtists, recommendedArtistsCurrentPage } =
    useArtistsListContext();

  useEffect(() => {
    if (!recommendedArtistsList) {
      console.warn('INIT CALLED FOR RECOS');
      getRecommendedArtists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="h3">{recommendationsI18n.title}</h3>

      {isLoadingRecommended ? (
        <ArtistListSkeleton />
      ) : (
        <ArtistsList
          i18n={recommendationsI18n.artistList}
          artistsList={recommendedArtistsList}
          buttonAction={ButtonAction.Follow}
        />
      )}

      <Pagination
        handleClick={(page: TDirection) => getRecommendedArtists(page)}
        previousI18n={recommendationsI18n.pagination.previous}
        nextI18n={recommendationsI18n.pagination.next}
        disablePrevious={recommendedArtistsCurrentPage === 0}
      />
    </>
  );
};

export default Recommendations;
