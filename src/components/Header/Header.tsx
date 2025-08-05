import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import UserMenu from '@/components/Header/UserMenu/UserMenu';
import { auth0 } from '@/lib/auth0';

import DarkMode from '../DarkMode/DarkMode';

const Header: React.FunctionComponent = async () => {
  const session = await auth0.getSession();

  return (
    <header className="rr-column justify-center flex-none h-14 rr-border border-b-2">
      <div className="flex justify-between items-center w-full lg:w-9/12">
        <Link href="/">
          <Image src="/raccoon_main.jpg" width={30} height={30} alt="Release Raccoon logo" />
        </Link>

        <div className="flex justify-end gap-5 w-full lg:w-9/12">
          <DarkMode />

          {session && <UserMenu />}
        </div>
      </div>
    </header>
  );
};
export default Header;
