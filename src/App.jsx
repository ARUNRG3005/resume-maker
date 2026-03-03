import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Builder from './components/Builder';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'builder' or 'login' or 'signup'
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handler for successful auth flow
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    // When done authenticating, go straight into the tool
    setView('builder');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {view === 'home' && <Home user={user} onLogout={handleLogout} onStart={() => setView('builder')} onLogin={() => setView('login')} onSignup={() => setView('signup')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'builder' && <Builder onBackHome={() => setView('home')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'login' && <Auth initialMode="login" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'signup' && <Auth initialMode="signup" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
    </>
  );
}

export default App;
