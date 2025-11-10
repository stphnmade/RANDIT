
import React, { useState } from 'react';
import type { Preferences } from '../types';
import { PAYMENT_OPTIONS, DIETARY_OPTIONS, CUISINE_OPTIONS } from '../constants';
import Slider from './Slider';

interface PreferencesScreenProps {
  currentPreferences: Preferences;
  onSave: (preferences: Preferences) => void;
}

const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ currentPreferences, onSave }) => {
  const [prefs, setPrefs] = useState<Preferences>(currentPreferences);

  const handleCuisineToggle = (cuisine: string) => {
    const newCuisines = prefs.cuisines.includes(cuisine)
      ? prefs.cuisines.filter(c => c !== cuisine)
      : [...prefs.cuisines, cuisine];
    setPrefs(p => ({ ...p, cuisines: newCuisines }));
  };

  const handleFilterChange = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs(p => ({ ...p, [key]: value }));
  };
  
  const handleMultiSelect = (key: 'price' | 'payment' | 'dietary', value: string | number) => {
    const currentValues = prefs[key] as (string | number)[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(key, newValues as any);
  };

  const FilterSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-3 text-purple-500 dark:text-purple-400">{title}</h3>
      {children}
    </div>
  );
  
  return (
    <div className="flex flex-col h-full p-4 text-gray-800 dark:text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Your Preferences</h2>
        <p className="text-gray-500 dark:text-gray-400">We'll remember these for next time.</p>
      </div>

      <div className="flex-grow overflow-y-auto pb-4 pr-1">
        <FilterSection title="Cuisines">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CUISINE_OPTIONS.map((cuisine) => (
              <button key={cuisine} onClick={() => handleCuisineToggle(cuisine)}
                className={`p-3 rounded-lg font-semibold text-center transition-colors text-sm ${
                  prefs.cuisines.includes(cuisine) ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {cuisine}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={() => handleFilterChange('cuisines', CUISINE_OPTIONS)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm">Select All</button>
              <button onClick={() => handleFilterChange('cuisines', [])} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm">Clear All</button>
          </div>
        </FilterSection>

        <FilterSection title="Distance">
          <Slider
            min={1}
            max={15}
            step={0.05}
            value={prefs.distance}
            onChange={(val) => handleFilterChange('distance', val)}
            labelFormat={(val) => `${val.toFixed(2)} miles`}
          />
        </FilterSection>

        <FilterSection title="Price Range">
            <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(p => (
                    <button key={p} onClick={() => handleMultiSelect('price', p)} className={`p-2 rounded-md font-bold transition-colors ${prefs.price.includes(p) ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                        {'$'.repeat(p)}
                    </button>
                ))}
            </div>
        </FilterSection>

        <FilterSection title="Rating">
           <Slider
            min={0}
            max={5}
            step={0.05}
            value={prefs.rating}
            onChange={(val) => handleFilterChange('rating', val)}
            labelFormat={(val) => val === 0 ? 'Any Rating' : `${val.toFixed(2)}+ stars`}
          />
        </FilterSection>
        
        <FilterSection title="Payment Type">
            <div className="flex flex-wrap gap-2">
                {PAYMENT_OPTIONS.map(p => (
                    <button key={p} onClick={() => handleMultiSelect('payment', p)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${prefs.payment.includes(p) ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                        {p}
                    </button>
                ))}
            </div>
        </FilterSection>
        
        <FilterSection title="Dietary Options">
            <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map(d => (
                    <button key={d} onClick={() => handleMultiSelect('dietary', d)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${prefs.dietary.includes(d) ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                        {d}
                    </button>
                ))}
            </div>
        </FilterSection>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={() => onSave(prefs)}
          className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-teal-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default PreferencesScreen;
