'use client';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { usePaginatedFetch } from '@/hooks/usePaginatedFetch';
import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import { ArtistsListContext } from './ArtistsListContext';

interface ChildrenProps {
  children: ReactNode;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['ArtistDto'][]>([]);
  const areFollowedArtistsInitialised = useRef(false);

  // Update artists list state without re-fetching again from the API
  const memoryArtistListUpdate = useCallback(
    (artist: components['schemas']['ArtistDto'], action: ButtonAction) => {
      if (action === ButtonAction.Unfollow) {
        setFollowedArtistList(
          followedArtistList.filter(followedArtist => {
            return artist?.id ? followedArtist.id !== artist.id : followedArtist.name !== artist.name; // search dto does not have an id
          }),
        );
      } else {
        setFollowedArtistList([artist, ...followedArtistList]);
      }
    },
    [followedArtistList],
  );

  const {
    data: followedArtistsData,
    loading: loadingFollowed,
    pagination: followedPagination,
    fetchData: getFollowedArtists,
  } = usePaginatedFetch<components['schemas']['FollowedArtistsResponse']>({
    endpoint: Paths.FollowedArtists,
  });

  useEffect(() => {
    if (followedArtistsData?.rows) {
      setFollowedArtistList(followedArtistsData.rows);
    }
  }, [followedArtistsData]);

  useEffect(() => {
    if (!areFollowedArtistsInitialised.current) {
      getFollowedArtists();
      areFollowedArtistsInitialised.current = true;
    }
  }, [getFollowedArtists]);

  // --- Recommended Artists ---
  const [recommendedArtistList, setRecommendedArtistList] = useState<components['schemas']['SearchResultArtistDto'][]>(
    [],
  );

  const {
    data: recommendedArtistsData,
    loading: loadingRecommended,
    pagination: recommendedPagination,
    fetchData: getRecommendedArtists,
  } = usePaginatedFetch<components['schemas']['SearchResultArtistDto'][]>({
    endpoint: Paths.Recommended,
  });

  useEffect(() => {
    if (recommendedArtistsData) {
      setRecommendedArtistList(recommendedArtistsData);
    }
  }, [recommendedArtistsData]);

  return (
    <ArtistsListContext.Provider
      value={{
        followedArtistList,
        getFollowedArtists,
        loading: loadingFollowed,
        memoryArtistListUpdate,
        recommendedArtistList,
        loadingRecommended,
        getRecommendedArtists,
        followedArtistsCurrentPage: followedPagination.page,
        recommendedArtistsCurrentPage: recommendedPagination.page,
      }}
    >
      {children}
    </ArtistsListContext.Provider>
  );
};

export default ArtistsListProvider;
