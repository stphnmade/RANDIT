import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const Logo: React.FC<IconProps> = (props) => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="48" stroke="url(#logo-gradient)" strokeWidth="4"/>
    <path d="M35 35 L65 65 M65 35 L35 65" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round"/>
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SlidersHorizontalIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

export const ShuffleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="16 21 21 21 21 16" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const DesktopIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export const PizzaIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M15 11h.01" />
    <path d="M11 15h.01" />
    <path d="M16 16h.01" />
    <path d="M21.17 8.83a2.001 2.001 0 0 0-2.34-3.17l-2.66 1.14" />
    <path d="m15.83 3.66-2.66 1.14" />
    <path d="M22 12c-4.33 6-13.67 6-18 0" />
    <path d="M17.17 15.17a2 2 0 0 0-2.34 3.17l2.66-1.14" />
    <path d="M8.17 3.66l2.66 1.14" />
    <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />
    <path d="M12 2v20" />
  </svg>
);

export const BurgerIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M8 6h8" />
    <path d="M7 10h10" />
    <path d="M10 14h4" />
    <path d="M12 4a4 4 0 0 1 4 4h0a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2h0a4 4 0 0 1 4-4Z" />
    <path d="M5 18h14" />
    <path d="M5 10v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </svg>
);

export const SushiIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M9 12a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3Z" />
    <path d="M9 18a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3Z" />
    <path d="M15 12a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3Z" />
    <path d="M15 18a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3Z" />
    <path d="M3 3v18h18" />
  </svg>
);

export const TacoIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M2 11.77h20" />
    <path d="M12.75 2.25h-1.5a8.71 8.71 0 0 0-8.54 6.2" />
    <path d="M12 11.77 12 22" />
    <path d="M19.91 4.62a8.71 8.71 0 0 1 1.86 3.85" />
    <path d="M21.77 11.77A14.32 14.32 0 0 1 12 22a14.32 14.32 0 0 1-9.77-10.23" />
  </svg>
);

export const NoodlesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M14 11V6" />
    <path d="M10 11V6" />
    <path d="M18 11V6" />
    <path d="M6 11V6" />
    <path d="M2 11h20" />
    <path d="M3 11v10h18V11" />
  </svg>
);

export const FishIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="m15.5 13.5-3 3-3-3" />
    <path d="m22 8.5-4.2 4.2" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3" />
    <path d="M18 12.5a4.5 4.5 0 1 1-6.3-6.4 4.5 4.5 0 0 1 6.4 6.3Z" />
    <path d="M11.5 6.5a4.5 4.5 0 1 0-6.4 6.3 4.5 4.5 0 0 0 6.3-6.4Z" />
  </svg>
);

export const CurryIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="m3 11 7-7" />
    <path d="m3 19 12-12" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49" />
    <path d="M21 12H3" />
    <path d="M19 17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2" />
  </svg>
);

export const SaladIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M13 14v-4a2 2 0 1 1 4 0v4" />
    <path d="M11 14v-4a2 2 0 1 0-4 0v4" />
    <path d="m16 16-2.2-4.4" />
    <path d="m8 16 2.2-4.4" />
    <path d="M12 22a10 10 0 0 0 10-10H2a10 10 0 0 0 10 10Z" />
    <path d="M15 12a3 3 0 0 0-6 0" />
  </svg>
);

export const DonutIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);