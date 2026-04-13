# Project Summary: AI Resume Builder & Parser

## Overview
**AI Resume Builder & Parser** is a cutting-edge web application designed to help users create elegant, ATS-friendly resumes seamlessly. It features a modern "Neo-Dark Glassmorphism" UI and leverages Artificial Intelligence (Google Gemini API) to streamline the resume creation process, whether starting from scratch via a guided multi-step wizard or importing an existing PDF.

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework:** React 19 built with Vite
- **Language:** JavaScript (ES6+ JSX)
- **Styling:** Pure CSS3 (using CSS Variables and Keyframes) - No Tailwind or component libraries, relying on a robust custom design system. Features dark/light themes and 3D animations using libraries like `framer-motion` and `three`.
- **Key Libraries:** 
  - `html2pdf.js` for executing precise PDF exports with multi-page pagination limits.
  - `lucide-react` for premium iconography.
  - `gsap` & `framer-motion` for complex animations.

### Backend
- **Framework:** Express.js running on Node.js (`server.js`)
- **Database:** SQLite embedded memory (via `sqlite` and `sqlite3` driver).
- **Core Functionality:** 
  - Resume CRUD operations supporting localized document preservation and public sharing features.
  - A Job Matching Mock API logic that scores how well a candidate's resume aligns with specific roles based on required skills.

## ✨ Key Features

1. **AI Integrations (Gemini 2.5):**
   - **PDF Parsing:** Automatically processes legacy PDF resumes and structures the extracted data into forms via client-side processing (`pdfjs-dist`).
   - **Content Generation:** Generates professional summaries, enhances bullet points with action verbs, and suggests relevant skills dependent on the job title.
   - **ATS Optimization:** Analyzes entries against common Applicant Tracking Systems metrics for optimization.

2. **Streamlined Wizard & Interface:**
   - 6-step isolated wizard for data entry (Personal, Education, Experience, Skills, Projects, Certifications).
   - Dedicated Preview Stage (Step 7) comparing side-by-side data mapping to final rendered design templates.

3. **13 ATS-Friendly Templates:**
   - Professionally formatted options including: Executive, Elegant, Tech, Creative, Grid, Minimal, and Sidebar designs.
   - All styled carefully ensuring perfect PDF pagination and formatting boundaries.

4. **Dashboard & Auth Flow:**
   - Functional Dashboard for simulated user authentication (`Auth.jsx`).
   - Private and publicly shareable generated resume links (e.g. `/share/:id`).
   - Added user retention modals like `InterviewPrepModal` and `JobRecommendationsModal`.

## 📁 Repository Structure

```text
/
├── server.js         # Express Backend server handling SQLite & API
├── data/
│   └── resumes.db    # Embedded SQLite database
├── src/
│   ├── App.jsx       # Root React Router and top-level State
│   ├── main.jsx      # Application entry point
│   ├── index.css
│   ├── App.css
│   ├── components/   # Reusable UI components
│   │   ├── Home.jsx         # Landing page implementation
│   │   ├── Builder.jsx      # Wizard logic orchestrator
│   │   ├── forms/           # Form pieces logic (Education, Skills, etc.)
│   │   └── templates/       # 13 different physical layouts mapped to the PDF
│   ├── services/
│   │   └── ai.js            # API wrapper for Google Gemini AI capabilities
│   └── utils/
│       └── atsScoring.js    # Logic analyzing user resumes
└── package.json      # Node dependencies and project scripts
```

## 🚀 How to Run Locally

1. Install modules using `npm install`.
2. Configure credentials: Add your Gemini API Key directly to `.env` as `VITE_GEMINI_API_KEY=your_key`.
3. Boot dual-servers simultaneously using `npm run dev` (spins up both Vite UI on 5173 and Express API concurrently).
