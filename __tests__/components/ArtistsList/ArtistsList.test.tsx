import { render } from '@testing-library/react';

import ArtistsList from '@/components/ArtistsList/ArtistsList';
import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
import { artistsListI18n } from '@/i18n';
import artistsList from '@/mocks/fixtures/responses/followed-artists.json';

import { renderWithAct } from '../../testUtils/testUtils';

describe('ArtistsList', () => {
  it.each([
    {
      props: {},
    },
    {
      props: {
        i18n: {},
      },
    },
    {
      props: {
        i18n: {
          noArtists: 'noArtists',
        },
      },
    },
    {
      props: {
        i18n: {
          noArtists: 'noArtists',
        },
        buttonAction: ButtonAction.Follow,
      },
    },
  ])('renders without data without crashing', ({ props }) => {
    // @ts-expect-error testing missing props
    expect(render(<ArtistsList {...props} />)).toBeTruthy();
  });

  it.each([{ artistsList: [] }, { artistsList: undefined }])(
    'shows text when no artist is available',
    ({ artistsList }) => {
      const { getByText } = render(
        <ArtistsList
          i18n={artistsListI18n}
          /*@ts-ignore*/
          artistsList={artistsList}
          buttonAction={ButtonAction.Follow}
          artistLoading={0}
        />,
      );

      expect(getByText('You don not track any artists yet')).toBeInTheDocument();
    },
  );

  it('renders all elements', async () => {
    const { queryAllByRole } = await renderWithAct(
      <ArtistsList
        i18n={artistsListI18n}
        buttonAction={ButtonAction.Follow}
        artistsList={artistsList.rows}
        artistLoading={0}
      />,
    );
    expect(queryAllByRole('button')).toHaveLength(2);
    expect(queryAllByRole('img')).toHaveLength(3);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ArtistsList buttonAction={ButtonAction.Follow} artistsList={artistsList.rows} artistLoading={0} />,
    );
    expect(container).toMatchSnapshot();
  });
});
