
import React from 'react';
import { useHabits } from '../../hooks/useHabits';
import { BADGES } from '../../constants';
import BadgeItem from '../BadgeItem';
import CalendarView from '../CalendarView';

const ProgressScreen: React.FC = () => {
  const { userData } = useHabits();
  const { habits } = userData;
  const longestStreak = Math.max(0, ...habits.map(h => h.streak));
  const totalStreakPoints = habits.reduce((acc, h) => acc + h.streak, 0);

  const earnedBadges = BADGES.filter(badge => longestStreak >= badge.minStreak);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-teal-300 text-center">Your Progress</h1>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-3xl font-bold text-teal-400">{longestStreak}</p>
          <p className="text-sm text-gray-400">Longest Streak</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-3xl font-bold text-purple-400">{totalStreakPoints}</p>
          <p className="text-sm text-gray-400">Total Streak Points</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Activity Calendar</h2>
        <CalendarView habits={habits} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Badges Earned</h2>
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedBadges.map(badge => (
              <BadgeItem key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No badges yet. Keep up the streaks!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressScreen;