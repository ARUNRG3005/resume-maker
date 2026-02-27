import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import AIHelper from '../AIHelper';

export default function Experience({ data, onChange }) {
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
                <button onClick={addExperience} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <Plus size={16} /> Add
                </button>
            </div>

            {data.map((item, index) => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Experience #{index + 1}</h3>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Job Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.title}
                                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="form-group">
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

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-input"
                            value={item.location}
                            onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                            placeholder="Mountain View, CA"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="month"
                                className="form-input"
                                value={item.startDate}
                                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
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

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id={`current-${item.id}`}
                            checked={item.current}
                            onChange={(e) => updateItem(item.id, 'current', e.target.checked)}
                        />
                        <label htmlFor={`current-${item.id}`} style={{ fontSize: '0.875rem' }}>I currently work here</label>
                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>Description</label>
                            <AIHelper
                                action="enhance"
                                payload={{ text: item.description }}
                                onResult={(result) => updateItem(item.id, 'description', result)}
                                tooltip="Enhance description with AI"
                            />
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
