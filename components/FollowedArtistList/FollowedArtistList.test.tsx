import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import FollowedArtistList from './FollowedArtistList';
import { listI18n } from './FollowedArtistList.data';
import { beforeEachTest, render, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('FollowedArtistList', () => {
  let originFetch: {
    (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  };
  beforeEach(() => {
    originFetch = global.fetch;

    beforeEachTest();
  });

  afterEach(() => {
    global.fetch = originFetch;
    jest.restoreAllMocks();
  });

  it('renders artists with "unfollow" btn', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const component = render(<FollowedArtistList i18n={listI18n} />);
    const buttons = await component.findAllByText('unfollow');

    expect(buttons).toHaveLength(2);
    // expect(mockedFetch).toBeCalledTimes(1); TODO fix
    expect(mRes.json).toBeCalledTimes(1);

    expect(component.container).toMatchSnapshot();
  });

  it('unfollows artist on btn click', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const { findAllByText } = await renderWithAct(<FollowedArtistList i18n={listI18n} />);

    const buttons = await findAllByText('unfollow');

    expect(buttons).toHaveLength(2);
    // expect(mockedFetch).toBeCalledTimes(1); TODO fix
    expect(mRes.json).toBeCalledTimes(1);

    const mRes1 = { json: jest.fn().mockResolvedValueOnce('OK') };
    global.fetch = jest.fn().mockResolvedValueOnce(mRes1);

    const logSpy = jest.spyOn(console, 'log');
    await act(async () => {
      await act(() => {
        fireEvent.click(buttons[0]);
      });
    });
    const artists = await findAllByText('unfollow');
    expect(logSpy).toBeCalledWith('1700 successfully unfollowed');
    expect(artists).toHaveLength(1);
  });
});
