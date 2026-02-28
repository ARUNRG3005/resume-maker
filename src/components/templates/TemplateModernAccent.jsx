import React from 'react';

export default function TemplateModernAccent({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // A fresh accent color (teal/emerald)
    const accentColor = '#10b981';

    return (
        <div className="template-modern-accent" style={{ padding: '3rem', fontFamily: "'Outfit', 'Inter', sans-serif", color: '#1f2937', background: '#fafaf9', minHeight: '11in' }}>

            {/* Header with Photo support */}
            <header style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `4px solid ${accentColor}` }}>
                {personal.photo && (
                    <div style={{ width: '140px', height: '140px', flexShrink: 0, borderRadius: '24px', overflow: 'hidden', boxShadow: `0 10px 25px -5px rgba(16, 185, 129, 0.3)`, border: `2px solid ${accentColor}` }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#111827', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        {personal.firstName} <span style={{ color: accentColor }}>{personal.lastName}</span>
                    </h1>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#4b5563', margin: '0 0 1rem 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {personal.jobTitle}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.95rem', color: '#6b7280', fontWeight: 500 }}>
                        {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: accentColor }}>@</span> {personal.email}</span>}
                        {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: accentColor }}>#</span> {personal.phone}</span>}
                        {personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: accentColor }}>&</span> {personal.location}</span>}
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '3.5rem' }}>

                {/* Left Column (Sidebar-esque) */}
                <div>
                    {/* Summary */}
                    {personal.summary && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }}></span>
                                About
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                                {personal.summary}
                            </p>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }}></span>
                                Skills
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {skills.map((skill, index) => (
                                    <span key={index} style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }}></span>
                                Education
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#111827' }}>{edu.degree}</h4>
                                        <div style={{ fontSize: '0.95rem', color: accentColor, fontWeight: 600 }}>{edu.fieldOfStudy}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>{edu.school}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }}></span>
                                Certifications
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {certifications.map(cert => (
                                    <div key={cert.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${accentColor}20`, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem', fontWeight: 800 }}>✓</div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>{cert.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{cert.issuer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Main Content) */}
                <div>
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                Experience
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {experience.map(exp => (
                                    <div key={exp.id} style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '-16px', top: '8px', width: '8px', height: '8px', borderRadius: '50%', background: accentColor }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#111827' }}>{exp.title}</h4>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: accentColor, background: `${accentColor}15`, padding: '0.2rem 0.75rem', borderRadius: 'full' }}>
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '1.05rem', color: '#4b5563', fontWeight: 600, marginBottom: '1rem' }}>
                                            {exp.company} {exp.location && `• ${exp.location}`}
                                        </div>
                                        {exp.description && (
                                            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                Projects
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#111827' }}>{proj.name}</h4>
                                                {proj.link && <a href={proj.link} style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.85rem', color: 'white', background: '#111827', padding: '0.2rem 0.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Visit ↗</a>}
                                            </div>
                                            <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>
                                                {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
}
