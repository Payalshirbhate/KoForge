import { useEffect } from 'react';

export default function ScrollToTop({ currentPath }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  return null;
}
