import React, { useState } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { Habit, GoalType } from '../../types';
import HabitItem from '../HabitItem';
import HabitBloom from '../HabitBloom';
import EvolutionModal from '../EvolutionModal';
import ProgressUpdateModal from '../ProgressUpdateModal';

const DashboardScreen: React.FC = () => {
  const { userData, getOverallProgress, evolutionMilestone, clearEvolution, toggleHabitCompleted } = useHabits();
  const { totalStreak } = getOverallProgress();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const handleHabitClick = (habit: Habit) => {
    if (habit.goalType === GoalType.Quantity) {
      setSelectedHabit(habit);
    } else {
      toggleHabitCompleted(habit.id);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-teal-300">Habit Bloom</h1>
          <p className="text-gray-400">Grow yourself by growing your habits 🌱</p>
        </header>

        <HabitBloom totalStreak={totalStreak} equippedPotId={userData.equippedPot} />

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-3 text-left">Today's Habits</h2>
          {userData.habits.length > 0 ? (
            <div className="space-y-3">
              {userData.habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} onClick={() => handleHabitClick(habit)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No habits yet!</p>
              <p className="text-sm text-gray-500">Tap the '+' button to add your first habit.</p>
            </div>
          )}
        </div>
      </div>
      {evolutionMilestone && (
        <EvolutionModal milestone={evolutionMilestone} onClose={clearEvolution} />
      )}
      {selectedHabit && (
        <ProgressUpdateModal 
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
        />
      )}
    </>
  );
};

export default DashboardScreen;