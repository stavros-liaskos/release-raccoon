/**
 * @jest-environment node
 */
import { GET } from '@/app/api/stats/route';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('/api/stats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.API_BASE_URL = 'https://test-api.com';
  });

  afterEach(() => {
    delete process.env.API_BASE_URL;
  });

  it('should return stats when API responds successfully', async () => {
    const mockStats = {
      artistCount: 34705,
      releaseCount: 46899
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(mockFetch).toHaveBeenCalledWith(
      'https://test-api.com/stats',
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
      }
    );
    expect(data).toEqual(mockStats);
  });

  it('should return default stats when API fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      artistCount: 34705,
      releaseCount: 46899
    });
  });

  it('should return default stats when API returns invalid data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'data' }),
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      artistCount: 34705,
      releaseCount: 46899
    });
  });

  it('should return default stats when API response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      artistCount: 34705,
      releaseCount: 46899
    });
  });
});