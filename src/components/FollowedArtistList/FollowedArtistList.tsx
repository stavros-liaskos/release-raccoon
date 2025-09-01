'use client';
import { useState } from 'react';

import Button from '@/components/Button/Button';

import FormInput from '@/components/FollowedArtistList/FormInput';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { followedArtistListI18n } from '@/i18n';
import { components } from '@/types/schema';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import Loading from '../Loading/Loading';

const FollowedArtistList: React.FunctionComponent = () => {
  const { followedArtistList, loading, getFollowedArtists } = useArtistsListContext();
  const [filterInput, setFilterInput] = useState('');

  return (
    <>
      <div className="flex justify-around items-center w-2/3">
        <FormInput handleAction={setFilterInput} i18n={followedArtistListI18n.formInput} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ArtistsList
          i18n={followedArtistListI18n.artistList}
          artistsList={filterArtists(followedArtistList, filterInput)}
          buttonAction={ButtonAction.Unfollow}
        />
      )}
      <div className="flex justify-center mt-4">
        <Button
          handleClick={() => getFollowedArtists('previous')}
          className="btn-large rounded-r-none"
        >
          {followedArtistListI18n.pagination.previous}
        </Button>
        <Button
          handleClick={() => getFollowedArtists('next')}
          className="btn-large rounded-l-none"
        >
          {followedArtistListI18n.pagination.next}
        </Button>
      </div>
    </>
  );
};

export default FollowedArtistList;

export function filterArtists(
  followedArtistList: components['schemas']['ArtistDto'][],
  inputValue: string = '',
): components['schemas']['ArtistDto'][] {
  if (!inputValue || inputValue.trim() === '') {
    return followedArtistList;
  }

  return followedArtistList.filter(followedArtistList =>
    followedArtistList.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
}
