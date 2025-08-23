'use client';
import React from 'react';

import UserMenu from '@/components/Header/UserMenu';
import User from '@/components/Icons/user';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useOnNavigation from '@/hooks/useOnNavigation';

const UserWrapper: React.FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useOnClickOutside(() => setIsMenuOpen(false)); // Close menu when clicking outside of it
  useOnNavigation(() => {
    setIsMenuOpen(false);
  }); // Close menu when navigating to a different page

  // Close menu on focus loss (blur)
  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (menuRef.current && event.relatedTarget && !menuRef.current.contains(event.relatedTarget as Node)) {
      setIsMenuOpen(false);
    }
  }

  return (
    <div className="relative" ref={menuRef} onBlur={handleBlur}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-label="User menu"
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gh-dark transition-all duration-200 hover:scale-105"
      >
        <User />
      </button>

      {isMenuOpen && <UserMenu />}
    </div>
  );
};
export default UserWrapper;
