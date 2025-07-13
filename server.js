// GitHub Pages用に静的サイト化したため、サーバー機能は無効化
/*
require('dotenv').config();

const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
const { generateFillInTheBlank, generateWritingQuestion, gradeWritingAnswer, generateTranslationQuestion, gradeTranslationAnswer } = require('./services/openaiService');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
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

// 英作文問題生成API
app.post('/api/generate-writing-question', async (req, res) => {
  const { topic, difficulty } = req.body;
  try {
    const result = await generateWritingQuestion(topic, difficulty);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 英作文添削API
app.post('/api/grade-writing-answer', async (req, res) => {
  const { topic, userAnswer, difficulty } = req.body;
  try {
    const result = await gradeWritingAnswer(topic, userAnswer, difficulty);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 和文英訳問題生成API
app.post('/api/generate-translation-question', async (req, res) => {
  const { topic, difficulty, grammarExplanation } = req.body;
  try {
    const result = await generateTranslationQuestion(topic, difficulty, grammarExplanation);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 和文英訳添削API
app.post('/api/grade-translation-answer', async (req, res) => {
  const { topic, userAnswer, difficulty } = req.body;
  try {
    const result = await gradeTranslationAnswer(topic, userAnswer, difficulty);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ルートでindex.htmlを返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// それ以外のhtmlファイルリクエストもindex.htmlにリダイレクト
app.get('/*.html', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// GitHub Pages用の静的サイト
console.log('Static site for GitHub Pages');