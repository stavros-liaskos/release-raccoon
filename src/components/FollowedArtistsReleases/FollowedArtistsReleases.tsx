'use client';

import React from 'react';
import { useFollowedArtistsReleases } from '@/hooks/useFollowedArtistsReleases';
import Loading from '../Loading/Loading';

export interface ReleasesI18n {
  title: string;
  noReleases: string;
  viewOnSpotify: string;
}

interface FollowedArtistsReleasesProps {
  i18n: ReleasesI18n;
}

const FollowedArtistsReleases: React.FunctionComponent<FollowedArtistsReleasesProps> = ({ i18n }) => {
  const { releases, loading, error } = useFollowedArtistsReleases();

  if (!i18n || !i18n.title || !i18n.noReleases || !i18n.viewOnSpotify) {
    return null;
  }

  const groupedReleases = releases.reduce((acc, release) => {
    const date = new Date(release.releasedOn).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(release);
    return acc;
  }, {} as Record<string, typeof releases>);

  const sortedDates = Object.keys(groupedReleases).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="flex flex-col flex-1 items-center mb-4 w-full">
      <h2 className="text-2xl font-bold mb-4">{i18n.title}</h2>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">Error loading releases: {error}</div>
      ) : releases.length === 0 ? (
        <p className="rr-text flex justify-center">{i18n.noReleases}</p>
      ) : (
        <div className="w-full overflow-auto max-h-screen px-4">
          {sortedDates.map(date => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 sticky top-0 bg-white dark:bg-gray-900 py-2">
                {date}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedReleases[date].map((release) => {
                  const artistNames = release.artists.map(a => a.name).join(', ');
                  const spotifyUrl = release.spotifyUri ? `https://open.spotify.com/album/${release.spotifyUri.split(':').pop()}` : null;

                  return (
                    <div
                      key={release.id}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{release.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{artistNames}</p>
                          <p className="text-xs text-gray-500 mt-1 capitalize">{release.type.toLowerCase()}</p>
                          {spotifyUrl && (
                            <a
                              href={spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-600 hover:text-green-700 mt-2 inline-block"
                            >
                              {i18n.viewOnSpotify} →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FollowedArtistsReleases.whyDidYouRender = false;
export default FollowedArtistsReleases;