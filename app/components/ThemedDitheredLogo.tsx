'use client';

import { useEffect, useState } from 'react';
import DitheredLogo from './DitheredLogo';

export default function ThemedDitheredLogo() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      setDark(root.classList.contains('dark'));
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <DitheredLogo
      image={'/dino.webp'}
      algorithm="floyd-steinberg"
      invert={true}
      scale={1}
      dotScale={dark ? 1 : 1.5}
      dotColor={dark ? '#f1f5f9' : '#111827'}
      backgroundColor="transparent"
      imageProcessing={{
        threshold: 181,
        contrast: 0,
        gamma: 1.03,
        blur: 3.75,
        highlightsCompression: 0,
      }}
      interaction={{
        mouseRepulsion: true,
        clickShockwave: true,
      }}
      gridResolution={150}
      className="h-[240px] w-[240px] rounded-2xl z-10"
    />
  );
}
