'use client';
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

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
  const [recommendedArtistList, setRecommendedArtistList] = useState<components['schemas']['ArtistDto'][]>([]);

  // Update followed artists list without re-fetching again from the API
  const memoryArtistListUpdate = useCallback(
    (artist: components['schemas']['ArtistDto'], action: ButtonAction) => {
      if (action === ButtonAction.Unfollow) {
        setFollowedArtistList(fList =>
          fList.filter(followedArtist => {
            return artist?.id ? followedArtist.id !== artist.id : followedArtist.name !== artist.name; // search dto does not have an id
          }),
        );
      } else {
        setFollowedArtistList([artist, ...followedArtistList]);
        setRecommendedArtistList(rList => rList.filter(recommendedArtist => recommendedArtist.id !== artist.id));
      }
    },
    [followedArtistList],
  );

  const {
    data: followedArtists,
    isLoading: isLoadingFollowed,
    page: followedPage,
    getPage: getFollowedArtists,
  } = usePaginatedFetch({
    endpoint: Paths.FollowedArtists,
    initialPage: 0,
  });

  useEffect(() => {
    if (followedArtists?.rows?.length > 0) {
      setFollowedArtistList(followedArtists.rows);
    }
  }, [followedArtists]);

  const {
    data: recommendedArtists,
    isLoading: isLoadingRecommended,
    page: recommendedPage,
    getPage: getRecommendedArtists,
  } = usePaginatedFetch({
    endpoint: Paths.Recommended,
  });

  useEffect(() => {
    if (recommendedArtists?.rows?.length > 0) {
      setRecommendedArtistList(recommendedArtists.rows);
    }
  }, [recommendedArtists]);

  const value = useMemo(
    () => ({
      followedArtistList,
      getFollowedArtists,
      isLoadingFollowed,
      followedArtistsCurrentPage: followedPage,
      memoryArtistListUpdate,
      recommendedArtistList,
      getRecommendedArtists,
      isLoadingRecommended,
      recommendedArtistsCurrentPage: recommendedPage,
    }),
    [
      followedArtistList,
      getFollowedArtists,
      isLoadingFollowed,
      followedPage,
      memoryArtistListUpdate,
      recommendedArtistList,
      getRecommendedArtists,
      isLoadingRecommended,
      recommendedPage,
    ],
  );
  return <ArtistsListContext.Provider value={value}>{children}</ArtistsListContext.Provider>;
};

export default ArtistsListProvider;
