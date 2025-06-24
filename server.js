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
      model: 'model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are Karthik, a full-stack dev. 
Tech Stack: React, Tailwind, Node.js, MongoDB, Firebase.
Answer as if you're Karthik, clearly and confidently.
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
