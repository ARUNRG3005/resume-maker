import React from 'react';

export default function TemplateElegant({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-elegant" style={{ fontFamily: "'Georgia', serif", color: '#333', lineHeight: 1.6 }}>
            {/* Header */}
            <header style={{ background: '#1e293b', color: 'white', padding: '3rem', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                {personal.photo && (
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #cbd5e1', flexShrink: 0 }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 400, margin: '0 0 0.5rem 0', letterSpacing: '1px' }}>
                        {personal.firstName} <span style={{ fontWeight: 700 }}>{personal.lastName}</span>
                    </h1>
                    <h2 style={{ fontSize: '1.25rem', color: '#94a3b8', margin: '0 0 1rem 0', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {personal.jobTitle}
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#cbd5e1', fontFamily: "'Inter', sans-serif" }}>
                        {personal.email && <span>{personal.email}</span>}
                        {personal.phone && <span>{personal.phone}</span>}
                        {personal.location && <span>{personal.location}</span>}
                    </div>
                </div>
            </header>

            <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                {/* Left Column */}
                <div>
                    {/* Summary */}
                    {personal.summary && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>Profile</h3>
                            <p style={{ fontSize: '0.95rem', color: '#475569', textAlign: 'justify', fontFamily: "'Inter', sans-serif" }}>{personal.summary}</p>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>Expertise</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}>
                                {skills.map((skill, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: '#64748b' }}>•</span> {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>Certifications</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'Inter', sans-serif" }}>
                                {certifications.map(cert => (
                                    <div key={cert.id}>
                                        <div style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>{cert.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div style={{ fontFamily: "'Inter', sans-serif" }}>
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#0f172a', fontFamily: "'Georgia', serif" }}>Professional Experience</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>{exp.title}</h4>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '1rem', color: '#475569', fontWeight: 500, marginBottom: '0.75rem' }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                                        {exp.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#475569', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#0f172a', fontFamily: "'Georgia', serif" }}>Key Projects</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>{proj.name}</h4>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#475569', margin: 0, marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                        {proj.link && <a href={proj.link} style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.9rem', color: '#3b82f6', textDecoration: 'none' }}>View Project ↗</a>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#0f172a', fontFamily: "'Georgia', serif" }}>Education</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{edu.degree} in {edu.fieldOfStudy}</h4>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                                        </div>
                                        <div style={{ fontSize: '0.95rem', color: '#475569', marginTop: '0.25rem' }}>{edu.school}</div>
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
