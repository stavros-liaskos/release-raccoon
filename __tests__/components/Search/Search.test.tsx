import { act, fireEvent } from '@testing-library/react';
import React from 'react';

import Search from '@/components/Search/Search';
import SearchProvider from '@/contexts/Search/SearchProvider';
import { searchI18n } from '@/i18n';
import artistSearch from '@/mocks/fixtures/responses/artist-search.json';
import { mswFollowedArtists, mswSearch } from '@/mocks/mockApi';
import { components } from '@/types/schema';

import { initServer, renderWithAct, resetMocks } from '../../testUtils/testUtils';

describe('Search', () => {
  const server = initServer();

  const setup = async () => {
    const { container, getByRole } = await renderWithAct(
      <SearchProvider>
        <Search i18n={searchI18n} />
      </SearchProvider>,
    );
    const searchBtn = getByRole('button');
    const input = getByRole('textbox');

    return {
      container,
      searchBtn,
      input,
    };
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2));
  });

  it('renders without data without crashing', async () => {
    //  @ts-ignore
    await renderWithAct(<Search />);
  });

  it('should have the query that the user types in the input', async () => {
    const { input } = await setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  it.each<{ searchQuery: string; searchRes: components['schemas']['ArtistSearchResponse']; goal: string }>([
    { searchQuery: 'Sam Gendel', searchRes: artistSearch, goal: 'should handle the search action of the user' },
    // { searchQuery: 'No match', searchRes: { artists: [], count: 0 }, goal: 'handles no search results' },
  ])('$goal', async ({ searchQuery, searchRes }) => {
    server.use(mswSearch.success(searchRes));
    const { container, input, searchBtn } = await setup();

    fireEvent.change(input, { target: { value: searchQuery } });
    await act(async () => {
      fireEvent.click(searchBtn);
    });

    if (searchQuery === 'No match') {
      expect(container).toHaveTextContent(searchI18n.searchList.noArtists);
    }
    expect(container).toMatchSnapshot();
  });
});
