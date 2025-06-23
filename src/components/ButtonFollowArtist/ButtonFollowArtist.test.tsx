import React from 'react';
import { render } from '@testing-library/react';
import ButtonFollowArtist from './ButtonFollowArtist';

describe('ButtonFollowArtist', () => {
  it('renders an enabled button by default and not a loading spinner', () => {
    // TODO use enum buttonAction
    const { getByRole, queryByRole } = render(
      <ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={'follow'} />,
    );
    const btn = getByRole('button');
    const svg = queryByRole('img');

    expect(btn).not.toHaveAttribute('disabled');
    expect(svg).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={'follow'} />);
    expect(container).toMatchSnapshot();
  });
});
