import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { ArrowLeft, ArrowRight, Download, Lock, Unlock } from 'lucide-react';
import { resumeCategories } from '../data/categories';

import PersonalDetails from './forms/PersonalDetails';
import Education from './forms/Education';
import Experience from './forms/Experience';
import Skills from './forms/Skills';
import Projects from './forms/Projects';
import Certifications from './forms/Certifications';

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

import ThemeToggle from './ThemeToggle';
import ATSScore from './ATSScore';
import InterviewPrepModal from './InterviewPrepModal';
import BorderGlow from './BorderGlow';
import { Target, MessageSquare, Share2, Briefcase } from 'lucide-react'; // For the Interview button
import ShareModal from './ShareModal';
import JobRecommendationsModal from './JobRecommendationsModal';

const TEMPLATES = [
    { id: 'minimalist', name: 'Minimalist', component: TemplateMinimalist, color: '#f3f4f6' },
    { id: 'modern', name: 'Modern Split', component: TemplateModern, color: '#1e293b' },
    { id: 'creative', name: 'Creative Focus', component: TemplateCreative, color: '#6366f1' },
    { id: 'elegant', name: 'Elegant Serif', component: TemplateElegant, color: '#0f172a' },
    { id: 'tech', name: 'Tech Terminal', component: TemplateTech, color: '#0ea5e9' },
    { id: 'executive', name: 'Executive Classic', component: TemplateExecutive, color: '#1e3a8a' },
    { id: 'compact', name: 'Ultra Compact', component: TemplateCompact, color: '#e5e7eb' },
    { id: 'dynamic', name: 'Dynamic Sidebar', component: TemplateDynamic, color: '#4338ca' },
    { id: 'minimal', name: 'Strict Minimal', component: TemplateMinimal, color: '#ffffff' },
    { id: 'corporate', name: 'Corporate Standard', component: TemplateCorporate, color: '#374151' },
    { id: 'modern-accent', name: 'Modern Accent', component: TemplateModernAccent, color: '#10b981' },
    { id: 'grid', name: 'Masonry Grid', component: TemplateGrid, color: '#f97316' },
    { id: 'sidebar', name: 'Slate Sidebar', component: TemplateSidebar, color: '#334155' }
];

const steps = [
    { id: 'personal', label: '1. Personal' },
    { id: 'education', label: '2. Education' },
    { id: 'experience', label: '3. Experience' },
    { id: 'skills', label: '4. Skills' },
    { id: 'projects', label: '5. Projects' },
    { id: 'certifications', label: '6. Certifications' },
    { id: 'preview', label: '7. Preview' }
];

export default function Builder({ onBackHome, onBackDashboard, theme, toggleTheme, initialDoc, user }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [activeTemplate, setActiveTemplate] = useState('tech');
    const [activeCategory, setActiveCategory] = useState('IT');
    const [isPremium, setIsPremium] = useState(false);
    const [previewHeight, setPreviewHeight] = useState(0);
    const [showInterviewPrep, setShowInterviewPrep] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showJobRecommendations, setShowJobRecommendations] = useState(false);
    const resumeRef = useRef(null);

    const [resumeData, setResumeData] = useState(initialDoc?.data || {
        personal: {
            firstName: '', lastName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', photo: ''
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: []
    });

    // Auto-save to localStorage
    useEffect(() => {
        if (!initialDoc || !initialDoc.id) return;
        
        const saved = localStorage.getItem('userResumes');
        if (saved) {
            try {
                const resumes = JSON.parse(saved);
                const updated = resumes.map(r => 
                    r.id === initialDoc.id 
                    ? { ...r, data: resumeData, lastModified: Date.now() } 
                    : r
                );
                localStorage.setItem('userResumes', JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to auto-save", e);
            }
        }
    }, [resumeData, initialDoc]);

    const currentStep = steps[currentStepIndex];
    const isPreview = currentStep.id === 'preview';

    // Monitor the height of the resume document
    useEffect(() => {
        if (!isPreview || !resumeRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPreviewHeight(entry.contentRect.height);
            }
        });

        observer.observe(resumeRef.current);

        return () => observer.disconnect();
    }, [isPreview, activeTemplate, resumeData]);

    const PAGE_HEIGHT_LIMIT = 1056;
    const isOverLimit = previewHeight > PAGE_HEIGHT_LIMIT;
    const canDownload = isPremium || !isOverLimit;

    const updateSection = (section, data) => {
        setResumeData(prev => ({ ...prev, [section]: data }));
    };

    const handleUnlockPremium = () => {
        if (isPremium) {
            setIsPremium(false);
            return;
        }
        const password = window.prompt("Enter Premium Password to Unlock:");
        if (password === "3011") {
            setIsPremium(true);
            alert("Premium Unlocked Successfully!");
        } else if (password !== null) {
            alert("Incorrect password. Please contact Arun for premium access.");
        }
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('resume-preview-document');

        // Temporarily remove the CSS transform scale so html2canvas captures the full size
        const originalTransform = element.style.transform;
        element.style.transform = 'none';

        const opt = {
            margin: 0,
            filename: `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || ''}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                windowWidth: 816 // Force desktop width for the capture
            },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: isPremium ? { mode: 'css', avoid: '.resume-section' } : undefined
        };

        await html2pdf().set(opt).from(element).save();

        // Restore the scale for the UI preview
        element.style.transform = originalTransform;
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1);
    };

    // handleNext handles stepper iteration

    const handlePrev = () => {
        if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
    };

    return (
        <div className={`builder-layout animate-fade-in ${isPreview ? 'preview-mode' : 'form-mode'}`}>

            {/* Top Navigation Bar */}
            <nav className="builder-nav">
                <div className="nav-container">
                    <h2 onClick={user ? onBackDashboard : onBackHome} style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)' }}>AI</span>Resume
                    </h2>
                    
                    {initialDoc?.name && (
                        <div style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {initialDoc.name}
                        </div>
                    )}

                    <div className="stepper-dots">
                        {steps.map((step, idx) => (
                            <div
                                key={step.id}
                                onClick={() => setCurrentStepIndex(idx)}
                                className="step-dot"
                                style={{
                                    background: currentStepIndex === idx ? 'var(--primary)' : (idx < currentStepIndex ? 'var(--success)' : 'transparent'),
                                    borderColor: currentStepIndex === idx ? 'var(--primary)' : (idx < currentStepIndex ? 'var(--success)' : 'var(--border)'),
                                    boxShadow: currentStepIndex === idx ? '0 0 10px rgba(0, 240, 255, 0.4)' : 'none',
                                }}
                                title={step.label}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} inline />
                        
                        {user ? (
                            <button onClick={onBackDashboard} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                Back to Dashboard
                            </button>
                        ) : (
                            <button onClick={onBackHome} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                Exit Builder
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="builder-main">
                {!isPreview ? (
                    // FORM MODE (Steps 1-6)
                    <div className="form-container">
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{currentStep.label.substring(3)}</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Fill out your details for this section.</p>
                        </div>

                        <BorderGlow className="form-content-card glass-panel animate-fade-in" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }} borderRadius={24} glowColor="186 100% 50%" edgeSensitivity={20}>
                            {currentStep.id === 'personal' && <PersonalDetails data={resumeData.personal} onChange={(data) => updateSection('personal', data)} />}
                            {currentStep.id === 'education' && <Education data={resumeData.education} onChange={(data) => updateSection('education', data)} />}
                            {currentStep.id === 'experience' && <Experience data={resumeData.experience} jobTitle={resumeData.personal.jobTitle} onChange={(data) => updateSection('experience', data)} />}
                            {currentStep.id === 'skills' && <Skills data={resumeData.skills} jobTitle={resumeData.personal.jobTitle} onChange={(data) => updateSection('skills', data)} />}
                            {currentStep.id === 'projects' && <Projects data={resumeData.projects} onChange={(data) => updateSection('projects', data)} />}
                            {currentStep.id === 'certifications' && <Certifications data={resumeData.certifications} onChange={(data) => updateSection('certifications', data)} />}
                        </BorderGlow>

                        {/* Form Navigation */}
                        <div className="form-actions">
                            <button
                                className="btn btn-outline"
                                onClick={handlePrev}
                                disabled={currentStepIndex === 0}
                            >
                                <ArrowLeft size={18} /> Previous
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                            >
                                Next Step <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    // PREVIEW MODE (Step 7)
                    <div className="preview-container animate-fade-in">
                        <BorderGlow className="preview-toolbar glass-panel" style={{ flexDirection: 'column', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }} borderRadius={16} glowColor="186 100% 50%" edgeSensitivity={20}>

                            {/* CATEGORY NAV */}
                            <div className="category-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', width: '100%' }}>
                                {Object.keys(resumeCategories).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '20px' }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* FILTERED TEMPLATES */}
                            <div className="template-selector" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                                {TEMPLATES.filter(tmpl => resumeCategories[activeCategory]?.includes(tmpl.name)).map(tmpl => (
                                    <button
                                        key={tmpl.id}
                                        className={`btn ${activeTemplate === tmpl.id ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setActiveTemplate(tmpl.id)}
                                        style={{ padding: '0.5rem 1rem', background: activeTemplate === tmpl.id ? '#00f0ff' : 'transparent', color: activeTemplate === tmpl.id ? 'black' : 'inherit' }}
                                    >
                                        {tmpl.name}
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                <button className="btn btn-outline" onClick={handlePrev}><ArrowLeft size={16} /> Data Entry</button>
                                
                                <button
                                    onClick={handleUnlockPremium}
                                    className="btn"
                                    style={{
                                        background: isPremium ? 'var(--success)' : 'rgba(255,255,255,0.1)',
                                        color: isPremium ? '#000' : 'var(--text-primary)',
                                        border: `1px solid ${isPremium ? 'transparent' : 'var(--border)'}`,
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    {isPremium ? <Unlock size={16} /> : <Lock size={16} />}
                                    {isPremium ? 'Premium Active' : 'Unlock Premium'}
                                </button>

                                <button
                                    onClick={() => setShowInterviewPrep(true)}
                                    className="btn btn-outline"
                                    style={{
                                        borderColor: '#ff00ea',
                                        color: '#ff00ea',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <MessageSquare size={16} /> AI Interview Coach
                                </button>

                                <button
                                    onClick={() => setShowJobRecommendations(true)}
                                    className="btn btn-outline"
                                    style={{
                                        borderColor: '#00f0ff',
                                        color: '#00f0ff',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <Briefcase size={16} /> Find Jobs for Me
                                </button>

                                <button
                                    onClick={() => setShowShareModal(true)}
                                    className="btn btn-primary"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                        border: 'none', color: '#000'
                                    }}
                                >
                                    <Share2 size={16} color="#000" /> <span style={{fontWeight: 700}}>Share Online</span>
                                </button>

                                <button 
                                    className={`btn ${canDownload ? 'btn-primary' : 'btn-outline'}`} 
                                    onClick={handleDownloadPDF}
                                    disabled={!canDownload}
                                    style={{ 
                                        opacity: canDownload ? 1 : 0.5,
                                        cursor: canDownload ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    <Download size={16} /> Download PDF
                                </button>
                            </div>
                        </BorderGlow>

                        {/* ATS MATCHING WIDGET */}
                        <div style={{ width: '100%', maxWidth: '816px', margin: '0 auto 1.5rem auto' }}>
                            <ATSScore
                                resumeData={resumeData}
                                onUpdateSummary={(newSummary) => updateSection('personal', { ...resumeData.personal, summary: newSummary })}
                                onAutoTailor={setResumeData}
                            />
                        </div>

                        <div className="resume-preview-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', overflow: 'hidden', paddingBottom: '4rem' }}>
                            <div className="resume-document" id="resume-preview-document" ref={resumeRef}>
                                {TEMPLATES.map(tmpl => {
                                    if (activeTemplate === tmpl.id) {
                                        const TemplateComponent = tmpl.component;
                                        return <TemplateComponent key={tmpl.id} data={resumeData} />;
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Premium Overlay Warning */}
                            {!isPremium && isOverLimit && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    right: '0',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
                                    height: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    paddingBottom: '3rem',
                                    zIndex: 10,
                                    backdropFilter: 'blur(2px)'
                                }}>
                                    <div className="glass-panel" style={{
                                        padding: '1.5rem',
                                        borderRadius: '16px',
                                        textAlign: 'center',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)'
                                    }}>
                                        <Lock size={32} color="#ef4444" style={{ margin: '0 auto 1rem auto' }} />
                                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#ef4444' }}>Resume Too Long (Premium Required)</h3>
                                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', maxWidth: '400px' }}>
                                            Your resume content exceeds the 1-page free limit. Upgrade to Premium to export multi-page resumes seamlessly!
                                        </p>
                                        <button className="btn btn-primary" onClick={handleUnlockPremium} style={{ background: '#ef4444', color: 'white', border: 'none' }}>
                                            Unlock Premium Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <InterviewPrepModal
                            isOpen={showInterviewPrep}
                            onClose={() => setShowInterviewPrep(false)}
                            resumeData={resumeData}
                            jobTitle={resumeData.personal.jobTitle}
                        />
                        
                        <JobRecommendationsModal
                            isOpen={showJobRecommendations}
                            onClose={() => setShowJobRecommendations(false)}
                            resumeData={resumeData}
                        />
                        
                        <ShareModal
                            isOpen={showShareModal}
                            onClose={() => setShowShareModal(false)}
                            resumeId={initialDoc?.id}
                            resumeData={resumeData}
                        />

                    </div>
                )}
            </div>

        </div>
    );
}
