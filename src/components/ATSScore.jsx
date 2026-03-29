import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, AlertTriangle, AlertCircle, TrendingUp, Sparkles, Loader2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateATSCompatibility } from '../utils/atsScoring';
import * as aiProvider from '../services/ai.js';
import BorderGlow from './BorderGlow';
import AIHelper from './AIHelper';

export default function ATSScore({ resumeData, onUpdateSummary, onAutoTailor }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [scoreData, setScoreData] = useState(null);
    const [isTailoring, setIsTailoring] = useState(false);

    const handleAutoTailor = async () => {
        if (!jobDescription.trim()) return;
        setIsTailoring(true);
        try {
            const ai = await import('../services/ai.js');
            const newResumeData = await ai.autoTailorWholeResume(resumeData, jobDescription);
            if (onAutoTailor) {
                onAutoTailor({ ...resumeData, ...newResumeData }); // merge to ensure no top level keys are lost
                alert('Success! Your resume has been tailored to the job description.');
                // Re-run ATS score on the new data
                setScoreData(calculateATSCompatibility(jobDescription, { ...resumeData, ...newResumeData }));
            }
        } catch (err) {
            console.error(err);
            alert(err.message || 'Failed to auto-tailor resume.');
        } finally {
            setIsTailoring(false);
        }
    };

    const handleAnalyze = () => {
        if (!jobDescription.trim()) return;
        const result = calculateATSCompatibility(jobDescription, resumeData);
        setScoreData(result);
    };

    const getScoreColor = (score) => {
        if (score >= 75) return '#10b981'; // Green
        if (score >= 50) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    };

    const scoreColor = scoreData ? getScoreColor(scoreData.matchScore) : 'var(--primary)';

    return (
        <BorderGlow className="glass-panel" style={{
            position: 'relative',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${scoreColor}40`,
            background: `linear-gradient(145deg, var(--surface) 0%, rgba(20, 20, 25, 0.9) 100%)`,
        }} borderRadius={16} glowColor="186 100% 50%" edgeSensitivity={20}>
            {/* Header / Toggle */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(0,0,0,0.02)' : 'transparent'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        background: scoreData ? `${getScoreColor(scoreData.matchScore)}15` : 'rgba(0, 240, 255, 0.1)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        color: scoreData ? getScoreColor(scoreData.matchScore) : 'var(--primary)'
                    }}>
                        <Target size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>ATS Compatibility Check</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                            {scoreData
                                ? `Score: ${scoreData.matchScore}% Match`
                                : 'Compare your resume against a job description'}
                        </p>
                    </div>
                </div>
                {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="animate-fade-in" style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border)' }}>

                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Paste Job Description
                        </label>
                        <textarea
                            className="form-input"
                            style={{ width: '100%', minHeight: '120px', resize: 'vertical', fontSize: '1rem', padding: '1.25rem' }}
                            placeholder="Paste the requirements, responsibilities, and qualifications from the job posting..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '0.95rem' }}
                            onClick={handleAnalyze}
                            disabled={!jobDescription.trim()}
                        >
                            Analyze Match Score
                        </button>
                    </div>

                    {/* Results Display */}
                    {scoreData && (
                        <div className="animate-fade-in" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Circular Dashboard */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>

                                {/* SVG Circular Progress */}
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                        {/* Background Track */}
                                        <circle
                                            cx="60" cy="60" r="54"
                                            fill="none"
                                            stroke="var(--border)"
                                            strokeWidth="8"
                                        />
                                        {/* Progress Arc */}
                                        <circle
                                            cx="60" cy="60" r="54"
                                            fill="none"
                                            stroke={getScoreColor(scoreData.matchScore)}
                                            strokeWidth="8"
                                            strokeDasharray={`${2 * Math.PI * 54}`}
                                            strokeDashoffset={`${2 * Math.PI * 54 * (1 - scoreData.matchScore / 100)}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease' }}
                                        />
                                    </svg>
                                    {/* Center Text */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, color: getScoreColor(scoreData.matchScore) }}>
                                            {scoreData.matchScore}
                                        </span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                                            ATS SCORE
                                        </span>
                                    </div>
                                </div>

                                {/* Score Context */}
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                                        {scoreData.matchScore >= 75 ? 'Strong Match!' : scoreData.matchScore >= 50 ? 'Moderate Match' : 'Weak Match'}
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                                        {scoreData.matchScore >= 75
                                            ? "Your resume strongly aligns with this job description. It contains a high density of required industry keywords."
                                            : scoreData.matchScore >= 50
                                                ? "You have a decent foundation, but consider injecting more specific keywords mentioned in the posting."
                                                : "Your resume is missing critical terminology found in the description. ATS filters may reject this."}
                                    </p>
                                </div>
                            </div>

                            {/* Missing Keywords List */}
                            {scoreData.missingKeywords.length > 0 && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <AlertTriangle size={16} color="#f59e0b" />
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Missing Keywords ({scoreData.missingKeywords.length})</h4>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {scoreData.missingKeywords.slice(0, 15).map((kw, i) => (
                                            <span key={i} style={{
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: '#ef4444',
                                                padding: '0.3rem 0.6rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                border: '1px solid rgba(239, 68, 68, 0.2)'
                                            }}>
                                                {kw}
                                            </span>
                                        ))}
                                        {scoreData.missingKeywords.length > 15 && (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                                                +{scoreData.missingKeywords.length - 15} more...
                                            </span>
                                        )}
                                    </div>

                                    {/* AI Suggestion Hook */}
                                    <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Sparkles size={18} color="var(--primary)" /> Let AI Fix This
                                        </h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
                                            Don't want to add these keywords manually? Our AI can rewrite your entire resume (Summary, Experience, Skills) to perfectly target this job description right now.
                                        </p>
                                        
                                        <button 
                                            onClick={handleAutoTailor} 
                                            disabled={isTailoring}
                                            className="btn btn-primary"
                                            style={{
                                                width: '100%', padding: '1rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                color: '#000', fontSize: '1rem', fontWeight: 700, border: 'none', borderRadius: '8px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                                boxShadow: 'var(--neon-glow)'
                                            }}
                                        >
                                            {isTailoring ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                                            {isTailoring ? 'Rewriting Resume...' : '🚀 Auto-Tailor Entire Resume'}
                                        </button>
                                        
                                        <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>OR</div>
                                        
                                        <AIHelper
                                            action="ats"
                                            payload={{ missingKeywords: scoreData.missingKeywords, currentSummary: resumeData.personal.summary }}
                                            onResult={(newSummary) => onUpdateSummary(newSummary)}
                                            className="btn btn-outline"
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                                width: '100%', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid var(--primary)', borderRadius: '8px', color: 'var(--primary)', background: 'transparent'
                                            }}
                                            customLabel="Only rewrite my Summary"
                                        />
                                    </div>
                                </div>
                            )}

                            {scoreData.missingKeywords.length === 0 && scoreData.jobKeywordsTotalCount > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
                                    <CheckCircle size={20} />
                                    <span>Incredible! Your resume hits all the primary keywords identified in this job description.</span>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            )}
        </BorderGlow>
    );
}
