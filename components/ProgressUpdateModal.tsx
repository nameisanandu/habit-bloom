import React, { useState } from 'react';
import { Habit } from '../types';
import { useHabits } from '../hooks/useHabits';

interface ProgressUpdateModalProps {
  habit: Habit;
  onClose: () => void;
}

const ProgressUpdateModal: React.FC<ProgressUpdateModalProps> = ({ habit, onClose }) => {
  const { updateHabitProgress } = useHabits();
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    const value = parseInt(amount, 10);
    if (!isNaN(value) && value > 0) {
      updateHabitProgress(habit.id, value);
      onClose();
    }
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-update-title"
    >
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center max-w-sm w-full border border-gray-700 animate-fade-in-up">
        <h2 id="progress-update-title" className="text-xl font-bold text-teal-300 mb-2">
          Update Progress
        </h2>
        <p className="text-gray-400 mb-4">How much did you complete for "{habit.name}"?</p>
        
        <div className="flex items-center space-x-2">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 20"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                autoFocus
            />
            <span className="font-medium text-gray-400">{habit.goalUnit}</span>
        </div>

        <div className="mt-6 flex space-x-2">
            <button
                onClick={onClose}
                className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 disabled:bg-gray-500"
                disabled={!amount}
            >
                Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdateModal;
