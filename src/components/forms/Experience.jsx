import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Target } from 'lucide-react';
import AIHelper from '../AIHelper';

export default function Experience({ data, onChange, jobTitle }) {
    const [targetJobDescription, setTargetJobDescription] = useState('');
    const [showJD, setShowJD] = useState(false);

    const addExperience = () => {
        const newItem = {
            id: crypto.randomUUID(),
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        onChange([...data, newItem]);
    };

    const updateItem = (id, field, value) => {
        const updated = data.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        onChange(updated);
    };

    const removeItem = (id) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>Work Experience</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setShowJD(!showJD)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: showJD ? 'var(--primary)' : 'var(--border)' }}>
                        <Target size={16} color={showJD ? 'var(--primary)' : 'inherit'} /> Tailor to Job
                    </button>
                    <button onClick={addExperience} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>

            {showJD && (
                <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', background: 'rgba(0, 240, 255, 0.05)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target size={18} color="var(--primary)" /> Target Job Description
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Paste the job posting description here. Once added, you can click "Tailor to Job" on any of your experience blocks to have AI re-write your experience specifically targeting this role.
                    </p>
                    <textarea
                        className="form-input"
                        style={{ minHeight: '120px' }}
                        value={targetJobDescription}
                        onChange={(e) => setTargetJobDescription(e.target.value)}
                        placeholder="Paste the job description (responsibilities, requirements)..."
                    />
                </div>
            )}

            {data.map((item, index) => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Experience #{index + 1}</h3>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="animate-fade-in delay-100">
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Job Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.title}
                                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.company}
                                onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                                placeholder="Google"
                            />
                        </div>
                    </div>

                    <div className="form-group animate-fade-in delay-200">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-input"
                            value={item.location}
                            onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                            placeholder="Mountain View, CA"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="animate-fade-in delay-300">
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Start Date</label>
                            <input
                                type="month"
                                className="form-input"
                                value={item.startDate}
                                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">End Date</label>
                            <input
                                type="month"
                                className="form-input"
                                value={item.endDate}
                                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                                disabled={item.current}
                            />
                        </div>
                    </div>

                    <div className="form-group animate-fade-in delay-400" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id={`current-${item.id}`}
                            checked={item.current}
                            onChange={(e) => updateItem(item.id, 'current', e.target.checked)}
                        />
                        <label htmlFor={`current-${item.id}`} style={{ fontSize: '0.875rem' }}>I currently work here</label>
                    </div>

                    <div className="form-group animate-fade-in delay-500" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>Description</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <AIHelper
                                    action="metrics"
                                    payload={{ text: item.description }}
                                    onResult={(result) => alert(`AI Suggestion:\n\n${result}`)} // For metrics, we just want to alert the suggestions instead of replacing
                                    tooltip="Suggest metrics (numbers/results) to add"
                                    customLabel="Metrics"
                                />
                                {targetJobDescription.trim() && (
                                    <AIHelper
                                        action="tailor"
                                        payload={{ text: item.description, jobTitle, jobDescription: targetJobDescription }}
                                        onResult={(result) => updateItem(item.id, 'description', result)}
                                        tooltip="Tailor to Job Description"
                                        customLabel="Tailor to Job"
                                        style={{ backgroundColor: 'rgba(255, 0, 234, 0.1)', color: '#ff00ea', border: '1px solid rgba(255, 0, 234, 0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                                    />
                                )}
                                <AIHelper
                                    action="enhance"
                                    payload={{ text: item.description }}
                                    onResult={(result) => updateItem(item.id, 'description', result)}
                                    tooltip="Fix grammar and improve phrasing"
                                    customLabel="Enhance"
                                />
                            </div>
                        </div>
                        <textarea
                            className="form-input"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            rows={5}
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </div>
                </div>
            ))}

            {data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No work experience entries added yet.
                </div>
            )}
        </div>
    );
}
