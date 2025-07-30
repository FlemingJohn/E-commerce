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
      <div className="flex items-center bg-card/60 backdrop-blur-sm neon-border-blue border rounded-lg p-1 transition-all duration-300">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 font-retro
              focus:outline-none neon-glow-blue
              ${theme === value 
                ? 'btn-arcade text-white neon-glow-pink' 
                : 'text-muted-foreground hover:text-neon-blue hover:bg-card/40 border border-transparent hover:border-neon-blue/50'
              }
            `}
            aria-label={label}
            aria-pressed={theme === value}
            title={label}
          >
            <Icon className="w-5 h-5" />
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