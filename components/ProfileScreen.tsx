
import React from 'react';
import type { Theme } from '../types';
import { SunIcon, MoonIcon, DesktopIcon } from './Icons';

interface ProfileScreenProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { name: Theme; icon: React.ReactNode }[] = [
    { name: 'light', icon: <SunIcon /> },
    { name: 'dark', icon: <MoonIcon /> },
    { name: 'system', icon: <DesktopIcon /> },
  ];

  return (
    <div className="flex flex-col h-full p-4 text-gray-800 dark:text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Profile & Settings</h2>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-purple-500 dark:text-purple-400">Theme</h3>
          <div className="grid grid-cols-3 gap-2">
            {themes.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => onThemeChange(name)}
                className={`flex flex-col items-center p-3 rounded-lg capitalize transition-colors ${
                  currentTheme === name
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {icon}
                <span className="text-sm font-medium mt-1">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-purple-500 dark:text-purple-400">Account</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Sign in with Google to sync your preferences across devices. (Coming soon!)
            </p>
            <button
                disabled
                className="w-full px-4 py-2 font-bold text-white bg-gray-400 dark:bg-gray-600 rounded-lg cursor-not-allowed"
            >
                Sign In with Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
