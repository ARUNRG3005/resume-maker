import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Download } from 'lucide-react';
import * as aiProvider from "../services/ai.js";
import BorderGlow from "./BorderGlow";

export default function InterviewPrepModal({ isOpen, onClose, resumeData, jobTitle }) {
    const [loading, setLoading] = useState(false);
    const [prepKit, setPrepKit] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [error, setError] = useState(null);

    // If modal is closed, reset state
    useEffect(() => {
        if (!isOpen) {
            setPrepKit(null);
            setJobDescription('');
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await aiProvider.generateInterviewPrep(resumeData, jobTitle, jobDescription);
            setPrepKit(result);
        } catch (err) {
            setError(err.message || 'Failed to generate Interview Prep Kit');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTxt = () => {
        if (!prepKit) return;
        const element = document.createElement("a");
        const file = new Blob([prepKit], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Interview_Prep_Kit.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 999999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }}>
            <BorderGlow className="glass-panel animate-fade-in" style={{
                background: 'var(--surface)',
                border: '1px solid var(--primary)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.1), var(--shadow-lg)'
            }} borderRadius={16} glowColor="186 100% 50%">
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ff00ea' }}>
                        <Sparkles size={24} />
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Interview Coach</h3>
                    </div>
                    <button onClick={onClose} style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {!prepKit ? (
                        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                Generate a highly personalized Interview Prep Kit. Our AI will analyze your resume against standard industry expectations—or a specific job description—to prepare likely questions.
                            </p>
                            
                            <div style={{ textAlign: 'left' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                    Target Job Description (Optional)
                                </label>
                                <textarea
                                    className="form-input"
                                    style={{ width: '100%', minHeight: '150px', fontSize: '0.9rem', padding: '1rem' }}
                                    placeholder="Paste the job requirements to get highly tailored questions..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="btn btn-primary"
                                style={{
                                    padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600,
                                    borderRadius: '50px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                    margin: '0 auto', background: 'linear-gradient(90deg, #ff00ea, #00f0ff)', color: '#000', border: 'none'
                                }}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                                {loading ? 'Analyzing your resume...' : 'Generate My Prep Kit'}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#00f0ff' }}>Your Personalized Prep Kit</h4>
                                <button className="btn btn-outline" onClick={handleDownloadTxt} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#00f0ff', color: '#00f0ff' }}>
                                    <Download size={16} /> Save to TXT
                                </button>
                            </div>
                            <div style={{
                                flex: 1, padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid var(--border)',
                                overflowY: 'auto', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'sans-serif'
                            }}>
                                {prepKit}
                            </div>
                            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                <button className="btn btn-outline" onClick={() => setPrepKit(null)}>
                                    Generate Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </BorderGlow>
        </div>
    );
}
