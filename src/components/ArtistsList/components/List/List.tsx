import clsx from 'clsx/lite'; // Size (gzip): 140 bytes, CAUTION: Accepts ONLY string arguments!
import React from 'react';

import Badge from '@/components/Badge/Badge';
import ButtonFollowArtist from '@/components/ButtonFollowArtist/ButtonFollowArtist';
import LastFm from '@/components/Icons/lastfm';
import Spotify from '@/components/Icons/spotify';
import { listI18n } from '@/i18n';

import { ArtistsListProp } from '../../ArtistsList';

const ICON_SIZE = 30;

const List = ({ artistsList, artistLoading, buttonAction }: ArtistsListProp) => {
  if (!artistsList?.length || !buttonAction) {
    return null;
  }

  return (
    <>
      {artistsList.map((artist, index: number) => {
        const followerCount = artist?.followerCount;
        return (
          <div
            className="flex justify-between items-center dark:even:bg-gh-darkly even:bg-gray-100"
            key={artist.id ?? index}
          >
            <p className="grow text-clip rr-text">{artist.name}</p>

            <div className="flex items-center">
              {!!followerCount && (
                <Badge>{`${followerCount}${followerCount > 1 ? listI18n.followers : listI18n.follower}`}</Badge>
              )}
              <div className="flex gap-2 mx-4 md:mx-8 w-20">
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
              <ButtonFollowArtist
                artist={artist}
                className={clsx('btn-small lg:ml-8 my-2', index % 2 && 'border-gh-dark!')}
                disabled={!!artistLoading && artist.id === artistLoading}
                loading={!!artistLoading && artist.id === artistLoading}
                buttonAction={buttonAction}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
