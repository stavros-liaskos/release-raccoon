import { useState } from 'react';
import useSWR from 'swr';

type TDirection = 'next' | 'previous' | undefined;

type UsePaginatedFetchOptions = {
  endpoint: string;
};

function pageOffset(page = 0, direction?: TDirection) {
  let currentPage = page;

  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'previous' && currentPage > 1) {
    currentPage--;
  }
  return currentPage;
}

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

export const usePaginatedFetch = ({ endpoint }: UsePaginatedFetchOptions) => {
  const [page, setPage] = useState<number>(0);
  const { data, error, isLoading } = useSWR(`${endpoint}?page=${page}&offset=10`, fetcher);

  if (error) {
    console.error(error);
  }

  function getPage(direction: TDirection) {
    const newPage = pageOffset(page, direction);

    setPage(newPage);
  }

  return { data, isLoading, page, getPage };
};
