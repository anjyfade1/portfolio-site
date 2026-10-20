"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface NavVisibilityContextProps {
  hidden: boolean;
  setHidden: (value: boolean) => void;
}

const NavVisibilityContext = createContext<NavVisibilityContextProps | undefined>(undefined);

export function NavVisibilityProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <NavVisibilityContext.Provider value={{ hidden, setHidden }}>
      {children}
    </NavVisibilityContext.Provider>
  );
}

export function useNavVisibility() {
  const ctx = useContext(NavVisibilityContext);
  if (!ctx) {
    throw new Error('useNavVisibility must be used within NavVisibilityProvider');
  }
  return ctx;
}
