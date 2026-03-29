import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize SQLite database
let db;
async function initDb() {
  const dbDir = join(__dirname, 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }

  db = await open({
    filename: join(dbDir, 'resumes.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      isPublic INTEGER DEFAULT 0,
      createdAt INTEGER,
      updatedAt INTEGER
    )
  `);
  
  console.log('Database initialized');
}

// API Routes
app.post('/api/resumes', async (req, res) => {
  const { id, data, isPublic } = req.body;
  if (!id || !data) {
    return res.status(400).json({ error: 'Missing id or data' });
  }

  const now = Date.now();
  try {
    const existing = await db.get('SELECT * FROM resumes WHERE id = ?', [id]);
    
    if (existing) {
      await db.run(
        'UPDATE resumes SET data = ?, isPublic = ?, updatedAt = ? WHERE id = ?',
        [JSON.stringify(data), isPublic ? 1 : 0, now, id]
      );
      res.json({ message: 'Resume updated successfully', id });
    } else {
      await db.run(
        'INSERT INTO resumes (id, data, isPublic, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [id, JSON.stringify(data), isPublic ? 1 : 0, now, now]
      );
      res.status(201).json({ message: 'Resume created successfully', id });
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

app.get('/api/resumes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await db.get('SELECT * FROM resumes WHERE id = ?', [id]);
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    if (!resume.isPublic) {
      return res.status(403).json({ error: 'This resume is private' });
    }
    
    res.json({
      id: resume.id,
      data: JSON.parse(resume.data),
      isPublic: Boolean(resume.isPublic),
      updatedAt: resume.updatedAt
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

app.put('/api/resumes/:id/privacy', async (req, res) => {
  const { id } = req.params;
  const { isPublic } = req.body;
  
  try {
    const result = await db.run(
      'UPDATE resumes SET isPublic = ?, updatedAt = ? WHERE id = ?',
      [isPublic ? 1 : 0, Date.now(), id]
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    res.json({ message: 'Privacy settings updated successfully', isPublic });
  } catch (error) {
    console.error('Error updating privacy:', error);
    res.status(500).json({ error: 'Failed to update privacy settings' });
  }
});

// Job Matching API
app.post('/api/jobs/match', async (req, res) => {
  try {
    const { skills, role, location, salary } = req.body;
    
    // Fallback if no skills are provided
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Skills array is required for matching' });
    }

    const normalizedUserSkills = skills.map(s => s.toLowerCase().trim());
    
    // Read the mock jobs database
    const jobsFilePath = join(__dirname, 'data', 'mockJobs.json');
    if (!fs.existsSync(jobsFilePath)) {
      return res.status(404).json({ error: 'Job database not found' });
    }
    
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    
    // Calculate match percentage for each job
    const matchedJobs = jobsData.map(job => {
      const jobSkills = job.skills.map(s => s.toLowerCase().trim());
      
      // Calculate intersection of user skills and job required skills
      const matchingSkills = jobSkills.filter(js => normalizedUserSkills.includes(js));
      const missingSkills = jobSkills.filter(js => !normalizedUserSkills.includes(js));
      
      let matchPercentage = 0;
      if (jobSkills.length > 0) {
         matchPercentage = Math.round((matchingSkills.length / jobSkills.length) * 100);
      }
      
      return {
        ...job,
        matchPercentage,
        matchingSkills: job.skills.filter(s => matchingSkills.includes(s.toLowerCase().trim())),
        missingSkills: job.skills.filter(s => missingSkills.includes(s.toLowerCase().trim()))
      };
    });
    
    // Filter out jobs with 0% match (optional, but good for relevance)
    // We'll return everything sorted by matchPercentage instead
    matchedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // Apply optional filters
    let filteredJobs = matchedJobs;
    if (location) {
      filteredJobs = filteredJobs.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (role) {
      filteredJobs = filteredJobs.filter(j => j.title.toLowerCase().includes(role.toLowerCase()));
    }
    
    // Return top 10 results
    res.json({ jobs: filteredJobs.slice(0, 10) });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to process job matching' });
  }
});

// Start server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Resume sharing API server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
