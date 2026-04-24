'use client';

import { useEffect, useState } from 'react';

type Props = {
  className?: string;
};

export default function ModeToggle({ className }: Props) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    window.localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      type="button"
      className={className}
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          <path d="M12.2 2.5a9.5 9.5 0 1 0 9.3 12.2 8.1 8.1 0 0 1-9.3-12.2Z" />
        </svg>
      )}
    </button>
  );
}
