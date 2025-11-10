import React, { useState } from 'react';
import type { Restaurant } from '../types';
import { ShareIcon } from './Icons';

interface ResultScreenProps {
  restaurant: Restaurant;
  onReroll: () => void;
  onNewSearch: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ restaurant, onReroll, onNewSearch }) => {
  const { name, rating, price_level, address, cuisine, maps_url, website_url } = restaurant;
  const [copied, setCopied] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    if (typeof rating !== 'number') return null;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
        } else if (i - 0.5 <= rating) {
            // Represent half star as a full star for visual simplicity
            stars.push(<span key={`half-${i}`} className="text-yellow-400">★</span>);
        } else {
            stars.push(<span key={`empty-${i}`} className="text-gray-400">★</span>);
        }
    }
    return stars;
  };

  const renderPrice = (priceLevel: number) => {
    if (!priceLevel || priceLevel < 1) return <span className="text-gray-400">N/A</span>;
    return (
        <span className="text-gray-800 dark:text-gray-200">
            {'$'.repeat(priceLevel)}
            <span className="text-gray-400 dark:text-gray-600">
                {'$'.repeat(Math.max(0, 4 - priceLevel))}
            </span>
        </span>
    );
  };

  const handleShare = async () => {
      const shareData = {
        title: `Let's go to ${name}!`,
        text: `How about ${name}? It's located at ${address}.`,
        url: maps_url,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Error sharing:", err);
        }
      } else {
        // Fallback to copying the link
        try {
          await navigator.clipboard.writeText(maps_url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
          console.error("Failed to copy link:", err);
          alert("Failed to copy link to clipboard.");
        }
      }
    };

  return (
    <div className="flex flex-col h-full p-4 text-gray-800 dark:text-white justify-between">
      <div className="text-center flex-shrink-0">
        <p className="text-lg text-gray-500 dark:text-gray-400">Your destiny awaits...</p>
        <h1 className="text-4xl font-bold my-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-500">
          {name}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 my-4 flex-grow overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <div className="flex items-center space-x-1" title={rating ? `${rating} stars` : 'No rating'}>
            {renderStars(rating)}
          </div>
          <span className="text-lg font-semibold">{rating ? rating.toFixed(1) : 'N/A'}</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Price:</span>
          <div className="text-lg font-bold">{renderPrice(price_level)}</div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
          <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Address:</h3>
          <p className="text-gray-800 dark:text-gray-200">{address}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Cuisine:</h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {cuisine?.length > 0 ? cuisine.map(c => (
              <span key={c} className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 text-sm font-medium rounded-full">
                {c}
              </span>
            )) : <span className="text-sm text-gray-500">Not specified</span>}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <a href={maps_url} target="_blank" rel="noopener noreferrer" className="w-full text-center px-4 py-3 font-bold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center">
            Get Directions
          </a>
          <div className="grid grid-cols-2 gap-3">
            {website_url ? (
              <a href={website_url} target="_blank" rel="noopener noreferrer" className="w-full text-center px-4 py-3 font-bold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
                Visit Website
              </a>
            ) : (
              <button disabled className="w-full text-center px-4 py-3 font-bold text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full cursor-not-allowed">
                  No Website
              </button>
            )}
             <button onClick={handleShare} className="w-full text-center px-4 py-3 font-bold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                <ShareIcon className="w-5 h-5" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-shrink-0 mt-auto">
        <button
          onClick={onReroll}
          className="w-full px-6 py-4 text-lg font-bold text-white bg-gray-600 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
        >
          Reroll
        </button>
        <button
          onClick={onNewSearch}
          className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-teal-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          New Search
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;