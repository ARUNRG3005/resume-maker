import React from 'react';

export default function TemplateMinimal({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-minimal" style={{ padding: '3.5rem', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#000', lineHeight: 1.5, background: '#fff' }}>
            {/* Header */}
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 300, margin: '0 0 0.5rem 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    <strong>{personal.firstName}</strong> {personal.lastName}
                </h1>
                <div style={{ fontSize: '1.2rem', color: '#555', marginBottom: '1rem', letterSpacing: '1px' }}>
                    {personal.jobTitle}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#333', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '0.75rem 0' }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <p style={{ fontSize: '1rem', color: '#444', textAlign: 'justify', margin: 0 }}>
                        {personal.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                        Experience
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{exp.title}</h3>
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1rem', color: '#333', marginBottom: '0.75rem', fontWeight: 500 }}>
                                    {exp.company} {exp.location && `| ${exp.location}`}
                                </div>
                                {exp.description && (
                                    <p style={{ fontSize: '0.95rem', color: '#444', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                        Projects
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} style={{ fontSize: '0.85rem', color: '#666', textDecoration: 'underline' }}>Link</a>}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                        {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                    </span>
                                </div>
                                {proj.description && (
                                    <p style={{ fontSize: '0.95rem', color: '#444', margin: 0, whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Left Column */}
                <div>
                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                Education
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{edu.school}</h3>
                                        <div style={{ fontSize: '0.95rem', color: '#333' }}>{edu.degree}, {edu.fieldOfStudy}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div>
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                Skills
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.6, margin: 0 }}>
                                {skills.join(' • ')}
                            </p>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                Certifications
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {certifications.map(cert => (
                                    <div key={cert.id}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333' }}>{cert.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{cert.issuer}</div>
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
