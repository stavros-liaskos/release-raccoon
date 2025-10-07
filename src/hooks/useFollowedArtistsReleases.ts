import { useState, useEffect, useCallback } from 'react';
import { Paths } from '@/types/endpoints';

interface ArtistDto {
  id: number;
  name: string;
  spotifyUri?: string;
  musicbrainzId?: string;
}

interface Release {
  id: number;
  name: string;
  type: string;
  spotifyUri?: string;
  musicbrainzId?: string;
  releasedOn: string;
  artists: ArtistDto[];
}

interface ReleasesResponse {
  releases: Release[];
  total: number;
}

export const useFollowedArtistsReleases = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const response = await fetch(Paths.FollowedArtistsReleases, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch releases: ${response.status}`);
      }

      const data: ReleasesResponse = await response.json();
      setReleases(data.releases || []);
    } catch (err) {
      console.error('Error fetching releases:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch releases');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  return {
    releases,
    loading,
    error,
    refetch: fetchReleases,
  };
};