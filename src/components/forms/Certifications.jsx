import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Certifications({ data, onChange }) {
    const addCertification = () => {
        const newItem = {
            id: crypto.randomUUID(),
            name: '',
            issuer: '',
            date: '',
            link: ''
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
                <h2 style={{ fontSize: '1.25rem' }}>Certifications</h2>
                <button onClick={addCertification} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <Plus size={16} /> Add
                </button>
            </div>

            {data.map((item, index) => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Certification #{index + 1}</h3>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Certification Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Issuing Organization</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.issuer}
                                onChange={(e) => updateItem(item.id, 'issuer', e.target.value)}
                                placeholder="Amazon Web Services"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Issue Date</label>
                            <input
                                type="month"
                                className="form-input"
                                value={item.date}
                                onChange={(e) => updateItem(item.id, 'date', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Credential URL (optional)</label>
                            <input
                                type="url"
                                className="form-input"
                                value={item.link}
                                onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                                placeholder="https://credential.net/..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            {data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No certification entries added yet.
                </div>
            )}
        </div>
    );
}
