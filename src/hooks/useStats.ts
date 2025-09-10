'use client';
import { useEffect, useReducer } from 'react';

import { Paths } from '@/types/endpoints';

type State = {
  artistCount: number;
  releaseCount: number;
  loading: boolean;
};

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: { artistCount: number; releaseCount: number } }
  | { type: 'FETCH_FAILURE' };

const initialState: State = {
  artistCount: 0,
  releaseCount: 0,
  loading: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        artistCount: action.payload.artistCount,
        releaseCount: action.payload.releaseCount,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        artistCount: 34705, // Fallback to reasonable defaults
        releaseCount: 46899, // Fallback to reasonable defaults
      };
    default:
      return state;
  }
};

export const useStats = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStats = async () => {
      dispatch({ type: 'FETCH_INIT' });

      const cachedStats = sessionStorage.getItem('rr_stats');
      if (cachedStats) {
        dispatch({ type: 'FETCH_SUCCESS', payload: JSON.parse(cachedStats) });
        return;
      }

      try {
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

        if (data.message?.includes('Server Error')) {
          throw new Error(`API Error: ${data.message}`);
        }

        const stats = {
          artistCount: data?.artistCount || 34705,
          releaseCount: data?.releaseCount || 46899,
        };

        sessionStorage.setItem('rr_stats', JSON.stringify(stats));
        dispatch({ type: 'FETCH_SUCCESS', payload: stats });
      } catch (err) {
        console.error('Error fetching stats:', err);
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    if (state.artistCount === 0 && state.releaseCount === 0) {
      fetchStats();
    }
  }, [state.artistCount, state.releaseCount]);

  return state;
};
