import React from 'react';

import LastFmConnect from '@/components/Settings/LastFmConnect';
import SettingsForm from '@/components/Settings/SettingsForm';

const Settings: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-5 lg:justify-center items-center flex-none h-16 md:h-20 w-full">
      <LastFmConnect />
      <SettingsForm />
    </div>
  );
};
export default Settings;
