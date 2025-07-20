import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Resolve theme based on current setting
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Apply theme to document
  const applyTheme = (resolvedTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(resolvedTheme);
    
    // Update color-scheme for better browser integration
    root.style.colorScheme = resolvedTheme;
  };

  // Set theme with persistence
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme-preference', newTheme);
    
    const resolved = resolveTheme(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  };

  // Toggle between light and dark (skipping system)
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    // Get stored preference or default to system
    const storedTheme = localStorage.getItem('theme-preference') as Theme | null;
    const initialTheme = storedTheme || 'system';
    
    const resolved = resolveTheme(initialTheme);
    
    setThemeState(initialTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newResolved = getSystemTheme();
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};