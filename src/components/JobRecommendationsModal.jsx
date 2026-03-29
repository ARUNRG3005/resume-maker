import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, DollarSign, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import BorderGlow from './BorderGlow';

export default function JobRecommendationsModal({ isOpen, onClose, resumeData }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen) return;

        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await fetch(`${apiUrl}/api/jobs/match`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        skills: resumeData.skills || [],
                        role: resumeData.personal?.jobTitle || '',
                    })
                });

                if (!res.ok) throw new Error('Failed to fetch jobs');
                const data = await res.json();
                setJobs(data.jobs || []);
            } catch (err) {
                console.error(err);
                setError('Could not load job recommendations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isOpen, resumeData]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
            <BorderGlow className="modal-content glass-panel" style={{
                position: 'relative', width: '100%', maxWidth: '800px', maxHeight: '90vh',
                overflowY: 'auto', padding: '2rem', borderRadius: '16px', background: 'var(--bg-secondary)'
            }} glowColor="0 255 136">
                
                <button 
                    onClick={onClose} 
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Briefcase color="var(--primary)" /> Smart Job Finder
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Based on your {(resumeData?.skills || []).length} skills and profile, here are the best matching opportunities.
                    </p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                        <div className="loader" style={{ 
                            width: '40px', height: '40px', border: '3px solid rgba(0,240,255,0.3)', 
                            borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' 
                        }}></div>
                        Analying your profile and finding matches...
                    </div>
                ) : error ? (
                    <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444' }}>
                        <AlertCircle size={20} style={{ marginBottom: '0.5rem' }} />
                        <p>{error}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                        <p>No jobs found matching your current skills.</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adding more skills to your resume!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {jobs.map((job) => (
                            <div key={job.id} style={{
                                padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                                borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{job.company}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={14} /> {job.location}</span>
                                            {job.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><DollarSign size={14} /> {job.salary}</span>}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ 
                                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem', 
                                            background: job.matchPercentage >= 70 ? 'rgba(16, 185, 129, 0.1)' : job.matchPercentage >= 40 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                                            color: job.matchPercentage >= 70 ? '#10b981' : job.matchPercentage >= 40 ? '#f59e0b' : '#ef4444',
                                            padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem'
                                        }}>
                                            {job.matchPercentage}% Match
                                        </div>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{job.description}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {job.matchingSkills?.length > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                            <CheckCircle size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                {job.matchingSkills.map(s => (
                                                    <span key={s} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {job.missingSkills?.length > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                            <AlertCircle size={16} color="#f59e0b" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Missing:</span>
                                                {job.missingSkills.map(s => (
                                                    <span key={s} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginTop: '0.5rem' }}>
                                    <a 
                                        href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn btn-primary"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: '#0a66c2', color: '#fff', border: 'none' }}
                                    >
                                        Apply on LinkedIn <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </BorderGlow>
        </div>
    );
}
