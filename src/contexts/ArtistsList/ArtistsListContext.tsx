import React, { createContext, useContext } from 'react';

import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { components } from '@/types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['ArtistDto'][];
  loading: boolean;
  getFollowedArtists: () => void;
  memoryArtistListUpdate: (artist: components['schemas']['ArtistDto'], action: ButtonAction) => void;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
