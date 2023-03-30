import './App.css';
import Calendar from './components/Calendar/Calender';
import Toolbar from './components/Toolbar/Toolbar';
import { THEME } from './constants/themes';
import { ThemeContext } from './contexts/DateContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider value={THEME.DARK}>
      <Toolbar />
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
