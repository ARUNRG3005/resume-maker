import React from 'react';

export default function TemplateCorporate({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-corporate" style={{ padding: '3.5rem', fontFamily: "'Times New Roman', Times, serif", color: '#111827', lineHeight: 1.5, background: '#fff' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 700, margin: '0 0 0.5rem 0', textTransform: 'uppercase', color: '#1f2937' }}>
                    {personal.firstName} {personal.lastName}
                </h1>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '1rem', color: '#4b5563' }}>
                    {personal.location && <span>{personal.location}</span>}
                    {(personal.location && (personal.phone || personal.email)) && <span>|</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {(personal.phone && personal.email) && <span>|</span>}
                    {personal.email && <span>{personal.email}</span>}
                </div>
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                        Professional Summary
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#374151', textAlign: 'justify', margin: 0 }}>
                        {personal.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                        Professional Experience
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{exp.company}</h3>
                                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>
                                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                    <div style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#4b5563' }}>{exp.title}</div>
                                    <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>{exp.location}</div>
                                </div>
                                {exp.description && (
                                    <p style={{ fontSize: '1rem', color: '#374151', margin: 0, paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                        Selected Projects
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} style={{ fontSize: '0.9rem', color: '#4b5563', textDecoration: 'underline' }}>Link</a>}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#4b5563' }}>
                                        {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                    </span>
                                </div>
                                {proj.description && (
                                    <p style={{ fontSize: '1rem', color: '#374151', margin: 0, paddingLeft: '1rem', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                        Education
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {education.map(edu => (
                            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{edu.school}</h3>
                                    <div style={{ fontSize: '1.05rem', color: '#4b5563', fontStyle: 'italic' }}>{edu.degree}, {edu.fieldOfStudy}</div>
                                </div>
                                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#4b5563' }}>
                                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div style={{ display: 'flex', gap: '3rem' }}>
                {/* Skills */}
                {skills.length > 0 && (
                    <section style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                            Core Competencies
                        </h2>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', columns: 2, columnGap: '2rem' }}>
                            {skills.map((skill, i) => (
                                <li key={i} style={{ fontSize: '1rem', marginBottom: '0.25rem', color: '#374151' }}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <section style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.25rem', marginBottom: '1rem', color: '#374151' }}>
                            Certifications
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {certifications.map(cert => (
                                <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#374151' }}>{cert.name}</div>
                                    <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
