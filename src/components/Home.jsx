import React from 'react';
import floatingResume from '../assets/floating_resume.png';
import amLogo from '../assets/am_logo.jpg';
import { Sparkles, FileText, ArrowRight, Zap, Palette, CheckCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Home({ onStart, theme, toggleTheme }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                zIndex: 1
            }}>            {/* Background Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: -1,
                    animation: 'pulseGlow 8s ease-in-out infinite alternate'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '35vw',
                    height: '35vw',
                    background: 'radial-gradient(circle, rgba(255, 0, 234, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: -1,
                    animation: 'pulseGlow 6s ease-in-out infinite alternate-reverse'
                }} />

                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    zIndex: 1
                }}>

                    {/* Left Column: Copy & Actions */}
                    <div className="animate-fade-in">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 240, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: 'full', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                            <Sparkles size={16} />
                            AI-Powered Resume Builder
                        </div>

                        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                            Build Your <br />
                            <span style={{
                                background: 'linear-gradient(to right, #00f0ff, #ff00ea)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 30px rgba(0, 240, 255, 0.3)'
                            }}>Perfect Resume</span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
                            Stand out from the crowd with ATS-friendly templates, AI-enhanced summaries, and intelligent skill suggestions. All in a stunning, easy-to-use interface.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                onClick={onStart}
                                className="btn btn-primary"
                                style={{ fontSize: '1.1rem', padding: '1rem 2rem', gap: '0.75rem' }}
                            >
                                Start Building <ArrowRight size={20} />
                            </button>
                            <a href="#how-it-works" style={{ color: 'var(--text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginLeft: '1rem' }}>
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Hero Graphic */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="animate-float">
                        {/* Decorative frame */}
                        <div style={{
                            position: 'absolute',
                            inset: '-20px',
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 234, 0.2))',
                            borderRadius: '24px',
                            filter: 'blur(20px)',
                            zIndex: -1
                        }}></div>

                        {/* The generated image */}
                        <img
                            src={floatingResume}
                            alt="Futuristic Floating Resume"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), var(--neon-glow)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                </div>
            </div>

            {/* How it Works Section */}
            <section id="how-it-works" style={{
                padding: '6rem 2rem',
                background: 'rgba(0,0,0,0.15)',
                borderTop: '1px solid var(--border)',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>How it Works</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Create a professional resume in minutes using our guided wizard and AI tools.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <FileText size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>1. Enter Your Details</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Follow our simple step-by-step wizard to quickly fill out your personal info, experience, and education.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: 'rgba(255, 0, 234, 0.1)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Zap size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>2. Enhance with AI</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Click the magic sparkle icons to automatically write professional summaries and bullet points using Gemini AI.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Palette size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>3. Pick a Theme & Download</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Preview your finalized data instantly across different ATS-friendly layouts, and download beautifully straight to PDF.</p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button
                            onClick={onStart}
                            className="btn btn-primary"
                            style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
                        >
                            Get Started Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '2rem 2rem',
                borderTop: '1px solid var(--border)',
                background: 'var(--background)',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end', textAlign: 'right' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>Contact</h3>
                        <a href="mailto:rgarun111@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.2s' }}>
                            rgarun111@gmail.com
                        </a>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                            +91 7604847895
                        </span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                            © 2025 AI RESUME MAKER - DEVOLPED BY ARUN. All rights reserved.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', padding: '4px', boxShadow: 'var(--shadow-md)' }}>
                            <img src={amLogo} alt="AM Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                        </div>
                        <span style={{ fontFamily: "cursive", fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 500, whiteSpace: 'nowrap' }}>
                            Success takes time
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
