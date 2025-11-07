
import React from 'react';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 2s linear infinite;
        }
      `}</style>
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-t-pink-500 border-r-pink-500 border-b-rose-500 border-l-rose-500 rounded-full spinner"></div>
        <div className="absolute inset-2 border-4 border-t-violet-500 border-r-violet-500 border-b-purple-500 border-l-purple-500 rounded-full spinner" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      </div>
      <h2 className="text-2xl font-bold animate-pulse">{message}</h2>
    </div>
  );
};

export default LoadingScreen;
