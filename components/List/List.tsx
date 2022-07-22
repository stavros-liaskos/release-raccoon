import React, { useState } from 'react';
import { ListProps, ListEl } from './List.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';
import Button from '../Button/Button';

const ICON_SIZE = 30;

const List: React.FunctionComponent<ListProps> = ({ list, i18n }) => {
  const [artistLoading, setArtistLoading] = useState<string | null>(null);

  if (!list || !i18n || !i18n.unfollow) {
    return null;
  }

  const followArtist = (artistData: ListEl) => {
    setArtistLoading(artistData.name);
    fetch('${process.env.BE_BASE_URL}/todos/me/unfollow', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(artistData),
    })
      .then(() => {
        console.log(`${artistData.name} successfully unfollowed`);
      })
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
      })
      .finally(() => {
        setTimeout(() => setArtistLoading(null), 2000);
      });
  };

  return (
    <div className="overflow-auto w-full">
      {list.map((artist: ListEl, index: number) => (
        <div
          className="flex justify-between md:justify-center items-center dark:even:bg-gh-darkly even:bg-gray-100"
          key={index}
        >
          <p className="grow text-clip rr-text">{artist.name}</p>
          <div className="flex basis-2 mx-4 md:mx-8">
            {artist.lastfmUri && (
              <a className="inline" href={artist.lastfmUri}>
                <LastFm width={ICON_SIZE} height={ICON_SIZE} />
              </a>
            )}
            {artist.spotifyUri && (
              <a className="inline" href={artist.spotifyUri}>
                <Spotify width={ICON_SIZE} height={ICON_SIZE} />
              </a>
            )}
          </div>
          <Button
            i18n={i18n.unfollow}
            onClick={() => followArtist(artist)}
            className={`btn-small lg:ml-8 my-2 ${index % 2 ? '!border-gh-dark' : ''}`}
            disabled={!!artistLoading && artist.name === artistLoading}
            loading={!!artistLoading && artist.name === artistLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
