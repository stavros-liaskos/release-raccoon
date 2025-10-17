import React from 'react';

import FollowedArtistsReleases from '@/components/FollowedArtistsReleases/FollowedArtistsReleases';
import { followedArtistsReleasesI18n } from '@/i18n';
import { components } from '@/types/schema';

import { renderWithAct } from '../../testUtils/testUtils';

describe('FollowedArtistsReleases', () => {
  it('renders loading state when initialReleases is null', async () => {
    const component = await renderWithAct(
      // @ts-expect-error testing null prop
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={null} />,
    );

    const noReleasesMessage = await component.findByText(followedArtistsReleasesI18n.noReleases);
    expect(noReleasesMessage).toBeInTheDocument();
  });

  it('renders empty state when releases array is empty', async () => {
    const component = await renderWithAct(
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={{ releases: [] }} />,
    );

    const noReleasesMessage = await component.findByText(followedArtistsReleasesI18n.noReleases);
    expect(noReleasesMessage).toBeInTheDocument();
  });

  it('renders grouped releases by date correctly', async () => {
    const mockReleases = {
      releases: [
        { id: '1', name: 'Album 1', releasedOn: '2023-10-01', artists: [{ name: 'Artist 1' }], type: 'album' },
        { id: '2', name: 'Album 2', releasedOn: '2023-10-01', artists: [{ name: 'Artist 2' }], type: 'album' },
        { id: '3', name: 'Single 1', releasedOn: '2023-09-01', artists: [{ name: 'Artist 3' }], type: 'single' },
      ],
    } as unknown as components['schemas']['FollowedArtistsReleaseResponse'];

    const component = await renderWithAct(
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={mockReleases} />,
    );

    const firstDate = await component.findByText('October 1, 2023');
    const secondDate = await component.findByText('September 1, 2023');
    expect(firstDate).toBeInTheDocument();
    expect(secondDate).toBeInTheDocument();

    const album1 = await component.findByText('Album 1');
    const album2 = await component.findByText('Album 2');
    const single1 = await component.findByText('Single 1');
    expect(album1).toBeInTheDocument();
    expect(album2).toBeInTheDocument();
    expect(single1).toBeInTheDocument();
  });

  it('renders Spotify links correctly when spotifyUri is provided', async () => {
    const mockReleases = {
      releases: [
        {
          id: '1',
          name: 'Album 1',
          releasedOn: '2023-10-01',
          artists: [{ name: 'Artist 1' }],
          type: 'album',
          spotifyUri: 'spotify:album:123abc',
        },
      ],
    } as unknown as components['schemas']['FollowedArtistsReleaseResponse'];

    const component = await renderWithAct(
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={mockReleases} />,
    );

    const spotifyLink = await component.findByText(`${followedArtistsReleasesI18n.viewOnSpotify} →`);
    expect(spotifyLink).toBeInTheDocument();

    const linkElement = spotifyLink.closest('a');
    expect(linkElement).toHaveAttribute('href', 'https://open.spotify.com/album/123abc');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render Spotify links when spotifyUri is missing', async () => {
    const mockReleases = {
      releases: [
        {
          id: '1',
          name: 'Album 1',
          releasedOn: '2023-10-01',
          artists: [{ name: 'Artist 1' }],
          type: 'album',
        },
      ],
    } as unknown as components['schemas']['FollowedArtistsReleaseResponse'];

    const component = await renderWithAct(
      <FollowedArtistsReleases i18n={followedArtistsReleasesI18n} initialReleases={mockReleases} />,
    );

    const spotifyLink = component.queryByText(`${followedArtistsReleasesI18n.viewOnSpotify} →`);
    expect(spotifyLink).not.toBeInTheDocument();
  });
});
