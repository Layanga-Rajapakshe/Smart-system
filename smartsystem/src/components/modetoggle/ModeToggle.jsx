import React from 'react';
import { LuSunMedium, LuMoon } from 'react-icons/lu';
import { Switch } from "@heroui/react";
import { useTheme } from './ThemeContext'; // Import the custom hook

const ModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <Switch
        isSelected={isDarkMode}
        onChange={toggleTheme}
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <LuSunMedium className={className} />
          ) : (
            <LuMoon className={className} />
          )
        }
      />
    </div>
  );
};

export default ModeToggle;
