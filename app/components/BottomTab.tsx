'use client';

import { useEffect, useState } from 'react';
import { Dock, DockIcon } from './magicui/dock';
import ModeToggle from './ModeToggle';
import type { ReactNode } from 'react';

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

const ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.8V20h13V9.8" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    href: '#about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 20c.8-3.2 3.4-5 7-5s6.2 1.8 7 5" />
      </svg>
    ),
  },
  {
    id: 'work',
    label: 'Work',
    href: '#work',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    href: '#skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
        <path d="m12 3 1.8 3.7L18 8.5l-3 3 0.7 4.2L12 13.8 8.3 15.7 9 11.5l-3-3 4.2-1.8Z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

const SECTION_IDS = ['home', 'about', 'work', 'skills', 'contact'];

const SOCIAL_ITEMS: Array<{ name: string; href: string; icon: ReactNode }> = [
  {
    name: 'Email',
    href: 'mailto:manobhavsachan@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full rounded-sm overflow-hidden object-contain">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/manobhav-sachan',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full rounded-sm overflow-hidden object-contain">
        <path d="M6.5 8.5h-3V20h3V8.5ZM5 7.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM20.5 13.5c0-3.2-1.7-5.2-4.6-5.2-2.1 0-3 .9-3.5 1.6v-1.4h-3V20h3v-6.2c0-1.7.3-3.3 2.4-3.3s2.1 2 2.1 3.4V20h3v-6.5Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ManobhavSachan',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full rounded-sm overflow-hidden object-contain">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5V19c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.2-4.5-1.1-4.5-5A3.9 3.9 0 0 1 7.6 8c-.1-.2-.4-1.3.1-2.7 0 0 .9-.3 2.9 1a10 10 0 0 1 5.2 0c2-1.3 2.9-1 2.9-1 .5 1.4.2 2.5.1 2.7A3.9 3.9 0 0 1 19.4 11c0 3.9-2.3 4.8-4.5 5 .4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

export default function BottomTab() {
  const [, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30">
      <Dock
        className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border border-border bg-background/90 dark:bg-card/90"
        aria-label="Primary navigation"
      >
        <div className="group relative">
          <a href="#home" aria-label="Home">
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              {ITEMS[0].icon}
            </DockIcon>
          </a>
          <div className="pointer-events-none absolute left-1/2 top-[-44px] -translate-x-1/2 translate-y-0 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm opacity-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-150 group-hover:-translate-y-1 group-hover:opacity-100 dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <p>Home</p>
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
          </div>
        </div>

        {SOCIAL_ITEMS.map((social, index) => {
          const isExternal = social.href.startsWith('http') || social.href.startsWith('mailto:');
          return (
            <div key={`social-${social.name}-${index}`} className="group relative">
              <a
                href={social.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={social.name}
              >
                <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                  {social.icon}
                </DockIcon>
              </a>
              <div className="pointer-events-none absolute left-1/2 top-[-44px] -translate-x-1/2 translate-y-0 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm opacity-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-150 group-hover:-translate-y-1 group-hover:opacity-100 dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <p>{social.name}</p>
                <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
              </div>
            </div>
          );
        })}

        <div className="group relative">
          <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
            <ModeToggle className="size-full cursor-pointer" />
          </DockIcon>
          <div className="pointer-events-none absolute left-1/2 top-[-44px] -translate-x-1/2 translate-y-0 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm opacity-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-150 group-hover:-translate-y-1 group-hover:opacity-100 dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <p>Theme</p>
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
          </div>
        </div>
      </Dock>
    </div>
  );
}