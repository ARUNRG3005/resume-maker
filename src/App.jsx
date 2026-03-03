import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Builder from './components/Builder';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';

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
    // When done authenticating, go straight into the tool
    setView('builder');
  };

  return (
    <>
      {view === 'home' && <Home onStart={() => setView('builder')} onLogin={() => setView('login')} onSignup={() => setView('signup')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'builder' && <Builder onBackHome={() => setView('home')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'login' && <Auth initialMode="login" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'signup' && <Auth initialMode="signup" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
}

export default App;
