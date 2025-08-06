'use client';
import React, { useState } from 'react';

import ArtistsList from '@/components/ArtistsList/ArtistsList';
import Button from '@/components/Button/Button';
import FormInput from '@/components/FormInput/FormInput';
import Close from '@/components/Icons/close';
import HandGlass from '@/components/Icons/handGlass';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useOnNavigation from '@/hooks/useOnNavigation';
import { Paths } from '@/types/endpoints';
import type { components } from '@/types/schema';

import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import type { SearchProps } from './Search.types';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const [results, setResults] = useState<components['schemas']['SearchResultArtistDto'][] | null>(null);
  const searchRef = useOnClickOutside(() => setResults(null)); // Close search results when clicking outside
  useOnNavigation(() => {
    setResults(null);
  }); // Close menu when navigating to a different page

  return (
    <div
      ref={searchRef}
      className="relative flex lg:justify-center items-center flex-none h-16 md:h-20 md:border-b-2 rr-border w-full"
    >
      <FormInput handleAction={handleSearch} i18n={i18n} actionEventTrigger={'onSubmit'}>
        {results && (
          <button onClick={() => setResults(null)}>
            <Close />
          </button>
        )}
        {/*<Button className="btn-large md:ml-52" type="submit" disabled={disabled} loading={disabled} aria-label="search">*/}
        <Button className="btn-large md:ml-52" type="submit" disabled={false} loading={false} aria-label="search">
          <HandGlass />
        </Button>
      </FormInput>

      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 rr-border top-14 md:top-16 w-full z-10">
          <ArtistsList i18n={i18n.searchList} artistsList={results} buttonAction={ButtonAction.Follow} />
        </div>
      )}
    </div>
  );

  async function handleSearch(inputValue: string) {
    inputValue &&
      (await fetch(`${Paths.Search}?${new URLSearchParams({ pattern: inputValue })}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(result => {
          return setResults(result.artists);
        })
        .catch(console.error));
  }
};
export default Search;
