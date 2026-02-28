import React from 'react';

export default function TemplateGrid({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-grid" style={{ padding: '3rem', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#27272a', background: '#f4f4f5', minHeight: '11in' }}>

            {/* Header Block */}
            <header style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {personal.photo && (
                    <div style={{ width: '120px', height: '120px', flexShrink: 0, borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#18181b' }}>
                        {personal.firstName} {personal.lastName}
                    </h1>
                    <div style={{ fontSize: '1.25rem', color: '#f97316', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {personal.jobTitle}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: '#52525b' }}>
                        {personal.email && <span>📧 {personal.email}</span>}
                        {personal.phone && <span>📱 {personal.phone}</span>}
                        {personal.location && <span>📍 {personal.location}</span>}
                    </div>
                </div>
            </header>

            {/* Masonry Grid Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignItems: 'start' }}>

                {/* Column 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Summary */}
                    {personal.summary && (
                        <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Profile</h2>
                            <p style={{ fontSize: '0.95rem', color: '#52525b', lineHeight: 1.6, margin: 0 }}>
                                {personal.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1.5rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Experience</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#18181b' }}>{exp.title}</h3>
                                            <span style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 600 }}>
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.95rem', color: '#52525b', fontWeight: 600, marginBottom: '0.5rem' }}>
                                            {exp.company} {exp.location && `• ${exp.location}`}
                                        </div>
                                        {exp.description && (
                                            <p style={{ fontSize: '0.9rem', color: '#52525b', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Column 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1.5rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Projects</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {projects.map(proj => (
                                    <div key={proj.id} style={{ borderLeft: '3px solid #f97316', paddingLeft: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#18181b' }}>{proj.name}</h3>
                                            <span style={{ fontSize: '0.8rem', color: '#71717a' }}>{formatDate(proj.startDate)}</span>
                                        </div>
                                        {proj.description && (
                                            <p style={{ fontSize: '0.9rem', color: '#52525b', lineHeight: 1.5, margin: '0.25rem 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                        )}
                                        {proj.link && <a href={proj.link} style={{ fontSize: '0.85rem', color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>View Project →</a>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Split Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {education.length > 0 && (
                            <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Education</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#18181b' }}>{edu.degree}</h3>
                                            <div style={{ fontSize: '0.9rem', color: '#52525b' }}>{edu.fieldOfStudy} @ {edu.school}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Skills</h2>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {skills.map((skill, index) => (
                                        <span key={index} style={{ background: '#f4f4f5', color: '#3f3f46', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications.length > 0 && (
                            <section style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181b', marginBottom: '1rem', borderBottom: '2px solid #f4f4f5', paddingBottom: '0.5rem' }}>Awards & Certs</h2>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#52525b', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {certifications.map(cert => (
                                        <li key={cert.id}><strong>{cert.name}</strong> — {cert.issuer}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
