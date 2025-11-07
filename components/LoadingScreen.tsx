
import React, { useState, useEffect } from 'react';
import type { Restaurant } from '../types';

interface LoadingScreenProps {
  restaurants: Restaurant[];
  messages: string[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ restaurants, messages }) => {
  const [displayedName, setDisplayedName] = useState('');
  const [message, setMessage] = useState(messages[0] || 'Finding restaurants...');

  useEffect(() => {
    let nameInterval: number;
    if (restaurants.length > 0) {
      setDisplayedName(restaurants[0].name);
      let i = 0;
      nameInterval = window.setInterval(() => {
        i = (i + 1) % restaurants.length;
        setDisplayedName(restaurants[i].name);
      }, 150);
    }
    return () => clearInterval(nameInterval);
  }, [restaurants]);

  useEffect(() => {
    let messageInterval: number;
    if (messages.length > 1) {
        let i = 0;
        messageInterval = window.setInterval(() => {
            i = (i + 1) % messages.length;
            setMessage(messages[i]);
        }, 1500);
    }
    return () => clearInterval(messageInterval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-200 dark:text-white">
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <div className="absolute w-full h-full border-4 border-teal-400 dark:border-[#55EFC4] rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-3/4 h-3/4 border-4 border-purple-400 dark:border-[#A29BFE] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          <div className="w-2/3 p-2 text-center truncate font-bold text-lg bg-gray-100/10 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            {displayedName || '...'}
          </div>
      </div>
      <h2 className="text-xl font-semibold animate-pulse">{message}</h2>
    </div>
  );
};

export default LoadingScreen;
