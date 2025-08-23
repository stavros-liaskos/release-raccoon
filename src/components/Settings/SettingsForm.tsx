'use client';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button';
import { useUserContext } from '@/contexts/User/UserContext';
import { settingsI18n } from '@/i18n';
import { components } from '@/types/schema';

const SettingsForm: React.FunctionComponent = () => {
  const { rrUser, loadingSettings, updateSettings } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<components['schemas']['UserSettings']>({
    unsubscribed: false,
    notifyIntervalDays: 0,
  });

  useEffect(() => {
    setSettings({ unsubscribed: rrUser.unsubscribed, notifyIntervalDays: rrUser.notifyIntervalDays });
  }, [rrUser.notifyIntervalDays, rrUser.unsubscribed]);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        setLoading(true);
        await updateSettings(settings);
        setLoading(false);
      }}
      className="flex flex-col justify-between md:justify-between items-stretch h-10 w-full my-3 py-6"
      noValidate
    >
      <div className="flex justify-start gap-5 items-center mb-4">
        <label htmlFor="notifyInDaysInput" className="block rr-text">
          {settingsI18n.notifyInNumberOfDays}
        </label>
        <input
          id="notifyInDaysInput"
          className="mr-4 px-2 rr-input w-15"
          type="number"
          value={settings.notifyIntervalDays}
          onChange={e => setSettings({ ...settings, notifyIntervalDays: Number(e.target.value) })}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>

      <label className="flex items-center space-x-2 mb-4 rr-text" htmlFor="subscriptionCheckbox">
        <input
          id="subscriptionCheckbox"
          type="checkbox"
          checked={!settings.unsubscribed}
          onChange={e => setSettings({ ...settings, unsubscribed: !e.target.checked })}
        />
        <span>{settingsI18n.subscribe}</span>
      </label>

      <Button disabled={loading || loadingSettings} loading={loading} className="btn btn-large" type="submit">
        {settingsI18n.saveBtn}
      </Button>
    </form>
  );
};
export default SettingsForm;
