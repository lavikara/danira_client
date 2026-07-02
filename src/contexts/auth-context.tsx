// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getItem } from '@/utils/storage';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
  enabled?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, enabled = true }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    const token = getItem('authToken');

    if (token) {
      setIsAuthenticated(true);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [enabled]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
