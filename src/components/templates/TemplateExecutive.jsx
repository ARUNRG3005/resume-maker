import React from 'react';

export default function TemplateExecutive({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-executive" style={{ padding: '3.5rem', fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: '#1a1a1a', lineHeight: 1.6 }}>
            {/* Header */}
            <header style={{ display: 'flex', gap: '2rem', borderBottom: '3px solid #1e3a8a', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                {personal.photo && (
                    <div style={{ width: '130px', height: '130px', flexShrink: 0 }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e3a8a', letterSpacing: '-0.5px' }}>
                        {personal.firstName} {personal.lastName}
                    </h1>
                    <h2 style={{ fontSize: '1.4rem', color: '#4b5563', margin: '0 0 1rem 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {personal.jobTitle}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '1.5rem', rowGap: '0.5rem', fontSize: '0.95rem', color: '#374151', fontFamily: "'Arial', sans-serif" }}>
                        {personal.email && <span><strong>Email:</strong> {personal.email}</span>}
                        {personal.phone && <span><strong>Phone:</strong> {personal.phone}</span>}
                        {personal.location && <span><strong>Location:</strong> {personal.location}</span>}
                    </div>
                </div>
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Professional Summary</h3>
                    <p style={{ fontSize: '1rem', color: '#374151', textAlign: 'justify', lineHeight: 1.7, fontFamily: "'Arial', sans-serif" }}>
                        {personal.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Professional Experience</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>{exp.title}</h4>
                                    <span style={{ fontSize: '0.95rem', color: '#1e3a8a', fontWeight: 600, fontFamily: "'Arial', sans-serif" }}>
                                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1.05rem', color: '#4b5563', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                                    {exp.company} {exp.location && `• ${exp.location}`}
                                </div>
                                {exp.description && (
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#374151', margin: 0, fontFamily: "'Arial', sans-serif", whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Left Column Data */}
                <div>
                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Education</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 0.25rem 0' }}>{edu.degree}, {edu.fieldOfStudy}</h4>
                                        <div style={{ fontSize: '1rem', color: '#4b5563', fontStyle: 'italic', marginBottom: '0.25rem' }}>{edu.school}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#1e3a8a', fontFamily: "'Arial', sans-serif", fontWeight: 600 }}>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Certifications & Awards</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'Arial', sans-serif" }}>
                                {certifications.map(cert => (
                                    <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>{cert.name}</span>
                                        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{cert.issuer}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column Data */}
                <div>
                    {/* Projects */}
                    {projects.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Key Initiatives</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#111827' }}>{proj.name}</h4>
                                            {proj.link && <a href={proj.link} style={{ fontSize: '0.85rem', color: '#1e3a8a', textDecoration: 'underline', fontFamily: "'Arial', sans-serif" }}>Link</a>}
                                        </div>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#374151', margin: 0, fontFamily: "'Arial', sans-serif", whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Core Competencies (Skills) */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e3a8a', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Core Competencies</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontFamily: "'Arial', sans-serif" }}>
                                {skills.map(skill => (
                                    <span key={skill.id} style={{ color: '#111827', fontSize: '0.95rem', fontWeight: 600, borderRight: '1px solid #d1d5db', paddingRight: '0.75rem' }}>
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

        </div>
    );
}
