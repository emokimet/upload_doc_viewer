import React from 'react';
import { Check } from 'lucide-react';

interface MenuItemProps {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  checked?: boolean;
  disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  label, 
  shortcut, 
  onClick, 
  checked = false,
  disabled = false 
}) => {
  return (
    <button
      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-4
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : 'text-gray-700 hover:bg-gray-100'
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        {checked && <Check className="w-4 h-4" />}
        <span>{label}</span>
      </div>
      {shortcut && (
        <span className="text-gray-500 text-xs">{shortcut}</span>
      )}
    </button>
  );
};