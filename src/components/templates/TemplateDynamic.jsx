import React from 'react';

export default function TemplateDynamic({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="template-dynamic" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2.5fr', minHeight: '11in', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#27272a', background: 'white' }}>

            {/* Left Sidebar */}
            <aside style={{ background: 'linear-gradient(180deg, #6366f1 0%, #4338ca 100%)', color: 'white', padding: '3rem 2rem' }}>
                {personal.photo && (
                    <div style={{ width: '150px', height: '150px', margin: '0 auto 2rem auto', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.2)' }}>
                        <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
                        {personal.firstName} <br /> {personal.lastName}
                    </h1>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#e0e7ff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {personal.jobTitle}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Contact */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: '#e0e7ff' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'white', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Contact</h3>
                        {personal.email && <div>{personal.email}</div>}
                        {personal.phone && <div>{personal.phone}</div>}
                        {personal.location && <div>{personal.location}</div>}
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'white', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Skills</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem', color: '#e0e7ff' }}>
                                {skills.map((skill, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%' }}></div>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'white', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Education</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{edu.degree}</div>
                                        <div style={{ color: '#e0e7ff', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{edu.fieldOfStudy}</div>
                                        <div style={{ color: '#818cf8', fontSize: '0.85rem' }}>{edu.school}</div>
                                        <div style={{ color: '#818cf8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ padding: '3rem 4rem' }}>
                {/* Summary */}
                {personal.summary && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 1.5rem 0' }}>
                            <div style={{ width: '40px', height: '4px', background: '#4f46e5' }}></div>
                            Profile
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
                            {personal.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 2rem 0' }}>
                            <div style={{ width: '40px', height: '4px', background: '#4f46e5' }}></div>
                            Experience
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#111827' }}>{exp.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '1.05rem', color: '#4f46e5', fontWeight: 600 }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#6b7280', background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: 'full', fontWeight: 500 }}>
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 2rem 0' }}>
                            <div style={{ width: '40px', height: '4px', background: '#4f46e5' }}></div>
                            Projects
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {projects.map(proj => (
                                <div key={proj.id} style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>{proj.name}</h3>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>{formatDate(proj.startDate)}</span>
                                    </div>
                                    {proj.description && (
                                        <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#4b5563', margin: '0 0 1rem 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                                    )}
                                    {proj.link && <a href={proj.link} style={{ display: 'inline-block', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>View Link →</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications (if space allows, since right column is getting long) */}
                {certifications.length > 0 && (
                    <section>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 1.5rem 0' }}>
                            <div style={{ width: '30px', height: '3px', background: '#4f46e5' }}></div>
                            Licenses & Certifications
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {certifications.map(cert => (
                                <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '1.05rem' }}>{cert.name}</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
