import LastFm from '../../../Icons/lastfm';
import Spotify from '../../../Icons/spotify';
import Button from '../../../Button/Button';
import React from 'react';
import { ArtistsListProp } from '../../ArtistsList';

const ICON_SIZE = 30;

const List = ({ i18n, artistsList, onButtonClick, artistLoading }: ArtistsListProp) => {
  if (!i18n || !i18n.btnTxt || !i18n.noArtists || !artistsList?.length || !onButtonClick) {
    return null;
  }

  return (
    <>
      {artistsList.map((artist, index: number) => (
        <div
          className="flex justify-between md:justify-center items-center dark:even:bg-gh-darkly even:bg-gray-100"
          key={artist.id}
        >
          <p className="grow text-clip rr-text">{artist.name}</p>
          <div className="flex gap-2 basis-2 mx-4 md:mx-8">
            {artist.lastfmUri && (
              <a className="inline" href={artist.lastfmUri} aria-label={artist.name}>
                <LastFm width={ICON_SIZE} />
              </a>
            )}
            {artist.spotifyUri && (
              <a className="inline" href={artist.spotifyUri} aria-label={artist.name}>
                <Spotify width={ICON_SIZE} />
              </a>
            )}
          </div>
          <Button
            i18n={i18n.btnTxt}
            handleClick={() => onButtonClick(artist)}
            handleClickArg={artist.id}
            className={`btn-small lg:ml-8 my-2 ${index % 2 ? 'border-gh-dark!' : ''}`}
            disabled={!!artistLoading && artist.id === artistLoading}
            loading={!!artistLoading && artist.id === artistLoading}
          />
        </div>
      ))}
    </>
  );
};

export default List;
