
import React, { useMemo, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  labelFormat: (value: number) => string;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, labelFormat }) => {
  const range = max - min;
  const progress = useMemo(() => ((value - min) / range) * 100, [value, min, range]);
  
  const [isDragging, setIsDragging] = useState(false);

  const getBackgroundStyle = () => ({
    background: `linear-gradient(to right, var(--accent-color) ${progress}%, #e5e7eb ${progress}%)`
  });

  // This calculation helps center the tooltip over the slider thumb.
  const tooltipOffset = `calc(${progress}% + ${10 - progress * 0.2}px)`;

  return (
    <div className="relative w-full pt-8 pb-2">
      <div 
        className="absolute top-0 transform -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white dark:text-black bg-black dark:bg-white rounded-md transition-opacity duration-200 pointer-events-none"
        style={{ 
          left: tooltipOffset,
          opacity: isDragging ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {labelFormat(value)}
        <div className="absolute left-1/2 w-2 h-2 bg-black dark:bg-white transform -translate-x-1/2 rotate-45 -bottom-1"></div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onBlur={() => setIsDragging(false)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={getBackgroundStyle()}
        className="w-full h-2.5 rounded-lg appearance-none cursor-pointer slider-thumb bg-gray-200 dark:bg-gray-800"
        aria-label={labelFormat(value)}
      />
      <div className="text-center font-bold text-lg mt-3 text-gray-800 dark:text-white">
        {labelFormat(value)}
      </div>
      <style>{`
        input.slider-thumb {
          -webkit-appearance: none;
          appearance: none;
        }

        /* Thumb for Chrome, Safari, Opera, and Edge */
        input.slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 4px solid var(--accent-color);
          border-radius: 50%;
          margin-top: 0; 
          transition: transform 0.1s ease-in-out;
        }
        
        input.slider-thumb:active::-webkit-slider-thumb {
          transform: scale(1.1);
        }

        /* Thumb for Firefox */
        input.slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 4px solid var(--accent-color);
          border-radius: 50%;
          transition: transform 0.1s ease-in-out;
        }

        input.slider-thumb:active::-moz-range-thumb {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Slider;