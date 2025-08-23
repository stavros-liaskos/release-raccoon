'use client';
import React, { useEffect, useState } from 'react';

import Counter from '@/components/Counter/Counter';
import { loginI18n } from '@/i18n';
import { Paths } from '@/types/endpoints';

const HeroStats: React.FunctionComponent = () => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [releaseCount, setReleaseCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/${Paths.Stats}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status}`);
        }

        const data = await response.json();
        console.log('Stats API response:', data);

        // Check if the response indicates an error
        if (data.message?.includes('Server Error')) {
          throw new Error(`API Error: ${data.message}`);
        }

        setArtistCount(data?.artistCount || 34705);
        setReleaseCount(data?.releaseCount || 46899);
      } catch (err) {
        console.error('Error fetching stats:', err);
        // Fallback to reasonable defaults
        setArtistCount(34705);
        setReleaseCount(46899);
      } finally {
        setLoading(false);
      }
    };

    !artistCount && !releaseCount && fetchStats();
  }, [artistCount, releaseCount]);

  return (
    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
      <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gh-darkly/50 rounded-lg border border-gray-200 dark:border-gh-border shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
        {loading ? (
          <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            <div className="animate-pulse bg-blue-200 dark:bg-blue-800 rounded h-10 w-20"></div>
          </div>
        ) : (
          <Counter
            end={artistCount}
            suffix="+"
            className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
          />
        )}
        <div className="text-sm md:text-base rr-text opacity-70 uppercase tracking-wide">{loginI18n.artistsCount}</div>
      </div>

      <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gh-darkly/50 rounded-lg border border-gray-200 dark:border-gh-border shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
        {loading ? (
          <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            <div className="animate-pulse bg-purple-200 dark:bg-purple-800 rounded h-10 w-20"></div>
          </div>
        ) : (
          <Counter
            end={releaseCount}
            suffix="+"
            className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
          />
        )}
        <div className="text-sm md:text-base rr-text opacity-70 uppercase tracking-wide">{loginI18n.releasesCount}</div>
      </div>
    </div>
  );
};

export default HeroStats;
