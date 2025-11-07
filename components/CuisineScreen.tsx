
import React from 'react';
import { CUISINE_OPTIONS } from '../constants';

interface CuisineScreenProps {
  selectedCuisines: string[];
  onCuisineToggle: (cuisine: string) => void;
  onNext: () => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

const CuisineScreen: React.FC<CuisineScreenProps> = ({
  selectedCuisines,
  onCuisineToggle,
  onNext,
  onSelectAll,
  onClearAll,
}) => {
  return (
    <div className="flex flex-col h-full p-4 text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">What are you craving?</h2>
        <p className="text-gray-400">Select one or more cuisines.</p>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CUISINE_OPTIONS.map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <button
                key={cuisine}
                onClick={() => onCuisineToggle(cuisine)}
                className={`p-4 rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button onClick={onSelectAll} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">Select All</button>
        <button onClick={onClearAll} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">Clear All</button>
      </div>

      <button
        onClick={onNext}
        disabled={selectedCuisines.length === 0}
        className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:bg-gray-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:scale-100"
      >
        Next
      </button>
    </div>
  );
};

export default CuisineScreen;
