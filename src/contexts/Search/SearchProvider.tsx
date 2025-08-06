'use client';
import { FC, ReactNode, useCallback, useState } from 'react';

import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import { SearchContext } from './SearchContext';

interface ChildrenProps {
  children: ReactNode;
}

const SearchProvider: FC<ChildrenProps> = ({ children }) => {
  const [results, setResults] = useState<components['schemas']['SearchResultArtistDto'][] | null>(null);
  const [loading, setLoading] = useState(false);

  const closeSearchResults = useCallback(() => {
    if (Array.isArray(results) && results.length > 1) {
      setResults(null);
    }
  }, [setResults, results]);

  const handleSearch = useCallback((inputValue: string) => {
    setLoading(true);

    inputValue &&
      fetch(`${Paths.Search}?${new URLSearchParams({ pattern: inputValue })}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(result => {
          return setResults(result.artists);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
  }, []);

  return (
    <SearchContext
      value={{
        results,
        setResults,
        loading,
        handleSearch,
        closeSearchResults,
      }}
    >
      {children}
    </SearchContext>
  );
};

export default SearchProvider;
