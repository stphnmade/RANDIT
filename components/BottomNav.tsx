
import React from 'react';
import type { Tab } from '../types';
import { SlidersHorizontalIcon, ShuffleIcon, UserCircleIcon } from './Icons';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isCenter?: boolean;
}> = ({ label, icon, isActive, onClick, isCenter }) => {
  const activeClasses = 'text-black dark:text-white';
  const inactiveClasses = 'text-gray-400 dark:text-gray-500';

  if (isCenter) {
    return (
      <button 
        onClick={onClick}
        className="flex items-center justify-center w-16 h-16 -mt-8 bg-black dark:bg-white rounded-full text-white dark:text-black transform transition-transform hover:scale-110 border-4 border-[#F7FCFD] dark:border-black"
        aria-label={label}
      >
        <ShuffleIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-1 w-20">
      <div className={isActive ? activeClasses : inactiveClasses}>{icon}</div>
      <span className={`text-xs font-bold ${isActive ? activeClasses : inactiveClasses}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around items-center">
      <NavItem
        label="Filters"
        icon={<SlidersHorizontalIcon />}
        isActive={activeTab === 'preferences'}
        onClick={() => onTabChange('preferences')}
      />
      <NavItem
        label="randIT"
        icon={<ShuffleIcon />}
        isActive={activeTab === 'randit'}
        onClick={() => onTabChange('randit')}
        isCenter
      />
      <NavItem
        label="Profile"
        icon={<UserCircleIcon />}
        isActive={activeTab === 'profile'}
        onClick={() => onTabChange('profile')}
      />
    </nav>
  );
};

export default BottomNav;