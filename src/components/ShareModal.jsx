import React, { useState } from 'react';
import { X, Copy, Check, Globe, Lock, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareModal({ isOpen, onClose, resumeId, resumeData }) {
    const [isPublic, setIsPublic] = useState(false);
    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);
    
    if (!isOpen) return null;

    const shareUrl = `${window.location.protocol}//${window.location.host}/share/${resumeId}`;

    const handleTogglePrivacy = async () => {
        const newPrivacy = !isPublic;
        setSaving(true);
        try {
            // First time sharing, we need to upload the data.
            // If they toggle privacy, we ensure the latest data is uploaded.
            const response = await fetch(`http://localhost:3001/api/resumes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: resumeId,
                    data: resumeData,
                    isPublic: newPrivacy
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update privacy");
            }
            setIsPublic(newPrivacy);
        } catch (error) {
            console.error("Error updating privacy:", error);
            alert("Failed to share resume. Make sure your local backend server is running on port 3001.");
        } finally {
            setSaving(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
            <div className="glass-panel animate-fade-in" style={{
                background: 'var(--surface)', width: '100%', maxWidth: '450px',
                borderRadius: '24px', padding: '2.5rem', position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), var(--neon-glow)'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                    borderRadius: '50%', padding: '0.4rem', display: 'flex'
                }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(255,0,234,0.2))',
                        color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Share2 size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Share Your Resume</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                        Get a unique link to share with recruiters or embed the QR code in your portfolio.
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.05)', borderRadius: '16px',
                    padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {isPublic ? <Globe size={20} color="var(--primary)" /> : <Lock size={20} color="var(--text-muted)" />}
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
                                    {isPublic ? 'Publicly Visible' : 'Private (Draft)'}
                                </h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    {isPublic ? 'Anyone with the link can view' : 'Only you can see this'}
                                </span>
                            </div>
                        </div>
                        
                        <div 
                            onClick={saving ? null : handleTogglePrivacy}
                            style={{
                                width: '50px', height: '28px', borderRadius: '30px',
                                background: isPublic ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                position: 'relative', cursor: saving ? 'wait' : 'pointer',
                                transition: 'background 0.3s'
                            }}
                        >
                            <div style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                background: 'white', position: 'absolute', top: '3px',
                                left: isPublic ? '25px' : '3px', transition: 'left 0.3s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }} />
                        </div>
                    </div>

                    {isPublic && (
                        <div className="animate-fade-in" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={shareUrl}
                                    style={{
                                        flex: 1, padding: '0.6rem 1rem', borderRadius: '8px',
                                        background: 'rgba(0,0,0,0.4)', color: 'var(--text-primary)',
                                        border: '1px solid var(--border)', fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-primary"
                                    style={{ padding: '0.6rem 1rem' }}
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', background: 'white', borderRadius: '12px' }}>
                                <QRCodeSVG value={shareUrl} size={150} level="H" includeMargin={true} />
                                <span style={{ color: '#000', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem' }}>
                                    Scan to view online
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={onClose} className="btn" style={{ color: 'var(--text-secondary)' }}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
