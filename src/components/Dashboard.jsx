import React, { useState, useEffect } from 'react';
import { Plus, Copy, Trash2, Edit3, Settings, Save, Home, AlignLeft, Briefcase } from 'lucide-react';
import StartModal from './StartModal';
import BorderGlow from './BorderGlow';
import JobRecommendationsModal from './JobRecommendationsModal';

export default function Dashboard({ user, onLogout, onStartBuilder, onBackHome }) {
    const [resumes, setResumes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeJobResume, setActiveJobResume] = useState(null);

    useEffect(() => {
        const loadResumes = () => {
            const saved = localStorage.getItem('userResumes');
            if (saved) {
                try {
                    setResumes(JSON.parse(saved));
                } catch (e) {
                    // fall back to default
                }
            }
        };
        loadResumes();
    }, []);

    const saveToLocal = (newResumes) => {
        localStorage.setItem('userResumes', JSON.stringify(newResumes));
        setResumes(newResumes);
    };

    const handleDuplicate = (id) => {
        const resumeToCopy = resumes.find(r => r.id === id);
        if (resumeToCopy) {
            const newResume = { ...resumeToCopy, id: crypto.randomUUID(), name: `${resumeToCopy.name} (Copy)`, lastModified: Date.now() };
            saveToLocal([...resumes, newResume]);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            saveToLocal(resumes.filter(r => r.id !== id));
        }
    };

    const handleRename = (id) => {
        const resume = resumes.find(r => r.id === id);
        const newName = window.prompt("Enter new resume name:", resume.name);
        if (newName && newName.trim() !== '') {
            const updated = resumes.map(r => r.id === id ? { ...r, name: newName, lastModified: Date.now() } : r);
            saveToLocal(updated);
        }
    };

    const handleStartNew = (data) => {
        setShowModal(false);
        const newDoc = {
            id: crypto.randomUUID(),
            name: 'Untitled Resume',
            lastModified: Date.now(),
            data: data || {
                personal: { firstName: '', lastName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', photo: '' },
                education: [], experience: [], skills: [], projects: [], certifications: []
            }
        };
        const updated = [...resumes, newDoc];
        saveToLocal(updated);
        onStartBuilder(newDoc);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
            <nav style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.25rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--neon-glow)' }}>
                        <AlignLeft size={20} />
                    </div>
                    <span>My Dashboard</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={onBackHome} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: 'none' }}>
                        <Home size={18} /> Home
                    </button>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        {user.name}
                    </span>
                    <button onClick={onLogout} className="btn btn-outline">Log Out</button>
                </div>
            </nav>

            <div style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Your Resumes</h1>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>Manage, duplicate, and tailor versions for different roles.</p>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem', gap: '0.5rem' }}>
                        <Plus size={20} /> Create New
                    </button>
                </div>

                {resumes.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '16px' }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <AlignLeft size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>No Resumes Yet</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                            Start building your first job-winning resume. You can import from LinkedIn, upload a PDF, or start from scratch!
                        </p>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            Get Started
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {resumes.map(resume => (
                            <BorderGlow
                                key={resume.id}
                                edgeSensitivity={30}
                                glowColor="186 100% 50%" // Matches our var(--primary) cyan
                                backgroundColor="var(--surface)"
                                borderRadius={16}
                                glowRadius={40}
                                glowIntensity={1}
                                coneSpread={25}
                                animated={false}
                                colors={['#00f0ff', '#ff00ea', '#10b981']}
                                className="animate-fade-in"
                                fillOpacity={0.1}
                            >
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => handleRename(resume.id)}>
                                            {resume.name} <Edit3 size={14} style={{ color: 'var(--text-muted)' }} />
                                        </h3>
                                    </div>
                                    
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        Target Role: <strong>{resume.data.personal.jobTitle || 'Unspecified'}</strong><br/>
                                        Last Modified: {new Date(resume.lastModified).toLocaleDateString()}
                                    </p>
                                    
                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <button onClick={() => onStartBuilder(resume)} className="btn btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                                            <Edit3 size={16} /> Edit
                                        </button>
                                        <button onClick={() => setActiveJobResume(resume)} className="btn btn-outline" style={{ padding: '0.6rem', color: '#00f0ff', borderColor: 'rgba(0, 240, 255, 0.3)', zIndex: 10, display: 'flex', gap: '0.3rem', alignItems: 'center' }} title="Find Jobs">
                                            <Briefcase size={16} /> Jobs
                                        </button>
                                        <button onClick={() => handleDuplicate(resume.id)} className="btn btn-outline" style={{ padding: '0.6rem', color: 'var(--text-primary)', zIndex: 10 }} title="Duplicate">
                                            <Copy size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(resume.id)} className="btn btn-outline" style={{ padding: '0.6rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', zIndex: 10 }} title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <StartModal 
                    onClose={() => setShowModal(false)}
                    onStartScratch={() => handleStartNew(null)}
                    onStartWithData={(data) => handleStartNew(data)}
                />
            )}
            
            <JobRecommendationsModal
                isOpen={!!activeJobResume}
                onClose={() => setActiveJobResume(null)}
                resumeData={activeJobResume?.data}
            />
        </div>
    );
}
