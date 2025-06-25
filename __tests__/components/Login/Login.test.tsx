import React from 'react';
import Login from '@/components/Login/Login';
import { render } from '@testing-library/react';
import { loginI18n } from '@/i18n';

describe('Login', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Login />);
  });

  it('renders login button', () => {
    const { container } = render(<Login i18n={loginI18n} />);

    expect(container).toMatchSnapshot();
  });
});
