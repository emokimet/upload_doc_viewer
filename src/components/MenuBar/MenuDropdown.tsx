import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MenuDropdownProps {
  label: string;
  children: React.ReactNode;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={`px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none flex items-center gap-1
          ${isOpen ? 'bg-gray-100' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-sm min-w-[200px] py-1 z-50">
          {children}
        </div>
      )}
    </div>
  );
};