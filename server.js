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
    const resumeSummary = `
  Name: Yerukum Jaya Surya Sri Karthik  
GitHub: github.com/yerukumkarthik  
LinkedIn: linkedin.com/in/karthik-yerukum  
Phone: +91-8977238447 | Email: karthikyerukum@gmail.com  

SUMMARY:  
Motivated CSE undergraduate with strong programming and problem-solving skills. Passionate about full-stack development, machine learning, and automation. Experienced in leading, learning, and building scalable apps.

EDUCATION:  
- B.Tech CSE, Aditya Engineering College (2022–2026), CGPA: 8.35  
- Intermediate, Narayana Junior College (2020–2022), 93%  
- SSC, Narayana E-Techno School (2020), CGPA: 10  

EXPERIENCE:  
- **Python Intern**, Technical Hub (Aug–Nov 2024): Supported 400+ students in Python, debugging & mentoring.  
- **Android Developer**, Techgyan Technologies (May–Jul 2024): Built SMS Scheduler App with timed delivery.  
- **ML Intern**, APSSDC (May–Jun 2024): Hands-on with model building & data analysis in AI/ML.

SKILLS & TECHNOLOGIES:  
- **Languages:** C, C++, Java, Python, JavaScript, PHP, HTML/CSS  
- **Frameworks:** React.js, Node.js, Express.js, Flutter, Tailwind CSS  
- **Databases:** Firebase, MongoDB, MySQL  
- **Tools:** VS Code, Android Studio, Sublime  
- **Concepts:** DSA, OOPS, OS, DBMS, RPA  
- **Soft Skills:** Communication, Teamwork, Adaptability  
- **Interests:** SDE, Web & App Dev, Backend Systems

PROJECTS:  
- **Portfolio Website:** React.js + Framer Motion + Tailwind CSS. Responsive UI with animations and resume download.  
- **Healthcare ATM (HCTMM Pvt. Ltd):** Firebase-powered booking & prescription app. Integrated tablets booking, billing & notifications.  
- **Time Table Generator:** Built with HTML/CSS/JS + Node. Optimized faculty slot scheduling via algorithms.  
- **Relieving Letter Automation:** Auto-generates HR docs with e-signature approval, used by 500+ users.

CERTIFICATIONS:  
- C++ (IIT Bombay), Python (Red Hat), Java (Oracle), SQL (HackerRank), RHCSA (Red Hat), IoT & Cloud (NPTEL)

CODING PROFILES:  
- **LeetCode:** 130+ problems  
- **Codemind:** 500+ problems  
- **HackerRank:** 4⭐ in C++, Python, Java, SQL  
`;

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: "You are a portfolio and resume assistant. Use provided resume to answer all future questions clearly."
    },
    {
      role: "user",
      content: `Here is my resume: ${resumeSummary}`
    },
    {
      role: "user",
      content: question  // user can now ask: "summarize my skills" or "suggest improvements"
    }
  ],
  max_tokens: 800,  // or adjust as needed
  temperature: 0.7
});



    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '❌ Something went wrong with OpenRouter, bruh.' });
  }
});

app.listen(5000, () => console.log('✅ OpenRouter AI server running at http://localhost:5000'));
