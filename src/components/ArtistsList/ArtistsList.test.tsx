import { render } from '@testing-library/react';
import ArtistsList from './ArtistsList';
import artistsList from '../../mocks/fixtures/responses/followed-artists.json';
import { artistsListI18n } from '../../i18n';

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
          btnTxt: 'btnTxt',
        },
      },
    },
    {
      props: {
        i18n: {
          noArtists: 'noArtists',
          btnTxt: 'btnTxt',
        },
      },
    },
    {
      props: {
        i18n: {
          noArtists: 'noArtists',
          btnTxt: 'btnTxt',
        },
        onButtonClick: {},
      },
    },
  ])('renders without data without crashing', ({ props }) => {
    // @ts-ignore
    const { queryByText } = render(<ArtistsList {...props} />);
    expect(queryByText('noArtists')).toBeNull();
  });

  it.each([{ artistsList: {} }, { artistsList: undefined }])(
    'shows text when no artist is available',
    ({ artistsList }) => {
      const { getByText } = render(
        // @ts-ignore
        <ArtistsList i18n={artistsListI18n} artistsList={artistsList} onButtonClick={jest.fn} artistLoading={0} />,
      );

      expect(getByText('You don not track any artists yet')).toBeInTheDocument();
    },
  );

  it('renders all elements', () => {
    const { queryAllByRole } = render(
      <ArtistsList buttonAction={'follow'} artistsList={artistsList.rows} artistLoading={0} />,
    );
    expect(queryAllByRole('button')).toHaveLength(2);
    expect(queryAllByRole('img')).toHaveLength(3);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ArtistsList buttonAction={'follow'} artistsList={artistsList.rows} artistLoading={0} />,
    );
    expect(container).toMatchSnapshot();
  });
});
