import './App.css';
import Calendar from './components/Calendar/Calender';
import Toolbar from './components/Toolbar/Toolbar';
import { THEME } from './constants/themes';
import { ThemeContext } from './contexts';

function App() {
  return (
    <ThemeContext.Provider value={THEME.LIGHT}>
      <Toolbar />
      <Calendar />
    </ThemeContext.Provider>
  );
}

export default App;
