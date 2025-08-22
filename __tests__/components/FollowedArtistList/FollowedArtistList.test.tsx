import { act, fireEvent } from '@testing-library/react';
import React from 'react';

import FollowedArtistList, { filterArtists } from '@/components/FollowedArtistList/FollowedArtistList';
import { followedArtistListI18n } from '@/i18n';
import followedArtists from '@/mocks/fixtures/responses/followed-artists.json';
import { mswFollowedArtists, mswUnfollow } from '@/mocks/mockApi';
import { components } from '@/types/schema';

import { initServer, render, renderWithAct } from '../../testUtils/testUtils';

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
    server.use(mswFollowedArtists.success());
    // @ts-ignore
    await renderWithAct(<FollowedArtistList {...props} />);
  });

  it('renders artists with "unfollow" btn', async () => {
    server.use(mswFollowedArtists.success());
    const fetchSpy = jest.spyOn(window, 'fetch');
    const component = await renderWithAct(<FollowedArtistList />);
    const buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);

    expect(buttons).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('renders loading state', async () => {
    server.use(mswFollowedArtists.fail());
    const fetchSpy = jest.spyOn(window, 'fetch');
    const component = render(<FollowedArtistList />);

    const loadingIcon = await component.findByRole('img');
    expect(loadingIcon).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('unfollows artist on btn click', async () => {
    server.use(mswFollowedArtists.success(2), mswUnfollow.success());
    const { findAllByText } = await renderWithAct(<FollowedArtistList />);

    let buttons = await findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);

    await act(async () => {
      fireEvent.click(buttons[0]);
    });
  });

  it('matches snapshot', async () => {
    server.use(mswFollowedArtists.success(2));

    const component = await renderWithAct(<FollowedArtistList />);
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
      { inputValue: 'noMatch', followedArtistList: followedArtists.rows, result: [] },
      {
        inputValue: 'Ill Considered',
        followedArtistList: followedArtists.rows,
        result: followedArtists.rows.slice(-1),
      },
    ])('returns filtered artists for input $inputValue', ({ inputValue, followedArtistList, result }) => {
      expect(filterArtists(followedArtistList, inputValue)).toEqual(result);
    });
  });
});
