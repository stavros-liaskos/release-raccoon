import { useCallback, useState } from 'react';

type TDirection = 'next' | 'previous' | undefined;

interface UsePaginatedFetchOptions {
  endpoint: string;
  initialPage?: number;
  initialOffset?: number;
}

export const usePaginatedFetch = <T>({ endpoint, initialPage = 0, initialOffset = 10 }: UsePaginatedFetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: initialPage,
    offset: initialOffset,
  });

  const fetchData = useCallback(
    async (direction?: TDirection) => {
      setLoading(true);
      let currentPage = pagination.page;

      if (direction === 'next') {
        currentPage++;
      } else if (direction === 'previous' && currentPage > 1) {
        currentPage--;
      }

      try {
        const response = await fetch(`${endpoint}?page=${currentPage}&offset=${pagination.offset}`, {
          method: 'GET',
        });
        const result: T = await response.json();
        setData(result);
        setPagination(prev => ({ ...prev, page: currentPage }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, pagination],
  );

  return { data, loading, pagination, fetchData };
};
