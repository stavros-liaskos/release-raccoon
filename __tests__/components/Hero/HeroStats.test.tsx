import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import HeroStats from '@/components/Hero/HeroStats';
import { loginI18n } from '@/i18n';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock Counter component since we're testing the stats logic, not the animation
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<HeroStats />);

    const loadingElements = screen.getAllByRole('generic', { hidden: true });
    expect(loadingElements.some(el => el.className.includes('animate-pulse'))).toBe(true);
  });

  it('renders stats when API call succeeds', async () => {
    const mockStats = {
      artistCount: 34705,
      releaseCount: 46899,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    } as Response);

    render(<HeroStats />);

    await waitFor(() => {
      expect(screen.getByText('34705+')).toBeInTheDocument();
      expect(screen.getByText('46899+')).toBeInTheDocument();
    });

    expect(screen.getByText(loginI18n.artistsCount)).toBeInTheDocument();
    expect(screen.getByText(loginI18n.releasesCount)).toBeInTheDocument();
  });

  it('renders fallback stats when API call fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    render(<HeroStats />);

    await waitFor(() => {
      expect(screen.getByText('34705+')).toBeInTheDocument();
      expect(screen.getByText('46899+')).toBeInTheDocument();
    });
  });

  it('calls the correct API endpoint', async () => {
    const mockStats = {
      artistCount: 1000,
      releaseCount: 2000,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    } as Response);

    render(<HeroStats />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });

  it('renders with proper CSS classes for styling', async () => {
    const mockStats = {
      artistCount: 1000,
      releaseCount: 2000,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    } as Response);

    const { container } = render(<HeroStats />);

    await waitFor(() => {
      expect(screen.getByText('1000+')).toBeInTheDocument();
    });

    // Check for rounded corners and other styling
    const statsCards = container.querySelectorAll('.rounded-lg');
    expect(statsCards).toHaveLength(2);

    const shadowElements = container.querySelectorAll('.shadow-sm');
    expect(shadowElements).toHaveLength(2);
  });
});
