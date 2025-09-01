import React from 'react';
import { render } from '@testing-library/react';
import SupportPage from '@/app/support/page';

describe('SupportPage', () => {
  it('renders the support page with correct content', () => {
    const { getByText } = render(<SupportPage />);

    expect(getByText('Support')).toBeInTheDocument();
    expect(getByText(/If you need help, please reach out to us at/)).toBeInTheDocument();
    expect(getByText('releaseraccoon at gmail.com')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<SupportPage />);
    expect(container).toMatchSnapshot();
  });
});
