
import React from 'react';
import { Logo } from './Icons';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white p-8">
      <div className="mb-8">
        <Logo />
      </div>
      <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        randIT
      </h1>
      <p className="text-lg text-gray-300 mb-12">Stop deciding. Start eating.</p>
      <button
        onClick={onStart}
        className="w-full max-w-sm px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        Find where to eat
      </button>
    </div>
  );
};

export default HomeScreen;
