import { render, waitFor } from '@testing-library/react';
import Recommendations from './Recommendations';
import { recommendationsI18n } from './Recommendations.data';
import recommendedArtists from '../../mocks/responses/followed-artists.json';
import { beforeEachTest } from '../../utils/test-utils';

describe('Recommendations', () => {
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

  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Recommendations />);
  });

  it('renders title and artists', async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(recommendedArtists) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    console.warn(await mRes.json());
    global.fetch = mockedFetch;

    const { getByText } = render(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
    // const buttons = await findAllByText(recommendationsI18n.artistList.btnTxt); // TODO fix
    // expect(buttons).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { container } = render(<Recommendations i18n={recommendationsI18n} />);
    expect(container).toMatchSnapshot();
  });
});