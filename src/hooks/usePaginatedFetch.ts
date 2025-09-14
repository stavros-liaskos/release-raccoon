import { useEffect, useState } from 'react';
import useSWR from 'swr';

type TDirection = 'next' | 'previous' | undefined;

type UsePaginatedFetchOptions = {
  endpoint: string;
  initialPage?: number;
};

function pageOffset(page = 0, direction?: TDirection) {
  let currentPage = page;

  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'previous') {
    currentPage--;
  }
  return currentPage;
}

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

export const usePaginatedFetch = ({ endpoint, initialPage }: UsePaginatedFetchOptions) => {
  const [page, setPage] = useState<number | undefined>(initialPage);
  const [path, setPath] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR(path, fetcher);

  useEffect(() => {
    if (page !== undefined) {
      console.warn(`${endpoint}?page=${page}&offset=10`);
      setPath(`${endpoint}?page=${page}&offset=10`);
    }
  }, [endpoint, page]);

  if (error) {
    console.error(error);
  }

  function getPage(direction: TDirection) {
    const newPage = pageOffset(page, direction);
    console.log('newPage', newPage);

    setPage(newPage);
  }

  return { data, isLoading, page, getPage };
};
