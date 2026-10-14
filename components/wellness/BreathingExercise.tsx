
import React, { useState, useEffect } from 'react';

const BreathingExercise: React.FC = () => {
  const [text, setText] = useState('Inhale...');
  
  useEffect(() => {
    const cycle = () => {
      setText('Inhale...');
      setTimeout(() => setText('Hold...'), 3500);
      setTimeout(() => setText('Exhale...'), 7000);
    };

    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute w-full h-full bg-sky-200 rounded-full animate-breathe"></div>
        <div className="absolute w-3/4 h-3/4 bg-sky-300 rounded-full animate-breathe" style={{animationDelay: '0.1s'}}></div>
        <span className="relative z-10 text-xl font-semibold text-text-primary">{text}</span>
      </div>
    </div>
  );
};

export default BreathingExercise;
