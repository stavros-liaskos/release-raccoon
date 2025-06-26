'use client';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

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

  const getFollowedArtists = useCallback(() => {
    setLoading(true);

    fetch(`${Paths.FollowedArtists}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((followedArtistsResponse: components['schemas']['FollowedArtistsResponse']) => {
        followedArtistsResponse?.rows &&
          JSON.stringify(followedArtistsResponse?.rows) !== JSON.stringify(followedArtistList) &&
          setFollowedArtistList(followedArtistsResponse.rows);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, [followedArtistList]);

  useEffect(() => {
    if (!areFollowedArtistsInitialised.current) {
      getFollowedArtists();
      areFollowedArtistsInitialised.current = true;
    }
  }, [getFollowedArtists]);

  return (
    <ArtistsListContext value={{ followedArtistList, getFollowedArtists, loading }}>{children}</ArtistsListContext>
  );
};

export default ArtistsListProvider;
