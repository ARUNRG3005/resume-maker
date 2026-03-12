# AI Resume Builder & Parser

A cutting-edge, web-based React application designed to help users create elegant, ATS-friendly resumes effortlessly. Whether you are starting from scratch using our guided multi-step wizard, or importing an existing PDF resume using our AI Parser, this tool streamlines the entire process.

It features a breathtaking Neo-Dark Glassmorphism UI, 13 premium resume templates, and deep integration with the Google Gemini AI to automatically generate summaries, enhance action bullets, suggest skills, and optimize keywords to pass Applicant Tracking Systems (ATS).

## ✨ Key Features

### 1. Striking Neon Theme & Customizable Aesthetics
- **Light/Dark Mode Toggle**: Swap seamlessly between a deep Cyber-Dark mode and a clean, vibrant Light Neon mode.
- **Dynamic Landing Page**: A stunning front door featuring pulsating CSS background orbs, animated layouts, and a "How it Works" guide.
- **Glassmorphism UI**: Translucent, frosted-glass panels provide depth and a highly premium feel across the entire application.

### 2. Streamlined Multi-Step Wizard
- **Focused Data Entry**: Guided sequential data entry (Personal -> Education -> Experience -> Skills -> Projects -> Certifications) keeps the user focused.
- **Isolated Preview Stage**: Step 7 provides a dedicated, wide-view environment for Template Selection and live PDF preview mapping.

### 3. AI Powered Tools (Google Gemini API)
- **AI PDF Parsing**: Bypass manual entry entirely! Upload an existing PDF resume, and the AI will extract, structure, and pre-fill your data instantly into the builder forms!
- **Interactive AI Preview Modal**: AI suggestions appear in a sleek modal, allowing you to manually edit and review generated text before applying it.
- **Generate Summary**: Automatically draft tailored professional summaries based on your role, skills, and experience.
- **Enhance Descriptions**: Rewrite bullet points using strong action verbs and professional phrasing.
- **Suggest Skills**: Dynamically recommend specific industry skills missing from your profile based on your target job title.
- **In-Place ATS Optimization**: The ATS compatibility widget actively rewrites your Professional Summary to seamlessly inject missing keywords needed to pass automated recruiter filters.

### 4. 13 ATS-Friendly Premium Templates
Instantly switch between 13 diverse designs to see what fits your industry best. All layouts are explicitly crafted to be readable by Applicant Tracking Systems.
- **Included Styles**: Minimalist, Modern Split, Creative Focus, Elegant Serif, Tech Terminal, Executive Classic, Ultra Compact, Dynamic Sidebar, Strict Minimal, Corporate Standard, Modern Accent, Masonry Grid, and Slate Sidebar.
- Fully supports user Profile Pictures on applicable templates.

### 5. Seamless PDF Export
- Harnesses `html2pdf.js` to render beautifully precise PDFs.
- Features multi-page pagination logic with customizable break barriers via CSS to ensure clean splits on long resumes.

---

## 💻 Tech Stack & Coding Languages

This project is built purely on modern frontend web technologies, keeping it lightning-fast and entirely client-side (with the exception of API calls for AI generation).

- **Core Framework**: React 19 (via Vite)
- **Language**: JavaScript (ES6+ JSX)
- **Styling**: Pure CSS3 (`index.css` & `App.css`) utilizing CSS Variables for global state theming, Flexbox/Grid for layout, and Keyframes for micro-animations. No Tailwind or heavy component libraries overriding the custom design system!
- **Icons**: `lucide-react`
- **PDF Export Engine**: `html2pdf.js`
- **Client-Side PDF Parsing**: `pdfjs-dist`
- **AI Integration**: `@google/generative-ai` (Gemini 2.5 Flash Model)

---

## 🚀 How to Use & Local Setup

### 1. Prerequisites
You must have Node.js and `npm` installed on your machine.
You will also need a free Google Gemini API key.

### 2. Installation
Clone or download the repository, then navigate into the folder via your terminal.
Install the dependencies:
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a file named \`.env\` in the topmost root directory of the project.
Add your Gemini API key to it:
\`\`\`env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 4. Run the Application Local Server
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`
Open your web browser and navigate to \`http://localhost:5173/\`.

### 5. Using the App
1. **Landing Page**: Click **"Start Building"**.
2. **Choose Path**: A modal will ask you to choose between "Create from Scratch" or "Upload Existing Resume (PDF)".
3. **If Uploading**: Select an old PDF resume. Wait a moment while the AI parses it, and then instantly view your populated data in the Step 7 Preview mode!
4. **If Scratch**: Navigate through the wizard steps using the "Next" button. Fill in your details.
5. **Use AI**: Click any of the sparkly "AI" buttons (like "Enhance" near text areas or "Generate" near the summary) to have Gemini write professional copy for you.
6. **Preview & Download**: On Step 7, click through the 13 different buttons to preview different template aesthetics. When satisfied, click **Download PDF**.
