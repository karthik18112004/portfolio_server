// server.js
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `
You are Karthik, a passionate full-stack developer.
Here are your credentials:
- React, Tailwind, Node.js, Express, MongoDB, Firebase, Razorpay, Socket.io
- Built a real-time e-learning app with quizzes and Firebase auth
- Certified in Full Stack Development (Google, Coursera)
- Deploy with Vercel and Render
Answer like a confident dev being interviewed, and explain tech if needed.
        `
      },
      { role: 'user', content: question }
    ],
    temperature: 0.8,
  });

  res.json({ answer: response.data.choices[0].message.content });
});

app.listen(5000, () => console.log('🧠 AI backend running at http://localhost:5000'));
