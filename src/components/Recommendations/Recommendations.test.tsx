import { act, fireEvent } from '@testing-library/react';
import Recommendations from './Recommendations';
import { initServer, renderWithAct } from '../../utils/test-utils';
import { mswFollow, mswFollowedArtists, mswRecommendedArtists } from '../../mocks/mockApi';
import { buttonFollowI18n, recommendationsI18n } from '../../i18n';
import * as followArtist from '../../utils/followArtist';
import React from 'react';
import * as recommendedArtistsRes from '../../mocks/fixtures/responses/followed-artists.json';

jest.mock('../../utils/followArtist', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../utils/followArtist'),
  };
});

describe('Recommendations', () => {
  const server = initServer();

  it.skip('renders title and artists', async () => {
    server.use(mswFollowedArtists.success(), mswRecommendedArtists.success());
    const { getByText, findAllByText } = await renderWithAct(<Recommendations />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    const buttons = await findAllByText(buttonFollowI18n.btnFollow);
    expect(buttons).toHaveLength(2);
  });

  it.skip('handles follow artist', async () => {
    const recommendedArtists = recommendedArtistsRes.rows;
    server.use(mswFollowedArtists.success(), mswRecommendedArtists.success(), mswFollow.success());

    const followArtistSpy = jest.spyOn(followArtist, 'default');

    const { findAllByText } = await renderWithAct(<Recommendations />);

    const recommendedArtistButtons = await findAllByText(buttonFollowI18n.btnFollow);
    act(() => {
      fireEvent.click(recommendedArtistButtons[0]);
    });

    expect(followArtistSpy).toHaveBeenCalledWith(recommendedArtists[0], expect.anything());
  });

  it('matches snapshot', async () => {
    server.use(mswFollowedArtists.success(), mswRecommendedArtists.success());
    const { container } = await renderWithAct(<Recommendations />);
    expect(container).toMatchSnapshot();
  });
});
