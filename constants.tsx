import React from 'react';
import { Habit, HabitCategory, Badge, PlantStageInfo, StoreItem, StoreItemType } from './types';
import { StarIcon, FireIcon, ShieldCheckIcon, AcademicCapIcon, SparklesIcon } from './components/icons/Icons';

export const INITIAL_HABITS: Habit[] = [];

export const EVOLUTION_THRESHOLDS = [5, 10, 25, 50];

export const PLANT_STAGES: { [key: number]: PlantStageInfo } = {
    0: { emoji: '🌱', name: 'Seedling' },
    5: { emoji: '🌿', name: 'Sprout' },
    10: { emoji: '🎋', name: 'Bamboo' },
    25: { emoji: '🌴', name: 'Small Tree' },
    50: { emoji: '🌳', name: 'Mighty Tree' },
};

export const POINTS_PER_COMPLETION = 10;

export const STORE_ITEMS: StoreItem[] = [
    { id: 'pot_starter', name: 'Starter Base', cost: 0, type: StoreItemType.Pot, emoji: '🟫' },
    { id: 'pot_basket', name: 'Woven Basket', cost: 100, type: StoreItemType.Pot, emoji: '🧺' },
    { id: 'pot_vase', name: 'Crystal Vase', cost: 250, type: StoreItemType.Pot, emoji: '⚱️' },
    { id: 'pot_trophy', name: 'Golden Trophy', cost: 500, type: StoreItemType.Pot, emoji: '🏆' },
];

export const HABIT_CATEGORIES: HabitCategory[] = [
  HabitCategory.Study,
  HabitCategory.Fitness,
  HabitCategory.Health,
  HabitCategory.Creative,
  HabitCategory.Personal,
  HabitCategory.Work,
];

export const CATEGORY_COLORS: { [key in HabitCategory]: string } = {
  [HabitCategory.Study]: 'bg-blue-500',
  [HabitCategory.Fitness]: 'bg-red-500',
  [HabitCategory.Health]: 'bg-green-500',
  [HabitCategory.Creative]: 'bg-purple-500',
  [HabitCategory.Personal]: 'bg-yellow-500',
  [HabitCategory.Work]: 'bg-indigo-500',
};

export const BADGES: Badge[] = [
    { id: 'b1', name: '3-Day Streak', description: 'Complete any habit for 3 days in a row.', icon: <StarIcon className="w-8 h-8 text-yellow-300" />, minStreak: 3 },
    { id: 'b2', name: '7-Day Fire', description: 'Complete any habit for 7 days in a row.', icon: <FireIcon className="w-8 h-8 text-orange-400" />, minStreak: 7 },
    { id: 'b3', name: '14-Day Consistency', description: 'Complete any habit for 14 days in a row.', icon: <ShieldCheckIcon className="w-8 h-8 text-teal-400" />, minStreak: 14 },
    { id: 'b4', name: '30-Day Master', description: 'Complete any habit for 30 days in a row.', icon: <AcademicCapIcon className="w-8 h-8 text-indigo-400" />, minStreak: 30 },
    { id: 'b5', name: 'Legendary 60-Day', description: 'Complete any habit for 60 days in a row.', icon: <SparklesIcon className="w-8 h-8 text-fuchsia-400" />, minStreak: 60 },
];
