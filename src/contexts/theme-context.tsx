'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getItem ,setItem} from '@/utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'eduadmin-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Single effect — runs once on mount to sync state from whatever
  // the no-flash inline script already applied to <html>.
  useEffect(() => {
    const saved = getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme =
      saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light';

    setTheme(initial);
    // Apply class immediately in case the inline script missed it
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setMounted(true);
  }, []);

  // Toggle: directly manipulate the DOM class and persist — no effect needed
  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        setItem(STORAGE_KEY, next);
      } catch (_) {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
