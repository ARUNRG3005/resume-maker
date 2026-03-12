import React, { useState, useRef } from 'react';
import { X, Plus, Upload, Loader2, AlertCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Set up PDF.js worker using Vite local asset loading
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export default function StartModal({ onClose, onStartWithData, onStartScratch }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            // 1. Read PDF as ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
            
            // 2. Parse PDF with pdf.js
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\\n';
            }
            
            if (!fullText.trim()) {
                throw new Error("Could not extract any text from the PDF. It may be an image-based PDF.");
            }

            // 3. Send text to our AI service
            const ai = await import('../services/ai.js');
            const parsedData = await ai.parseResume(fullText);
            
            if (!parsedData || !parsedData.personal) {
                 throw new Error("Failed to map resume data correctly.");
            }

            // 4. Pass parsed data to parent and close modal
            onStartWithData(parsedData);
        } catch (err) {
            console.error("PDF Parsing Error:", err);
            setError(err.message || 'Failed to process the PDF. Please try again or create from scratch.');
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="glass-panel animate-fade-in" style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg), var(--neon-glow)'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>How would you like to start?</h3>
                    <button onClick={onClose} disabled={isProcessing} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {error && (
                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button 
                            onClick={onStartScratch}
                            disabled={isProcessing}
                            className="btn btn-primary" 
                            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto' }}
                        >
                            <Plus size={32} />
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Create from Scratch</span>
                            <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 400 }}>Start with a blank canvas and follow our guided wizard</span>
                        </button>
                        
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0.5rem 0', fontSize: '0.9rem' }}>OR</div>
                        
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handleFileUpload} 
                                ref={fileInputRef}
                                style={{ display: 'none' }} 
                            />
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                disabled={isProcessing}
                                className="btn btn-outline" 
                                style={{ width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: 'auto', background: 'rgba(0, 240, 255, 0.05)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Analyzing PDF...</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Our AI is extracting your info</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={32} color="var(--primary)" />
                                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Upload Existing Resume (PDF)</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>We'll extract your data into our beautiful templates</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
