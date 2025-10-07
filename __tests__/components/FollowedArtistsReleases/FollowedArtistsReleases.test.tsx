import { http, HttpResponse } from 'msw';
import React from 'react';

import FollowedArtistsReleases from '@/components/FollowedArtistsReleases/FollowedArtistsReleases';
import { followedArtistsReleasesI18n } from '@/i18n';
import { mswFollowedArtistsReleases } from '@/mocks/mockApi';
import { Paths } from '@/types/endpoints';

import { initServer, renderWithAct } from '../../testUtils/testUtils';

describe('FollowedArtistsReleases', () => {
  const server = initServer();

  it.each([
    {
      props: {
        i18n: {},
      },
    },
    { props: {} },
  ])('renders without data without crashing', async ({ props }) => {
    server.use(mswFollowedArtistsReleases.success());
    // @ts-ignore
    await renderWithAct(<FollowedArtistsReleases {...props} />);
  });

  it('renders releases grouped by date', async () => {
    server.use(mswFollowedArtistsReleases.success());
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    // Check for the title
    const title = await component.findByText(followedArtistsReleasesI18n.title);
    expect(title).toBeInTheDocument();

    // Check for release names
    const testAlbum = await component.findByText('Test Album');
    expect(testAlbum).toBeInTheDocument();

    const testSingle = await component.findByText('Test Single');
    expect(testSingle).toBeInTheDocument();

    const oldAlbum = await component.findByText('Old Album');
    expect(oldAlbum).toBeInTheDocument();
  });

  it('renders artist names correctly', async () => {
    server.use(mswFollowedArtistsReleases.success());
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    // Single artist (appears multiple times)
    const testArtists = await component.findAllByText('Test Artist');
    expect(testArtists.length).toBeGreaterThan(0);

    // Multiple artists
    const multipleArtists = await component.findByText('Another Artist, Featured Artist');
    expect(multipleArtists).toBeInTheDocument();
  });

  it('renders release types correctly', async () => {
    server.use(mswFollowedArtistsReleases.success());
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    const albumTypes = await component.findAllByText('album');
    expect(albumTypes).toHaveLength(2);

    const singleType = await component.findByText('single');
    expect(singleType).toBeInTheDocument();
  });

  it('renders Spotify links', async () => {
    server.use(mswFollowedArtistsReleases.success());
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    const spotifyLinks = await component.findAllByText(`${followedArtistsReleasesI18n.viewOnSpotify} →`);
    expect(spotifyLinks).toHaveLength(3);

    // Check that the link has correct href
    const firstLink = spotifyLinks[0].closest('a');
    expect(firstLink).toHaveAttribute('href', 'https://open.spotify.com/album/123abc');
    expect(firstLink).toHaveAttribute('target', '_blank');
    expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays no releases message when there are no releases', async () => {
    server.use(
      http.get(Paths.FollowedArtistsReleases, () => {
        return HttpResponse.json({ total: 0, releases: [] }, { status: 200 });
      })
    );
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    const noReleasesMessage = await component.findByText(followedArtistsReleasesI18n.noReleases);
    expect(noReleasesMessage).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    server.use(mswFollowedArtistsReleases.fail());
    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);

    const errorMessage = await component.findByText(/Error loading releases/);
    expect(errorMessage).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    server.use(mswFollowedArtistsReleases.success());

    const component = await renderWithAct(<FollowedArtistsReleases i18n={followedArtistsReleasesI18n} />);
    expect(component.container).toMatchSnapshot();
  });
});