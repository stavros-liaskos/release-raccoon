import { act, fireEvent } from '@testing-library/react';
import Recommendations from './Recommendations';
import { initServer, renderWithAct } from '../../utils/test-utils';
import { mswAuth, mswFollow, mswFollowedArtists, mswRecommendedArtists } from '../../mocks/mockApi';
import { recommendationsI18n } from '../../i18n';
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

  it('renders without data without crashing', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success());

    // @ts-ignore
    await renderWithAct(<Recommendations />);
  });

  it('renders title and artists', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success());
    const { getByText, findAllByText } = await renderWithAct(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    const buttons = await findAllByText(recommendationsI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
  });

  it('handles follow artist', async () => {
    const recommendedArtists = recommendedArtistsRes.rows;
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success(), mswFollow.success());

    const followArtistSpy = jest.spyOn(followArtist, 'default');

    const { findAllByText } = await renderWithAct(<Recommendations i18n={recommendationsI18n} />);

    const recommendedArtistButtons = await findAllByText(recommendationsI18n.artistList.btnTxt);
    act(() => {
      fireEvent.click(recommendedArtistButtons[0]);
    });

    expect(followArtistSpy).toHaveBeenCalledWith(recommendedArtists[0], expect.anything());
  });

  it('matches snapshot', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success());
    const { container } = await renderWithAct(<Recommendations i18n={recommendationsI18n} />);
    expect(container).toMatchSnapshot();
  });
});
