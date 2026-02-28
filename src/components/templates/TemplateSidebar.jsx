import React from 'react';

export default function TemplateSidebar({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Deep slate blue sidebar
    const sidebarBg = '#0f172a';
    const sidebarText = '#e2e8f0';

    return (
        <div className="template-sidebar" style={{ display: 'flex', minHeight: '11in', fontFamily: "'Arial', sans-serif" }}>

            {/* Left Sidebar */}
            <aside style={{ width: '32%', background: sidebarBg, color: sidebarText, padding: '3rem 2rem', borderRight: '1px solid #334155' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    {personal.photo && (
                        <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem auto', border: '3px solid #38bdf8' }}>
                            <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'white', lineHeight: 1.2 }}>
                        {personal.firstName} {personal.lastName}
                    </h1>
                    <div style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {personal.jobTitle}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h2 style={{ fontSize: '1.1rem', color: 'white', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>Contact</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                            {personal.email && <div><strong>E:</strong> {personal.email}</div>}
                            {personal.phone && <div><strong>P:</strong> {personal.phone}</div>}
                            {personal.location && <div><strong>L:</strong> {personal.location}</div>}
                        </div>
                    </section>

                    {skills.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.1rem', color: 'white', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>Skills</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {skills.map((skill, index) => (
                                    <span key={index} style={{ background: '#1e293b', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.1rem', color: 'white', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>Education</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{edu.degree}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{edu.fieldOfStudy}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.school}</div>
                                        <div style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ width: '68%', background: 'white', padding: '3rem 3.5rem', color: '#1e293b', lineHeight: 1.6 }}>

                {personal.summary && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 800 }}>Profile Summary</h2>
                        <p style={{ fontSize: '1rem', color: '#475569', margin: 0, textAlign: 'justify' }}>
                            {personal.summary}
                        </p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Experience</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{exp.title}</h3>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38bdf8' }}>
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '1.05rem', color: '#64748b', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        {exp.company} {exp.location && `| ${exp.location}`}
                                    </div>
                                    {exp.description && (
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects.length > 0 && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Projects</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{proj.name}</h3>
                                            {proj.link && <a href={proj.link} style={{ fontSize: '0.8rem', background: '#e2e8f0', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>Link</a>}
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                                            {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                                        </span>
                                    </div>
                                    {proj.description && (
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications.length > 0 && (
                    <section>
                        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Licenses & Certs</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {certifications.map(cert => (
                                <div key={cert.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{cert.name}</h3>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
