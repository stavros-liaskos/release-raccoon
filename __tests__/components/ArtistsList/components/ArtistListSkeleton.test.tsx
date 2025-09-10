import { render, screen } from '@testing-library/react';

import ArtistListSkeleton from '@/components/ArtistsList/components/ArtistListSkeleton';

describe('ArtistListSkeleton', () => {
  it('renders the title correctly', () => {
    const { container } = render(<ArtistListSkeleton />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex flex-col lg:justify-center items-center mb-2 w-full');
  });
});
