export enum Screen {
  Dashboard = 'DASHBOARD',
  AddHabit = 'ADD_HABIT',
  Progress = 'PROGRESS',
  AICoach = 'AI_COACH',
  Store = 'STORE',
}

export enum HabitCategory {
  Study = 'Study',
  Fitness = 'Fitness',
  Health = 'Health',
  Creative = 'Creative',
  Personal = 'Personal',
  Work = 'Work',
}

export enum GoalType {
  Checkbox = 'Checkbox',
  Quantity = 'Quantity',
}

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  streak: number;
  lastCompleted: string | null; // ISO date string
  goalType: GoalType;
  goalValue?: number;
  goalUnit?: string;
  progress?: number;
  reminderTime?: string | null;
  lastProgressEntryDate?: string | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  minStreak: number;
}

export interface PlantStageInfo {
  emoji: string;
  name: string;
}

export enum StoreItemType {
  Pot = 'Pot',
}

export interface StoreItem {
  id: string;
  name: string;
  cost: number;
  type: StoreItemType;
  emoji: string;
}