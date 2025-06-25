import { components } from '../../types/schema';
import React from 'react';
import List from './components/List/List';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

export type ArtistsListI18n = {
  noArtists: string;
};

export type ArtistsListProp = {
  artistsList: components['schemas']['SearchResultArtistDto'][];
  artistLoading?: number;
  buttonAction: ButtonAction;
  i18n?: ArtistsListI18n;
};

const ArtistsList = ({ i18n, artistsList, artistLoading, buttonAction }: ArtistsListProp) => {
  if (!i18n || !i18n.noArtists || !buttonAction) {
    return null;
  }
  return (
    <div className="overflow-auto w-full flex-auto h-64">
      {!artistsList?.length ? (
        <p className="rr-text flex justify-center">{i18n.noArtists}</p>
      ) : (
        <List artistsList={artistsList} artistLoading={artistLoading} buttonAction={buttonAction} />
      )}
    </div>
  );
};

export default ArtistsList;
