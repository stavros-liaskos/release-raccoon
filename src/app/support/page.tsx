import React from 'react';

import { supportI18n } from '@/i18n';

export default function SupportPage() {
  return (
    <div className="flex flex-auto flex-col items-center justify-center w-full">
      <h2 className="rr-text text-center text-4xl mb-3">{supportI18n.title}</h2>
      <p className="rr-text text-center text-xl mb-6">{supportI18n.text}</p>
      <p className="text-center text-xl text-blue-500">{supportI18n.email}</p>
    </div>
  );
}
