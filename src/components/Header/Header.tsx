import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import UserWrapper from '@/components/Header/UserWrapper';
import { auth0 } from '@/lib/auth0';
import { NavigationPaths } from '@/types/endpoints';

import DarkMode from '../DarkMode/DarkMode';

const LOGO_SIZE = 40;

const Header: React.FunctionComponent = async () => {
  const session = await auth0.getSession();

  return (
    <header className="rr-column justify-center flex-none h-14 rr-border border-b-2">
      <div className="flex justify-between items-center w-full lg:w-9/12">
        <Link href={NavigationPaths.Home}>
          <Image src="/favicon.svg" width={LOGO_SIZE} height={LOGO_SIZE} alt="Release Raccoon logo" />
        </Link>

        <div className="flex justify-end gap-5 w-full lg:w-9/12">
          <DarkMode />

          {session && <UserWrapper />}
        </div>
      </div>
    </header>
  );
};
export default Header;
