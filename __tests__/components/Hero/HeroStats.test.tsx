import { render, screen } from '@testing-library/react';
import React from 'react';

import HeroStats from '@/components/Hero/HeroStats';
import { useStats } from '@/hooks/useStats';
import { loginI18n } from '@/i18n';

// Mock the useStats hook
jest.mock('@/hooks/useStats');
const mockUseStats = useStats as jest.MockedFunction<typeof useStats>;

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

describe('HeroStats', () => {
  it('renders loading state initially', () => {
    mockUseStats.mockReturnValue({
      artistCount: 0,
      releaseCount: 0,
      loading: true,
    });

    render(<HeroStats />);

    const loadingElements = screen.getAllByRole('generic', { hidden: true });
    expect(loadingElements.some(el => el.className.includes('animate-pulse'))).toBe(true);
  });

  it('renders stats when data is loaded', () => {
    mockUseStats.mockReturnValue({
      artistCount: 34705,
      releaseCount: 46899,
      loading: false,
    });

    render(<HeroStats />);

    expect(screen.getByText('34705+')).toBeInTheDocument();
    expect(screen.getByText('46899+')).toBeInTheDocument();
    expect(screen.getByText(loginI18n.artistsCount)).toBeInTheDocument();
    expect(screen.getByText(loginI18n.releasesCount)).toBeInTheDocument();
  });

  it('renders with proper CSS classes for styling', () => {
    mockUseStats.mockReturnValue({
      artistCount: 1000,
      releaseCount: 2000,
      loading: false,
    });

    const { container } = render(<HeroStats />);

    expect(screen.getByText('1000+')).toBeInTheDocument();

    const statsCards = container.querySelectorAll('.rounded-lg');
    expect(statsCards).toHaveLength(2);

    const shadowElements = container.querySelectorAll('.shadow-sm');
    expect(shadowElements).toHaveLength(2);
  });
});
