// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
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

    res.json({ answer: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ answer: '❌ Something went wrong, bruh.' });
  }
});

app.listen(5000, () => console.log('✅ AI server running at http://localhost:5000'));
