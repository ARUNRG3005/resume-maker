// Common English stop words to filter out before generating keyword lists
const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'experience', 'years', 'skills', 'work', 'job', 'role', 'team', 'required', 'preferred', 'ability', 'strong', 'understanding', 'knowledge', 'working', 'including'
]);

/**
 * Extracts normalized, unique keywords from a given text string.
 * Filters out standard stop words and punctuation.
 * @param {string} text - User inputted text (e.g. Job Description)
 * @returns {Array} Array of significant keyword strings
 */
export const extractKeywords = (text) => {
    if (!text) return [];

    // Remove punctuation, convert to lowercase, and split by whitespace
    const words = text
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .split(' ');

    // Filter out stop words, numbers, and very short words
    const validWords = words.filter(word => {
        word = word.trim();
        return (
            word.length > 2 &&
            !STOP_WORDS.has(word) &&
            isNaN(word) // Ignore pure numbers
        );
    });

    // Return a unique set of significant words
    return [...new Set(validWords)];
};

/**
 * Parses user input Resume JSON schema into a flattened, readable string array 
 * to represent the entire text content of the resume.
 * @param {Object} resumeData 
 * @returns {string} Flattened string of all resume text
 */
export const flattenResumeText = (resumeData) => {
    if (!resumeData) return '';

    let textSegments = [];

    // Flatten Personal Details
    if (resumeData.personal) {
        if (resumeData.personal.jobTitle) textSegments.push(resumeData.personal.jobTitle);
        if (resumeData.personal.summary) textSegments.push(resumeData.personal.summary);
    }

    // Flatten Experience
    if (resumeData.experience && Array.isArray(resumeData.experience)) {
        resumeData.experience.forEach(exp => {
            textSegments.push(exp.title, exp.company, exp.description);
        });
    }

    // Flatten Skills
    if (resumeData.skills && Array.isArray(resumeData.skills)) {
        resumeData.skills.forEach(skill => {
            textSegments.push(skill.name, skill.keywords?.join(' '));
        });
    }

    // Flatten Projects
    if (resumeData.projects && Array.isArray(resumeData.projects)) {
        resumeData.projects.forEach(proj => {
            textSegments.push(proj.title, proj.technologies?.join(' '), proj.description);
        });
    }

    // Flatten Certifications
    if (resumeData.certifications && Array.isArray(resumeData.certifications)) {
        resumeData.certifications.forEach(cert => {
            textSegments.push(cert.name, cert.issuer);
        });
    }

    // Flatten Education
    if (resumeData.education && Array.isArray(resumeData.education)) {
        resumeData.education.forEach(edu => {
            textSegments.push(edu.degree, edu.field, edu.school);
        });
    }

    return textSegments.filter(Boolean).join(' '); // Join non-empty segments
};

/**
 * Calculates ATS Score Match % between Job Description and Resume Data
 * @param {string} jobDescription 
 * @param {Object} resumeData 
 * @returns {Object} Output containing matchScore (0-100), and missingKeywords []
 */
export const calculateATSCompatibility = (jobDescription, resumeData) => {
    if (!jobDescription || !jobDescription.trim()) {
        return { matchScore: 0, missingKeywords: [] };
    }

    const jobKeywords = extractKeywords(jobDescription);

    if (jobKeywords.length === 0) {
        return { matchScore: 100, missingKeywords: [] }; // Nothing requested, theoretically a perfect match (?)
    }

    // Generate a flattened string version of the whole resume to scan via simple string includes for phrase leniency
    const resumeText = flattenResumeText(resumeData).toLowerCase();

    let matchAmount = 0;
    const missingKeywords = [];

    jobKeywords.forEach(keyword => {
        // If the exact keyword or a closely related root word appears anywhere across the entire text of the resume:
        if (resumeText.includes(keyword)) {
            matchAmount++;
        } else {
            missingKeywords.push(keyword);
        }
    });

    const matchScore = Math.round((matchAmount / jobKeywords.length) * 100);

    return {
        matchScore,
        missingKeywords,
        jobKeywordsTotalCount: jobKeywords.length
    };
};
