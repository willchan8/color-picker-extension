import ColorPicker from './components/ColorPicker';
import ThemeContextProvider from './contexts/themeContext';

const App = () => (
  <ThemeContextProvider>
    <ColorPicker />
  </ThemeContextProvider>
);
export default App;
