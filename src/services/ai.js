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

export const analyzeATSScore = async (missingKeywords, currentSummary) => {
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume writer and technical recruiter. The user's resume is missing the following critical keywords: ${missingKeywords.join(', ')}.
          
          Here is their current Professional Summary: "${currentSummary || 'None provided'}".
          
          Rewrite their Professional Summary to seamlessly and naturally incorporate as many of these missing keywords as possible without sounding robotic or keyword-stuffed.
          Keep it to 3-4 impactful sentences.
          
          Return ONLY the new rewritten summary text, no conversational filler or markdown.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI ATS Analysis Error:", error);
        throw new Error(error.message || "Failed to analyze ATS via Gemini API");
    }
};

export const parseResume = async (pdfText) => {
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume parser. I am going to give you raw text extracted from a PDF resume.
          Your job is to structure it into the EXACT JSON format described below. Extract as much relevant information as you can.

          IMPORTANT: Return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json. Just the raw JSON object.

          JSON Format specification:
          {
            "personal": {
              "firstName": "string",
              "lastName": "string",
              "jobTitle": "string",
              "email": "string",
              "phone": "string",
              "location": "string",
              "summary": "string length 2-4 sentences max",
              "photo": "" // always empty string
            },
            "education": [
              { "id": "uuid-string-or-random-number", "school": "string", "degree": "string", "fieldOfStudy": "string", "startYear": "string", "endYear": "string", "gpa": "string" }
            ],
            "experience": [
              { "id": "uuid-string-or-random-number", "company": "string", "title": "string", "location": "string", "startDate": "string", "endDate": "string", "description": "string describing duties. IMPORTANT: make this a markdown-friendly string or a single merged paragraph, no HTML." }
            ],
            "skills": [ "skill1", "skill2", "..." ],
            "projects": [
              { "id": "uuid-string-or-random-number", "name": "string", "description": "string", "link": "string URL or empty" }
            ],
            "certifications": [
              { "id": "uuid-string-or-random-number", "name": "string", "issuer": "string", "date": "string" }
            ]
          }

          RAW RESUME TEXT:
          "${pdfText.substring(0, 25000)}"
        `;

        const result = await model.generateContent(prompt);
        let parsedResult = result.response.text().trim();
        
        // Remove markdown code block if present
        parsedResult = parsedResult.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        try {
            parsedResult = JSON.parse(parsedResult);
        } catch (e) {
            console.error("Failed to parse the JSON string returned from AI:", parsedResult);
            throw new Error("Failed to map the AI response to JSON. The AI output was malformed.");
        }
        
        return parsedResult;
    } catch (error) {
        console.error("AI Resume Parse Error:", error);
        throw new Error(error.message || "Failed to parse resume text via Gemini API.");
    }
};
