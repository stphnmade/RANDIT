
import React, { useState, useCallback, useEffect } from 'react';
import type { Filters, Restaurant } from './types';
import { Page } from './types';
import { CUISINE_OPTIONS } from './constants';
import { getLocation } from './utils';
import { findRestaurants } from './services/geminiService';

import HomeScreen from './components/HomeScreen';
import CuisineScreen from './components/CuisineScreen';
import FilterScreen from './components/FilterScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>(Page.Home);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    
    const initialFilters: Filters = {
        distance: 5,
        price: [],
        rating: 3.5,
        payment: [],
        dietary: [],
    };

    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    
    const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
    const [availableRestaurants, setAvailableRestaurants] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    const resetState = useCallback(() => {
        setPage(Page.Home);
        setError(null);
        setSelectedCuisines([]);
        setFilters(initialFilters);
        setAllRestaurants([]);
        setAvailableRestaurants([]);
        setSelectedRestaurant(null);
    }, []);

    const handleCuisineToggle = (cuisine: string) => {
        setSelectedCuisines(prev => 
            prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
        );
    };

    const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const pickRandomRestaurant = useCallback((restaurants: Restaurant[]) => {
        setLoadingMessage('Picking your spot...');
        setPage(Page.Loading);

        setTimeout(() => {
            if (restaurants.length > 0) {
                const randomIndex = Math.floor(Math.random() * restaurants.length);
                const choice = restaurants[randomIndex];
                setSelectedRestaurant(choice);
                setAvailableRestaurants(restaurants);
                setPage(Page.Result);
            } else {
                setPage(Page.EndScreen); // This case leads to Exhausted screen
            }
        }, 3000); // Simulate spinning
    }, []);

    const handleFindPlaces = useCallback(async () => {
        setError(null);
        setLoadingMessage('Getting your location...');
        setPage(Page.Loading);
        try {
            const coordinates = await getLocation();
            setLoadingMessage('Finding restaurants...');
            
            const results = await findRestaurants(coordinates, selectedCuisines, filters);
            
            if (results.length === 0) {
                setPage(Page.EndScreen); // This case leads to No Results screen
                return;
            }

            setAllRestaurants(results);
            pickRandomRestaurant(results);

        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setPage(Page.EndScreen); // Error leads to End Screen as well
        }
    }, [selectedCuisines, filters, pickRandomRestaurant]);
    
    const handleReroll = useCallback(() => {
        const remaining = availableRestaurants.filter(r => r.name !== selectedRestaurant?.name);
        if (remaining.length > 0) {
            pickRandomRestaurant(remaining);
        } else {
            setPage(Page.EndScreen);
        }
    }, [availableRestaurants, selectedRestaurant, pickRandomRestaurant]);

    const renderContent = () => {
        switch (page) {
            case Page.Home:
                return <HomeScreen onStart={() => setPage(Page.Cuisine)} />;
            case Page.Cuisine:
                return <CuisineScreen 
                    selectedCuisines={selectedCuisines}
                    onCuisineToggle={handleCuisineToggle}
                    onNext={() => setPage(Page.Filters)}
                    onSelectAll={() => setSelectedCuisines(CUISINE_OPTIONS)}
                    onClearAll={() => setSelectedCuisines([])}
                />;
            case Page.Filters:
                return <FilterScreen 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onFind={handleFindPlaces}
                    onBack={() => setPage(Page.Cuisine)}
                />;
            case Page.Loading:
                return <LoadingScreen message={loadingMessage} />;
            case Page.Result:
                return selectedRestaurant && <ResultScreen 
                    restaurant={selectedRestaurant} 
                    onReroll={handleReroll} 
                    onStartOver={resetState}
                />;
            case Page.EndScreen:
                if (error) {
                    return <EndScreen title="Oops!" message={error} actions={[{label: 'Try Again', onClick: () => setPage(Page.Filters), primary: true}, {label: 'Start Over', onClick: resetState}]} />;
                }
                if (allRestaurants.length === 0) {
                     return <EndScreen title="No Matches Found" message="We couldn't find any spots with your current filters. Try adjusting them." actions={[{label: 'Adjust Filters', onClick: () => setPage(Page.Filters), primary: true}, {label: 'Start Over', onClick: resetState}]} />;
                }
                return <EndScreen title="That's All, Folks!" message="You've seen all the options for your search. Time to pick one or start a new search!" actions={[{label: 'Adjust Filters', onClick: () => setPage(Page.Filters), primary: true}, {label: 'Start Over', onClick: resetState}]} />;
            default:
                return <HomeScreen onStart={() => setPage(Page.Cuisine)} />;
        }
    };
    
    return (
        <main className="h-screen w-screen bg-gray-900 font-sans">
          <div className="max-w-md mx-auto h-full bg-gray-800 shadow-2xl overflow-hidden">
            <div className="h-full overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </main>
    );
};

export default App;
