import { Paths } from '@/types/endpoints';

type RrStats = {
  artistCount: number;
  releaseCount: number;
};

export const getRrStats = async (): Promise<RrStats> => {
  const stats = {
    artistCount: 34705,
    releaseCount: 46899,
  };

  const response = await fetch(`${process.env.APP_BASE_URL}/${Paths.Stats}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 24 * 60 * 60 }, // Cache for 1 day
  });

  if (!response.ok) {
    console.error(`Failed to fetch stats: ${response.status}`);
  }

  const data = await response.json();

  if (data.message?.includes('Server Error')) {
    console.error(`API Error: ${data.message}`);
  }

  stats.artistCount = data?.artistCount;
  stats.releaseCount = data?.releaseCount;

  return stats;
};
