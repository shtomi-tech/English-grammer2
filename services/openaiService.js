const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateQuestion(topic, difficulty = 'medium') {
  // トピックに応じた具体的なプロンプトを生成
  let topicDescription = '';
  switch (topic) {
    case 'noun':
      topicDescription = '名詞（可算名詞・不可算名詞、単数形・複数形など）';
      break;
    case 'article':
      topicDescription = '冠詞（a, an, theの使い分け）';
      break;
    case 'be_verb':
      topicDescription = 'be動詞（am, is, areの使い分け）';
      break;
    case 'verb':
      topicDescription = '一般動詞（三人称単数現在形、過去形など）';
      break;
    case 'adjective':
      topicDescription = '形容詞（名詞を修飾する語）';
      break;
    case 'adverb':
      topicDescription = '副詞（動詞・形容詞・他の副詞を修飾する語）';
      break;
    case 'preposition':
      topicDescription = '前置詞（場所・時間・方向などを示す語）';
      break;
    case 'conjunction':
      topicDescription = '接続詞（文や語をつなぐ語）';
      break;
    case 'pattern1':
      topicDescription = '第1文型（S+V：主語＋動詞）';
      break;
    case 'pattern2':
      topicDescription = '第2文型（S+V+C：主語＋動詞＋補語）';
      break;
    case 'pattern3':
      topicDescription = '第3文型（S+V+O：主語＋動詞＋目的語）';
      break;
    case 'pattern4':
      topicDescription = '第4文型（S+V+O1+O2：主語＋動詞＋人＋物）';
      break;
    case 'pattern5':
      topicDescription = '第5文型（S+V+O+C：主語＋動詞＋目的語＋補語）';
      break;
    case 'passive3':
      topicDescription = '第3文型の受動態（目的語が主語になる受け身の文）';
      break;
    case 'passive4':
      topicDescription = '第4文型の受動態（人または物が主語になる受け身の文）';
      break;
    case 'passive5':
      topicDescription = '第5文型の受動態（目的語＋補語の受け身）';
      break;
    case 'gerund':
      topicDescription = '動名詞（動詞のing形で名詞の働きをする）';
      break;
    case 'infinitive':
      topicDescription = '不定詞（to＋動詞の原形）';
      break;
    case 'participle':
      topicDescription = '分詞（現在分詞・過去分詞）';
      break;
    case 'participle_construction':
      topicDescription = '分詞構文（分詞を使った副詞句）';
      break;
    case 'relative_pronoun':
      topicDescription = '関係代名詞（who, which, thatなど）';
      break;
    case 'relative_adverb':
      topicDescription = '関係副詞（when, where, whyなど）';
      break;
    case 'subordinate_conjunction':
      topicDescription = '従属接続詞（because, if, when, althoughなど）';
      break;
    case 'indirect_question':
      topicDescription = '間接疑問文（疑問詞＋主語＋動詞の語順）';
      break;
    case 'present_tense':
      topicDescription = '現在形（習慣・事実・状態を表す）';
      break;
    case 'past_tense':
      topicDescription = '過去形（過去の出来事を表す）';
      break;
    case 'progressive_tense':
      topicDescription = '進行形（be動詞＋動詞ing）';
      break;
    case 'present_perfect':
      topicDescription = '現在完了（have/has＋過去分詞）';
      break;
    case 'past_perfect':
      topicDescription = '過去完了（had＋過去分詞）';
      break;
    case 'future_perfect':
      topicDescription = '未来完了形（will have＋過去分詞）';
      break;
    case 'can':
      topicDescription = '助動詞can（可能・許可・能力を表す）';
      break;
    case 'will':
      topicDescription = '助動詞will（未来・意志・推量を表す）';
      break;
    case 'may':
      topicDescription = '助動詞may（許可・推量を表す）';
      break;
    case 'must':
      topicDescription = '助動詞must（義務・強い推量を表す）';
      break;
    case 'should':
      topicDescription = '助動詞should（助言・当然を表す）';
      break;
    case 'subjunctive_past':
      topicDescription = '仮定法過去（現在の事実と反対の仮定）';
      break;
    case 'subjunctive_past_perfect':
      topicDescription = '仮定法過去完了（過去の事実と反対の仮定）';
      break;
    case 'subjunctive_future':
      topicDescription = '仮定法未来（未来の仮定）';
      break;
    case 'subjunctive_inversion':
      topicDescription = '仮定法倒置（ifを省略し、助動詞を前に出す）';
      break;
    case 'comparative':
      topicDescription = '比較級（2つを比べて「より〜」を表す）';
      break;
    case 'superlative':
      topicDescription = '最上級（3つ以上の中で「最も〜」を表す）';
      break;
    case 'positive':
      topicDescription = '原級（同等比較、「as〜as」を使う）';
      break;
    default:
      topicDescription = topic;
  }

  const prompt = `英語の${topicDescription}に関する4択問題を1問生成してください。\n\n要求：\n1. 日本語で問題文を書く\n2. 4つの選択肢を英語で提供する（1つが正解、3つが不正解）\n3. 正解の選択肢を明示する\n4. 日本語で解説を提供する\n\n形式：\n{\n  "question": "問題文（日本語）",\n  "options": [\n    {"text": "選択肢1", "correct": false},\n    {"text": "選択肢2", "correct": true},\n    {"text": "選択肢3", "correct": false},\n    {"text": "選択肢4", "correct": false}\n  ],\n  "explanation": "解説（日本語）"\n}\n難易度: ${difficulty}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // または 'gpt-4'（有料）
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const text = completion.choices[0].message.content;
  // JSON部分を抽出
  let questionData;
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    questionData = JSON.parse(jsonMatch[1]);
  } else {
    // そのままJSONとしてパースを試みる
    questionData = JSON.parse(text);
  }

  return {
    success: true,
    data: questionData,
    topic,
    difficulty,
  };
}

module.exports = { generateQuestion }; 