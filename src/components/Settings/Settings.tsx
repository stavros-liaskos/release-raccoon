import React from 'react';

import Scrapers from '@/components/Scrapers/Scrapers';
import SettingsForm from '@/components/Settings/SettingsForm';

const Settings: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-between md:justify-between items-stretch h-10 w-full my-3">
      <Scrapers />
      <SettingsForm />
    </div>
  );
};
export default Settings;
