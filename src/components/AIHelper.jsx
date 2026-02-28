import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function AIHelper({ onResult, action, payload, tooltip }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAIAction = async () => {
        setLoading(true);
        setError('');

        try {
            let result = null;
            // We dynamically import ai.js to avoid loading it if not used immediately
            const ai = await import('../services/ai.js');

            if (action === 'summary') {
                result = await ai.generateSummary(payload.jobTitle, payload.experience, payload.skills);
            } else if (action === 'enhance') {
                result = await ai.enhanceDescription(payload.text);
            } else if (action === 'skills') {
                result = await ai.suggestSkills(payload.jobTitle, payload.existingSkills);
            }

            if (result) {
                onResult(result);
            }
        } catch (err) {
            setError(err.message || "Failed to generate AI content.");
            alert(err.message || "Failed to generate AI content.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleAIAction}
            disabled={loading}
            title={tooltip || "Enhance with AI"}
            style={{
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
            }}
            onMouseOver={(e) => {
                if (!loading) {
                    e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
                }
            }}
            onMouseOut={(e) => {
                if (!loading) {
                    e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                }
            }}
        >
            {loading ? (
                <Loader2 size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
                <Sparkles size={14} />
            )}
            {loading ? 'Thinking...' : 'AI Enhance'}
        </button>
    );
}
