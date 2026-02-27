import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Builder from './components/Builder';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'builder'
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      {view === 'home' && <Home onStart={() => setView('builder')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'builder' && <Builder onBackHome={() => setView('home')} theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
}

export default App;
