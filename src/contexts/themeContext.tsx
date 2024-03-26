import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const [theme, setTheme] = useState<ThemeType>(prefersDark ? 'dark' : 'light');

  useLayoutEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
