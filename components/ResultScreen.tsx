
import React from 'react';
import type { Restaurant } from '../types';
import { RatingStar, DirectionsIcon, RerollIcon, OrderIcon } from './Icons';

interface ResultScreenProps {
  restaurant: Restaurant;
  onReroll: () => void;
  onNewSearch: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ restaurant, onReroll, onNewSearch }) => {
  if (!restaurant) return null;

  return (
    <div className="flex flex-col h-full p-4 text-gray-800 dark:text-white justify-between">
      <div className="text-center pt-8">
        <h2 className="text-lg text-gray-600 dark:text-gray-400">Your randomly selected spot is...</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl my-4 flex-grow flex flex-col justify-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-500 dark:from-purple-400 dark:to-teal-300">{restaurant.name}</h1>
        
        <div className="flex items-center justify-center space-x-4 text-lg my-4">
          <div className="flex items-center">
            <RatingStar className="text-yellow-400 mr-1" />
            <span className="font-semibold">{restaurant.rating}</span>
          </div>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <div className="font-semibold text-green-600 dark:text-green-400">
            {'$'.repeat(restaurant.price_level)}
          </div>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 my-2">{restaurant.address}</p>
        
        <div className="flex flex-wrap gap-2 justify-center mt-4">
            {restaurant.cuisine.map(c => (
                <span key={c} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 text-sm font-semibold rounded-full">{c}</span>
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <a 
          href={restaurant.maps_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <DirectionsIcon /> Get Directions
        </a>
        {restaurant.website_url && (
            <a 
                href={restaurant.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-green-500 hover:bg-green-600 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
                <OrderIcon /> Order Online
            </a>
        )}
        <button
          onClick={onReroll}
          className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-teal-500 dark:from-purple-600 dark:to-teal-600 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          <RerollIcon /> Reroll
        </button>
        <button
          onClick={onNewSearch}
          className="w-full text-center py-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          New Search
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
