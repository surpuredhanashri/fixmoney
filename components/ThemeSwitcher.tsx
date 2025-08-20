'use client';

import { useTheme, themeConfigs } from './ThemeProvider';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not on client side, show placeholder
  if (!isClient) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
      </div>
    );
  }

  // Move useTheme hook call here to maintain consistent hook order
  const { theme, setTheme, toggleTheme, isSystem, setIsSystem } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{themeConfigs[theme]?.icon || '☀️'}</span>
        
        {/* Theme name tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {themeConfigs[theme]?.name || 'Light'}
        </div>
      </button>

      {/* Theme dropdown */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-2">
            Themes
          </div>
          
          {Object.entries(themeConfigs).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setTheme(key as keyof typeof themeConfigs)}
              className={`w-full flex items-center space-x-2 px-2 py-2 text-sm rounded-md transition-colors duration-200 ${
                theme === key
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{config.icon}</span>
              <span>{config.name}</span>
            </button>
          ))}
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          
          <button
            onClick={() => setIsSystem(!isSystem)}
            className={`w-full flex items-center space-x-2 px-2 py-2 text-sm rounded-md transition-colors duration-200 ${
              isSystem
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>🖥️</span>
            <span>System</span>
          </button>
        </div>
      </div>
    </div>
  );
} 