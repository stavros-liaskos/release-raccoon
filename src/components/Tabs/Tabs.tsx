'use client';

import './Tabs.css';

import clsx from 'clsx';
import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="flex border-b border-gray-200 dark:border-gh-border justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={clsx('py-2 md:py-4 px-4 text-md text-center', {
              'border-b-2 border-blue-500 text-blue-500': activeTab === index,
              'text-gray-500 hover:text-gray-700': activeTab !== index,
            })}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-grow flex-col flex-1 items-center md:pt-2 tab-content mb-2 rr-border w-full h-full">
        {tabs[activeTab].content}
      </div>
    </>
  );
};

export default Tabs;
