'use client';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (results === null) {
      setInputValue('');
    }
  }, [results, setInputValue]);

  if (!i18n?.label || !handleAction || typeof handleAction !== 'function') {
    return null;
  }

  return (
    <form
      className="flex justify-between md:justify-between items-stretch w-full my-3"
      noValidate
      onSubmit={e => {
        e.preventDefault();
        handleAction(inputValue);
      }}
    >
      <input
        className="mr-4 px-3 py-2 min-m-lg border-2 rounded-lg rr-border dark:bg-gh-darkly rr-text w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        type="text"
        name="search"
        value={inputValue}
        placeholder={i18n.label}
        onChange={e => {
          setInputValue(e.target.value);
        }}
      />
      {children}
    </form>
  );
};

export default SearchForm;
