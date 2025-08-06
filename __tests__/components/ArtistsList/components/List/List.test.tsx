import { fireEvent, render } from '@testing-library/react';

import List from '@/components/ArtistsList/components/List/List';
import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { artistsListI18n } from '@/i18n';
import artistsList from '@/mocks/fixtures/responses/followed-artists.json';

import { renderWithAct } from '../../../../testUtils/testUtils';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('renders all elements', async () => {
    const { queryAllByRole } = await renderWithAct(
      <List
        i18n={artistsListI18n}
        artistsList={artistsList.rows}
        artistLoading={0}
        buttonAction={ButtonAction.Follow}
      />,
    );
    const btn = queryAllByRole('button')[0];
    fireEvent.click(btn);

    expect(queryAllByRole('button')).toHaveLength(2);
    expect(queryAllByRole('img')).toHaveLength(3);
  });

  it('renders btn in disabled state', async () => {
    const { queryAllByRole } = await renderWithAct(
      <List
        i18n={artistsListI18n}
        artistsList={artistsList.rows}
        buttonAction={ButtonAction.Follow}
        artistLoading={1700}
      />,
    );
    const btn = queryAllByRole('button')[0];

    expect(btn).toHaveAttribute('disabled');
  });

  it('matches snapshot', async () => {
    const { container } = await renderWithAct(
      <List
        i18n={artistsListI18n}
        artistsList={artistsList.rows}
        buttonAction={ButtonAction.Follow}
        artistLoading={0}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
