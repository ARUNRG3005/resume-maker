import React from 'react';

export default function TemplateModern({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-modern" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3rem', fontFamily: "'Inter', sans-serif", color: '#1e293b' }}>

            {/* Left Column - Accent */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', color: '#2563eb' }}>
                    {personal.firstName || 'First'} <br /> {personal.lastName || 'Last'}
                </h2>
                {personal.jobTitle && (
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#475569', marginBottom: '1.5rem' }}>
                        {personal.jobTitle}
                    </div>
                )}

                {/* Contact Info */}
                <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#334155' }}>
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Contact</h3>
                    {personal.email && <div style={{ marginBottom: '0.5rem' }}>📧 {personal.email}</div>}
                    {personal.phone && <div style={{ marginBottom: '0.5rem' }}>📞 {personal.phone}</div>}
                    {personal.location && <div style={{ marginBottom: '0.5rem' }}>📍 {personal.location}</div>}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Skills</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: '#334155' }}>
                            {skills.map((skill, index) => (
                                <span key={index} style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px' }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Certifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                            {certifications.map(cert => (
                                <div key={cert.id}>
                                    <strong style={{ display: 'block', color: '#2563eb' }}>{cert.name}</strong>
                                    <span style={{ color: '#475569' }}>{cert.issuer}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column - Main Content */}
            <div style={{ padding: '0.5rem 0' }}>

                {/* Summary */}
                {personal.summary && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                            Profile
                        </h3>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#334155' }}>{personal.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                            Experience
                        </h3>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{exp.title}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600, background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1rem', color: '#475569', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    {exp.company} • {exp.location}
                                </div>
                                {exp.description && (
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#334155', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                            Education
                        </h3>
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{edu.school}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}>
                                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                </div>
                                {edu.description && (
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                            Projects
                        </h3>
                        {projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{proj.name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                        {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                    </span>
                                </div>
                                {proj.description && (
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#334155', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}
            </div>

        </div>
    );
}
