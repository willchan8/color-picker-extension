import ColorPicker from './components/ColorPicker';
import ThemeToggler from './components/ThemeToggler';
import ThemeContextProvider from './contexts/themeContext';
import { Toaster } from '@/components/ui/toaster';

const App = () => (
  <ThemeContextProvider>
    <ColorPicker />
    <ThemeToggler />
    <Toaster />
  </ThemeContextProvider>
);
export default App;
