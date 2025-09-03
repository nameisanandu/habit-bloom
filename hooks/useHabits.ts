import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Habit, StoreItem, GoalType } from '../types';
import { INITIAL_HABITS, EVOLUTION_THRESHOLDS, POINTS_PER_COMPLETION } from '../constants';

interface UserData {
  habits: Habit[];
  points: number;
  unlockedItems: string[];
  equippedPot: string;
}

interface HabitContextType {
  userData: UserData;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'lastCompleted'>) => void;
  toggleHabitCompleted: (habitId: string) => void;
  updateHabitProgress: (habitId: string, progress: number) => void;
  getOverallProgress: () => { totalStreak: number; habitsCompletedToday: number };
  purchaseItem: (item: StoreItem) => void;
  equipPot: (itemId: string) => void;
  evolutionMilestone: number | null;
  clearEvolution: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const storedData = localStorage.getItem('habitBloomData');
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
    }
    return {
      habits: INITIAL_HABITS,
      points: 0,
      unlockedItems: ['pot_starter'],
      equippedPot: 'pot_starter',
    };
  });
  
  const [evolutionMilestone, setEvolutionMilestone] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('habitBloomData', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data to localStorage', error);
    }
  }, [userData]);

  const clearEvolution = () => {
    setEvolutionMilestone(null);
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'streak' | 'lastCompleted'>) => {
    const newHabit: Habit = {
      ...habit,
      id: new Date().toISOString(),
      streak: 0,
      lastCompleted: null,
      progress: habit.goalType === GoalType.Quantity ? 0 : undefined,
      lastProgressEntryDate: null,
    };
    setUserData(prev => ({...prev, habits: [...prev.habits, newHabit]}));
  };

  const toggleHabitCompleted = (habitId: string) => {
    const today = getTodayDateString();

    setUserData(prev => {
        const oldTotalStreak = prev.habits.reduce((sum, habit) => sum + habit.streak, 0);
        let pointsChange = 0;

        const newHabits = prev.habits.map(habit => {
            if (habit.id === habitId && habit.goalType === GoalType.Checkbox) {
              const isCompletedToday = habit.lastCompleted === today;
              if (isCompletedToday) {
                  pointsChange = -POINTS_PER_COMPLETION;
                  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                  return {
                    ...habit,
                    streak: Math.max(0, habit.streak - 1),
                    lastCompleted: habit.streak > 1 ? yesterday : null,
                  };
              } else {
                  pointsChange = POINTS_PER_COMPLETION;
                  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                  const isContinuingStreak = habit.lastCompleted === yesterday;
                  return { ...habit, streak: isContinuingStreak ? habit.streak + 1 : 1, lastCompleted: today };
              }
            }
            return habit;
        });

        const newTotalStreak = newHabits.reduce((sum, habit) => sum + habit.streak, 0);
        const crossedThreshold = EVOLUTION_THRESHOLDS.find( threshold => oldTotalStreak < threshold && newTotalStreak >= threshold );

        if (crossedThreshold) { setEvolutionMilestone(crossedThreshold); }
        
        return { ...prev, habits: newHabits, points: Math.max(0, prev.points + pointsChange) };
    });
  };
  
  const updateHabitProgress = (habitId: string, progress: number) => {
    const today = getTodayDateString();
    setUserData(prev => {
        const oldTotalStreak = prev.habits.reduce((sum, habit) => sum + habit.streak, 0);
        let pointsChange = 0;

        const newHabits = prev.habits.map(habit => {
            if (habit.id === habitId && habit.goalType === GoalType.Quantity) {
                const goal = habit.goalValue || Infinity;
                const wasCompletedToday = habit.lastCompleted === today;

                // Reset progress if it's a new day of activity for this habit
                const currentProgress = (habit.lastProgressEntryDate === today) ? (habit.progress || 0) : 0;
                const newProgress = Math.max(0, currentProgress + progress);

                const isNowCompletedToday = newProgress >= goal;
                
                let newStreak = habit.streak;
                let newLastCompleted = habit.lastCompleted;

                // Award points and update streak only on the first completion of the day
                if (isNowCompletedToday && !wasCompletedToday) {
                    pointsChange = POINTS_PER_COMPLETION;
                    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                    const isContinuingStreak = habit.lastCompleted === yesterday;
                    newStreak = isContinuingStreak ? habit.streak + 1 : 1;
                    newLastCompleted = today;
                }

                return { 
                    ...habit, 
                    progress: newProgress, 
                    streak: newStreak, 
                    lastCompleted: newLastCompleted, 
                    lastProgressEntryDate: today 
                };
            }
            return habit;
        });

        const newTotalStreak = newHabits.reduce((sum, habit) => sum + habit.streak, 0);
        const crossedThreshold = EVOLUTION_THRESHOLDS.find(threshold => oldTotalStreak < threshold && newTotalStreak >= threshold);
        if (crossedThreshold) { setEvolutionMilestone(crossedThreshold); }
        
        return { ...prev, habits: newHabits, points: Math.max(0, prev.points + pointsChange) };
    });
  };

  const getOverallProgress = useCallback(() => {
    const today = getTodayDateString();
    const totalStreak = userData.habits.reduce((sum, habit) => sum + habit.streak, 0);
    const habitsCompletedToday = userData.habits.filter(h => h.lastCompleted === today).length;
    return { totalStreak, habitsCompletedToday };
  }, [userData.habits]);

  const purchaseItem = (item: StoreItem) => {
    setUserData(prev => {
        if (prev.points >= item.cost && !prev.unlockedItems.includes(item.id)) {
            return { ...prev, points: prev.points - item.cost, unlockedItems: [...prev.unlockedItems, item.id] };
        }
        return prev;
    });
  };

  const equipPot = (itemId: string) => {
    setUserData(prev => {
        if (prev.unlockedItems.includes(itemId)) { return { ...prev, equippedPot: itemId }; }
        return prev;
    });
  };

  const contextValue: HabitContextType = {
    userData, addHabit, toggleHabitCompleted, updateHabitProgress, getOverallProgress,
    purchaseItem, equipPot, evolutionMilestone, clearEvolution,
  };

  return React.createElement(HabitContext.Provider, { value: contextValue }, children);
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};