'use client';
import React, { useState } from 'react';
import { ListI18n, ListProps } from './FollowedArtistList.types';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import ArtistsList from '../ArtistsList/ArtistsList';
import FormInput from '../FormInput/FormInput';
import { components } from '../../types/schema';
import { Paths } from '../../types/endpoints';
import Loading from '../Loading/Loading';

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, loading, getFollowedArtists } = useArtistsListContext();
  const [filterInput, setFilterInput] = useState('');

  if (validateI18n(i18n)) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 items-center mb-2 border-b-2 rr-border w-full">
      <h3 className="h3">{i18n.title}</h3>
      <div className="flex justify-around items-center w-2/3">
        <FormInput handleAction={setFilterInput} i18n={i18n.formInput} actionEventTrigger={'onChange'} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ArtistsList
          i18n={i18n.artistList}
          artistsList={filterArtists(filterInput, followedArtistList)}
          onButtonClick={artist => artist?.id && unfollowArtist(artist.id)}
          artistLoading={artistLoading}
        />
      )}
    </div>
  );

  function unfollowArtist(artistID: number) {
    setArtistLoading(artistID);
    fetch(`${Paths.UnfollowArtist}/${artistID}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        console.log(`${artistID} successfully unfollowed`);
        getFollowedArtists();
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      })
      .finally(() => setArtistLoading(0));
  }
};

FollowedArtistList.whyDidYouRender = true;
export default FollowedArtistList;

function validateI18n(i18n: ListI18n) {
  return (
    !i18n ||
    !i18n?.title ||
    !i18n?.filter ||
    !i18n?.artistList.noArtists ||
    !i18n?.artistList.btnTxt ||
    !i18n?.formInput.label
  );
}

export function filterArtists(
  inputValue: string = '',
  followedArtistList: components['schemas']['ArtistDto'][],
): components['schemas']['ArtistDto'][] {
  return followedArtistList.filter(followedArtistList => {
    if (inputValue === ' ' || inputValue.length === 1) {
      return true;
    } else {
      return followedArtistList.name.includes(inputValue);
    }
  });
}
