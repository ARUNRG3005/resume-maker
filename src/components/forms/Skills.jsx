import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AIHelper from '../AIHelper';

export default function Skills({ data, onChange, jobTitle }) {
    const [skillInput, setSkillInput] = useState('');

    const addSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !data.includes(skillInput.trim())) {
            onChange([...data, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        onChange(data.filter(skill => skill !== skillToRemove));
    };

    return (
        <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>Skills</h2>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <form onSubmit={addSkill} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        className="form-input"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. React, Python, Project Management..."
                    />
                    <button type="submit" className="btn btn-primary">
                        <Plus size={18} /> Add
                    </button>
                </form>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {data.map((skill, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem'
                            }}
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    opacity: 0.8
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    {data.length === 0 && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                            Add some skills to your resume.
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>AI Skill Suggestions</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Get tailored skill suggestions based on your job title.</p>
                        </div>
                        <AIHelper
                            action="skills"
                            payload={{ jobTitle, existingSkills: data }}
                            onResult={(result) => onChange([...data, ...result])}
                            tooltip="Suggest Skills"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
