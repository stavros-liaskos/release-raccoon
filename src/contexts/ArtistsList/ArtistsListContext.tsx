import React, { createContext, useContext } from 'react';

import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { components } from '@/types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['ArtistDto'][];
  loading: boolean;
  getFollowedArtists: (direction?: 'next' | 'previous') => void;
  memoryArtistListUpdate: (artist: components['schemas']['ArtistDto'], action: ButtonAction) => void;
  recommendedArtistList: components['schemas']['SearchResultArtistDto'][];
  loadingRecommended: boolean;
  getRecommendedArtists: (direction?: 'next' | 'previous') => void;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
