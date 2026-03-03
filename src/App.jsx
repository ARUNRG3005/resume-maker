import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Builder from './components/Builder';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'builder' or 'login' or 'signup'
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handler for successful auth flow
  const handleAuthSuccess = () => {
    setView('home'); // Takes them back home, from where they can start building perfectly
  }

  return (
    <>
      {view === 'home' && <Home onStart={() => setView('builder')} onLogin={() => setView('login')} onSignup={() => setView('signup')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'builder' && <Builder onBackHome={() => setView('home')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'login' && <Login onBackHome={() => setView('home')} onSignup={() => setView('signup')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'signup' && <Signup onBackHome={() => setView('home')} onLogin={() => setView('login')} theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
}

export default App;
