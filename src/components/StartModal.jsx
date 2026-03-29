import React, { useState, useRef } from 'react';
import { X, Plus, Upload, Loader2, AlertCircle, FileText } from 'lucide-react';
import BorderGlow from './BorderGlow';

export default function StartModal({ isOpen, onClose, onStartWithData, onStartScratch }) {
    const [mode, setMode] = useState(null); // scratch, upload, linkedin
    const [isParsing, setIsParsing] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        setIsParsing(true);
        setError('');

        try {
            // 1. Read PDF as Base64 String
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const b64 = reader.result.split(',')[1];
                    resolve(b64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            // 2. Send PDF to our AI service
            const ai = await import('../services/ai.js');
            const parsedData = await ai.parseResume(base64Data, file.type);
            
            if (!parsedData || !parsedData.personal) {
                 throw new Error("Failed to map resume data correctly.");
            }

            // 4. Pass parsed data to parent and close modal
            onStartWithData(parsedData);
        } catch (err) {
            console.error("PDF Parsing Error:", err);
            setError(err.message || 'Failed to process the PDF. Please try again or create from scratch.');
        } finally {
            setIsParsing(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (mode === 'upload' || mode === 'linkedin') {
        return (
            <div className="modal-overlay" style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
                <BorderGlow className="glass-panel" style={{
                    width: '90%', maxWidth: '500px', padding: '2rem',
                    borderRadius: 'var(--radius-lg)', position: 'relative',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)'
                }} borderRadius={20} glowColor="186 100% 50%" edgeSensitivity={20}>
                    <button onClick={() => { setMode(null); setError(null); }} style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer'
                    }}>
                        <X size={24} />
                    </button>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                        {mode === 'linkedin' ? 'Import from LinkedIn' : 'Upload Existing Resume'}
                    </h2>
                    
                    {mode === 'linkedin' ? (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(10, 102, 194, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(10, 102, 194, 0.3)' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#0a66c2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileText size={18} /> How to get your LinkedIn PDF
                            </h3>
                            <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                <li>Go to your <strong>LinkedIn Profile</strong>.</li>
                                <li>Click the <strong>More</strong> button (next to Add profile section).</li>
                                <li>Select <strong>Save to PDF</strong>.</li>
                                <li>Upload that saved PDF file below!</li>
                            </ol>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            Upload your current resume (PDF format). Our AI will instantly extract your details and format them into our beautiful templates.
                        </p>
                    )}

                    {error && (
                        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 68, 68, 0.1)', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.875rem', border: '1px solid rgba(255,68,68,0.2)' }}>
                            {error}
                        </div>
                    )}
                    
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="file" 
                            accept=".pdf" 
                            onChange={handleFileUpload} 
                            ref={fileInputRef}
                            style={{ display: 'none' }} 
                        />
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            disabled={isParsing}
                            className="btn btn-outline" 
                            style={{ width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto', background: 'rgba(0, 240, 255, 0.05)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                        >
                            {isParsing ? (
                                <>
                                    <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Analyzing PDF...</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Our AI is extracting your info</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={32} color="var(--primary)" />
                                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Click to Upload PDF</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{mode === 'linkedin' ? 'Your LinkedIn Profile PDF' : 'Your existing resume PDF'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </BorderGlow>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <BorderGlow className="glass-panel animate-fade-in" style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg), var(--neon-glow)'
            }} borderRadius={16} glowColor="186 100% 50%" edgeSensitivity={20}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>How would you like to start?</h3>
                    <button onClick={onClose} disabled={isParsing} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {error && (
                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        <button
                            onClick={onStartScratch}
                            disabled={isParsing}
                            className="btn btn-primary" 
                            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto' }}
                        >
                            <Plus size={32} />
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Create from Scratch</span>
                            <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 400 }}>Start with a blank canvas and follow our guided wizard</span>
                        </button>
                        
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0.5rem 0', fontSize: '0.9rem' }}>OR</div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button
                                onClick={() => setMode('upload')}
                                disabled={isParsing}
                                className="btn btn-outline" 
                                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto', background: 'rgba(255, 0, 255, 0.05)', borderColor: 'rgba(255, 0, 255, 0.2)' }}
                            >
                                <Upload size={32} color="var(--accent)" />
                                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)' }}>Upload Resume</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Extract from an old PDF</span>
                            </button>

                            <button
                                onClick={() => setMode('linkedin')}
                                disabled={isParsing}
                                className="btn btn-outline" 
                                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto', background: 'rgba(10, 102, 194, 0.05)', borderColor: 'rgba(10, 102, 194, 0.2)' }}
                            >
                                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a66c2' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </div>
                                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0a66c2' }}>LinkedIn Import</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Generate from Profile PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </BorderGlow>
        </div>
    );
}
