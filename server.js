require('dotenv').config();

const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
const { generateQuestion, generateFillInTheBlank } = require('./services/openaiService');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 問題生成API
app.post('/api/generate-question', async (req, res) => {
  const { topic, difficulty } = req.body;
  try {
    const result = await generateQuestion(topic, difficulty);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 穴埋め問題生成API
app.post('/api/generate-fill-blank', async (req, res) => {
  const { topic, difficulty, numBlanks = 3 } = req.body;
  try {
    const result = await generateFillInTheBlank(topic, difficulty, numBlanks);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});