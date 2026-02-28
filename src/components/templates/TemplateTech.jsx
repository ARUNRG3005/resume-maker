import React from 'react';

export default function TemplateTech({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-tech" style={{ padding: '3rem', fontFamily: "'Inter', sans-serif", color: '#1f2937', lineHeight: 1.6 }}>
            {/* Header */}
            <header style={{ borderBottom: '4px solid #0ea5e9', paddingBottom: '2rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ maxWidth: '70%' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#0f172a', letterSpacing: '-1px' }}>
                        {personal.firstName} {personal.lastName}
                    </h1>
                    <h2 style={{ fontSize: '1.5rem', color: '#0ea5e9', margin: '0 0 1.5rem 0', fontWeight: 600, fontFamily: "'Courier New', Courier, monospace" }}>
                        &gt; {personal.jobTitle}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                        {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✉ {personal.email}</span>}
                        {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✆ {personal.phone}</span>}
                        {personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚲ {personal.location}</span>}
                    </div>
                </div>

                {personal.photo && (
                    <div style={{ width: '140px', height: '140px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e2e8f0', boxShadow: '4px 4px 0px #0ea5e9' }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <p style={{ fontSize: '1.05rem', color: '#334155', leading: 1.7, background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #cbd5e1' }}>
                        {personal.summary}
                    </p>
                </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                {/* Left Column - Main Experience & Projects */}
                <div>
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase' }}>
                                // Experience
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {experience.map(exp => (
                                    <div key={exp.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #e2e8f0' }}>
                                        <div style={{ position: 'absolute', left: '-6px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: '#0ea5e9' }}></div>
                                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{exp.title}</h4>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.95rem', color: '#64748b', fontWeight: 500, margin: '0.25rem 0 1rem 0' }}>
                                            <span style={{ color: '#0ea5e9' }}>@{exp.company}</span>
                                            <span>•</span>
                                            <span>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                                        </div>
                                        {exp.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase' }}>
                                // Projects built
                            </h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{proj.name}</h4>
                                            {proj.link && <a href={proj.link} style={{ display: 'inline-block', fontSize: '0.85rem', color: '#ffffff', background: '#0ea5e9', padding: '0.2rem 0.6rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>Source</a>}
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>{formatDate(proj.startDate)} - {formatDate(proj.endDate)}</p>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Secondary Info */}
                <div>
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase' }}>
                                // Tech Stack
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {skills.map((skill, index) => (
                                    <span key={index} style={{ background: '#f1f5f9', color: '#334155', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase' }}>
                                // Education
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{edu.degree}</h4>
                                        <div style={{ fontSize: '0.95rem', color: '#0ea5e9', fontWeight: 500, marginBottom: '0.25rem' }}>{edu.fieldOfStudy}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{edu.school}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase' }}>
                                // Certs
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {certifications.map(cert => (
                                    <div key={cert.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid #0ea5e9' }}>
                                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{cert.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{cert.issuer}</div>
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
