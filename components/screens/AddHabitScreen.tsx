import React, { useState } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { Habit, HabitCategory, GoalType } from '../../types';
import { HABIT_CATEGORIES, CATEGORY_COLORS } from '../../constants';

interface AddHabitScreenProps {
  onHabitAdded: () => void;
}

const AddHabitScreen: React.FC<AddHabitScreenProps> = ({ onHabitAdded }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>(HabitCategory.Personal);
  const [goalType, setGoalType] = useState<GoalType>(GoalType.Checkbox);
  const [goalValue, setGoalValue] = useState('');
  const [goalUnit, setGoalUnit] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');
  const { addHabit } = useHabits();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (reminderEnabled && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    const habitToAdd: Omit<Habit, 'id' | 'streak' | 'lastCompleted' | 'progress'> = {
      name,
      category,
      goalType,
      reminderTime: reminderEnabled ? reminderTime : null,
    };

    if (goalType === GoalType.Quantity) {
      habitToAdd.goalValue = parseInt(goalValue, 10) || 1;
      habitToAdd.goalUnit = goalUnit.trim() || 'times';
    }

    addHabit(habitToAdd);
    onHabitAdded();
  };

  return (
    <div className="flex flex-col space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-teal-300 text-center">New Habit</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="habit-name" className="block text-sm font-medium text-gray-300 mb-2">
            Habit Name
          </label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Read for 20 minutes"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Goal Type</label>
          <div className="flex bg-gray-800 rounded-lg border border-gray-700 p-1">
            <button type="button" onClick={() => setGoalType(GoalType.Checkbox)} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition ${goalType === GoalType.Checkbox ? 'bg-teal-500 text-white' : 'text-gray-400'}`}>Checkbox</button>
            <button type="button" onClick={() => setGoalType(GoalType.Quantity)} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition ${goalType === GoalType.Quantity ? 'bg-teal-500 text-white' : 'text-gray-400'}`}>Quantity</button>
          </div>
        </div>

        {goalType === GoalType.Quantity && (
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label htmlFor="goal-value" className="block text-sm font-medium text-gray-300 mb-2">Target</label>
              <input id="goal-value" type="number" value={goalValue} onChange={(e) => setGoalValue(e.target.value)} placeholder="e.g., 20" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition" required />
            </div>
            <div className="w-1/2">
              <label htmlFor="goal-unit" className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
              <input id="goal-unit" type="text" value={goalUnit} onChange={(e) => setGoalUnit(e.target.value)} placeholder="e.g., minutes" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {HABIT_CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => setCategory(cat)} className={`p-2 rounded-lg text-sm font-semibold transition ${ category === cat ? `ring-2 ring-teal-400 ${CATEGORY_COLORS[cat]} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600' }`} >{cat}</button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
                <label htmlFor="reminder-toggle" className="text-sm font-medium text-gray-300">Set Reminder</label>
                <button type="button" onClick={() => setReminderEnabled(!reminderEnabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${reminderEnabled ? 'bg-teal-500' : 'bg-gray-600'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${reminderEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
            {reminderEnabled && (
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="w-full mt-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition" />
            )}
        </div>


        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!name.trim()}>
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitScreen;