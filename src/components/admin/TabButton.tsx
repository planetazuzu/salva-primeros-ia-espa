
import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      className={`py-2 px-4 font-medium whitespace-nowrap ${
        active
          ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
          : 'text-gray-500 hover:text-auxilio-azul'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
