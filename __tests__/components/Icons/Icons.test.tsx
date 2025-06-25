import { render } from '@testing-library/react';
import Close from '@/components/Icons/close';
import Github from '@/components/Icons/github';
import HandGlass from '@/components/Icons/handGlass';
import LastFm from '@/components/Icons/lastfm';
import Moon from '@/components/Icons/moon';
import Spin from '@/components/Icons/spin';
import Spotify from '@/components/Icons/spotify';
import Sun from '@/components/Icons/sun';

describe('Icons', () => {
  it('matches snapshot', () => {
    const { container, getAllByRole } = render(
      <>
        <Close />
        <Github />
        <HandGlass />
        <LastFm />
        <Moon />
        <Spin />
        <Spotify />
        <Sun />
      </>,
    );

    expect(getAllByRole('img')).toHaveLength(8);
    expect(container).toMatchSnapshot();
  });
});
