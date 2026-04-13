import React, { useState } from 'react';

import amLogo from '../assets/am_logo.jpg';
import { Sparkles, FileText, ArrowRight, Zap, Palette, CheckCircle, Cpu, PenTool, LayoutTemplate, Download } from 'lucide-react';
import BorderGlow from './BorderGlow';
import ThemeToggle from './ThemeToggle';
import StartModal from './StartModal';

import TemplateModernAccent from './templates/TemplateModernAccent';
import TemplateGrid from './templates/TemplateGrid';
import TemplateCorporate from './templates/TemplateCorporate';
import TemplateElegant from './templates/TemplateElegant';
import ColorBends from './ColorBends';
import Stack from './Stack';
import CardSwap, { Card } from './CardSwap';

const sampleResumeData = {
    personal: {
        firstName: 'Alex',
        lastName: 'Carter',
        jobTitle: 'Senior Product Designer',
        email: 'hello@alexcarter.design',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        summary: 'Award-winning Product Designer with 8+ years of experience leading cross-functional teams to deliver accessible, user-centric, and highly converting enterprise software interfaces.',
        photo: ''
    },
    education: [
        { id: '1', school: 'Rhode Island School of Design', degree: 'BFA Industrial Design', startDate: '2012', endDate: '2016', location: 'Providence, RI' }
    ],
    experience: [
        { id: '1', company: 'Google', title: 'Lead UX Designer', startDate: '2020', endDate: 'Present', location: 'Mountain View, CA', description: '• Spearheaded the redesign of Google Cloud Console, increasing daily active user retention by 24%.\n• Managed a team of 5 designers and conducted weekly design critiques.' },
        { id: '2', company: 'Stripe', title: 'Product Designer', startDate: '2017', endDate: '2020', location: 'San Francisco, CA', description: '• Designed and launched Stripe Checkout v3.\n• Improved checkout conversion rate by 15% across mobile platforms.' }
    ],
    skills: [
        'UI/UX Design', 'Figma', 'Prototyping', 'Design Systems', 'React', 'User Research'
    ],
    projects: [
        { id: '1', name: 'Neon UI Kit', description: 'Open-source React component library with 10k+ stars on GitHub.', link: 'github.com/alex/neon' }
    ],
    certifications: [
        { id: '1', name: 'Google UX Design Certificate', issuer: 'Coursera', date: '2019' }
    ]
};

export default function Home({ user, onLogout, onStart, onLogin, onSignup, theme, toggleTheme }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            <ColorBends
              colors={["#00f0ff", "#ff00ea", "#10b981"]}
              rotation={0}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              parallax={0.5}
              noise={0.1}
              transparent={true}
              autoRotate={0}
              style={{ zIndex: 0 }}
            />
            {/* Header Nav */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem 2rem',
                alignItems: 'center',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--neon-glow)' }}>
                        <FileText size={20} />
                    </div>
                    <span>AI Resume Maker</span>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} inline={true} />

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                Hi, {user.name} 👋
                            </span>
                            <button
                                onClick={onLogout}
                                className="btn"
                                style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                                onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={onLogin}
                                className="btn"
                                style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease' }}
                                onMouseOver={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onMouseOut={(e) => e.target.style.borderColor = 'var(--border)'}
                            >
                                Login
                            </button>
                            <button
                                onClick={onSignup}
                                className="btn btn-primary"
                                style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: 500, border: 'none', cursor: 'pointer' }}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                zIndex: 1
            }}>

                <div className="home-hero-grid" style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    zIndex: 1
                }}>

                    {/* Left Column: Copy & Actions */}
                    <div className="animate-fade-in home-hero-text">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 240, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: 'full', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                            <Sparkles size={16} />
                            AI-Powered Resume Builder
                        </div>

                        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                            Build a <br />
                            <span style={{
                                background: 'linear-gradient(to right, #00f0ff, #ff00ea)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 30px rgba(0, 240, 255, 0.3)'
                            }}>Job-Winning Resume</span><br />
                            with AI
                        </h1>

                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
                            Create ATS-optimized resumes in minutes. Stand out from the crowd with AI writing assistance and professional premium templates.
                        </p>

                        <div className="home-hero-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-primary"
                                style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', gap: '0.75rem', borderRadius: '50px' }}
                            >
                                Start Building <ArrowRight size={20} />
                            </button>
                            <a href="#how-it-works" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none' }}>
                                Watch Demo
                            </a>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', fontSize: '1.1rem' }}>
                                ★★★★★
                            </div>
                            <span>Trusted by <strong>10,000+</strong> job seekers</span>
                        </div>
                    </div>

                    {/* Right Column: Hero Graphic */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="animate-float-3d">
                        {/* The template video inside premium glass frame */}
                        <div style={{
                            padding: '10px',
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.5), rgba(255, 0, 234, 0.5))',
                            borderRadius: '24px',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.4), var(--neon-glow)'
                        }}>
                            <video
                                src="/floating_resume.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    maxWidth: '650px',
                                    height: 'auto',
                                    maxHeight: '75vh',
                                    borderRadius: '16px',
                                    objectFit: 'contain',
                                    backgroundColor: 'var(--background)',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Social Proof Section */}
            <section style={{
                padding: '3rem 2rem',
                borderTop: '1px solid var(--border)',
                background: 'var(--surface-glass)',
                zIndex: 1,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2rem' }}>
                        Trusted by job seekers from top companies
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', opacity: 0.5, filter: 'grayscale(100%) brightness(200%)', alignItems: 'center', fontFamily: 'monospace' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Google</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Amazon</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Microsoft</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Infosys</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>TCS</div>
                    </div>
                </div>
            </section>

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

                    <div style={{ position: 'relative', height: '550px', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                        <CardSwap
                            width={380}
                            height={420}
                            cardDistance={40}
                            verticalDistance={30}
                            delay={3500}
                            pauseOnHover={true}
                        >
                            <Card className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(10, 15, 30, 0.95)' }}>
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: 'var(--neon-glow)' }}>
                                    <PenTool size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>1. Add Your Data</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>Simply fill in your experience, or import directly from an existing PDF or LinkedIn profile. Our system handles the rest.</p>
                                <div style={{ borderBottom: '3px solid var(--primary)', width: '100%', position: 'absolute', bottom: 0, left: 0, borderRadius: '0 0 24px 24px' }}></div>
                            </Card>

                            <Card className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(10, 15, 30, 0.95)' }}>
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: 'var(--neon-glow)' }}>
                                    <Cpu size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>2. AI Optimization</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>Our Gemini engine rewrites summaries, fixes grammar, and automatically tailors your bullet points to match target job descriptions.</p>
                                <div style={{ borderBottom: '3px solid var(--secondary)', width: '100%', position: 'absolute', bottom: 0, left: 0, borderRadius: '0 0 24px 24px' }}></div>
                            </Card>

                            <Card className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(10, 15, 30, 0.95)' }}>
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: 'var(--neon-glow)' }}>
                                    <LayoutTemplate size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>3. Pick a Template</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>Choose from dozens of premium, ATS-compliant designs. See your changes in real-time as you switch between styles.</p>
                                <div style={{ borderBottom: '3px solid var(--primary)', width: '100%', position: 'absolute', bottom: 0, left: 0, borderRadius: '0 0 24px 24px' }}></div>
                            </Card>

                            <Card className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(10, 15, 30, 0.95)' }}>
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: 'var(--neon-glow)' }}>
                                    <Download size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>4. Export & Apply</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>Download your finalized resume as a pixel-perfect PDF. Generate an AI Interview Prep Kit and walk into your next interview.</p>
                                <div style={{ borderBottom: '3px solid var(--secondary)', width: '100%', position: 'absolute', bottom: 0, left: 0, borderRadius: '0 0 24px 24px' }}></div>
                            </Card>
                        </CardSwap>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: '6rem 2rem',
                zIndex: 1,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Why Choose Our AI Builder</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            We provide the most powerful suite of tools to help you land your dream job faster.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ color: 'var(--primary)' }}><Sparkles size={32} /></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>AI Resume Writing</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Generate powerful professional summaries and impactful experience bullet points instantly with Google Gemini 1.5.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ color: 'var(--success)' }}><CheckCircle size={32} /></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>ATS Optimized</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Pass strict recruiter tracking systems with semantic HTML templates designed to be perfectly parsed by ATS bots.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ color: 'var(--secondary)' }}><Palette size={32} /></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Modern Templates</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Choose from 13+ professional layouts ranging from ultra-minimalist to highly creative dynamic designs.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ color: 'var(--primary)' }}><FileText size={32} /></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>One Click PDF Export</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Download your finalized resume perfectly formatted as an A4 document ready to be sent to employers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Teaser Section */}
            <section style={{
                padding: '6rem 2rem',
                background: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid var(--border)',
                zIndex: 1,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Choose Your Template</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', marginBottom: '4rem' }}>
                        13+ Beautifully designed themes ranging from minimalist to highly creative.
                    </p>
                    
                    <div style={{ width: '100%', maxWidth: '400px', height: '550px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                        <Stack
                            randomRotation={true}
                            sensitivity={230}
                            sendToBackOnClick={true}
                            autoplay={true}
                            autoplayDelay={2500}
                            pauseOnHover={true}
                            animationConfig={{ stiffness: 100, damping: 18 }}
                            cards={[
                                { name: 'Modern Accent', component: <TemplateModernAccent data={sampleResumeData} /> },
                                { name: 'Masonry Grid', component: <TemplateGrid data={sampleResumeData} /> },
                                { name: 'Corporate Standard', component: <TemplateCorporate data={sampleResumeData} /> },
                                { name: 'Elegant Serif', component: <TemplateElegant data={sampleResumeData} /> }
                            ].map((tpl, i) => (
                                <div key={i} style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    position: 'relative', 
                                    background: 'var(--surface)', 
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: '816px',
                                        height: '1056px',
                                        transform: 'translate3d(-50%, -50%, 0) scale(0.44)',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transformOrigin: 'center center',
                                        pointerEvents: 'none',
                                        backgroundColor: 'white',
                                        boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden'
                                    }}>
                                        {tpl.component}
                                    </div>
                                    <div style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: 0, 
                                        right: 0, 
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
                                        padding: '1.5rem', 
                                        color: 'white', 
                                        fontWeight: 700, 
                                        fontSize: '1.2rem',
                                        zIndex: 10,
                                        textAlign: 'center'
                                    }}>
                                        {tpl.name}
                                    </div>
                                </div>
                            ))}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{
                padding: '6rem 2rem',
                zIndex: 1,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>Loved by Job Seekers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'left', position: 'relative' }}>
                            <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>"This AI resume builder helped me land interviews in a week. The summary generator is pure magic."</p>
                            <p style={{ fontWeight: 600, color: 'var(--primary)' }}>— Software Developer</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'left', position: 'relative' }}>
                            <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>"I struggled with formatting my resume for ATS. This tool solved it instantly and the designs are stunning."</p>
                            <p style={{ fontWeight: 600, color: 'var(--secondary)' }}>— Marketing Manager</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'left', position: 'relative' }}>
                            <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>"The process is so smooth. I imported my old PDF and the AI automatically filled out all the forms for me!"</p>
                            <p style={{ fontWeight: 600, color: 'var(--primary)' }}>— Product Designer</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border)',
                zIndex: 1,
                position: 'relative',
                background: 'linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.05))'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(255,0,234,0.1))', padding: '4rem 2rem', borderRadius: '24px', border: '1px solid var(--border-glass)', boxShadow: '0 20px 50px rgba(0,0,0,0.3), var(--neon-glow)' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>Ready to Build Your Resume?</h2>
                    <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
                        Join thousands of successful job seekers. Create a professional resume in minutes.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary"
                        style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,240,255,0.3)' }}
                    >
                        Start Building Now
                    </button>
                </div>
            </section>
            {/* Footer */}
            <footer style={{
                padding: '4rem 2rem 2rem 2rem',
                borderTop: '1px solid var(--border)',
                background: 'var(--background)',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <FileText size={20} />
                            </div>
                            <span>AI Resume Maker</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            Build ATS-optimized, beautifully designed resumes in minutes using the power of Google Gemini AI.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', padding: '2px', boxShadow: 'var(--shadow-md)' }}>
                                <img src={amLogo} alt="AM Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                            </div>
                            <span style={{ fontFamily: "cursive", fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 500 }}>
                                Success takes time
                            </span>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Product</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0 }}>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Resume Builder</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>ATS Templates</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>AI Summaries</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Pricing</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Resources</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0 }}>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Career Blog</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Interview Prep</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Resume Examples</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Help Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0 }}>
                            <li><a href="mailto:rgarun111@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Email: rgarun111@gmail.com</a></li>
                            <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Phone: +91 7604847895</span></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © 2025 AI RESUME MAKER - DEVELOPED BY ARUN. All rights reserved.
                    </p>
                </div>
            </footer>

            {showModal && (
                <StartModal 
                    onClose={() => setShowModal(false)}
                    onStartScratch={() => {
                        setShowModal(false);
                        onStart(null);
                    }}
                    onStartWithData={(data) => {
                        setShowModal(false);
                        onStart(data);
                    }}
                />
            )}
        </div>
    );
}
