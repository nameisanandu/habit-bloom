import React, { useState } from 'react';
import { Screen } from './types';
import { HabitProvider } from './hooks/useHabits';
import BottomNav from './components/BottomNav';
import DashboardScreen from './components/screens/DashboardScreen';
import AddHabitScreen from './components/screens/AddHabitScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import AICoachScreen from './components/screens/AICoachScreen';
import StoreScreen from './components/screens/StoreScreen';
import ReminderService from './components/ReminderService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Dashboard);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Dashboard:
        return <DashboardScreen />;
      case Screen.AddHabit:
        return <AddHabitScreen onHabitAdded={() => setCurrentScreen(Screen.Dashboard)} />;
      case Screen.Progress:
        return <ProgressScreen />;
      case Screen.AICoach:
        return <AICoachScreen />;
      case Screen.Store:
        return <StoreScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <HabitProvider>
      <ReminderService />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
        <div className="flex-grow container mx-auto p-4 pb-24 max-w-lg">
          {renderScreen()}
        </div>
        <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    </HabitProvider>
  );
};

export default App;