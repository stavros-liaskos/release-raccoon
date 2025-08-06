import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/*
 * Identifies when there is a change in the current path and triggers a handler function.
 * e.g. used to close a menu when navigating to a different page
 * */
export default function useOnNavigation(handler: () => void) {
  const pathname = usePathname();

  useEffect(() => {
    handler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
