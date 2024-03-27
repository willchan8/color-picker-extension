import Sun from '@/assets/Sun.svg?react';
import Moon from '@/assets/Moon.svg?react';
import '@/styles/themeToggler.css';
import { useThemeContext, ThemeContextType } from '@/contexts/themeContext';

const ThemeToggler = () => {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <div className="flex place-content-center my-4">
      <input
        className="theme-toggler-input"
        type="checkbox"
        id="theme-toggler"
        onChange={handleChange}
        checked={theme === 'dark'}
      />
      <label className="theme-toggler-label" htmlFor="theme-toggler">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default ThemeToggler;
