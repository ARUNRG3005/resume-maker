import React from 'react';

export default function TemplateMinimalist({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-minimalist" style={{ padding: '3.5rem', fontFamily: "'Inter', sans-serif", color: '#333', lineHeight: 1.6 }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #333', paddingBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {personal.firstName || 'First'} {personal.lastName || 'Last'}
                </h1>
                {personal.jobTitle && (
                    <div style={{ fontSize: '1.2rem', fontWeight: 500, color: '#555', marginBottom: '0.5rem' }}>
                        {personal.jobTitle}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem', color: '#666', flexWrap: 'wrap' }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>• {personal.phone}</span>}
                    {personal.location && <span>• {personal.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.95rem', textAlign: 'justify' }}>{personal.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Professional Experience
                    </h2>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{exp.title}</h3>
                                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 500, color: '#444', marginBottom: '0.5rem' }}>
                                <span>{exp.company}</span>
                                <span>{exp.location}</span>
                            </div>
                            {exp.description && (
                                <p style={{ fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Education
                    </h2>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{edu.school}</h3>
                                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.95rem', color: '#444', marginBottom: '0.25rem' }}>
                                {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                            </div>
                            {edu.description && (
                                <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{edu.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Projects
                    </h2>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                                    {proj.name}
                                    {proj.link && <a href={proj.link} style={{ fontSize: '0.85rem', fontWeight: 400, marginLeft: '0.5rem', color: '#0066cc', textDecoration: 'none' }}>[Link]</a>}
                                </h3>
                                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                                    {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                </span>
                            </div>
                            {proj.description && (
                                <p style={{ fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Skills
                    </h2>
                    <div style={{ fontSize: '0.95rem' }}>
                        {skills.join(' • ')}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Certifications
                    </h2>
                    {certifications.map(cert => (
                        <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                            <div>
                                <strong>{cert.name}</strong> — {cert.issuer}
                                {cert.link && <a href={cert.link} style={{ fontSize: '0.85rem', marginLeft: '0.5rem', color: '#0066cc', textDecoration: 'none' }}>[Verify]</a>}
                            </div>
                            <span style={{ color: '#555', fontSize: '0.9rem' }}>{formatDate(cert.date)}</span>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}
