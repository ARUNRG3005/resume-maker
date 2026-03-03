import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const getModel = () => {
    if (!genAI) throw new Error("GEMINI_API_KEY environment variable is missing in Netlify.");
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body);
        const { action, payload } = body;
        const model = getModel();

        let prompt = "";

        // Standardize prompt generation based on action
        if (action === "generateSummary") {
            const { jobTitle, experience, skills, categoryFocus } = payload;

            // Core instructions
            prompt = `
              Act as an expert resume writer. 
              Write a professional summary for a ${jobTitle || 'general professional'}.
              They have experience in: ${experience ? experience.map(e => e.title).join(', ') : 'various roles'}.
              Key skills include: ${skills ? skills.join(', ') : 'general professional skills'}.`;

            // Apply specific structural tuning per category rules
            if (categoryFocus) {
                prompt += `\n\nCRITICAL FOCUS: You are writing specifically for the ${categoryFocus} sector. Adjust language tone, priority focus, and keywords to fit standard ${categoryFocus} industry expectations perfectly.`;
            }

            prompt += `
              Keep it to 3-4 impactful sentences. Do not use generic buzzwords. Highlight specific achievements and value.
              Return ONLY the summary text, no conversational filler or markdown.
            `;
        } else if (action === "enhanceDescription") {
            const { text } = payload;
            if (!text) {
                return { statusCode: 200, body: JSON.stringify({ result: text }) };
            }
            prompt = `
              Act as an expert resume writer. Improve the following work experience description.
              Make it more impactful, use action verbs, and fix any grammar issues.
              Keep it concise and professional.
              
              Original: "${text}"
              
              Return ONLY the improved text, no conversational filler or markdown.
            `;
        } else if (action === "suggestSkills") {
            const { jobTitle, existingSkills } = payload;
            prompt = `
              Act as an expert technical recruiter. Suggest 5-7 relevant professional skills for a ${jobTitle || 'professional'}.
              Do not include these skills as they already have them: ${existingSkills ? existingSkills.join(', ') : 'none'}.
              
              Return ONLY a comma-separated list of the suggested skills. No conversational filler or markdown.
            `;
        } else if (action === "analyzeATS") {
            const { missingKeywords } = payload;
            prompt = `
              Act as an expert resume writer and technical recruiter. A user is missing the following critical keywords from their resume based on a job description: ${missingKeywords.join(', ')}.
              
              Provide 3 short, highly actionable bullet points on how to seamlessly incorporate these keywords into their work experience or summary section without keyword stuffing.
              Keep it extremely concise and direct.
            `;
        } else {
            return { statusCode: 400, body: JSON.stringify({ error: "Invalid action type." }) };
        }

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        // Specific post-formatting
        let finalOutput = text;
        if (action === "suggestSkills") {
            finalOutput = text.split(',').map(s => s.trim()).filter(Boolean);
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ result: finalOutput })
        };
    } catch (error) {
        console.error("AI Serverless Function Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error during AI generation." })
        };
    }
};
