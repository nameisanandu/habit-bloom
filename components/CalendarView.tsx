import React, { useState } from 'react';
import { Habit } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface CalendarViewProps {
  habits: Habit[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const completedDates = new Set(
    habits.flatMap(habit => {
        // This visualization relies on the lastCompleted date for each habit.
        // A more robust historical view would require storing a full completion history.
        return habit.lastCompleted ? [habit.lastCompleted] : [];
    })
  );

  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderHeader = () => {
    const monthYearFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-700 transition">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-white">{monthYearFormat.format(currentDate)}</h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-700 transition">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayString = getTodayDateString();

    const dayCells: JSX.Element[] = [];

    // Blank cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayCells.push(<div key={`blank-${i}`} className="w-full aspect-square"></div>);
    }

    // Cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateString === todayString;
      const isCompleted = completedDates.has(dateString);

      let cellClasses = 'w-full aspect-square flex items-center justify-center text-sm rounded-full transition-colors ';
      if (isToday) {
        cellClasses += 'bg-teal-500 text-white font-bold ';
      } else {
        cellClasses += 'text-gray-300 ';
      }
      
      if (isCompleted && !isToday) {
        cellClasses += 'bg-gray-700 border-2 border-teal-400 ';
      }

      dayCells.push(
        <div key={day} className={cellClasses}>
          {day}
        </div>
      );
    }

    return (
        <>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {dayCells}
            </div>
        </>
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default CalendarView;
