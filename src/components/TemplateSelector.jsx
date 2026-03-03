import React, { useState } from 'react';
import { resumeCategories } from '../data/categories';

// Placeholder array combining dummy UI data with structural template imports.
const ALL_TEMPLATES = [
    { id: 'Minimalist', name: 'Minimalist' },
    { id: 'Modern Split', name: 'Modern Split' },
    { id: 'Creative Focus', name: 'Creative Focus' },
    { id: 'Elegant Serif', name: 'Elegant Serif' },
    { id: 'Tech Terminal', name: 'Tech Terminal' },
    { id: 'Executive Classic', name: 'Executive Classic' },
    { id: 'Ultra Compact', name: 'Ultra Compact' },
    { id: 'Dynamic Sidebar', name: 'Dynamic Sidebar' },
    { id: 'Strict Minimal', name: 'Strict Minimal' },
    { id: 'Corporate Standard', name: 'Corporate Standard' },
    { id: 'Modern Accent', name: 'Modern Accent' },
    { id: 'Masonry Grid', name: 'Masonry Grid' },
    { id: 'Slate Sidebar', name: 'Slate Sidebar' }
];

export default function TemplateSelector({ currentTemplate, onSelect, onCategorySelect }) {
    const [activeCategory, setActiveCategory] = useState("IT"); // Default category

    // Filter templates so users only see designs suited for their career path
    const visibleTemplates = ALL_TEMPLATES.filter(template =>
        resumeCategories[activeCategory]?.includes(template.id)
    );

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        if (onCategorySelect) onCategorySelect(category);
    };

    return (
        <div className="flex flex-col gap-6">

            {/* Category Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b pb-4">
                {Object.keys(resumeCategories).map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeCategory === category
                                ? 'bg-blue-600 text-white border-b-2 border-blue-800'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Filtered Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {visibleTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        className={`p-6 border-2 rounded-lg transition-all focus:outline-none ${currentTemplate === template.id
                                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                                : 'border-gray-200 hover:border-blue-400 hover:shadow-md bg-white'
                            }`}
                    >
                        <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">
                            [Preview {template.name}]
                        </div>
                        <h3 className="text-lg font-semibold text-center text-gray-800">{template.name}</h3>
                    </button>
                ))}
            </div>

            {visibleTemplates.length === 0 && (
                <p className="text-gray-500 text-center py-8">No templates found for this category.</p>
            )}
        </div>
    );
}
