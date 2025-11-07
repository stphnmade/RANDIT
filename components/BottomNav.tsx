
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
  const activeClasses = 'text-teal-400 dark:text-teal-300';
  const inactiveClasses = 'text-gray-500 dark:text-gray-400';

  if (isCenter) {
    return (
      <button 
        onClick={onClick}
        className="flex items-center justify-center w-16 h-16 -mt-8 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full shadow-lg text-white transform transition-transform hover:scale-110"
        aria-label={label}
      >
        <ShuffleIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-1 w-20">
      <div className={isActive ? activeClasses : inactiveClasses}>{icon}</div>
      <span className={`text-xs font-medium ${isActive ? activeClasses : inactiveClasses}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
      <NavItem
        label="Preferences"
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
