import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you have Vite environment variables setup
// Create a .env file with VITE_GEMINI_API_KEY=your_api_key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the API only if the key exists
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Use the standard model for general text tasks
const getModel = () => {
    if (!genAI) throw new Error("Gemini API key is not configured.");
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const generateSummary = async (jobTitle, experience, skills) => {
    try {
        const model = getModel();
        const prompt = `
      Act as an expert resume writer. 
      Write a professional summary for a ${jobTitle || 'general professional'}.
      They have experience in: ${experience ? experience.map(e => e.title).join(', ') : 'various roles'}.
      Key skills include: ${skills ? skills.join(', ') : 'general professional skills'}.
      
      Keep it to 3-4 impactful sentences. Do not use generic buzzwords. Highlight achievements and value.
      Return ONLY the summary text, no conversational filler or markdown.
    `;
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Generate Summary Error:", error);
        throw error;
    }
};

export const enhanceDescription = async (text) => {
    if (!text) return text;
    try {
        const model = getModel();
        const prompt = `
      Act as an expert resume writer. Improve the following work experience description.
      Make it more impactful, use action verbs, and fix any grammar issues.
      Keep it concise and professional.
      
      Original: "${text}"
      
      Return ONLY the improved text, no conversational filler or markdown.
    `;
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Enhance Description Error:", error);
        throw error;
    }
};

export const suggestSkills = async (jobTitle, existingSkills) => {
    try {
        const model = getModel();
        const prompt = `
      Act as an expert technical recruiter. Suggest 5-7 relevant professional skills for a ${jobTitle || 'professional'}.
      Do not include these skills as they already have them: ${existingSkills ? existingSkills.join(', ') : 'none'}.
      
      Return ONLY a comma-separated list of the suggested skills. No conversational filler or markdown.
    `;
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        return text.split(',').map(s => s.trim()).filter(Boolean);
    } catch (error) {
        console.error("AI Suggest Skills Error:", error);
        throw error;
    }
};
