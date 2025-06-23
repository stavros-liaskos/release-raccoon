import { components } from '../../types/schema';
import React from 'react';
import List from './components/List/List';

export type ArtistsListI18n = {
  noArtists: string;
};

export type ArtistsListProp = {
  i18n: ArtistsListI18n;
  artistsList: components['schemas']['SearchResultArtistDto'][];
  artistLoading?: number;
  buttonAction: 'follow' | 'unfollow';
};

const ArtistsList = ({ i18n, artistsList, artistLoading, buttonAction }: ArtistsListProp) => {
  if (!i18n || !i18n.noArtists) {
    return null;
  }

  return (
    <div className="overflow-auto w-full flex-auto h-64">
      {!artistsList?.length ? (
        <p className="rr-text flex justify-center">{i18n.noArtists}</p>
      ) : (
        <List artistsList={artistsList} i18n={i18n} artistLoading={artistLoading} buttonAction={buttonAction} />
      )}
    </div>
  );
};

export default ArtistsList;
