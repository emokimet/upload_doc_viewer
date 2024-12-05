import React from 'react';
import { MenuDropdown } from './MenuDropdown';
import { MenuItem } from './MenuItem';
import { MenuSeparator } from './MenuSeparator'

export const MenuBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 flex items-center">
      <MenuDropdown label="File">
        <MenuItem label="New" shortcut="Ctrl+N" />
        <MenuItem label="Open..." shortcut="Ctrl+O" />
        <MenuItem label="Save" shortcut="Ctrl+S" disabled />
        <MenuSeparator />
        <MenuItem label="Export" />
        <MenuSeparator />
        <MenuItem label="Exit" />
      </MenuDropdown>

      <MenuDropdown label="Edit">
        <MenuItem label="Undo" shortcut="Ctrl+Z" disabled />
        <MenuItem label="Redo" shortcut="Ctrl+Y" disabled />
        <MenuSeparator />
        <MenuItem label="Cut" shortcut="Ctrl+X" />
        <MenuItem label="Copy" shortcut="Ctrl+C" />
        <MenuItem label="Paste" shortcut="Ctrl+V" />
      </MenuDropdown>

      <MenuDropdown label="View">
        <MenuItem label="Zoom In" shortcut="Ctrl++" />
        <MenuItem label="Zoom Out" shortcut="Ctrl+-" />
        <MenuItem label="Reset Zoom" shortcut="Ctrl+0" />
        <MenuSeparator />
        <MenuItem label="Full Screen" shortcut="F11" />
        <MenuSeparator />
        <MenuItem label="Show Toolbar" checked />
        <MenuItem label="Show Status Bar" checked />
      </MenuDropdown>

      <MenuDropdown label="Help">
        <MenuItem label="Documentation" />
        <MenuItem label="Keyboard Shortcuts" />
        <MenuSeparator />
        <MenuItem label="Check for Updates" />
        <MenuItem label="About" />
      </MenuDropdown>
    </div>
  );
};