import { render } from '@testing-library/react';
import React from 'react';

import Hero from '@/components/Hero/Hero';

jest.mock('@/lib/auth0', () => ({})); // TODO remove this mock when proper auth0 mock is implemented
xdescribe('Hero', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Hero />);
  });

  it('renders login button', () => {
    const { container } = render(<Hero />);

    expect(container).toMatchSnapshot();
  });
});
