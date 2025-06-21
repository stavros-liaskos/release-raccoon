import { SearchProps } from './Search.types';
import React, { useState } from 'react';
import Button from '../Button/Button';
import { components } from '../../types/schema';
import FormInput from '../FormInput/FormInput';
import ArtistsList from '../ArtistsList/ArtistsList';
import followArtist from '../../utils/followArtist';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import Close from '../Icons/close';
import HandGlass from '../Icons/handGlass';
import { Paths } from '../../types/endpoints';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const { getFollowedArtists } = useArtistsListContext();
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const [results, setResults] = useState<components['schemas']['SearchResultArtistDto'][] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!i18n?.label) {
    return null;
  }
  return (
    <div className="relative flex lg:justify-center items-center flex-none h-16 md:h-20 md:border-b-2 rr-border w-full">
      <FormInput handleAction={handleSearch} i18n={i18n} actionEventTrigger={'onSubmit'}>
        {results && (
          <button onClick={() => setResults(null)}>
            <Close />
          </button>
        )}
        <Button className="btn-large md:ml-52" type="submit" disabled={disabled} loading={disabled} aria-label="search">
          <HandGlass />
        </Button>
      </FormInput>

      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 rr-border top-14 md:top-16 w-full z-10">
          <ArtistsList
            i18n={i18n.searchList}
            artistsList={results}
            onButtonClick={artist => handleFollow(artist)}
            artistLoading={artistLoading}
          />
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
          console.log(result);
          return setResults(result.artists);
        })
        .catch(console.error));
  }

  async function handleFollow(artist: components['schemas']['SearchResultArtistDto']) {
    artist?.id && setArtistLoading(artist.id);
    setDisabled(true);

    const finallyCb = () => {
      artistLoading && setArtistLoading(0);
      setResults(null);
      setDisabled(false);
    };
    await followArtist(artist, finallyCb);
    getFollowedArtists();
  }
};
Search.whyDidYouRender = true;
export default Search;
