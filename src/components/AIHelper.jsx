import React, { useState } from 'react';
import { Sparkles, Loader2, X, Check } from 'lucide-react';
import BorderGlow from './BorderGlow';

export default function AIHelper({ onResult, action, payload, tooltip, className, style, customLabel }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [aiResult, setAiResult] = useState('');
    const [editedResult, setEditedResult] = useState('');

    const handleAIAction = async () => {
        setLoading(true);
        setError('');

        try {
            let result = null;
            // Dynamically import ai.js to avoid loading it if not used immediately
            const ai = await import('../services/ai.js');

            if (action === 'summary') {
                result = await ai.generateSummary(payload.jobTitle, payload.experience, payload.skills);
            } else if (action === 'enhance') {
                result = await ai.enhanceDescription(payload.text);
            } else if (action === 'skills') {
                result = await ai.suggestSkills(payload.jobTitle, payload.existingSkills);
            } else if (action === 'ats') {
                result = await ai.analyzeATSScore(payload.missingKeywords, payload.currentSummary);
            } else if (action === 'tailor') {
                result = await ai.tailorExperience(payload.text, payload.jobTitle, payload.jobDescription);
            } else if (action === 'metrics') {
                result = await ai.suggestMetrics(payload.text);
            }

            if (result) {
                // If the result is an array (e.g. skills), join it for editing
                const textResult = Array.isArray(result) ? result.join(', ') : result;
                setAiResult(textResult);
                setEditedResult(textResult);
                setModalOpen(true);
            }
        } catch (err) {
            setError(err.message || "Failed to generate AI content.");
            alert(err.message || "Failed to generate AI content.");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        // If the action expects an array, split it back
        const finalResult = action === 'skills' 
            ? editedResult.split(',').map(s => s.trim()).filter(Boolean) 
            : editedResult;
            
        onResult(finalResult);
        setModalOpen(false);
    };

    const defaultStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        border: '1px solid rgba(79, 70, 229, 0.2)',
        borderRadius: 'var(--radius-md)',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
    };

    return (
        <>
            <button
                type="button"
                onClick={handleAIAction}
                disabled={loading}
                title={tooltip || "Enhance with AI"}
                className={className || ''}
                style={style || defaultStyle}
                onMouseOver={(e) => {
                    if (!loading && !style) {
                        e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
                    }
                }}
                onMouseOut={(e) => {
                    if (!loading && !style) {
                        e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                    }
                }}
            >
                {loading ? (
                    <Loader2 size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                    <Sparkles size={14} />
                )}
                {loading ? 'Thinking...' : (customLabel || 'AI Enhance')}
            </button>

            {/* AI Preview Modal */}
            {modalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }}>
                    <BorderGlow className="glass-panel animate-fade-in" style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg), var(--neon-glow)'
                    }} borderRadius={16} glowColor="186 100% 50%">
                        {/* Header */}
                        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                <Sparkles size={20} />
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Generated Suggestion</h3>
                            </div>
                            <button onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body - Editable Text Area */}
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Here corresponds to the AI's best suggestion. You can freely edit this text before applying it to your resume.
                            </p>
                            <textarea
                                className="form-input"
                                style={{ width: '100%', minHeight: '180px', fontSize: '0.95rem', lineHeight: 1.6, resize: 'vertical' }}
                                value={editedResult}
                                onChange={(e) => setEditedResult(e.target.value)}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                                Discard
                            </button>
                            <button className="btn btn-primary" onClick={handleApply} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Check size={18} /> Apply Changes
                            </button>
                        </div>
                    </BorderGlow>
                </div>
            )}
        </>
    );
}
