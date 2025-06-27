const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateQuestion(topic, difficulty = 'medium') {
  // トピックに応じた具体的なプロンプトを生成
  let topicDescription = '';
  let examFocus = '';
  let specificExamples = '';
  let commonMistakes = '';
  
  switch (topic) {
    case 'noun':
      topicDescription = '名詞（可算名詞・不可算名詞、単数形・複数形など）';
      examFocus = 'センター試験や私大入試で頻出の名詞の用法、集合名詞、物質名詞、抽象名詞の区別';
      specificExamples = '例：family（集合名詞）、information（不可算名詞）、advice（不可算名詞）、equipment（不可算名詞）';
      commonMistakes = 'よくある間違い：集合名詞の単数・複数扱い、物質名詞の冠詞、抽象名詞の可算・不可算の区別';
      break;
    case 'article':
      topicDescription = '冠詞（a, an, theの使い分け）';
      examFocus = '固有名詞と冠詞、抽象名詞の冠詞、慣用表現での冠詞の有無';
      specificExamples = '例：the United States（国名）、a university（子音で始まる語）、an hour（無音のh）、go to school（冠詞なし）';
      commonMistakes = 'よくある間違い：母音・子音の判断、固有名詞の冠詞、慣用表現での冠詞の有無';
      break;
    case 'be_verb':
      topicDescription = 'be動詞（am, is, areの使い分け）';
      examFocus = 'be動詞の進行形、受動態、完了形での用法、There構文';
      specificExamples = '例：I am studying（進行形）、The book was written（受動態）、There is a book（There構文）';
      commonMistakes = 'よくある間違い：主語とbe動詞の一致、There構文でのbe動詞の選択、受動態でのbe動詞の時制';
      break;
    case 'verb':
      topicDescription = '一般動詞（三人称単数現在形、過去形など）';
      examFocus = '自動詞・他動詞の区別、動詞の語法、句動詞、動詞の活用';
      specificExamples = '例：arrive at（自動詞）、discuss the problem（他動詞）、look up（句動詞）、rise/raiseの区別';
      commonMistakes = 'よくある間違い：自動詞・他動詞の区別、三人称単数現在形のs、不規則動詞の活用';
      break;
    case 'adjective':
      topicDescription = '形容詞（名詞を修飾する語）';
      examFocus = '形容詞の語順、限定用法・叙述用法、比較級・最上級の不規則変化';
      specificExamples = '例：a beautiful old Japanese car（語順）、The car is beautiful（叙述用法）、good-better-best（不規則変化）';
      commonMistakes = 'よくある間違い：形容詞の語順、限定用法と叙述用法の区別、比較級・最上級の作り方';
      break;
    case 'adverb':
      topicDescription = '副詞（動詞・形容詞・他の副詞を修飾する語）';
      examFocus = '副詞の位置、頻度を表す副詞、程度を表す副詞、文修飾副詞';
      specificExamples = '例：He often goes（頻度）、very beautiful（程度）、Fortunately, he succeeded（文修飾）';
      commonMistakes = 'よくある間違い：副詞の位置、形容詞と副詞の区別、頻度副詞の位置';
      break;
    case 'preposition':
      topicDescription = '前置詞（場所・時間・方向などを示す語）';
      examFocus = '前置詞の使い分け、前置詞を含む慣用表現、前置詞の省略';
      specificExamples = '例：in the morning（時間）、at school（場所）、look forward to（慣用表現）、wait for（目的語）';
      commonMistakes = 'よくある間違い：in/on/atの使い分け、前置詞の省略、慣用表現での前置詞';
      break;
    case 'conjunction':
      topicDescription = '接続詞（文や語をつなぐ語）';
      examFocus = '等位接続詞と従属接続詞の区別、接続詞の使い分け、接続詞の省略';
      specificExamples = '例：and, but, or（等位）、because, if, when（従属）、although/though（譲歩）';
      commonMistakes = 'よくある間違い：等位接続詞と従属接続詞の区別、接続詞の省略、though/althoughの使い分け';
      break;
    case 'pattern1':
      topicDescription = '第1文型（S+V：主語＋動詞）';
      examFocus = '自動詞の識別、第1文型の動詞の特徴、There構文との関連';
      specificExamples = '例：The sun rises（自動詞）、There is a book（There構文）、He sleeps（自動詞）';
      commonMistakes = 'よくある間違い：自動詞・他動詞の区別、There構文でのbe動詞の選択';
      break;
    case 'pattern2':
      topicDescription = '第2文型（S+V+C：主語＋動詞＋補語）';
      examFocus = '不完全自動詞の識別、補語の種類（名詞・形容詞）、第2文型を取る動詞';
      specificExamples = '例：He is a student（名詞補語）、She looks happy（形容詞補語）、become, remain, stay';
      commonMistakes = 'よくある間違い：補語の種類の区別、第2文型を取る動詞の識別';
      break;
    case 'pattern3':
      topicDescription = '第3文型（S+V+O：主語＋動詞＋目的語）';
      examFocus = '他動詞の識別、目的語の種類、第3文型から受動態への変換';
      specificExamples = '例：I read a book（他動詞）、She likes music（他動詞）、The book was read（受動態）';
      commonMistakes = 'よくある間違い：自動詞・他動詞の区別、受動態への変換';
      break;
    case 'pattern4':
      topicDescription = '第4文型（S+V+O1+O2：主語＋動詞＋人＋物）';
      examFocus = '第4文型を取る動詞、直接目的語と間接目的語の区別、受動態への変換';
      specificExamples = '例：I gave him a book（give）、She told me the truth（tell）、He was given a book（受動態）';
      commonMistakes = 'よくある間違い：直接目的語と間接目的語の区別、受動態への変換';
      break;
    case 'pattern5':
      topicDescription = '第5文型（S+V+O+C：主語＋動詞＋目的語＋補語）';
      examFocus = '不完全他動詞の識別、目的格補語の種類、知覚動詞・使役動詞の用法';
      specificExamples = '例：I found the book interesting（find）、I saw him run（知覚動詞）、I made him study（使役動詞）';
      commonMistakes = 'よくある間違い：目的格補語の種類、知覚動詞・使役動詞の原形不定詞';
      break;
    case 'passive3':
      topicDescription = '第3文型の受動態（目的語が主語になる受け身の文）';
      examFocus = '受動態の時制、助動詞を含む受動態、by以外の前置詞を使う受動態';
      specificExamples = '例：The letter was written（過去受動態）、The house is being built（進行形受動態）、I was surprised at the news（by以外）';
      commonMistakes = 'よくある間違い：受動態の時制、by以外の前置詞の選択';
      break;
    case 'passive4':
      topicDescription = '第4文型の受動態（人または物が主語になる受け身の文）';
      examFocus = '第4文型の2つの受動態パターン、間接目的語を主語にする受動態';
      specificExamples = '例：He was given a book（人主語）、A book was given to him（物主語）';
      commonMistakes = 'よくある間違い：2つの受動態パターンの使い分け';
      break;
    case 'passive5':
      topicDescription = '第5文型の受動態（目的語＋補語の受け身）';
      examFocus = '第5文型の受動態の特徴、知覚動詞・使役動詞の受動態';
      specificExamples = '例：He was found guilty（find）、He was made to study（make）';
      commonMistakes = 'よくある間違い：知覚動詞・使役動詞の受動態でのto不定詞';
      break;
    case 'gerund':
      topicDescription = '動名詞（動詞のing形で名詞の働きをする）';
      examFocus = '動名詞を目的語に取る動詞、動名詞の意味上の主語、動名詞の否定';
      specificExamples = '例：enjoy reading（enjoy）、finish doing（finish）、His coming surprised me（意味上の主語）';
      commonMistakes = 'よくある間違い：動名詞と不定詞の使い分け、意味上の主語の表現';
      break;
    case 'infinitive':
      topicDescription = '不定詞（to＋動詞の原形）';
      examFocus = '不定詞の3用法（名詞・形容詞・副詞）、不定詞を目的語に取る動詞、原形不定詞';
      specificExamples = '例：To study is important（名詞用法）、I want to go（目的語）、I saw him run（原形不定詞）';
      commonMistakes = 'よくある間違い：不定詞の3用法の区別、動名詞と不定詞の使い分け';
      break;
    case 'participle':
      topicDescription = '分詞（現在分詞・過去分詞）';
      examFocus = '分詞の形容詞的用法、分詞構文、分詞の意味上の主語';
      specificExamples = '例：a sleeping baby（現在分詞）、a broken window（過去分詞）、Walking along the street, I met him（分詞構文）';
      commonMistakes = 'よくある間違い：現在分詞と過去分詞の区別、分詞構文の意味上の主語';
      break;
    case 'participle_construction':
      topicDescription = '分詞構文（分詞を使った副詞句）';
      examFocus = '分詞構文の時制、分詞構文の否定、独立分詞構文';
      specificExamples = '例：Walking along the street, I met him（同時）、Having finished my work, I went home（完了）、Weather permitting（独立分詞構文）';
      commonMistakes = 'よくある間違い：分詞構文の時制、意味上の主語の一致';
      break;
    case 'relative_pronoun':
      topicDescription = '関係代名詞（who, which, thatなど）';
      examFocus = '関係代名詞の格変化、制限用法・非制限用法、関係代名詞の省略';
      specificExamples = '例：The man who lives here（主格）、The book which I bought（目的格）、The man that I met（that）';
      commonMistakes = 'よくある間違い：who/which/thatの使い分け、制限用法と非制限用法の区別';
      break;
    case 'relative_adverb':
      topicDescription = '関係副詞（when, where, whyなど）';
      examFocus = '関係副詞と前置詞＋関係代名詞の書き換え、関係副詞の省略';
      specificExamples = '例：the day when I met him、the place where I was born、the reason why he came';
      commonMistakes = 'よくある間違い：関係副詞と関係代名詞の区別、前置詞の選択';
      break;
    case 'subordinate_conjunction':
      topicDescription = '従属接続詞（because, if, when, althoughなど）';
      examFocus = '時・条件・譲歩・理由を表す接続詞、接続詞の使い分け';
      specificExamples = '例：because（理由）、if（条件）、when（時）、although（譲歩）';
      commonMistakes = 'よくある間違い：接続詞の使い分け、時制の一致';
      break;
    case 'indirect_question':
      topicDescription = '間接疑問文（疑問詞＋主語＋動詞の語順）';
      examFocus = '間接疑問文の語順、間接疑問文と関係詞節の区別';
      specificExamples = '例：I don\'t know where he lives（間接疑問文）、the place where he lives（関係詞節）';
      commonMistakes = 'よくある間違い：直接疑問文と間接疑問文の語順、関係詞節との区別';
      break;
    case 'present_tense':
      topicDescription = '現在形（習慣・事実・状態を表す）';
      examFocus = '現在形の用法、時・条件を表す副詞節での現在形、現在進行形との使い分け';
      specificExamples = '例：I study English（習慣）、The sun rises in the east（事実）、If it rains, I will stay home（条件節）';
      commonMistakes = 'よくある間違い：現在形と現在進行形の使い分け、時・条件節での現在形';
      break;
    case 'past_tense':
      topicDescription = '過去形（過去の出来事を表す）';
      examFocus = '過去形の用法、過去進行形との使い分け、過去完了との関連';
      specificExamples = '例：I went to school yesterday（過去形）、I was studying when he called（過去進行形）';
      commonMistakes = 'よくある間違い：過去形と過去進行形の使い分け、過去完了との区別';
      break;
    case 'progressive_tense':
      topicDescription = '進行形（be動詞＋動詞ing）';
      examFocus = '進行形の用法、進行形にできない動詞、未来進行形';
      specificExamples = '例：I am studying now（現在進行形）、I will be studying tomorrow（未来進行形）、I like music（進行形不可）';
      commonMistakes = 'よくある間違い：進行形にできない動詞、進行形の時制';
      break;
    case 'present_perfect':
      topicDescription = '現在完了（have/has＋過去分詞）';
      examFocus = '現在完了の3用法（完了・経験・継続）、現在完了と過去形の使い分け';
      specificExamples = '例：I have finished my work（完了）、I have been to Paris（経験）、I have lived here for 10 years（継続）';
      commonMistakes = 'よくある間違い：現在完了と過去形の使い分け、3用法の区別';
      break;
    case 'past_perfect':
      topicDescription = '過去完了（had＋過去分詞）';
      examFocus = '過去完了の用法、過去完了進行形、大過去';
      specificExamples = '例：I had finished my work before he came（過去完了）、I had been studying for 2 hours（過去完了進行形）';
      commonMistakes = 'よくある間違い：過去完了と過去形の使い分け、大過去の理解';
      break;
    case 'future_perfect':
      topicDescription = '未来完了形（will have＋過去分詞）';
      examFocus = '未来完了の用法、未来完了進行形';
      specificExamples = '例：I will have finished my work by next week（未来完了）、I will have been studying for 10 years（未来完了進行形）';
      commonMistakes = 'よくある間違い：未来完了の時制、完了の時点の理解';
      break;
    case 'can':
      topicDescription = '助動詞can（可能・許可・能力を表す）';
      examFocus = 'canの3用法、canとbe able toの使い分け、canの過去形could';
      specificExamples = '例：I can swim（能力）、You can go now（許可）、It can be true（可能性）、I could swim when I was young（過去）';
      commonMistakes = 'よくある間違い：canの3用法の区別、canとbe able toの使い分け';
      break;
    case 'will':
      topicDescription = '助動詞will（未来・意志・推量を表す）';
      examFocus = 'willの用法、willとbe going toの使い分け、willの過去形would';
      specificExamples = '例：I will study hard（意志）、It will rain tomorrow（未来）、I would help you（過去の意志）';
      commonMistakes = 'よくある間違い：willとbe going toの使い分け、willの過去形would';
      break;
    case 'may':
      topicDescription = '助動詞may（許可・推量を表す）';
      examFocus = 'mayの用法、mayとmightの使い分け、mayの過去形might';
      specificExamples = '例：You may go now（許可）、It may rain tomorrow（推量）、He might be busy（過去の推量）';
      commonMistakes = 'よくある間違い：mayとmightの使い分け、許可と推量の区別';
      break;
    case 'must':
      topicDescription = '助動詞must（義務・強い推量を表す）';
      examFocus = 'mustの用法、mustとhave toの使い分け、mustの否定形';
      specificExamples = '例：You must study hard（義務）、He must be busy（強い推量）、You don\'t have to go（否定）';
      commonMistakes = 'よくある間違い：mustとhave toの使い分け、mustの否定形';
      break;
    case 'should':
      topicDescription = '助動詞should（助言・当然を表す）';
      examFocus = 'shouldの用法、shouldとought toの使い分け、shouldの過去形';
      specificExamples = '例：You should study hard（助言）、He should be home by now（当然）、I should have studied harder（過去の助言）';
      commonMistakes = 'よくある間違い：shouldとought toの使い分け、should haveの用法';
      break;
    case 'subjunctive_past':
      topicDescription = '仮定法過去（現在の事実と反対の仮定）';
      examFocus = '仮定法過去の形、仮定法過去の用法、wish節での仮定法';
      specificExamples = '例：If I were rich, I would buy a car（仮定法過去）、I wish I were taller（wish節）';
      commonMistakes = 'よくある間違い：仮定法過去の形、wereの使用、wish節での仮定法';
      break;
    case 'subjunctive_past_perfect':
      topicDescription = '仮定法過去完了（過去の事実と反対の仮定）';
      examFocus = '仮定法過去完了の形、仮定法過去完了の用法、混合仮定法';
      specificExamples = '例：If I had studied harder, I would have passed（仮定法過去完了）、I wish I had studied harder（wish節）';
      commonMistakes = 'よくある間違い：仮定法過去完了の形、混合仮定法の理解';
      break;
    case 'subjunctive_future':
      topicDescription = '仮定法未来（未来の仮定）';
      examFocus = '仮定法未来の形、仮定法未来の用法、should/were to';
      specificExamples = '例：If it should rain tomorrow（should）、If it were to rain tomorrow（were to）';
      commonMistakes = 'よくある間違い：shouldとwere toの使い分け、仮定法未来の理解';
      break;
    case 'subjunctive_inversion':
      topicDescription = '仮定法倒置（ifを省略し、助動詞を前に出す）';
      examFocus = '仮定法倒置の形、仮定法倒置の用法、倒置の条件';
      specificExamples = '例：Were I rich, I would buy a car（倒置）、Had I known, I would have helped（過去完了の倒置）';
      commonMistakes = 'よくある間違い：倒置の条件、助動詞の選択';
      break;
    case 'comparative':
      topicDescription = '比較級（2つを比べて「より〜」を表す）';
      examFocus = '比較級の作り方、不規則変化、比較級の修飾語';
      specificExamples = '例：bigger（規則変化）、better（不規則変化）、much better（修飾語）';
      commonMistakes = 'よくある間違い：比較級の作り方、不規則変化、修飾語の選択';
      break;
    case 'superlative':
      topicDescription = '最上級（3つ以上の中で「最も〜」を表す）';
      examFocus = '最上級の作り方、不規則変化、最上級の冠詞';
      specificExamples = '例：the biggest（規則変化）、the best（不規則変化）、the most beautiful（多音節）';
      commonMistakes = 'よくある間違い：最上級の作り方、冠詞の使用、不規則変化';
      break;
    case 'positive':
      topicDescription = '原級（同等比較、「as〜as」を使う）';
      examFocus = '原級比較の形、原級比較の否定、原級比較の修飾語';
      specificExamples = '例：as tall as（同等）、not as tall as（否定）、twice as tall as（修飾語）';
      commonMistakes = 'よくある間違い：as〜asの形、否定の表現、修飾語の位置';
      break;
    default:
      topicDescription = topic;
      examFocus = '大学入試で頻出の文法項目';
      specificExamples = '具体的な例文を提供';
      commonMistakes = 'よくある間違いを考慮';
  }

  const prompt = `あなたは大学入試（センター試験、国公立大学、私立大学）の英語問題作成の専門家です。
${topicDescription}に関する大学受験レベルの4択問題を1問作成してください。

【出題方針】
- 大学入試で実際に出題されるレベルの問題を作成
- 受験生が間違いやすいポイントを狙った問題
- 実践的で応用力を問う問題
- ${examFocus}

【具体的な要求】
1. 問題文は日本語で、大学入試らしい形式で作成
2. 選択肢は英語で、1つが正解、3つが不正解
3. 不正解の選択肢は受験生が実際に間違いそうな内容
4. 正解の選択肢を明示
5. 詳細な解説を日本語で提供（なぜ正解なのか、なぜ他の選択肢が間違いなのか）

【参考情報】
- 具体的な例：${specificExamples}
- よくある間違い：${commonMistakes}
- 難易度：${difficulty}

【問題作成の注意点】
- 選択肢は文法的に正しい英語で作成
- 不正解の選択肢は受験生が実際に選びそうな内容
- 問題文は明確で曖昧さがないように
- 解説は具体的で理解しやすい内容

【出力形式】
{
  "question": "問題文（日本語）",
  "options": [
    {"text": "選択肢1", "correct": false},
    {"text": "選択肢2", "correct": true},
    {"text": "選択肢3", "correct": false},
    {"text": "選択肢4", "correct": false}
  ],
  "explanation": "詳細な解説（正解の理由、不正解の理由、関連する文法事項）",
  "difficulty": "標準",
  "exam_type": "大学入試レベル"
}

必ずJSON形式で出力し、選択肢は文法的に正しい英語で作成してください。`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // または 'gpt-4'（有料）
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3, // より低い温度で一貫性を向上
    max_tokens: 1000, // 十分な長さのレスポンスを確保
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

async function generateFillInTheBlank(topic, difficulty = 'medium', numBlanks = 3) {
  // トピックに応じた具体的なプロンプトを生成
  let topicDescription = '';
  let examFocus = '';
  let specificExamples = '';
  let commonMistakes = '';
  
  switch (topic) {
    case 'noun':
      topicDescription = '名詞（可算名詞・不可算名詞、単数形・複数形など）';
      examFocus = 'センター試験や私大入試で頻出の名詞の用法、集合名詞、物質名詞、抽象名詞の区別';
      specificExamples = '例：family（集合名詞）、information（不可算名詞）、advice（不可算名詞）、equipment（不可算名詞）';
      commonMistakes = 'よくある間違い：集合名詞の単数・複数扱い、物質名詞の冠詞、抽象名詞の可算・不可算の区別';
      break;
    case 'article':
      topicDescription = '冠詞（a, an, theの使い分け）';
      examFocus = '固有名詞と冠詞、抽象名詞の冠詞、慣用表現での冠詞の有無';
      specificExamples = '例：the United States（国名）、a university（子音で始まる語）、an hour（無音のh）、go to school（冠詞なし）';
      commonMistakes = 'よくある間違い：母音・子音の判断、固有名詞の冠詞、慣用表現での冠詞の有無';
      break;
    case 'be_verb':
      topicDescription = 'be動詞（am, is, areの使い分け）';
      examFocus = 'be動詞の進行形、受動態、完了形での用法、There構文';
      specificExamples = '例：I am studying（進行形）、The book was written（受動態）、There is a book（There構文）';
      commonMistakes = 'よくある間違い：主語とbe動詞の一致、There構文でのbe動詞の選択、受動態でのbe動詞の時制';
      break;
    case 'verb':
      topicDescription = '一般動詞（三人称単数現在形、過去形など）';
      examFocus = '自動詞・他動詞の区別、動詞の語法、句動詞、動詞の活用';
      specificExamples = '例：arrive at（自動詞）、discuss the problem（他動詞）、look up（句動詞）、rise/raiseの区別';
      commonMistakes = 'よくある間違い：自動詞・他動詞の区別、三人称単数現在形のs、不規則動詞の活用';
      break;
    default:
      topicDescription = '英語の文法';
      examFocus = '基本的な文法事項';
      specificExamples = '基本的な例文';
      commonMistakes = '一般的な間違い';
  }

  const difficultyLevel = {
    easy: '基礎レベル（中学生レベル）',
    medium: '標準レベル（高校生レベル）',
    hard: '発展レベル（大学受験レベル）'
  };

  const prompt = `
以下の条件で穴埋め問題を生成してください：

【トピック】${topicDescription}
【難易度】${difficultyLevel[difficulty]}
【穴の数】${numBlanks}個
【試験対策】${examFocus}
【具体例】${specificExamples}
【よくある間違い】${commonMistakes}

以下のJSON形式で回答してください：
{
  "sentence": "穴埋め問題の文（穴は ___ で表現）",
  "blanks": [
    {
      "position": 1,
      "correct_answer": "正解",
      "hint": "ヒント",
      "explanation": "解説"
    }
  ],
  "full_sentence": "穴を埋めた完全な文",
  "grammar_point": "学習する文法ポイント",
  "difficulty": "${difficulty}"
}

注意事項：
- 穴の位置は文の流れに自然に配置してください
- 各穴には適切なヒントと解説を付けてください
- 難易度に応じた適切な語彙と文法を使用してください
- 実用的で理解しやすい文を作成してください
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは英語教育の専門家です。学習者のレベルに合わせた適切な穴埋め問題を作成してください。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    
    try {
      const result = JSON.parse(response);
      return {
        success: true,
        data: result
      };
    } catch (parseError) {
      // JSONパースに失敗した場合、フォールバック処理
      return {
        success: false,
        error: "問題の生成に失敗しました。もう一度お試しください。"
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: "問題の生成中にエラーが発生しました。"
    };
  }
}

module.exports = {
  generateQuestion,
  generateFillInTheBlank
}; 