'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { user } = useUser();

  const closeSearchResults = useCallback(() => {
    if (Array.isArray(results)) {
      setResults(null);
    }
  }, [setResults, results]);

  const handleSearch = useCallback(
    (inputValue: string) => {
      if (!inputValue) {
        Array.isArray(results) && setResults(null);
        return;
      }

      // user session expired, redirect to login page
      if (!user?.email) {
        router.push('/');
      }

      setLoading(true);

      inputValue &&
        fetch(`${Paths.Search}?${new URLSearchParams({ pattern: inputValue })}`, {
          method: 'GET',
        })
          .then(res => res.json())
          .then(result => {
            return setResults(result.artists);
          })
          .catch(error => console.error(JSON.stringify(error)))
          .finally(() => setLoading(false));
    },
    [results, router, user?.email],
  );

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
