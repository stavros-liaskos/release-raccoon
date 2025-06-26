import React from 'react';

import { headerI18n } from '@/i18n';

import DarkMode from '../DarkMode/DarkMode';

const Header: React.FunctionComponent = () => (
  <header className="rr-column justify-center flex-none h-14 rr-border border-b-2">
    <div className="flex justify-between items-center w-full lg:w-9/12">
      <DarkMode />

      <a href="/auth/logout">
        <button className="btn btn-small">{headerI18n.logoutBtn}</button>
      </a>
    </div>
  </header>
);
export default Header;
