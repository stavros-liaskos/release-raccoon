'use client';
import React, { useState } from 'react';

type FormInputProps = {
  handleAction: (input: string) => void;
  i18n: {
    label: string;
  };
  actionEventTrigger: 'onChange' | 'onSubmit';
  children?: React.ReactNode;
};

const FormInput = ({ handleAction, i18n, children, actionEventTrigger }: FormInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  if (!i18n?.label || !handleAction || typeof handleAction !== 'function' || !actionEventTrigger) {
    return null;
  }

  return (
    <form
      className="flex justify-between md:justify-between items-stretch h-10 w-full my-3"
      noValidate
      {...(actionEventTrigger === 'onSubmit' && {
        onSubmit: e => {
          e.preventDefault();
          handleAction(inputValue);
        },
      })}
    >
      <input
        className="mr-4 px-2 min-m-lg border-b-2 rr-border dark:bg-gh-darkly rr-text w-full"
        type="text"
        name="search"
        value={inputValue}
        placeholder={i18n.label}
        onChange={e => {
          setInputValue(e.target.value);
          if (actionEventTrigger === 'onChange') {
            handleAction(e.target.value);
          }
        }}
      />
      {children}
    </form>
  );
};

FormInput.whyDidYouRender = true;
export default FormInput;
