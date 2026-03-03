// AI Services interacting with the secure Netlify Backend API Endpoint
const API_ENDPOINT = '/.netlify/functions/ai';

export const generateSummary = async (jobTitle, experience, skills) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'generateSummary',
                payload: { jobTitle, experience, skills }
            })
        });

        if (!response.ok) throw new Error("Failed to generate summary from backend");

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("AI Generate Summary Error:", error);
        throw error;
    }
};

export const enhanceDescription = async (text) => {
    if (!text) return text;
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'enhanceDescription',
                payload: { text }
            })
        });

        if (!response.ok) throw new Error("Failed to enhance description from backend");

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("AI Enhance Description Error:", error);
        throw error;
    }
};

export const suggestSkills = async (jobTitle, existingSkills) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'suggestSkills',
                payload: { jobTitle, existingSkills }
            })
        });

        if (!response.ok) throw new Error("Failed to suggest skills from backend");

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("AI Suggest Skills Error:", error);
        throw error;
    }
};

export const analyzeATSScore = async (missingKeywords) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'analyzeATS',
                payload: { missingKeywords }
            })
        });

        if (!response.ok) throw new Error("Failed to analyze ATS from backend");

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("AI ATS Analysis Error:", error);
        throw error;
    }
};
