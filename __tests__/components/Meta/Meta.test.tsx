import React from 'react';
import Meta from '@/components/Meta/Meta';
import { render } from '@testing-library/react';

describe('Meta', () => {
  it('renders without data without crashing', () => {
    render(<Meta />);
  });
});
