
import React from 'react';
import type { Filters } from '../types';
import { PAYMENT_OPTIONS, DIETARY_OPTIONS } from '../constants';

interface FilterScreenProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onFind: () => void;
  onBack: () => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ filters, onFilterChange, onFind, onBack }) => {
    
  const handleMultiSelect = (key: 'price' | 'payment' | 'dietary', value: string | number) => {
    const currentValues = filters[key] as (string | number)[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(key, newValues as any);
  };

  const FilterSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-semibold mb-3 text-pink-400">{title}</h3>
      {children}
    </div>
  );
  
  return (
    <div className="flex flex-col h-full p-4 text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Refine Your Search</h2>
        <p className="text-gray-400">Set your preferences.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <FilterSection title="Distance">
          <input
            type="range"
            min="1" max="15" step="1"
            value={filters.distance}
            onChange={(e) => onFilterChange('distance', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="text-center font-bold text-lg mt-2">{filters.distance} miles</div>
        </FilterSection>

        <FilterSection title="Price Range">
            <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(p => (
                    <button key={p} onClick={() => handleMultiSelect('price', p)} className={`p-2 rounded-md font-bold transition-colors ${filters.price.includes(p) ? 'bg-pink-500' : 'bg-gray-700'}`}>
                        {'$'.repeat(p)}
                    </button>
                ))}
            </div>
        </FilterSection>

        <FilterSection title="Rating">
          <input
            type="range"
            min="3" max="5" step="0.5"
            value={filters.rating}
            onChange={(e) => onFilterChange('rating', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="text-center font-bold text-lg mt-2">{filters.rating.toFixed(1)}+ stars</div>
        </FilterSection>
        
        <FilterSection title="Payment Type">
            <div className="flex flex-wrap gap-2">
                {PAYMENT_OPTIONS.map(p => (
                    <button key={p} onClick={() => handleMultiSelect('payment', p)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filters.payment.includes(p) ? 'bg-pink-500' : 'bg-gray-700'}`}>
                        {p}
                    </button>
                ))}
            </div>
        </FilterSection>
        
        <FilterSection title="Dietary Options">
            <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map(d => (
                    <button key={d} onClick={() => handleMultiSelect('dietary', d)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filters.dietary.includes(d) ? 'bg-pink-500' : 'bg-gray-700'}`}>
                        {d}
                    </button>
                ))}
            </div>
        </FilterSection>
      </div>

      <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
         <button
            onClick={onBack}
            className="w-full px-6 py-4 text-lg font-bold text-white bg-gray-600 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            Back
          </button>
        <button
          onClick={onFind}
          className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Find Places
        </button>
      </div>
    </div>
  );
};

export default FilterScreen;
