import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Education({ data, onChange }) {
    const addEducation = () => {
        const newItem = {
            id: crypto.randomUUID(),
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
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
                <h2 style={{ fontSize: '1.25rem' }}>Education</h2>
                <button onClick={addEducation} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <Plus size={16} /> Add
                </button>
            </div>

            {data.map((item, index) => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Education #{index + 1}</h3>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">School / University</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.school}
                                onChange={(e) => updateItem(item.id, 'school', e.target.value)}
                                placeholder="Harvard University"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Degree</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.degree}
                                onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
                                placeholder="Bachelors"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Field of Study</label>
                        <input
                            type="text"
                            className="form-input"
                            value={item.fieldOfStudy}
                            onChange={(e) => updateItem(item.id, 'fieldOfStudy', e.target.value)}
                            placeholder="Computer Science"
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
                            <label className="form-label">End Date (or Expected)</label>
                            <input
                                type="month"
                                className="form-input"
                                value={item.endDate}
                                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>
                        <label className="form-label">Description (Optional)</label>
                        <textarea
                            className="form-input"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            rows={3}
                            placeholder="Relevant coursework, honors, GPA..."
                        />
                    </div>
                </div>
            ))}

            {data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No education entries added yet.
                </div>
            )}
        </div>
    );
}
