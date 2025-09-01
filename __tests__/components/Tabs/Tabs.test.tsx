import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Tabs from '@/components/Tabs/Tabs';

const tabs = [
  {
    label: 'Tab 1',
    content: <div>Content 1</div>,
  },
  {
    label: 'Tab 2',
    content: <div>Content 2</div>,
  },
];

describe('Tabs', () => {
  it('renders tabs with the first tab active', () => {
    const { getByText } = render(<Tabs tabs={tabs} />);

    expect(getByText('Tab 1')).toHaveClass('border-b-2 border-blue-500 text-blue-500');
    expect(getByText('Content 1')).toBeInTheDocument();
  });

  it('switches to the second tab on click', () => {
    const { getByText } = render(<Tabs tabs={tabs} />);

    fireEvent.click(getByText('Tab 2'));

    expect(getByText('Tab 2')).toHaveClass('border-b-2 border-blue-500 text-blue-500');
    expect(getByText('Content 2')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Tabs tabs={tabs} />);
    expect(container).toMatchSnapshot();
  });
});
