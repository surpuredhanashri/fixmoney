'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'sunset';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isSystem: boolean;
  setIsSystem: (isSystem: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeConfigs = {
  light: {
    name: 'Light',
    icon: '☀️',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      border: '#e2e8f0'
    }
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      accent: '#fbbf24',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      border: '#334155'
    }
  },
  blue: {
    name: 'Ocean',
    icon: '🌊',
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      border: '#7dd3fc'
    }
  },
  green: {
    name: 'Forest',
    icon: '🌲',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#059669',
      background: '#f0fdf4',
      surface: '#dcfce7',
      text: '#064e3b',
      border: '#6ee7b7'
    }
  },
  purple: {
    name: 'Royal',
    icon: '👑',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#7c3aed',
      background: '#faf5ff',
      surface: '#f3e8ff',
      text: '#581c87',
      border: '#c4b5fd'
    }
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#ea580c',
      background: '#fff7ed',
      surface: '#fed7aa',
      text: '#7c2d12',
      border: '#fdba74'
    }
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSystem, setIsSystem] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount - safely handle SSR
  useEffect(() => {
    setMounted(true);
    
    try {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme') as Theme;
      const savedSystem = localStorage.getItem('isSystem');
      
      if (savedSystem === 'false' && savedTheme && themeConfigs[savedTheme]) {
        setThemeState(savedTheme);
        setIsSystem(false);
      } else {
        // Check system preference
        if (typeof window !== 'undefined' && window.matchMedia) {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          setThemeState(systemTheme);
          setIsSystem(true);
        }
      }
    } catch (error) {
      console.warn('Theme initialization failed:', error);
      // Fallback to light theme
      setThemeState('light');
      setIsSystem(false);
    }
  }, []);

  // Apply theme to document - safely handle SSR
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    try {
      const root = document.documentElement;
      const config = themeConfigs[theme];

      if (!config) return;

      // Remove all existing theme classes
      root.classList.remove('theme-light', 'theme-dark', 'theme-blue', 'theme-green', 'theme-purple', 'theme-sunset');
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-blue', 'theme-green', 'theme-purple', 'theme-sunset');
      
      // Remove dark mode class
      root.classList.remove('dark');
      
      // Apply new theme class
      root.classList.add(`theme-${theme}`);
      document.body.classList.add(`theme-${theme}`);
      
      // Apply dark mode class for dark theme
      if (theme === 'dark') {
        root.classList.add('dark');
      }

      // Apply CSS custom properties
      Object.entries(config.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });

      // Apply theme class to html element
      root.setAttribute('data-theme', theme);
      
      // Apply theme class to body for better compatibility
      document.body.setAttribute('data-theme', theme);
      
      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', config.colors.primary);
      }

      // Smooth transition
      root.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    } catch (error) {
      console.warn('Theme application failed:', error);
    }
  }, [theme, mounted]);

  // Listen for system theme changes - safely handle SSR
  useEffect(() => {
    if (!isSystem || typeof window === 'undefined') return;

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setThemeState(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.warn('System theme listener failed:', error);
    }
  }, [isSystem]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (!themeConfigs[newTheme]) return;
    
    setThemeState(newTheme);
    setIsSystem(false);
    
    try {
      localStorage.setItem('theme', newTheme);
      localStorage.setItem('isSystem', 'false');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'blue', 'green', 'purple', 'sunset'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    isSystem,
    setIsSystem: (system: boolean) => {
      setIsSystem(system);
      
      try {
        localStorage.setItem('isSystem', system.toString());
        if (system) {
          if (typeof window !== 'undefined' && window.matchMedia) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setThemeState(systemTheme);
          }
          localStorage.removeItem('theme');
        }
      } catch (error) {
        console.warn('Failed to save system preference:', error);
      }
    }
  }), [theme, setTheme, toggleTheme, isSystem]);

  // During SSR or before mount, render children without theme context
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`min-h-screen theme-${theme} ${theme === 'dark' ? 'dark' : ''}`}
          data-theme={theme}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Export theme configs for use in other components
export { themeConfigs }; 