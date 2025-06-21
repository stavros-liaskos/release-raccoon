import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import FollowedArtistList, { filterArtists } from './FollowedArtistList';
import { initServer, render, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/fixtures/responses/followed-artists.json';
import { components } from '../../types/schema';
import { mswAuth, mswFollowedArtists, mswUnfollow } from '../../mocks/mockApi';
import { followedArtistListI18n } from '../../i18n';

describe('FollowedArtistList', () => {
  const server = initServer();

  it.each([
    {
      props: {
        i18n: {},
      },
    },
    { props: {} },
  ])('renders without data without crashing', async ({ props }) => {
    server.use(mswFollowedArtists.success(), mswAuth.success());
    // @ts-ignore
    await renderWithAct(<FollowedArtistList {...props} />);
  });

  it('renders artists with "unfollow" btn', async () => {
    server.use(mswFollowedArtists.success(), mswAuth.success());
    const fetchSpy = jest.spyOn(window, 'fetch');
    const component = render(<FollowedArtistList i18n={followedArtistListI18n} />);
    const buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);

    expect(buttons).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('renders loading state', async () => {
    server.use(mswFollowedArtists.fail(), mswAuth.success());
    const fetchSpy = jest.spyOn(window, 'fetch');
    const component = render(<FollowedArtistList i18n={followedArtistListI18n} />);

    const loadingIcon = await component.findByRole('img');
    expect(loadingIcon).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('unfollows artist on btn click', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(2), mswUnfollow.success());
    const { findAllByText } = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);

    let buttons = await findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);

    await act(async () => {
      fireEvent.click(buttons[0]);
    });
  });

  it('matches snapshot', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(2));

    const component = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);
    let buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
    expect(component.container).toMatchSnapshot();
  });

  describe('filterArtists', () => {
    it.each<{
      inputValue: string;
      followedArtistList: components['schemas']['ArtistDto'][];
      result: components['schemas']['ArtistDto'][];
    }>([
      { inputValue: '', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: ' ', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: '1', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: 'noMatch', followedArtistList: followedArtists.rows, result: [] },
      {
        inputValue: 'Ill Considered',
        followedArtistList: followedArtists.rows,
        result: followedArtists.rows.slice(-1),
      },
    ])('returns filtered artists for input $inputValue', ({ inputValue, followedArtistList, result }) => {
      expect(filterArtists(inputValue, followedArtistList)).toEqual(result);
    });
  });
});
