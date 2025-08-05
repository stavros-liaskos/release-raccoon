import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Recommendations from '@/components/Recommendations/Recommendations';
import { buttonFollowI18n, recommendationsI18n } from '@/i18n';
import * as recommendedArtistsRes from '@/mocks/fixtures/responses/followed-artists.json';
import { mswFollow, mswFollowedArtists, mswRecommendedArtists } from '@/mocks/mockApi';
import * as followArtist from '@/utils/followArtist';

import { initServer, renderWithAct, resolvedComponent } from '../../testUtils/testUtils';

jest.mock('@/utils/followArtist', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@/utils/followArtist'),
  };
});

xdescribe('Recommendations', () => {
  const server = initServer();

  it('renders title and artists', async () => {
    server.use(mswRecommendedArtists.success());
    const Rec = await resolvedComponent(Recommendations);

    const { getByText, findAllByText } = render(<Rec />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    const buttons = await findAllByText(buttonFollowI18n.btnFollow);
    expect(buttons).toHaveLength(2);
  });

  it('handles follow artist', async () => {
    const recommendedArtists = recommendedArtistsRes.rows;
    server.use(mswFollowedArtists.success(), mswRecommendedArtists.success(), mswFollow.success());

    const followArtistSpy = jest.spyOn(followArtist, 'default');

    const Rec = await resolvedComponent(Recommendations);

    const { findAllByText } = render(<Rec />);

    const recommendedArtistButtons = await findAllByText(buttonFollowI18n.btnFollow);
    act(() => {
      fireEvent.click(recommendedArtistButtons[0]);
    });

    expect(followArtistSpy).toHaveBeenCalledWith(recommendedArtists[0]);
  });

  it('matches snapshot', async () => {
    server.use(mswFollowedArtists.success(), mswRecommendedArtists.success());
    const Rec = await resolvedComponent(Recommendations);
    const { container } = await renderWithAct(<Rec />);
    expect(container).toMatchSnapshot();
  });
});
