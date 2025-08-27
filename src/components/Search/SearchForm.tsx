'use client';
import React, { useEffect, useState, useRef } from 'react';

import { useSearchContext } from '@/contexts/Search/SearchContext';

type FormInputProps = {
  handleAction: (input: string) => void;
  i18n: {
    label: string;
  };
  children?: React.ReactNode;
};

const SearchForm = ({ handleAction, i18n, children }: FormInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { results } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (results === null) {
      setInputValue('');
    }
  }, [results, setInputValue]);

  // Add keyboard shortcut listener for CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for CMD+K (Mac) or CTRL+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!i18n?.label || !handleAction || typeof handleAction !== 'function') {
    return null;
  }

  // Detect if user is on Mac
  const isMac = typeof window !== 'undefined' && 
    (navigator.userAgent.indexOf('Mac') !== -1 || navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('iPad') !== -1);

  return (
    <form
      className="flex justify-between md:justify-between items-stretch w-full my-3"
      noValidate
      onSubmit={e => {
        e.preventDefault();
        handleAction(inputValue);
      }}
    >
      <div className="relative flex-1 mr-4">
        <input
          ref={inputRef}
          className="rr-input w-full pr-20"
          type="text"
          name="search"
          value={inputValue}
          placeholder={i18n.label}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none" style={{ marginTop: '-3px' }}>
          <div className="flex items-center gap-0.5">
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600">
              {isMac ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600">
              K
            </kbd>
          </div>
        </div>
      </div>
      {children}
    </form>
  );
};

export default SearchForm;
