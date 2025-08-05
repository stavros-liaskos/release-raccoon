'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import UserMenu from '@/components/Header/UserMenu/UserMenu';
import User from '@/components/Icons/user';

const UserWrapper: React.FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <User />
      </button>

      {isMenuOpen && <UserMenu />}
    </div>
  );
};
export default UserWrapper;
