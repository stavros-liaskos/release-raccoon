'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import UserMenu from '@/components/Header/UserMenu/UserMenu';
import User from '@/components/Icons/user';

const UserWrapper: React.FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu when navigating to a different page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
      >
        <User />
      </button>

      {isMenuOpen && <UserMenu />}
    </div>
  );
};
export default UserWrapper;
