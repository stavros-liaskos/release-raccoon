import React, { createContext, useContext } from 'react';
import { components } from '@/types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['ArtistDto'][];
  loading: boolean;
  getFollowedArtists: () => void;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
