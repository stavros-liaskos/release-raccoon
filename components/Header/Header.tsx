import React from 'react';
import DarkMode from '../DarkMode/DarkMode';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const Header: React.FunctionComponent = () => {
  const { user } = useUser();

  return (
    <header className="flex justify-between basis-14 rr-border border-b-2">
      <DarkMode />

      {user && (
        <Link href="/api/auth/logout">
          <button className="btn btn-small lg:ml-8 mx-3 my-2">Logout</button>
        </Link>
      )}
    </header>
  );
};
Header.whyDidYouRender = false;
export default Header;
