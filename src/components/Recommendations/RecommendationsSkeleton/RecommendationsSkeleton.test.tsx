import { render, screen } from '@testing-library/react';

import { recommendationsI18n } from '@/i18n';

import RecommendationsSkeleton from './RecommendationsSkeleton';

describe('RecommendationsSkeleton', () => {
  it('renders the title correctly', () => {
    const { container } = render(<RecommendationsSkeleton />);
    expect(screen.getByText(recommendationsI18n.title)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex flex-col lg:justify-center items-center mb-2 w-full');
  });
});
