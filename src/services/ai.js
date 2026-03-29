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

export const parseResume = async (base64Data, mimeType = "application/pdf") => {
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume parser. I am going to give you raw text extracted from a PDF resume.
          This PDF may be a standard resume OR a direct export from a user's LinkedIn profile (via "Save to PDF").
          Your job is to structure it into the EXACT JSON format described below. Extract as much relevant information as you can.

          IMPORTANT PARSING RULES:
          1. Return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json. Just the raw JSON object.
          2. If the text appears to be from LinkedIn (look for "Page 1 of", "Contact", "Top Skills", "Summary"), gracefully ignore those specific LinkedIn UI headers/footers and only pull the actual user data.
          3. Ensure the 'summary' field is an actual professional summary, not a list of skills or links.
          4. For 'experience' and 'projects', merge the descriptions into a single clean markdown-friendly string (use bullet points if applicable).

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
              { "id": "uuid-string-or-random-number", "school": "string", "degree": "string", "fieldOfStudy": "string", "startDate": "string", "endDate": "string", "description": "string" }
            ],
            "experience": [
              { "id": "uuid-string-or-random-number", "company": "string", "title": "string", "location": "string", "startDate": "string", "endDate": "string", "description": "string describing duties. IMPORTANT: make this a markdown-friendly string or a single merged paragraph, no HTML.", "current": false }
            ],
            "skills": [ "skill1", "skill2", "..." ],
            "projects": [
              { "id": "uuid-string-or-random-number", "name": "string", "description": "string", "link": "string URL or empty", "startDate": "", "endDate": "" }
            ],
            "certifications": [
              { "id": "uuid-string-or-random-number", "name": "string", "issuer": "string", "date": "string", "link": "" }
            ]
          }
        `;

        const filePart = {
            inlineData: {
                data: base64Data,
                mimeType
            }
        };

        const result = await model.generateContent([filePart, prompt]);
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

export const tailorExperience = async (text, jobTitle, jobDescription) => {
    if (!text || !jobDescription) return text;
    try {
        const model = getModel();
        const prompt = `
          Act as an expert technical recruiter and resume writer. 
          The user is applying for the role of "${jobTitle}".
          Here is their current experience description: "${text}"
          
          Here is the Job Description they are applying for:
          "${jobDescription}"
          
          Rewrite the experience description to highlight specific skills, experiences, and keywords mentioned in the job description that strongly align with their existing work.
          Do NOT invent false information. Only reframe and emphasize existing points to match the job description's language.
          Make it impactful, use action verbs, and keep it concise. Ensure it is formatted as bullet points if the original was.
          
          Return ONLY the tailored experience text, no conversational filler or markdown other than bullet points if necessary.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Tailor Experience Error:", error);
        throw new Error(error.message || "Failed to tailor experience via Gemini API");
    }
};

export const suggestMetrics = async (text) => {
    if (!text) return text;
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume writer. The following work experience description lacks specific, quantifiable metrics.
          
          Current Description: "${text}"
          
          Analyze the description and suggest 2-3 specific ways the user could add numbers, percentages, or concrete results to make it more impactful. 
          Do NOT completely rewrite it, just provide helpful prompts or suggestions.
          Example suggestion: "If you led a team, mention how many people. If you improved efficiency, estimate the percentage."
          
          Return your suggestions clearly and concisely.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Suggest Metrics Error:", error);
        throw new Error(error.message || "Failed to suggest metrics via Gemini API");
    }
};

export const generateInterviewPrep = async (resumeData, jobTitle, jobDescription) => {
    try {
        const model = getModel();
        let prompt = `
          Act as an expert Interview Coach and Hiring Manager.
          You are preparing a candidate for an interview for the role of "${jobTitle || 'Professional'}".
          
          Here is the Job Description (optional, if empty base it on standard expectations):
          "${jobDescription || 'Standard industry expectations'}"
          
          Here is their Resume Data formatted as JSON:
          ${JSON.stringify(resumeData)}
          
          Based on the overlap between their resume and the job requirements, generate a personalized Interview Prep Kit containing exactly:
          1. 5 Technical/Role-Specific Questions they are likely to be asked.
          2. 3 Behavioral Questions based on their experience.
          3. 3 "Gotcha" or challenging questions aimed at any potential gaps or weak points in their resume.
          4. 2 Suggested questions for the candidate to ask the interviewer.
          
          Format the output as a beautiful, easy-to-read Markdown document with clear headings. Explain briefly WHY you are asking each question based on their resume.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Generate Interview Prep Error:", error);
        throw new Error(error.message || "Failed to generate interview prep via Gemini API");
    }
};

export const autoTailorWholeResume = async (resumeData, jobDescription) => {
    try {
        const model = getModel();
        const prompt = `
          Act as an expert resume writer and technical recruiter. 
          The user has provided their entire resume in JSON format, and a target Job Description.
          
          Target Job Description:
          "${jobDescription}"
          
          Current Resume JSON:
          ${JSON.stringify(resumeData)}
          
          TASK:
          1. Rewrite the "personal.summary" to perfectly align with the target job's keywords and tone.
          2. Rewrite ALL "description" fields within the "experience" array to emphasize achievements and skills relevant to this specific role, using action verbs. Do not invent new jobs or fake metrics, just reframe existing information.
          3. Add 2-4 highly relevant skills to the "skills" array IF the job description asks for them and they are missing.
          
          Return ONLY a valid JSON object matching the exact structure of the input Resume JSON.
          Do NOT include markdown formatting like \`\`\`json. Just the raw JSON object. Ensure no keys are lost.
        `;

        const result = await model.generateContent(prompt);
        let parsedResult = result.response.text().trim();
        parsedResult = parsedResult.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        try {
            parsedResult = JSON.parse(parsedResult);
        } catch (e) {
            throw new Error("Failed to map the AI response to JSON. The AI output was malformed.");
        }
        
        return parsedResult;
    } catch (error) {
        console.error("AI Auto-Tailor Error:", error);
        throw new Error(error.message || "Failed to auto-tailor resume via Gemini API");
    }
};


