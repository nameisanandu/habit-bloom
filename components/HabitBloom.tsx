
import React from 'react';
import { PLANT_STAGES, STORE_ITEMS } from '../constants';

interface HabitBloomProps {
  totalStreak: number;
  equippedPotId: string;
}

const PlantVisual: React.FC<{
  plantEmoji: string;
  potEmoji: string;
  showPot: boolean;
}> = ({ plantEmoji, potEmoji, showPot }) => (
    <div className="relative w-48 h-48 flex items-center justify-center">
        {showPot && <div className="text-8xl">{potEmoji}</div>}
        <div className={`absolute text-7xl transition-transform duration-500 ${showPot ? 'pb-8' : ''}`}>
            {plantEmoji}
        </div>
    </div>
);

const HabitBloom: React.FC<HabitBloomProps> = ({ totalStreak, equippedPotId }) => {
  
  const getPlantStageInfo = () => {
    let stageKey = 0;
    for (const threshold of Object.keys(PLANT_STAGES).map(Number).sort((a,b) => b-a)) {
        if (totalStreak >= threshold) {
            stageKey = threshold;
            break;
        }
    }
    return PLANT_STAGES[stageKey];
  };

  const getNextLevel = () => {
    if (totalStreak < 5) return 5;
    if (totalStreak < 10) return 10;
    if (totalStreak < 25) return 25;
    if (totalStreak < 50) return 50;
    return 100;
  };

  const progress = (totalStreak / getNextLevel()) * 100;
  const plantStage = getPlantStageInfo();
  
  const equippedPot = STORE_ITEMS.find(item => item.id === equippedPotId) || STORE_ITEMS[0];
  
  // Don't show a pot if the plant has grown into a tree
  const showPot = totalStreak < 25;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div 
            className="absolute inset-0 rounded-full border-4 border-gray-700"
            style={{
                background: `conic-gradient(from 0deg, #2dd4bf ${progress}%, #374151 ${progress}%)`
            }}
        ></div>
        <div className="relative w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center">
           <PlantVisual plantEmoji={plantStage.emoji} potEmoji={equippedPot.emoji} showPot={showPot} />
        </div>
      </div>
      <p className="text-sm text-gray-400">Total Streak: <span className="font-bold text-teal-300">{totalStreak}</span></p>
      <p className="text-xs text-gray-500">Next evolution at {getNextLevel()} streak points!</p>
    </div>
  );
};

export default HabitBloom;
