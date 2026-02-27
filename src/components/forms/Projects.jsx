import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import AIHelper from '../AIHelper';

export default function Projects({ data, onChange }) {
    const addProject = () => {
        const newItem = {
            id: crypto.randomUUID(),
            name: '',
            link: '',
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
                <h2 style={{ fontSize: '1.25rem' }}>Projects</h2>
                <button onClick={addProject} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <Plus size={16} /> Add
                </button>
            </div>

            {data.map((item, index) => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Project #{index + 1}</h3>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Project Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                placeholder="E-commerce App"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Link (optional)</label>
                            <input
                                type="url"
                                className="form-input"
                                value={item.link}
                                onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                                placeholder="https://github.com/..."
                            />
                        </div>
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
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>Description</label>
                            <AIHelper
                                action="enhance"
                                payload={{ text: item.description }}
                                onResult={(result) => updateItem(item.id, 'description', result)}
                                tooltip="Enhance project description with AI"
                            />
                        </div>
                        <textarea
                            className="form-input"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            rows={4}
                            placeholder="Describe the project, technologies used, and your role..."
                        />
                    </div>
                </div>
            ))}

            {data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No project entries added yet.
                </div>
            )}
        </div>
    );
}
