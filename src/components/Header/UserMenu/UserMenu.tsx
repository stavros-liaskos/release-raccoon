import Link from 'next/link';
import React from 'react';

import { headerI18n } from '@/i18n';
import { Auth0Endpoints, NavigationPaths } from '@/types/endpoints';

const UserWrapper: React.FunctionComponent = () => (
  <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 rr-border top-10 mt-[6px] md:top-10 z-10">
    <ul className="flex flex-col">
      <li className="py-2">
        <Link href={NavigationPaths.Profile}>{headerI18n.profile}</Link>
      </li>
      <li className="py-2">
        <Link href={NavigationPaths.Settings}>{headerI18n.settings}</Link>
      </li>
      <li className="py-2">
        <a href={Auth0Endpoints.Logout}>{headerI18n.logoutBtn}</a>
      </li>
    </ul>
  </div>
);
export default UserWrapper;
