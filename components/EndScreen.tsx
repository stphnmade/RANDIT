
import React from 'react';

interface EndScreenProps {
  title: string;
  message: string;
  actions: { label: string; onClick: () => void; primary?: boolean }[];
}

const EndScreen: React.FC<EndScreenProps> = ({ title, message, actions }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white p-8">
      <div className="mb-8 text-5xl">🤷‍♂️</div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-8 max-w-sm">{message}</p>
      <div className="w-full max-w-sm space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full px-6 py-3 text-lg font-bold rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 ${
              action.primary
                ? 'text-white bg-gradient-to-r from-rose-500 to-pink-500 focus:ring-pink-300'
                : 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EndScreen;
