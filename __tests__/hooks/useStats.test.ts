import { renderHook, waitFor } from '@testing-library/react';

import { useStats } from '@/hooks/useStats';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('useStats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useStats());

    expect(result.current.artistCount).toBe(0);
    expect(result.current.releaseCount).toBe(0);
    expect(result.current.loading).toBe(true);
  });

  it('should fetch stats and update state', async () => {
    const mockStats = { artistCount: 100, releaseCount: 200 };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    } as Response);

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.artistCount).toBe(100);
    expect(result.current.releaseCount).toBe(200);
    expect(sessionStorage.getItem('rr_stats')).toBe(JSON.stringify(mockStats));
  });

  it('should use cached stats from session storage', async () => {
    const mockStats = { artistCount: 100, releaseCount: 200 };
    sessionStorage.setItem('rr_stats', JSON.stringify(mockStats));

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.artistCount).toBe(100);
    expect(result.current.releaseCount).toBe(200);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.artistCount).toBe(34705);
    expect(result.current.releaseCount).toBe(46899);
  });
});
