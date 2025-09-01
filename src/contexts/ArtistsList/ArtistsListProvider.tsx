'use client';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import { ArtistsListContext } from './ArtistsListContext';

interface ChildrenProps {
  children: ReactNode;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['ArtistDto'][]>([]);
  const [loading, setLoading] = useState(false);
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

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 10,
  });

  const getFollowedArtists = useCallback(
    (direction?: 'next' | 'previous') => {
      setLoading(true);

      let page = pagination.page;
      if (direction === 'next') {
        page++;
      } else if (direction === 'previous' && page > 1) {
        page--;
      }

      fetch(`${Paths.FollowedArtists}?page=${page}&offset=${pagination.offset}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then((followedArtistsResponse: components['schemas']['FollowedArtistsResponse']) => {
          if (followedArtistsResponse?.rows) {
            setFollowedArtistList(followedArtistsResponse.rows);
            setPagination(prev => ({ ...prev, page }));
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch(console.error);
    },
    [pagination],
  );

  useEffect(() => {
    if (!areFollowedArtistsInitialised.current) {
      getFollowedArtists();
      areFollowedArtistsInitialised.current = true;
    }
  }, [getFollowedArtists]);

  return (
    <ArtistsListContext
      value={{
        followedArtistList,
        getFollowedArtists,
        loading,
        memoryArtistListUpdate,
      }}
    >
      {children}
    </ArtistsListContext>
  );
};

export default ArtistsListProvider;
