import React from 'react';
import DarkMode from './DarkMode';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import { act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('DarkMode', () => {
  beforeEach(() => {
    beforeEachTest();

    fetchMock.mockIf(/^https?:\/\/release-raccoon.com.*$/, req => {
      if (req.url.endsWith('/me/followed-artists')) {
        return Promise.resolve({ body: JSON.stringify({ json: followedArtists }) });
      } else {
        return Promise.reject({ status: 404 });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  xit('shows Sun icon on dark mode', async () => {
    // TODO fix this
    localStorage.setItem('theme', 'dark');
    const component = await renderWithAct(<DarkMode />);
    const { container } = component;

    expect(component.getByTestId('sun')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('shows Moon icon on light mode', async () => {
    localStorage.removeItem('theme');
    const component = await renderWithAct(<DarkMode />);
    const { container } = component;

    expect(component.getByTestId('moon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('toggles to Sun Icon when clicking the Moon', async () => {
    localStorage.removeItem('theme');
    const component = await renderWithAct(<DarkMode />);
    const button = component.getByTestId('moon');
    expect(component.getByTestId('moon')).toBeTruthy();

    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(component.getByTestId('sun')).toBeTruthy();
  });
});
