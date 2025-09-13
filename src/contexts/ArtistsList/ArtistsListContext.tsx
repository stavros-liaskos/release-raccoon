import React, { createContext, useContext } from 'react';

import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { TDirection } from '@/components/Pagination/Pagination';
import { components } from '@/types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['ArtistDto'][];
  isLoadingFollowed: boolean;
  getFollowedArtists: (direction: TDirection) => void;
  memoryArtistListUpdate: (artist: components['schemas']['ArtistDto'], action: ButtonAction) => void;
  recommendedArtistsList: components['schemas']['SearchResultArtistDto'][];
  isLoadingRecommended: boolean;
  getRecommendedArtists: (direction?: TDirection) => void;
  followedArtistsCurrentPage: number;
  recommendedArtistsCurrentPage: number;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
