import React from 'react';

// A single-column, high-density layout designed for maximum information packing. No profile picture.
export default function TemplateCompact({ data }) {
    const { personal, education, experience, skills, projects, certifications } = data;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'numeric', year: 'numeric' });
    };

    return (
        <div className="template-compact" style={{ padding: '2rem 2.5rem', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#000', lineHeight: 1.4, fontSize: '11px' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 2px 0', textTransform: 'uppercase' }}>
                    {personal.firstName} {personal.lastName}
                </h1>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#111' }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>| {personal.phone}</span>}
                    {personal.location && <span>| {personal.location}</span>}
                    {personal.jobTitle && <span style={{ fontWeight: 600 }}>| {personal.jobTitle}</span>}
                </div>
            </header>

            {/* Summary */}
            {personal.summary && (
                <section style={{ marginBottom: '1rem' }}>
                    <p style={{ margin: 0, textAlign: 'justify' }}>{personal.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>Experience</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <span style={{ fontWeight: 700 }}>{exp.company}</span>
                                        {exp.location && <span>, {exp.location}</span>}
                                        <span> — <em>{exp.title}</em></span>
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: '10px' }}>
                                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p style={{ margin: '2px 0 0 0', whiteSpace: 'pre-wrap', paddingLeft: '8px' }}>• {exp.description.replace(/\n/g, '\n• ')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>Projects</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <span style={{ fontWeight: 700 }}>{proj.name}</span>
                                        {proj.link && <span> | <a href={proj.link} style={{ color: '#000' }}>Link</a></span>}
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: '10px' }}>
                                        {formatDate(proj.startDate)} – {formatDate(proj.endDate)}
                                    </span>
                                </div>
                                {proj.description && (
                                    <p style={{ margin: '2px 0 0 0', whiteSpace: 'pre-wrap', paddingLeft: '8px' }}>- {proj.description.replace(/\n/g, '\n- ')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>Education</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {education.map(edu => (
                            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <span style={{ fontWeight: 700 }}>{edu.school}</span>
                                    <span> — {edu.degree}, {edu.fieldOfStudy}</span>
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '10px' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
                {/* Skills */}
                {skills.length > 0 && (
                    <section style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>Skills</h3>
                        <p style={{ margin: 0 }}>
                            {skills.map(s => s.name).join(', ')}
                        </p>
                    </section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <section style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>Certifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {certifications.map(cert => (
                                <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 600 }}>{cert.name}</span>
                                    <span style={{ fontSize: '10px' }}>{cert.issuer}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </div>
    );
}
