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
    <div>
      <div className="flex border-b border-gray-200 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={clsx('py-2 px-4 text-sm font-medium text-center', {
              'border-b-2 border-blue-500 text-blue-500': activeTab === index,
              'text-gray-500 hover:text-gray-700': activeTab !== index,
            })}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex p-4 tab-content flex-grow">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
