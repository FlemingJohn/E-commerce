import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light mode' },
    { value: 'dark' as const, icon: Moon, label: 'Dark mode' },
    { value: 'system' as const, icon: Monitor, label: 'System preference' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-200">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
              ${theme === value 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }
            `}
            aria-label={label}
            aria-pressed={theme === value}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      
      {/* Screen reader only current theme indicator */}
      <span className="sr-only">
        Current theme: {theme === 'system' ? `System (${resolvedTheme})` : theme}
      </span>
    </div>
  );
};