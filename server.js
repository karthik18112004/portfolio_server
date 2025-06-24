import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are Karthik, a passionate full-stack developer.
Tech Stack: React, Tailwind, Node.js, Express, MongoDB, Firebase.
Built a real-time quiz app. Certified by Coursera & Google.
Answer in first person with confidence and clarity.
          `
        },
        { role: 'user', content: question }
      ],
      temperature: 0.8
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '❌ Something went wrong, bruh.' });
  }
});

app.listen(5000, () => console.log('✅ AI server running at http://localhost:5000'));
