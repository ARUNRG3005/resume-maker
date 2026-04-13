import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Builder from './components/Builder';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import SharedResume from './components/SharedResume';
import InstallPWA from './components/InstallPWA';

function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/share/')) {
      return 'shared_resume';
    }
    return 'home';
  });
  const [sharedId] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/share/')) {
      return window.location.pathname.split('/')[2];
    }
    return null;
  });
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [builderData, setBuilderData] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleStartBuilder = (resumeObj) => {
    if (resumeObj && !resumeObj.id) {
       const newDoc = {
           id: crypto.randomUUID(),
           name: 'My Custom Resume',
           lastModified: Date.now(),
           data: resumeObj
       };
       setBuilderData(newDoc);
    } else {
       setBuilderData(resumeObj);
    }
    setView('builder');
  };

  return (
    <ErrorBoundary>
      <InstallPWA />
      {view === 'shared_resume' && <SharedResume id={sharedId} onBackHome={() => setView('home')} />}
      {view === 'home' && <Home user={user} onLogout={handleLogout} onStart={handleStartBuilder} onLogin={() => setView('login')} onSignup={() => setView('signup')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} onStartBuilder={handleStartBuilder} onBackHome={() => setView('home')} />}
      {view === 'builder' && <Builder initialDoc={builderData} user={user} onBackHome={() => setView('home')} onBackDashboard={() => setView('dashboard')} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'login' && <Auth initialMode="login" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'signup' && <Auth initialMode="signup" onBackHome={() => setView('home')} onAuthSuccess={handleAuthSuccess} theme={theme} toggleTheme={toggleTheme} />}
    </ErrorBoundary>
  );
}

export default App;
