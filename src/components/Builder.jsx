import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { ArrowLeft, ArrowRight, CheckCircle, Download } from 'lucide-react';

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
import ThemeToggle from './ThemeToggle';

const steps = [
    { id: 'personal', label: '1. Personal' },
    { id: 'education', label: '2. Education' },
    { id: 'experience', label: '3. Experience' },
    { id: 'skills', label: '4. Skills' },
    { id: 'projects', label: '5. Projects' },
    { id: 'certifications', label: '6. Certifications' },
    { id: 'preview', label: '7. Preview' }
];

export default function Builder({ onBackHome, theme, toggleTheme }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [activeTemplate, setActiveTemplate] = useState('creative');

    const [resumeData, setResumeData] = useState({
        personal: {
            firstName: '', lastName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', photo: ''
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: []
    });

    const updateSection = (section, data) => {
        setResumeData(prev => ({ ...prev, [section]: data }));
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('resume-preview-document');
        const opt = {
            margin: 0,
            filename: `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || ''}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1);
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
    };

    const currentStep = steps[currentStepIndex];
    const isPreview = currentStep.id === 'preview';

    return (
        <div className={`builder-layout animate-fade-in ${isPreview ? 'preview-mode' : 'form-mode'}`}>

            {/* Top Navigation Bar */}
            <nav className="builder-nav">
                <div className="nav-container">
                    <h2 onClick={onBackHome} style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)' }}>AI</span>Resume
                    </h2>
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
                        <button onClick={onBackHome} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                            Exit Builder
                        </button>
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

                        <div className="form-content-card glass-panel animate-fade-in">
                            {currentStep.id === 'personal' && <PersonalDetails data={resumeData.personal} onChange={(data) => updateSection('personal', data)} />}
                            {currentStep.id === 'education' && <Education data={resumeData.education} onChange={(data) => updateSection('education', data)} />}
                            {currentStep.id === 'experience' && <Experience data={resumeData.experience} onChange={(data) => updateSection('experience', data)} />}
                            {currentStep.id === 'skills' && <Skills data={resumeData.skills} jobTitle={resumeData.personal.jobTitle} onChange={(data) => updateSection('skills', data)} />}
                            {currentStep.id === 'projects' && <Projects data={resumeData.projects} onChange={(data) => updateSection('projects', data)} />}
                            {currentStep.id === 'certifications' && <Certifications data={resumeData.certifications} onChange={(data) => updateSection('certifications', data)} />}
                        </div>

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
                        <div className="preview-toolbar glass-panel" style={{ flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            <div className="template-selector" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                                <button className={`btn ${activeTemplate === 'minimalist' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('minimalist')} style={{ padding: '0.5rem 1rem' }}>Minimalist</button>
                                <button className={`btn ${activeTemplate === 'modern' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('modern')} style={{ padding: '0.5rem 1rem' }}>Modern</button>
                                <button className={`btn ${activeTemplate === 'creative' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('creative')} style={{ padding: '0.5rem 1rem' }}>Creative Theme</button>
                                <button className={`btn ${activeTemplate === 'elegant' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('elegant')} style={{ padding: '0.5rem 1rem' }}>Elegant (Photo)</button>
                                <button className={`btn ${activeTemplate === 'tech' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('tech')} style={{ padding: '0.5rem 1rem' }}>Tech (Photo)</button>
                                <button className={`btn ${activeTemplate === 'executive' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('executive')} style={{ padding: '0.5rem 1rem' }}>Executive (Photo)</button>
                                <button className={`btn ${activeTemplate === 'compact' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('compact')} style={{ padding: '0.5rem 1rem' }}>Compact</button>
                                <button className={`btn ${activeTemplate === 'dynamic' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTemplate('dynamic')} style={{ padding: '0.5rem 1rem' }}>Dynamic Sidebar (Photo)</button>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <button className="btn btn-outline" onClick={handlePrev}><ArrowLeft size={16} /> Data Entry</button>
                                <button className="btn btn-primary" onClick={handleDownloadPDF}><Download size={16} /> Download PDF</button>
                            </div>
                        </div>

                        <div className="resume-preview-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <div className="resume-document" id="resume-preview-document">
                                {activeTemplate === 'minimalist' && <TemplateMinimalist data={resumeData} />}
                                {activeTemplate === 'modern' && <TemplateModern data={resumeData} />}
                                {activeTemplate === 'creative' && <TemplateCreative data={resumeData} />}
                                {activeTemplate === 'elegant' && <TemplateElegant data={resumeData} />}
                                {activeTemplate === 'tech' && <TemplateTech data={resumeData} />}
                                {activeTemplate === 'executive' && <TemplateExecutive data={resumeData} />}
                                {activeTemplate === 'compact' && <TemplateCompact data={resumeData} />}
                                {activeTemplate === 'dynamic' && <TemplateDynamic data={resumeData} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
