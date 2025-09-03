
import React from 'react';
import { useHabits } from '../../hooks/useHabits';
import { STORE_ITEMS } from '../../constants';
import { StoreItem } from '../../types';
import { CheckIcon, SparklesIcon } from '../icons/Icons';

const StoreScreen: React.FC = () => {
    const { userData, purchaseItem, equipPot } = useHabits();
    const { points, unlockedItems, equippedPot } = userData;

    const renderItemButton = (item: StoreItem) => {
        const isUnlocked = unlockedItems.includes(item.id);
        const isEquipped = equippedPot === item.id;
        const canAfford = points >= item.cost;

        if (isEquipped) {
            return (
                <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg cursor-default" disabled>
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Equipped
                </button>
            );
        }
        if (isUnlocked) {
            return (
                <button 
                    onClick={() => equipPot(item.id)}
                    className="w-full px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                >
                    Equip
                </button>
            );
        }
        if (canAfford) {
            return (
                <button
                    onClick={() => purchaseItem(item)}
                    className="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
                >
                    Buy
                </button>
            );
        }
        return (
            <button className="w-full px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-700 rounded-lg cursor-not-allowed" disabled>
                Buy
            </button>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-teal-300">Store</h1>
                <p className="text-gray-400">Customize your plant!</p>
            </div>
            
            <div className="flex items-center justify-center p-3 space-x-2 bg-gray-800 rounded-xl">
                <SparklesIcon className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-bold text-white">{points}</span>
                <span className="text-gray-400">Points</span>
            </div>

            <div className="space-y-4">
                 <h2 className="text-xl font-semibold">Pots</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {STORE_ITEMS.map(item => (
                        <div key={item.id} className="flex flex-col items-center p-4 space-y-3 bg-gray-800 rounded-xl">
                           <div className="text-6xl">{item.emoji}</div>
                           <div className="text-center">
                             <p className="font-semibold text-white">{item.name}</p>
                             <p className="text-sm text-yellow-400">{item.cost} points</p>
                           </div>
                           {renderItemButton(item)}
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default StoreScreen;
