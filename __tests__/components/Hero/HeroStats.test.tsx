import { render } from '@testing-library/react';
import React from 'react';

import HeroStats from '@/components/Hero/HeroStats';
import { getRrStats } from '@/lib/getRrStats';

jest.mock('@/lib/getRrStats', () => {
  return {
    getRrStats: jest.fn().mockResolvedValue({
      artistCount: 34705,
      releaseCount: 46899,
    }),
  };
});

// Mock Counter component
jest.mock('@/components/Counter/Counter', () => {
  return function MockCounter({ end, suffix, className }: { end: number; suffix: string; className: string }) {
    return (
      <div className={className} data-testid="counter">
        {end}
        {suffix}
      </div>
    );
  };
});
const mockedGetRrStats = getRrStats as jest.Mock;

describe('HeroStats', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders stats when data is loaded', async () => {
    mockedGetRrStats.mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve(true);
          }, 1000),
        ),
    );

    const { getAllByText } = render(await HeroStats());

    expect(getAllByText('+')).toHaveLength(2);
  });

  it('renders stats when data is loaded', async () => {
    mockedGetRrStats.mockImplementationOnce(() => ({
      artistCount: 34705,
      releaseCount: 46899,
    }));

    const { getByText } = render(await HeroStats());

    expect(getByText('34705+')).toBeTruthy();
    expect(getByText('46899+')).toBeTruthy();
  });
});
