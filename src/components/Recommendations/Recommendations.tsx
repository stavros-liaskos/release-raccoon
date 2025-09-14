'use client';
import React, { useEffect } from 'react';

import ArtistListSkeleton from '@/components/ArtistsList/components/ArtistListSkeleton';
import Pagination, { TDirection } from '@/components/Pagination/Pagination';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { recommendationsI18n } from '@/i18n';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = () => {
  const { recommendedArtistList, isLoadingRecommended, getRecommendedArtists, recommendedArtistsCurrentPage } =
    useArtistsListContext();

  useEffect(() => {
    if (recommendedArtistList.length < 1) {
      getRecommendedArtists();
    }
  }, [getRecommendedArtists, recommendedArtistList]);

  return (
    <>
      <h3 className="h3">{recommendationsI18n.title}</h3>

      {isLoadingRecommended ? (
        <ArtistListSkeleton />
      ) : (
        <ArtistsList
          i18n={recommendationsI18n.artistList}
          artistsList={recommendedArtistList}
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
