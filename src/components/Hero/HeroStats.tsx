import React, { Suspense } from 'react';

import Counter from '@/components/Counter/Counter';
import { loginI18n } from '@/i18n';
import { getRrStats } from '@/lib/getRrStats';

const HeroStats = async () => {
  const stats = await getRrStats();

  return (
    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
      <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gh-darkly/50 rounded-lg border border-gray-200 dark:border-gh-border shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
        <Suspense
          fallback={
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              <div className="animate-pulse bg-blue-200 dark:bg-blue-800 rounded h-10 w-20"></div>
            </div>
          }
        >
          <Counter
            end={stats.artistCount}
            suffix="+"
            className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
          />
        </Suspense>
        <div className="text-sm md:text-base rr-text opacity-70 uppercase tracking-wide">{loginI18n.artistsCount}</div>
      </div>

      <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gh-darkly/50 rounded-lg border border-gray-200 dark:border-gh-border shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
        <Suspense
          fallback={
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              <div className="animate-pulse bg-purple-200 dark:bg-purple-800 rounded h-10 w-20"></div>
            </div>
          }
        >
          <Counter
            end={stats.releaseCount}
            suffix="+"
            className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
          />
        </Suspense>
        <div className="text-sm md:text-base rr-text opacity-70 uppercase tracking-wide">{loginI18n.releasesCount}</div>
      </div>
    </div>
  );
};

export default HeroStats;
