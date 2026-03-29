import React, { useState } from 'react';
import { ArrowRight, User, LogIn, Github, Lock, Mail, Users, Star, FileText, UserPlus } from 'lucide-react';
import BorderGlow from './BorderGlow';
import ThemeToggle from './ThemeToggle';

export default function Auth({ initialMode = 'login', onBackHome, onAuthSuccess, theme, toggleTheme }) {
    const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate authentication returning a mock user profile
        let userData;
        if (mode === 'login') {
            console.log("Logging in with", email, password);
            // Since we only have an email in login form, derive a display name from it
            userData = { name: email.split('@')[0], email };
        } else {
            console.log("Signing up with", name, email, password);
            userData = { name, email };
        }

        // Redirect to builder/home after successful auth with our simulated user dataload
        onAuthSuccess(userData);
    };

    const toggleMode = () => {
        setMode(prev => prev === 'login' ? 'signup' : 'login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex-wrap',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
                onClick={onBackHome}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    zIndex: 10
                }}
            >
                <ArrowRight size={20} /> Back to Home
            </button>

            <BorderGlow className="glass-panel animate-fade-in" style={{
                position: 'relative',
                width: '200%',
                maxWidth: '500px',
                padding: '2.5rem',
                borderRadius: '24px',
                zIndex: 10,
                border: '1px solid rgba(0, 240, 255, 0.2)',
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.5), var(--neon-glow)',
                margin: 'auto'
            }} borderRadius={24} glowColor="186 100% 50%">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '12px', width: '100%' }}>
                        <button
                            onClick={() => setMode('login')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: mode === 'login' ? 'var(--primary)' : 'transparent',
                                color: mode === 'login' ? '#000' : 'var(--text-secondary)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: mode === 'signup' ? 'var(--primary)' : 'transparent',
                                color: mode === 'signup' ? '#000' : 'var(--text-secondary)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div style={{ transition: 'all 0.3s ease' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                        {mode === 'login' ? 'Sign in to continue to your resumes.' : 'Join us to build your perfect resume.'}
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                        {mode === 'signup' && (
                            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', zIndex: 10 }} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-input"
                                        style={{ width: '100%', padding: '1.1rem 1rem 1.1rem 3rem' }}
                                        placeholder="John Doe"
                                        required={mode === 'signup'}
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', zIndex: 10 }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    style={{ width: '100%', padding: '1.1rem 1rem 1.1rem 3rem' }}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', zIndex: 10 }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    style={{ width: '100%', padding: '1.1rem 1rem 1.1rem 3rem' }}
                                    placeholder="••••••••"
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
                                <a href="#" style={{ fontSize: '0.85rem', color: '#00f0ff', textDecoration: 'none' }}>Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem', marginTop: '0.5rem', fontSize: '1rem', width: '100%' }}>
                            {mode === 'login' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </BorderGlow>
        </div>
    );
}
