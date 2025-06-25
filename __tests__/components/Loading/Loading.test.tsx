import { render } from '@testing-library/react';
import Loading from '@/components/Loading/Loading';

describe('Loading', () => {
  it('renders without data without crashing', () => {
    render(<Loading />);
  });
});
