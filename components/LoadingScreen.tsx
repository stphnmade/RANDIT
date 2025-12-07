
import React, { useState, useEffect, useMemo } from 'react';
import type { Restaurant } from '../types';
import { PizzaIcon, BurgerIcon, SushiIcon, TacoIcon, NoodlesIcon, FishIcon, CurryIcon, SaladIcon, DonutIcon } from './Icons';

interface LoadingScreenProps {
  restaurants: Restaurant[];
  messages: string[];
}

const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
        <div 
            className="bg-black dark:bg-white h-2.5 rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

const FoodIconGrid: React.FC = () => {
    const icons = useMemo(() => [
        PizzaIcon, BurgerIcon, SushiIcon, 
        TacoIcon, NoodlesIcon, FishIcon, 
        CurryIcon, SaladIcon, DonutIcon
    ], []);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(Math.floor(Math.random() * icons.length));
        }, 300);
        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <div className="grid grid-cols-3 gap-4 w-48 h-48">
            {icons.map((Icon, index) => (
                <div 
                    key={index} 
                    className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                        activeIndex === index 
                        ? 'bg-black text-white dark:bg-white dark:text-black scale-110' 
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                    }`}
                >
                    <Icon className="w-8 h-8" />
                </div>
            ))}
        </div>
    );
};

const SlotReel: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="h-20 w-full overflow-hidden p-4 text-center bg-white dark:bg-black border border-black dark:border-white rounded-xl flex items-center justify-center">
             <div 
                key={name}
                className="text-2xl font-bold truncate text-black dark:text-white animate-slot-spin-in"
             >
                {name || '...'}
            </div>
        </div>
    );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ restaurants, messages }) => {
  const [displayedName, setDisplayedName] = useState('');
  const [message, setMessage] = useState(messages[0] || 'Getting your location...');
  const [progress, setProgress] = useState(0);

  const hasRestaurants = restaurants.length > 0;

  // Effect for cycling restaurant names
  useEffect(() => {
    let nameInterval: number;
    if (hasRestaurants) {
      setDisplayedName(restaurants[0].name);
      let i = 0;
      nameInterval = window.setInterval(() => {
        if (restaurants.length === 0) return;
        i = (i + 1) % restaurants.length;
        setDisplayedName(restaurants[i].name);
      }, 250);
    }
    return () => clearInterval(nameInterval);
  }, [hasRestaurants, restaurants]);

  // Effect for cycling messages and updating progress bar
  useEffect(() => {
    if (hasRestaurants) {
        // Start progress bar animation
        const startTime = Date.now();
        const duration = 4000; // Corresponds to setTimeout in App.tsx
        let animationFrameId: number;

        const frame = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = Math.min(100, (elapsedTime / duration) * 100);
            setProgress(newProgress);
            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(frame);
            }
        };
        animationFrameId = requestAnimationFrame(frame);

        // Start message cycling
        let messageInterval: number;
        let i = 0;
        const pollingMessages = messages.slice(1);
        if (pollingMessages.length > 0) {
            setMessage(pollingMessages[0]);
             messageInterval = window.setInterval(() => {
                i = (i + 1) % pollingMessages.length;
                setMessage(pollingMessages[i]);
            }, 1500);
        } else {
            setMessage('Picking a spot...');
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            if(messageInterval) clearInterval(messageInterval);
        }
    } else {
        // Reset state when there are no restaurants (e.g., on new search)
        setProgress(0);
        setDisplayedName('');
        setMessage(messages[0] || 'Getting your location...');
    }
  }, [hasRestaurants, messages]);
  
  // Initial loading state (before restaurants are fetched)
  if (!hasRestaurants) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-800 dark:text-white">
            <FoodIconGrid />
            <h2 className="text-xl font-bold animate-pulse mt-8 text-black dark:text-white">{message}</h2>
        </div>
    );
  }

  // Polling state (after restaurants are fetched)
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-800 dark:text-white">
      <div className="w-full max-w-sm space-y-6">
        <SlotReel name={displayedName} />
        <ProgressBar progress={progress} />
        <h2 className="text-xl font-bold text-black dark:text-white">{message}</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;