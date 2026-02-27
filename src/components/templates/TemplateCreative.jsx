import React from 'react';

export default function TemplateCreative({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-creative" style={{ padding: '3rem', fontFamily: "'Outfit', 'Inter', sans-serif", color: '#1f2937' }}>

            {/* Header Accent block */}
            <header style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-1px', lineHeight: 1 }}>
                            {personal.firstName || 'First'} {personal.lastName || 'Last'}
                        </h1>
                        <div style={{ fontSize: '1.25rem', fontWeight: 500, opacity: 0.9, letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {personal.jobTitle || 'Professional Title'}
                        </div>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '0.95rem', opacity: 0.9, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {personal.email && <div>{personal.email}</div>}
                        {personal.phone && <div>{personal.phone}</div>}
                        {personal.location && <div>{personal.location}</div>}
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '3rem' }}>

                {/* Main Content (Left) */}
                <div>
                    {/* Summary */}
                    {personal.summary && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>{personal.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '24px', background: '#4f46e5', borderRadius: '4px' }}></span>
                                Experience
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {experience.map(exp => (
                                    <div key={exp.id} style={{ position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>{exp.title}</h3>
                                                <div style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 500 }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', color: '#4f46e5', fontWeight: 600, background: 'rgba(79, 70, 229, 0.1)', padding: '4px 12px', borderRadius: 'full' }}>
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </span>
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
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '24px', background: '#8b5cf6', borderRadius: '4px' }}></span>
                                Projects
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id} style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '12px', background: '#f9fafb' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#111827', marginBottom: '0.25rem' }}>{proj.name}</h3>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                                            {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                            {proj.link && <a href={proj.link} style={{ marginLeft: '0.5rem', color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>Link ↗</a>}
                                        </div>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column (Right) */}
                <div>
                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                                Education
                            </h2>
                            {education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: '1.25rem' }}>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: 0 }}>{edu.degree}</h4>
                                    <div style={{ fontSize: '0.95rem', color: '#4f46e5', fontWeight: 500 }}>{edu.fieldOfStudy}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>{edu.school}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                                Skills
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {skills.map((skill, index) => (
                                    <span key={index} style={{
                                        background: 'white',
                                        border: '1px solid #d1d5db',
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        color: '#4b5563',
                                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                                Certifications
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {certifications.map(cert => (
                                    <div key={cert.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', flexShrink: 0 }}>
                                            ★
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '0.95rem', color: '#111827' }}>{cert.name}</strong>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{cert.issuer} • {formatDate(cert.date)}</span>
                                        </div>
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
