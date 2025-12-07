
import React, { useState, useCallback, useEffect } from 'react';
import type { Preferences, Restaurant, Tab, Theme } from './types';
import { getLocation } from './utils';
import { findRestaurants } from './services/geminiService';

import BottomNav from './components/BottomNav';
import PreferencesScreen from './components/PreferencesScreen';
import ProfileScreen from './components/ProfileScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import EndScreen from './components/EndScreen';
import { ShuffleIcon } from './components/Icons';

type RandItState = 'idle' | 'loading' | 'result' | 'no-results' | 'error';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('system');
    const [activeTab, setActiveTab] = useState<Tab>('randit');
    
    const initialPreferences: Preferences = {
        cuisines: [],
        mealType: [],
        distance: 5,
        price: [],
        rating: 0,
        payment: [],
        dietary: [],
    };
    const [preferences, setPreferences] = useState<Preferences>(initialPreferences);

    const [randItState, setRandItState] = useState<RandItState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
    const [availableRestaurants, setAvailableRestaurants] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    // Load state from localStorage on initial render
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem('randit-theme') as Theme | null;
            if (savedTheme) setTheme(savedTheme);

            const savedPrefs = localStorage.getItem('randit-preferences');
            if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
        } catch (e) {
            console.error("Failed to load from localStorage", e);
        }
    }, []);

    // Save theme to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('randit-theme', theme);
        } catch (e) {
            console.error("Failed to save theme to localStorage", e);
        }
    }, [theme]);

    // Apply theme to document
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);
        document.body.classList.toggle('dark', isDark); // Also toggle on body for compatibility
    }, [theme]);

    const handleSavePreferences = (newPreferences: Preferences) => {
        setPreferences(newPreferences);
        try {
            localStorage.setItem('randit-preferences', JSON.stringify(newPreferences));
        } catch (e) {
            console.error("Failed to save preferences to localStorage", e);
        }
        setActiveTab('randit');
    };
    
    const pickRandomRestaurant = useCallback((restaurants: Restaurant[]) => {
        if (restaurants.length > 0) {
            const randomIndex = Math.floor(Math.random() * restaurants.length);
            const choice = restaurants[randomIndex];
            setSelectedRestaurant(choice);
            setAvailableRestaurants(restaurants);
            setRandItState('result');
        } else {
            setRandItState('no-results');
        }
    }, []);

    const handleFindPlaces = useCallback(async () => {
        setError(null);
        setRandItState('loading');
        try {
            const coordinates = await getLocation();
            const results = await findRestaurants(coordinates, preferences);
            
            setAllRestaurants(results);
            
            // Simulate polling animation
            setTimeout(() => {
                if (results.length === 0) {
                    setRandItState('no-results');
                    return;
                }
                pickRandomRestaurant(results);
            }, 4000);

        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setRandItState('error');
        }
    }, [preferences, pickRandomRestaurant]);
    
    const handleReroll = useCallback(() => {
        const remaining = availableRestaurants.filter(r => r.name !== selectedRestaurant?.name);
        if (remaining.length > 0) {
            setRandItState('loading');
            setTimeout(() => pickRandomRestaurant(remaining), 3000);
        } else {
            setRandItState('no-results');
        }
    }, [availableRestaurants, selectedRestaurant, pickRandomRestaurant]);
    
    const resetRandIt = () => {
        setRandItState('idle');
        setError(null);
        setAllRestaurants([]);
        setAvailableRestaurants([]);
        setSelectedRestaurant(null);
    };

    const renderRandItContent = () => {
        switch (randItState) {
            case 'idle':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-800 dark:text-white">
                        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-500 dark:from-purple-400 dark:to-teal-300">
                          randIT
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">Ready to roll?</p>
                        <button onClick={handleFindPlaces} className="w-48 h-16 flex items-center justify-center text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300">
                           <ShuffleIcon className="w-6 h-6 mr-2" /> Go!
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                            Tap 'Go!' to find a random spot using your saved preferences.
                        </p>
                    </div>
                );
            case 'loading':
                return <LoadingScreen restaurants={allRestaurants} messages={['Getting your location...', 'Scanning local eats...', 'Weighing your options...', 'Almost there...']} />;
            case 'result':
                return selectedRestaurant && <ResultScreen 
                    restaurant={selectedRestaurant} 
                    onReroll={handleReroll} 
                    onNewSearch={resetRandIt}
                />;
            case 'no-results':
                if (allRestaurants.length === 0) {
                     return <EndScreen title="No Matches Found" message="We couldn't find any spots with your current filters. Try adjusting them." actions={[{label: 'Adjust Preferences', onClick: () => setActiveTab('preferences'), primary: true}, {label: 'Try Again', onClick: handleFindPlaces}]} />;
                }
                return <EndScreen title="That's All, Folks!" message="You've seen all the options for your search. Time to pick one or start a new search!" actions={[{label: 'Adjust Preferences', onClick: () => setActiveTab('preferences'), primary: true}, {label: 'New Search', onClick: resetRandIt}]} />;
            case 'error':
                 return <EndScreen title="Oops!" message={error || 'Something went wrong.'} actions={[{label: 'Try Again', onClick: handleFindPlaces, primary: true}, {label: 'New Search', onClick: resetRandIt}]} />;
        }
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 'preferences':
                return <PreferencesScreen currentPreferences={preferences} onSave={handleSavePreferences} />;
            case 'profile':
                return <ProfileScreen currentTheme={theme} onThemeChange={setTheme} />;
            case 'randit':
                return renderRandItContent();
            default:
                return null;
        }
    };
    
    return (
        <main className="h-screen w-screen bg-slate-50 dark:bg-[#0F0F0F] font-sans">
          <div className="relative max-w-md mx-auto h-full bg-slate-50 dark:bg-gray-900 shadow-2xl overflow-hidden">
            <div className="h-full overflow-y-auto pb-16">
              {renderMainContent()}
            </div>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </main>
    );
};

export default App;