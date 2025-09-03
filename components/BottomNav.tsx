
import React from 'react';
import { Screen } from '../types';
import { HomeIcon, PlusCircleIcon, ChartBarIcon, SparklesIcon, ShoppingBagIcon } from './icons/Icons';

interface BottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  screen: Screen;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  icon: JSX.Element;
  label: string;
}> = ({ screen, currentScreen, setCurrentScreen, icon, label }) => {
  const isActive = currentScreen === screen;
  const color = isActive ? 'text-teal-400' : 'text-gray-400';

  return (
    <button
      onClick={() => setCurrentScreen(screen)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${color} hover:text-teal-300`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setCurrentScreen }) => {
  const iconClass = "w-6 h-6 mb-1";
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-800 border-t border-gray-700 shadow-lg max-w-lg mx-auto rounded-t-2xl">
      <div className="flex justify-around h-full">
        <NavItem
          screen={Screen.Dashboard}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          icon={<HomeIcon className={iconClass} />}
          label="Home"
        />
        <NavItem
          screen={Screen.Progress}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          icon={<ChartBarIcon className={iconClass} />}
          label="Progress"
        />
         <button onClick={() => setCurrentScreen(Screen.AddHabit)} className="relative bottom-4 bg-teal-500 rounded-full p-4 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-transform transform hover:scale-110">
          <PlusCircleIcon className="w-8 h-8" />
        </button>
        <NavItem
          screen={Screen.Store}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          icon={<ShoppingBagIcon className={iconClass} />}
          label="Store"
        />
        <NavItem
          screen={Screen.AICoach}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          icon={<SparklesIcon className={iconClass} />}
          label="AI Coach"
        />
      </div>
    </div>
  );
};

export default BottomNav;
