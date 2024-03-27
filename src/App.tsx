import ColorPicker from './components/ColorPicker';
import ThemeToggler from './components/ThemeToggler';
import ThemeContextProvider from './contexts/themeContext';
import { Toaster } from '@/components/ui/toaster';

const App = () => (
  <ThemeContextProvider>
    <ColorPicker />
    <ThemeToggler />
    <Toaster />
    <p className="text-xs">Made with 🩶 by William Chan</p>
  </ThemeContextProvider>
);
export default App;
