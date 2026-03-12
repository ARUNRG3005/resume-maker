import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const getModel = () => {
    if (!genAI) throw new Error("VITE_GEMINI_API_KEY environment variable is missing.");
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const generateSummary = async (jobTitle, experience, skills, categoryFocus) => {
    try {
        const model = getModel();
        
        let prompt = `
          Act as an expert resume writer. 
          Write a professional summary for a ${jobTitle || 'general professional'}.
          They have experience in: ${experience ? experience.map(e => e.title).join(', ') : 'various roles'}.
          Key skills include: ${skills ? skills.join(', ') : 'general professional skills'}.`;

        if (categoryFocus) {
            prompt += `\n\nCRITICAL FOCUS: You are writing specifically for the ${categoryFocus} sector. Adjust language tone, priority focus, and keywords to fit standard ${categoryFocus} industry expectations perfectly.`;
        }

        prompt += `
          Keep it to 3-4 impactful sentences. Do not use generic buzzwords. Highlight specific achievements and value.
          Return ONLY the summary text, no conversational filler or markdown.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Generate Summary Error:", error);
        throw new Error(error.message || "Failed to generate summary via Gemini API");
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
        throw new Error(error.message || "Failed to enhance description via Gemini API");
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
        throw new Error(error.message || "Failed to suggest skills via Gemini API");
    }
};

export const analyzeATSScore = async (missingKeywords) => {
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume writer and technical recruiter. A user is missing the following critical keywords from their resume based on a job description: ${missingKeywords.join(', ')}.
          
          Provide 3 short, highly actionable bullet points on how to seamlessly incorporate these keywords into their work experience or summary section without keyword stuffing.
          Keep it extremely concise and direct.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI ATS Analysis Error:", error);
        throw new Error(error.message || "Failed to analyze ATS via Gemini API");
    }
};
