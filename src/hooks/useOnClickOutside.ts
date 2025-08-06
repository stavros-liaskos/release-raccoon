import React, { useEffect } from 'react';

/*
 * Identifies when a user clicks outside of a specified element and triggers a handler function.
 * e.g. used to close a menu when clicking outside of it.
 * */
export default function useOnClickOutside(handler: () => void) {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref?.current) return;

    const mouseDownHandler = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', mouseDownHandler);
    return () => document.removeEventListener('mousedown', mouseDownHandler);
  }, [ref, handler]);

  return ref;
}
