import React from 'react';
import { Habit, GoalType } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { FireIcon, CheckIcon, ClockIcon, ListIcon } from './icons/Icons';

interface HabitItemProps {
  habit: Habit;
  onClick: () => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onClick }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.lastCompleted === today;

  const progressPercentage = habit.goalType === GoalType.Quantity ?
    Math.min(100, ((habit.progress || 0) / (habit.goalValue || 1)) * 100) : 0;
  
  const isCheckbox = habit.goalType === GoalType.Checkbox;
  
  const formattedTime = (time: string | null | undefined) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div 
      onClick={onClick}
      className={`relative p-3 bg-gray-800 rounded-lg shadow-md transition-all duration-300 overflow-hidden cursor-pointer group ${isCompletedToday ? 'opacity-60' : 'hover:bg-gray-700'}`}
    >
      <div className="flex items-center">
        {isCheckbox && (
          <div
            className={`w-10 h-10 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-300
              ${isCompletedToday ? 'bg-teal-500 border-teal-500' : 'bg-gray-700 border-gray-600 group-hover:border-teal-400'}`}
          >
            {isCompletedToday && <CheckIcon className="w-6 h-6 text-white" />}
          </div>
        )}
        <div className={`flex-grow ${isCheckbox ? 'ml-4' : ''}`}>
          <div className="flex items-center space-x-2">
            {!isCheckbox && <ListIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
            <p className={`font-medium ${isCompletedToday ? 'line-through text-gray-500' : 'text-gray-100'}`}>
              {habit.name}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[habit.category]}`}>
              {habit.category}
            </span>
            {habit.reminderTime && (
                <div className="flex items-center text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    <span>{formattedTime(habit.reminderTime)}</span>
                </div>
            )}
          </div>
          {!isCheckbox && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex items-center justify-end mt-1 space-x-1.5">
                {isCompletedToday && <CheckIcon className="w-4 h-4 text-green-400" />}
                <p className="text-xs text-gray-400">
                  {habit.progress || 0} / {habit.goalValue} {habit.goalUnit}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1 text-orange-400 ml-4">
          <FireIcon className="w-5 h-5" />
          <span className="font-bold text-lg">{habit.streak}</span>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;