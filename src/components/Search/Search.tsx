'use client';
import React from 'react';

import ArtistsList from '@/components/ArtistsList/ArtistsList';
import Button from '@/components/Button/Button';
import Close from '@/components/Icons/close';
import HandGlass from '@/components/Icons/handGlass';
import SearchForm from '@/components/Search/SearchForm';
import { useSearchContext } from '@/contexts/Search/SearchContext';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useOnNavigation from '@/hooks/useOnNavigation';

import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import type { SearchProps } from './Search.types';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const { results, setResults, loading, handleSearch } = useSearchContext();
  const searchRef = useOnClickOutside(() => setResults(null)); // Close search results when clicking outside
  useOnNavigation(() => {
    setResults(null);
  }); // Close menu when navigating to a different page

  return (
    <div
      ref={searchRef}
      className="relative flex lg:justify-center items-center flex-none h-16 md:h-20 md:border-b-2 rr-border w-full"
    >
      <SearchForm handleAction={handleSearch} i18n={i18n}>
        {results && (
          <button onClick={() => setResults(null)}>
            <Close />
          </button>
        )}
        <Button className="btn-large md:ml-52" type="submit" disabled={loading} loading={loading} aria-label="search">
          <HandGlass />
        </Button>
      </SearchForm>

      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 rr-border top-14 md:top-16 w-full z-10">
          <ArtistsList i18n={i18n.searchList} artistsList={results} buttonAction={ButtonAction.Follow} />
        </div>
      )}
    </div>
  );
};
export default Search;
