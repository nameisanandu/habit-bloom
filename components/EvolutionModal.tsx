import React from 'react';
import { PLANT_STAGES } from '../constants';
import { SparklesIcon } from './icons/Icons';

interface EvolutionModalProps {
  milestone: number;
  onClose: () => void;
}

const EvolutionModal: React.FC<EvolutionModalProps> = ({ milestone, onClose }) => {
  const stage = PLANT_STAGES[milestone] || PLANT_STAGES[0];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="evolution-title"
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-sm w-full border-2 border-teal-400 transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4">
            <SparklesIcon className="absolute -top-10 -left-6 w-12 h-12 text-yellow-300 transform -rotate-45 opacity-80" />
            <SparklesIcon className="absolute -top-6 -right-8 w-16 h-16 text-fuchsia-400 opacity-80" />
            <SparklesIcon className="absolute top-4 -right-4 w-8 h-8 text-teal-300 transform rotate-45 opacity-80" />
        </div>
        
        <div className="text-8xl mb-4 animate-bounce-slow">{stage.emoji}</div>
        <h2 id="evolution-title" className="text-3xl font-bold text-teal-300 mb-2">
          Your plant evolved!
        </h2>
        <p className="text-gray-300 mb-6">
          You've reached a total streak of <span className="font-bold text-white">{milestone}</span>! Your plant has grown into a <span className="font-bold text-white">{stage.name}</span>.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default EvolutionModal;
