
import React from 'react';
import { Badge } from '../types';

interface BadgeItemProps {
  badge: Badge;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge }) => {
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-xl space-x-4">
      <div className="flex-shrink-0 bg-gray-700 p-3 rounded-full">
        {badge.icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{badge.name}</h3>
        <p className="text-sm text-gray-400">{badge.description}</p>
      </div>
    </div>
  );
};

export default BadgeItem;
