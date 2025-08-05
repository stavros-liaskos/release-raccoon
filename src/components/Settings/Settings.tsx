'use client';
import React from 'react';

import { Paths } from '@/types/endpoints';

const Settings: React.FunctionComponent = () => {
  return (
    <div className="relative flex lg:justify-center items-center flex-none h-16 md:h-20 md:border-b-2 rr-border w-full">
      <button className="btn btn-large" onClick={handleSetSettings}>
        Set Settings
      </button>
      <button className="btn btn-large" onClick={handleGetSettings}>
        Get Settings
      </button>
    </div>
  );

  async function handleSetSettings() {
    fetch(`${Paths.Settings}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .catch(console.error);
  }
  async function handleGetSettings() {
    fetch(`${Paths.Settings}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  }
};
export default Settings;
