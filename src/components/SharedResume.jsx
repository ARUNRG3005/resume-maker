import React, { useEffect, useState } from 'react';
import { Download, AlertTriangle, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';

// Import all templates
import TemplateMinimalist from './templates/TemplateMinimalist';
import TemplateModern from './templates/TemplateModern';
import TemplateCreative from './templates/TemplateCreative';
import TemplateElegant from './templates/TemplateElegant';
import TemplateTech from './templates/TemplateTech';
import TemplateExecutive from './templates/TemplateExecutive';
import TemplateCompact from './templates/TemplateCompact';
import TemplateDynamic from './templates/TemplateDynamic';
import TemplateMinimal from './templates/TemplateMinimal';
import TemplateCorporate from './templates/TemplateCorporate';
import TemplateModernAccent from './templates/TemplateModernAccent';
import TemplateGrid from './templates/TemplateGrid';
import TemplateSidebar from './templates/TemplateSidebar';

const TEMPLATES = {
    'minimalist': TemplateMinimalist,
    'modern': TemplateModern,
    'creative': TemplateCreative,
    'elegant': TemplateElegant,
    'tech': TemplateTech,
    'executive': TemplateExecutive,
    'compact': TemplateCompact,
    'dynamic': TemplateDynamic,
    'minimal': TemplateMinimal,
    'corporate': TemplateCorporate,
    'modern-accent': TemplateModernAccent,
    'grid': TemplateGrid,
    'sidebar': TemplateSidebar
};

export default function SharedResume({ id, onBackHome }) {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTemplate, setActiveTemplate] = useState('modern'); // We'll just default or the user can select a view mode

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/resumes/${id}`);
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to fetch resume');
                }
                const data = await response.json();
                setResumeData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    const handleDownloadPDF = async () => {
        const element = document.getElementById('shared-resume-document');
        const opt = {
            margin: 0,
            filename: `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || ''}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, windowWidth: 816 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: 'css', avoid: '.resume-section' }
        };
        await html2pdf().set(opt).from(element).save();
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', animation: 'pulseGlow 2s infinite' }}>
                    Loading Secure Resume...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', textAlign: 'center', maxWidth: '500px', border: '1px solid rgba(255, 51, 102, 0.3)', boxShadow: '0 10px 30px rgba(255, 51, 102, 0.1)' }}>
                    <AlertTriangle size={48} color="var(--error)" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Access Denied</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error}</p>
                    <button onClick={() => window.location.href = '/'} className="btn btn-primary">Go to Home</button>
                </div>
            </div>
        );
    }

    const TemplateComponent = TEMPLATES[activeTemplate] || TEMPLATES['modern'];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
            <nav style={{ padding: '1rem 2rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem' }}>
                    <span style={{ color: 'var(--primary)' }}>AI</span>Resume
                    <span style={{ fontSize: '0.9rem', padding: '0.2rem 0.6rem', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary)', borderRadius: '20px', marginLeft: '0.5rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                        Shared View
                    </span>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Download
                    </button>
                    <button onClick={() => window.location.href = '/'} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>
                        Create Your Own
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
                    {Object.keys(TEMPLATES).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTemplate(cat)}
                            className={`btn ${activeTemplate === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="resume-preview-wrapper" style={{ overflowX: 'hidden', paddingBottom: '4rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div className="resume-document" id="shared-resume-document" style={{ width: '816px !important', minHeight: '1056px', background: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', flexShrink: 0 }}>
                        <TemplateComponent data={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
