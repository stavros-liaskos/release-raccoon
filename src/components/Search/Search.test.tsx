import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import Search from './Search';
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
import artistSearch from '../../mocks/fixtures/responses/artist-search.json';
import { mswFollowedArtists, mswSearch } from '../../mocks/mockApi';
import { components } from '../../types/schema';
import { searchI18n } from '../../i18n';

describe('Search', () => {
  const server = initServer();

  const setup = async () => {
    const { container, getByRole } = await renderWithAct(<Search i18n={searchI18n} />);
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
    // @ts-ignore
    await renderWithAct(<Search />);
  });

  it('should have the query that the user types in the input', async () => {
    const { input } = await setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  it.each<{ searchQuery: string; searchRes: components['schemas']['ArtistSearchResponse']; goal: string }>([
    { searchQuery: 'Sam Gendel', searchRes: artistSearch, goal: 'should handle the search action of the user' },
    // { searchQuery: 'No match', searchRes: { artists: [], count: 0 }, goal: 'handles no search results' }, // TODO
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
