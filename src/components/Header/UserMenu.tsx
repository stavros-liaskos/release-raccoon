import React from 'react';

import { MenuItem } from '@/components/Header/MenuItem';
import Logout from '@/components/Icons/logout';
import Profile from '@/components/Icons/profile';
import SettingsIcon from '@/components/Icons/settingsIcon';
import { headerI18n } from '@/i18n';
import { Auth0Endpoints, NavigationPaths } from '@/types/endpoints';

const UserWrapper: React.FunctionComponent = () => (
  <div className="absolute bg-white dark:bg-gh-darkly border-2 rr-border top-12 right-0 rounded-lg shadow-lg z-10 min-w-[200px] overflow-hidden animate-in slide-in-from-top-2">
    <ul className="flex flex-col py-2">
      <MenuItem href={NavigationPaths.Profile} icon={<Profile />}>
        {headerI18n.profile}
      </MenuItem>
      <MenuItem href={NavigationPaths.Settings} icon={<SettingsIcon />}>
        {headerI18n.settings}
      </MenuItem>
      <MenuItem href={Auth0Endpoints.Logout} icon={<Logout />} danger>
        {headerI18n.logoutBtn}
      </MenuItem>
    </ul>
  </div>
);
export default UserWrapper;
