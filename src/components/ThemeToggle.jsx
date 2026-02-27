import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme, inline }) {
    const isLight = theme === 'light';

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: inline ? 'relative' : 'fixed',
                top: inline ? 'auto' : '1.5rem',
                right: inline ? 'auto' : '1.5rem',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.6rem',
                borderRadius: '50%',
                background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                boxShadow: isLight ? 'none' : '0 0 10px rgba(0,240,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
