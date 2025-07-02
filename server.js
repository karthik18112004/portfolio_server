import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY
});

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
  model: "gpt-4o", // or 'gpt-4' / 'gpt-4-turbo'
  messages: [
    {
      role: "system",
      content: `You are a professional resume and portfolio assistant. You will receive detailed candidate information and your job is to structure it clearly for portfolio display, highlighting strengths across domains, using clean formatting and groupings.`
    },
    {
      role: "user",
      content: "Here's my resume data:"
    },
    {
      role: "assistant",
      content: `
Name: Yerukum Jaya Surya Sri Karthik  
GitHub: github.com/yerukumkarthik  
LinkedIn: linkedin.com/in/karthik-yerukum  
Phone: +91 8977238447  
Email: karthikyerukum@gmail.com  

SUMMARY:  
Motivated Computer Science Engineering student with strong organizational skills and passion for programming. Proven ability in building real-world projects and achieving top ranks in coding platforms. Fast learner, excellent communicator, thrives in both independent and team settings.

EDUCATION:  
- B.Tech – CSE, Aditya Engineering College, Surampalem (2022–2026), CGPA: 8.35  
- Intermediate – Narayana Junior College, Kakinada (2020–2022), 93%  
- SSC – Narayana E-Techno School, Peddapuram (2020), CGPA: 10  

INTERNSHIPS:  
• **Python Programming Intern – Technical Hub** (Aug–Nov 2024)  
  – Mentored 400+ students, resolved code errors, reviewed submissions  
• **Android Developer – Techgyan Technologies** (May–Jul 2024)  
  – Built SMS Scheduling App with automated delivery features  
• **ML Intern – APSSDC** (May–Jun 2024)  
  – Hands-on training in AI/ML models & data analytics  

TECH STACK:  
• **Languages:** C, C++, Java, Python, HTML, CSS, JavaScript, PHP  
• **Web & App:** React.js, Node.js, Express.js, Flutter, Tailwind CSS  
• **Tools:** VS Code, Sublime Text, Android Studio  
• **Databases:** Firebase, MongoDB, MySQL  
• **CS Concepts:** DSA, OOPS, DBMS, OS, RPA  
• **Soft Skills:** Communication, Teamwork, Flexibility, Detail Orientation  
• **Domains:** Web Development, App Dev, SDE, Backend Engineering  

PROJECTS:  
• **Personal Portfolio (2024 – Present)**  
  – Built using React, Tailwind, Framer Motion. Fully responsive.  
• **Healthcare ATM (2024–2025)**  
  – Firebase-connected platform for medicine booking & prescriptions  
• **Timetable Generator (Nov–Dec 2024)**  
  – Dynamic scheduler using HTML, CSS, JS, Node.js  
• **Relieving Letter Automation (Jan–Feb 2024)**  
  – Automated document generation with digital signatures for 500+ users  

CERTIFICATIONS:  
- Oracle Java Programming – Oracle  
- Advanced C++ – IIT Bombay  
- Python Programming – Red Hat  
- SQL Basics – HackerRank  
- IoT & Cloud – NPTEL  
- RHCSA – Red Hat  

CODING PROFILES & ACHIEVEMENTS:  
- LeetCode: 130+ solved  
- Codemind: 500+ solved  
- HackerRank: 4⭐ in C++, Python, Java, SQL  
`
    },
    {
      role: "user",
      content: question
    }
  ],
  temperature: 0.8
});


    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '❌ Something went wrong with OpenRouter, bruh.' });
  }
});

app.listen(5000, () => console.log('✅ OpenRouter AI server running at http://localhost:5000'));
