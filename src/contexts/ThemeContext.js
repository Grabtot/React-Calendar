import { createContext, useContext, useState } from 'react';
import { THEME } from '../constants/themes';

export const ThemeContext = createContext();

export function ThemeProvider({ children, value }) {
  const [theme, setTheme] = useState(value);

  const toggleTheme = () => {
    setTheme((theme) => (theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
