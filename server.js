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
      model: 'deepseek/deepseek-chat-v3-0324',
      messages: [
        {
          role: 'system',
          content: `
Yerukum Jaya Surya Sri Karthik                        
github.com/yerukumkarthik                                                                                                                 
linkedin.com/in/karthik-yerukum                                                                                 
SUMMARY  
+91 -8977238447 
karthikyerukum@gmail.com 
I am a highly motivated Computer Science Engineering undergraduate eager to learn and grow. With strong 
organizational skills and a passion for programming, I have developed various projects and achieved multiple 
Hackerrank badges. I thrive in dynamic environments, both independently and collaboratively, and I am excited 
about making meaningful contributions to a future team.  
EDUCATION  
Aditya Engineering College, Surampalem                                                                                      
B.Tech – CSE                                                                                                                                                                                                    
Narayana Junior College, Kakinada                                                                                       
Board of Intermediate Education, Andhra Pradesh                                                                                                           
Narayana E-Techno School, Peddapuram                                                                                     
Board of Intermediate Education, Andhra Pradesh                                                                                                                          
EXPERIENCE  
2022 - 2026  
CGPA: 8.35  
2020 - 2022  
Percentage:  93.00 
2020  
CGPA: 10 
Python Programming Intern  
Technical Hub                                                                                                                             
08 2024 – 11 2024  
• Assisted mentor in Python programming classes for 400+ students by addressing doubts, debugging code, 
reviewing assignments, and fostering an interactive learning environment.  
Android App Developer  
Techgyan Technologies                                                                                                             
05 2024 – 07 2024  
• Designed and developed an SMS Scheduling App, allowing users to automate message delivery with 
customizable time settings, ensuring efficient and timely communication.  
Machine Learning Intern  
Andhra Pradesh State Skill Development                                                                              
05 2024 – 06 2024  
• Completed a 6-week internship in Artificial Intelligence and Machine Learning, gaining hands-on 
experience in model development and data analysis.    
TECHNICAL SKILLS AND INTRESTS  
Languages                               
Skills / Coursework            
Developer Tools    
Databases      
Soft Skills      
Areas of Interest    
: C, C++, Java, Python, HTML, CSS, JavaScript , PHP.  
: Data Structures & Algorithms , OS , DBMS , OOPS Concept , Flutter, React JS,                                               
Node JS , Express JS, Tailwind CSS, Robotic Process Automation.  
: VS Code, Sublime Text, Android Studio.  
: Firebase, MongoDB, MySQL.  
: Communication , Teamwork ,  Versality and Flexibility , Detail Orientation.  
: Web Development , Programming , SDE , App Development.  
PROJECTS        
Personal Portfolio                                                                                                             
06 2024 –present  
• Designed and built a dynamic Portfolio Website using React.js, Framer Motion, and Tailwind CSS to 
showcase projects, skills, and resume. Integrated responsive design, smooth scroll-based animations, and 
downloadable assets to ensure cross-device performance and interactive user experience.  
HealthCare ATM                                                                                                                
10 2024 –04 2025  
• Developing a Healthcare ATM application for HCTMM Pvt. Ltd. to provide easy access to healthcare 
services. Integrated Firebase connectivity for seamless and efficient database operations, optimizing data 
retrieval speed by 30% for better performance.  
• Integrated features like Tablets booking, prescription management, and secure bill payments.  
• Implemented real-time notifications and Firebase integration for seamless user experience.  
Time Table Generator                                                                                                     
11 2024 – 12 2024  
• Built a dynamic timetable automation system using HTML, CSS, JavaScript, and Node.js, optimizing 
department scheduling.  
• Utilized algorithms for slot optimization, ensuring balanced workload distribution.  
Relieving Letter Automation                                                                                          
01 2024 – 02 2024  
• Developed a real-time automated system for generating remuneration bills, relieving letters, and 
appointment letters, significantly reducing manual effort and processing time.  
• Integrated an approval system with automatic digital signatures, enabling seamless authorization, with 500+ 
employees from various colleges using the platform for document generation. 
CERTIFICATIONS  
• Advanced C++ Training Certification – Spoken Tutorial Project, IIT Bombay  
• Introduction to Python Programming – Red Hat  
• Oracle Java Programming Certification – Oracle  
• Red Hat System Administration Certification – Red Hat  
• Oracle Database Foundation Certification – Oracle  
• SQL Basics Certificate – HackerRank  
• IoT & Cloud Computing Certification – NPTEL  
ACHIEVEMENTS & CODING PROFILES  
Leetcode     
Codemind      
HackerRank    
: Solved 130+ programs in Leetcode .   
: Solved 500+ programs in Codemind .  
: 4 Star badges in C++, Python, Java and SQL . 
          `
        },
        { role: 'user', content: question }
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
