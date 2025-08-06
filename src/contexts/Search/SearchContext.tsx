import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { components } from '@/types/schema';

interface SearchContextType {
  results: components['schemas']['SearchResultArtistDto'][] | null;
  setResults: Dispatch<SetStateAction<components['schemas']['SearchResultArtistDto'][] | null>>;
  loading: boolean;
  handleSearch: (input: string) => void;
  closeSearchResults: () => void;
}

export const SearchContext: React.Context<SearchContextType> = createContext<SearchContextType>(
  undefined as unknown as SearchContextType,
);
SearchContext.displayName = 'ArtistsListContext';

export function useSearchContext() {
  return useContext(SearchContext);
}
