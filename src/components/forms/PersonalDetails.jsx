import React from 'react';
import AIHelper from '../AIHelper';

export default function PersonalDetails({ data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({ ...data, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Personal Details</h2>

            <div className="form-group">
                <label className="form-label">Profile Picture (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {data.photo && (
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)', flexShrink: 0 }}>
                            <img src={data.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="form-input"
                        style={{ flex: 1, padding: '0.5rem' }}
                    />
                </div>
                {data.photo && (
                    <button type="button" onClick={() => onChange({ ...data, photo: '' })} style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--error)' }}>
                        Remove Picture
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-input"
                        value={data.firstName}
                        onChange={handleChange}
                        placeholder="John"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-input"
                        value={data.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                    type="text"
                    name="jobTitle"
                    className="form-input"
                    value={data.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Location</label>
                <input
                    type="text"
                    name="location"
                    className="form-input"
                    value={data.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                />
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Professional Summary</label>
                    <AIHelper
                        action="summary"
                        payload={{ jobTitle: data.jobTitle }}
                        onResult={(result) => onChange({ ...data, summary: result })}
                        tooltip="Generate a professional summary"
                    />
                </div>
                <textarea
                    name="summary"
                    className="form-input"
                    value={data.summary}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write a brief summary about your professional background..."
                />
            </div>
        </div>
    );
}
