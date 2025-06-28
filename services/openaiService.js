const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 穴埋め問題生成関数
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
    // 助動詞
    case 'can':
      topicDescription = '助動詞can（能力・可能性・許可・依頼）';
      examFocus = 'canの多様な用法、couldとの使い分け、be able toとの違い';
      specificExamples = '例：I can swim（能力）、Can I help you?（依頼）、It can be true（可能性）';
      commonMistakes = 'よくある間違い：canとcouldの使い分け、be able toとの混同';
      break;
    case 'will':
      topicDescription = '助動詞will（未来・意志・推量・習慣）';
      examFocus = 'willの多様な用法、be going toとの違い、wouldとの使い分け';
      specificExamples = '例：I will study hard（意志）、It will rain tomorrow（未来）、He will often work late（習慣）';
      commonMistakes = 'よくある間違い：willとbe going toの使い分け、wouldとの混同';
      break;
    case 'may':
      topicDescription = '助動詞may（許可・推量・可能性）';
      examFocus = 'mayの多様な用法、mightとの使い分け、canとの違い';
      specificExamples = '例：May I come in?（許可）、It may rain（推量）、He may be busy（可能性）';
      commonMistakes = 'よくある間違い：mayとmightの使い分け、canとの混同';
      break;
    case 'must':
      topicDescription = '助動詞must（義務・推量・禁止）';
      examFocus = 'mustの多様な用法、have toとの違い、must notの意味';
      specificExamples = '例：You must study hard（義務）、He must be tired（推量）、You must not smoke（禁止）';
      commonMistakes = 'よくある間違い：mustとhave toの使い分け、must notの意味の誤解';
      break;
    case 'should':
      topicDescription = '助動詞should（義務・推量・提案・後悔）';
      examFocus = 'shouldの多様な用法、ought toとの違い、仮定法でのshould';
      specificExamples = '例：You should study（義務）、He should be home（推量）、I should have studied（後悔）';
      commonMistakes = 'よくある間違い：shouldとought toの使い分け、仮定法でのshouldの用法';
      break;
    // 時制
    case 'present_tense':
      topicDescription = '現在時制（現在形・現在進行形）';
      examFocus = '現在形と現在進行形の使い分け、習慣・事実・進行中の動作';
      specificExamples = '例：I study English（習慣）、I am studying now（進行中）、The sun rises in the east（事実）';
      commonMistakes = 'よくある間違い：現在形と現在進行形の混同、状態動詞の進行形使用';
      break;
    case 'past_tense':
      topicDescription = '過去時制（過去形・過去進行形）';
      examFocus = '過去形と過去進行形の使い分け、過去の習慣・完了した動作';
      specificExamples = '例：I studied yesterday（完了）、I was studying when he called（進行中）、I used to play tennis（習慣）';
      commonMistakes = 'よくある間違い：過去形と過去進行形の混同、used toとwouldの使い分け';
      break;
    case 'present_perfect':
      topicDescription = '現在完了時制（完了・経験・継続・結果）';
      examFocus = '現在完了の4つの用法、過去形との違い、since/forの使い分け';
      specificExamples = '例：I have finished my homework（完了）、I have been to Paris（経験）、I have lived here for 5 years（継続）';
      commonMistakes = 'よくある間違い：現在完了と過去形の混同、since/forの使い分け';
      break;
    case 'past_perfect':
      topicDescription = '過去完了時制（過去より前の完了・経験・継続）';
      examFocus = '過去完了の用法、過去形との時系列、過去完了進行形';
      specificExamples = '例：I had finished my homework before he came（完了）、I had been to Paris before（経験）';
      commonMistakes = 'よくある間違い：過去完了と過去形の混同、時系列の理解不足';
      break;
    case 'future_perfect':
      topicDescription = '未来完了時制（未来の完了・経験・継続）';
      examFocus = '未来完了の用法、未来形との違い、by the timeとの組み合わせ';
      specificExamples = '例：I will have finished my homework by tomorrow（完了）、I will have lived here for 10 years（継続）';
      commonMistakes = 'よくある間違い：未来完了と未来形の混同、by the timeの使い方';
      break;
    case 'progressive':
      topicDescription = '進行形（現在・過去・未来進行形）';
      examFocus = '進行形の用法、状態動詞との関係、進行形の特殊用法';
      specificExamples = '例：I am studying（現在進行）、I was studying（過去進行）、I will be studying（未来進行）';
      commonMistakes = 'よくある間違い：状態動詞の進行形使用、進行形と単純形の混同';
      break;
    // 文型
    case 'pattern1':
      topicDescription = '第1文型（S+V）';
      examFocus = '自動詞の使い方、主語と動詞の関係、第1文型の特徴';
      specificExamples = '例：I run（走る）、The sun rises（太陽が昇る）、Birds fly（鳥が飛ぶ）';
      commonMistakes = 'よくある間違い：自動詞に目的語を付ける、主語と動詞の不一致';
      break;
    case 'pattern2':
      topicDescription = '第2文型（S+V+C）';
      examFocus = '補語の役割、be動詞と一般動詞、形容詞・名詞の補語';
      specificExamples = '例：I am happy（形容詞補語）、He became a teacher（名詞補語）、The flower smells sweet（形容詞補語）';
      commonMistakes = 'よくある間違い：補語と目的語の混同、be動詞の省略';
      break;
    case 'pattern3':
      topicDescription = '第3文型（S+V+O）';
      examFocus = '他動詞の使い方、目的語の役割、第3文型の特徴';
      specificExamples = '例：I study English（他動詞）、She likes music（他動詞）、He reads books（他動詞）';
      commonMistakes = 'よくある間違い：他動詞に目的語を付けない、自動詞と他動詞の混同';
      break;
    case 'pattern4':
      topicDescription = '第4文型（S+V+O+O）';
      examFocus = '間接目的語と直接目的語、give型動詞、to/forの使い分け';
      specificExamples = '例：I gave him a book（間接目的語+直接目的語）、She told me the truth、He bought me a present';
      commonMistakes = 'よくある間違い：目的語の順序、to/forの使い分け';
      break;
    case 'pattern5':
      topicDescription = '第5文型（S+V+O+C）';
      examFocus = '目的語補語、知覚動詞・使役動詞、形容詞・名詞の補語';
      specificExamples = '例：I found the book interesting（形容詞補語）、They elected him president（名詞補語）、I saw him running（現在分詞）';
      commonMistakes = 'よくある間違い：目的語補語と直接目的語の混同、知覚動詞の使い方';
      break;
    // 節
    case 'noun_clause':
      topicDescription = '名詞節（that節・whether節・疑問詞節）';
      examFocus = '名詞節の役割、主語・目的語・補語としての用法、thatの省略';
      specificExamples = '例：That he is honest is true（主語）、I know that he is honest（目的語）、The question is whether he will come（補語）';
      commonMistakes = 'よくある間違い：thatの不適切な省略、名詞節と副詞節の混同';
      break;
    case 'relative_pronoun':
      topicDescription = '関係代名詞（who・which・that・whose）';
      examFocus = '関係代名詞の使い分け、制限用法・非制限用法、関係代名詞の省略';
      specificExamples = '例：The man who lives next door（主格）、The book which I bought（目的格）、The man whose car is red（所有格）';
      commonMistakes = 'よくある間違い：関係代名詞の選択ミス、制限・非制限用法の混同';
      break;
    case 'relative_adverb':
      topicDescription = '関係副詞（where・when・why・how）';
      examFocus = '関係副詞の使い分け、前置詞+関係代名詞との書き換え';
      specificExamples = '例：The place where I was born（場所）、The time when I met him（時）、The reason why I came（理由）';
      commonMistakes = 'よくある間違い：関係副詞と関係代名詞の混同、前置詞の使い方';
      break;
    case 'subordinating_conjunction':
      topicDescription = '従属接続詞（because・if・when・althoughなど）';
      examFocus = '従属接続詞の使い分け、時・条件・理由・譲歩の表現';
      specificExamples = '例：I will go if it rains（条件）、I was happy because I passed（理由）、When I was young（時）';
      commonMistakes = 'よくある間違い：従属接続詞と等位接続詞の混同、時制の一致';
      break;
    // 句
    case 'infinitive':
      topicDescription = '不定詞（to不定詞・原形不定詞）';
      examFocus = '不定詞の3つの用法（名詞・形容詞・副詞）、原形不定詞の使い方';
      specificExamples = '例：To study is important（名詞用法）、I want to study（目的語）、I came to study（副詞用法）';
      commonMistakes = 'よくある間違い：不定詞と動名詞の混同、原形不定詞の使い方';
      break;
    case 'gerund':
      topicDescription = '動名詞（-ing形の名詞用法）';
      examFocus = '動名詞の用法、不定詞との使い分け、動名詞を目的語に取る動詞';
      specificExamples = '例：Reading is fun（主語）、I enjoy reading（目的語）、Thank you for helping（前置詞の目的語）';
      commonMistakes = 'よくある間違い：動名詞と不定詞の混同、前置詞の後の動詞の形';
      break;
    case 'participle':
      topicDescription = '分詞（現在分詞・過去分詞）';
      examFocus = '分詞の形容詞用法、分詞構文、分詞の位置';
      specificExamples = '例：The sleeping baby（現在分詞）、The broken window（過去分詞）、Walking down the street（分詞構文）';
      commonMistakes = 'よくある間違い：現在分詞と過去分詞の混同、分詞構文の使い方';
      break;
    case 'participle_construction':
      topicDescription = '分詞構文（分詞による副詞句）';
      examFocus = '分詞構文の作り方、時・理由・条件・譲歩の表現、主語の一致';
      specificExamples = '例：Walking down the street, I met him（時）、Being tired, I went to bed（理由）、Weather permitting（条件）';
      commonMistakes = 'よくある間違い：主語の不一致、分詞構文と従属節の混同';
      break;
    case 'indirect_question':
      topicDescription = '間接疑問文（疑問詞節・whether/if節）';
      examFocus = '直接疑問文から間接疑問文への変換、語順の変化、時制の一致';
      specificExamples = '例：I don\'t know where he lives（疑問詞節）、I wonder if he will come（whether/if節）';
      commonMistakes = 'よくある間違い：語順の間違い、時制の一致の不備';
      break;
    // 比較
    case 'positive':
      topicDescription = '原級比較（as...as・not as...as）';
      examFocus = '原級の表現、as...as構文、同等比較・不等比較';
      specificExamples = '例：He is as tall as I am（同等）、She is not as tall as he is（不等）、as much as possible（可能な限り）';
      commonMistakes = 'よくある間違い：as...as構文の語順、比較対象の不一致';
      break;
    case 'comparative':
      topicDescription = '比較級（-er・more・less）';
      examFocus = '比較級の作り方、thanの使い方、比較級の特殊用法';
      specificExamples = '例：He is taller than I am（比較級）、more interesting than（more+形容詞）、less expensive than（less+形容詞）';
      commonMistakes = 'よくある間違い：比較級の作り方、thanの後の代名詞の格';
      break;
    case 'superlative':
      topicDescription = '最上級（-est・most・least）';
      examFocus = '最上級の作り方、theの使い方、最上級の特殊用法';
      specificExamples = '例：He is the tallest in the class（最上級）、the most interesting book（most+形容詞）、the least expensive（least+形容詞）';
      commonMistakes = 'よくある間違い：最上級の作り方、theの有無';
      break;
    // 仮定法
    case 'subjunctive_past':
      topicDescription = '仮定法過去（現在の事実に反する仮定）';
      examFocus = '仮定法過去の作り方、wereの使用、if節と主節の時制';
      specificExamples = '例：If I were rich, I would buy a house（現在の事実に反する仮定）、I wish I were taller（願望）';
      commonMistakes = 'よくある間違い：仮定法と直説法の混同、wereの使い方';
      break;
    case 'subjunctive_past_perfect':
      topicDescription = '仮定法過去完了（過去の事実に反する仮定）';
      examFocus = '仮定法過去完了の作り方、had+過去分詞、if節と主節の時制';
      specificExamples = '例：If I had studied harder, I would have passed（過去の事実に反する仮定）、I wish I had studied harder（後悔）';
      commonMistakes = 'よくある間違い：仮定法過去と仮定法過去完了の混同、時制の一致';
      break;
    case 'subjunctive_future':
      topicDescription = '仮定法未来（未来の可能性の低い仮定）';
      examFocus = '仮定法未来の作り方、should・were to・couldの使い方';
      specificExamples = '例：If it should rain tomorrow（未来の可能性の低い仮定）、If I were to win the lottery';
      commonMistakes = 'よくある間違い：仮定法未来と直説法未来の混同、shouldの使い方';
      break;
    case 'subjunctive_inversion':
      topicDescription = '仮定法倒置（ifの省略・語順の倒置）';
      examFocus = 'ifの省略、助動詞の倒置、should・were・hadの倒置';
      specificExamples = '例：Were I rich, I would buy a house（ifの省略）、Had I known, I would have helped（ifの省略）';
      commonMistakes = 'よくある間違い：倒置の語順、ifの省略の条件';
      break;
    default:
      topicDescription = '英語文法の基礎';
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
    
    // JSONレスポンスを解析
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

// 英作文問題生成関数
async function generateWritingQuestion(topic, difficulty = 'medium') {
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
    // 助動詞
    case 'can':
      topicDescription = '助動詞can（能力・可能性・許可・依頼）';
      examFocus = 'canの多様な用法、couldとの使い分け、be able toとの違い';
      specificExamples = '例：I can swim（能力）、Can I help you?（依頼）、It can be true（可能性）';
      commonMistakes = 'よくある間違い：canとcouldの使い分け、be able toとの混同';
      break;
    case 'will':
      topicDescription = '助動詞will（未来・意志・推量・習慣）';
      examFocus = 'willの多様な用法、be going toとの違い、wouldとの使い分け';
      specificExamples = '例：I will study hard（意志）、It will rain tomorrow（未来）、He will often work late（習慣）';
      commonMistakes = 'よくある間違い：willとbe going toの使い分け、wouldとの混同';
      break;
    case 'may':
      topicDescription = '助動詞may（許可・推量・可能性）';
      examFocus = 'mayの多様な用法、mightとの使い分け、canとの違い';
      specificExamples = '例：May I come in?（許可）、It may rain（推量）、He may be busy（可能性）';
      commonMistakes = 'よくある間違い：mayとmightの使い分け、canとの混同';
      break;
    case 'must':
      topicDescription = '助動詞must（義務・推量・禁止）';
      examFocus = 'mustの多様な用法、have toとの違い、must notの意味';
      specificExamples = '例：You must study hard（義務）、He must be tired（推量）、You must not smoke（禁止）';
      commonMistakes = 'よくある間違い：mustとhave toの使い分け、must notの意味の誤解';
      break;
    case 'should':
      topicDescription = '助動詞should（義務・推量・提案・後悔）';
      examFocus = 'shouldの多様な用法、ought toとの違い、仮定法でのshould';
      specificExamples = '例：You should study（義務）、He should be home（推量）、I should have studied（後悔）';
      commonMistakes = 'よくある間違い：shouldとought toの使い分け、仮定法でのshouldの用法';
      break;
    // 時制
    case 'present_tense':
      topicDescription = '現在時制（現在形・現在進行形）';
      examFocus = '現在形と現在進行形の使い分け、習慣・事実・進行中の動作';
      specificExamples = '例：I study English（習慣）、I am studying now（進行中）、The sun rises in the east（事実）';
      commonMistakes = 'よくある間違い：現在形と現在進行形の混同、状態動詞の進行形使用';
      break;
    case 'past_tense':
      topicDescription = '過去時制（過去形・過去進行形）';
      examFocus = '過去形と過去進行形の使い分け、過去の習慣・完了した動作';
      specificExamples = '例：I studied yesterday（完了）、I was studying when he called（進行中）、I used to play tennis（習慣）';
      commonMistakes = 'よくある間違い：過去形と過去進行形の混同、used toとwouldの使い分け';
      break;
    case 'present_perfect':
      topicDescription = '現在完了時制（完了・経験・継続・結果）';
      examFocus = '現在完了の4つの用法、過去形との違い、since/forの使い分け';
      specificExamples = '例：I have finished my homework（完了）、I have been to Paris（経験）、I have lived here for 5 years（継続）';
      commonMistakes = 'よくある間違い：現在完了と過去形の混同、since/forの使い分け';
      break;
    case 'past_perfect':
      topicDescription = '過去完了時制（過去より前の完了・経験・継続）';
      examFocus = '過去完了の用法、過去形との時系列、過去完了進行形';
      specificExamples = '例：I had finished my homework before he came（完了）、I had been to Paris before（経験）';
      commonMistakes = 'よくある間違い：過去完了と過去形の混同、時系列の理解不足';
      break;
    case 'future_perfect':
      topicDescription = '未来完了時制（未来の完了・経験・継続）';
      examFocus = '未来完了の用法、未来形との違い、by the timeとの組み合わせ';
      specificExamples = '例：I will have finished my homework by tomorrow（完了）、I will have lived here for 10 years（継続）';
      commonMistakes = 'よくある間違い：未来完了と未来形の混同、by the timeの使い方';
      break;
    case 'progressive':
      topicDescription = '進行形（現在・過去・未来進行形）';
      examFocus = '進行形の用法、状態動詞との関係、進行形の特殊用法';
      specificExamples = '例：I am studying（現在進行）、I was studying（過去進行）、I will be studying（未来進行）';
      commonMistakes = 'よくある間違い：状態動詞の進行形使用、進行形と単純形の混同';
      break;
    // 文型
    case 'pattern1':
      topicDescription = '第1文型（S+V）';
      examFocus = '自動詞の使い方、主語と動詞の関係、第1文型の特徴';
      specificExamples = '例：I run（走る）、The sun rises（太陽が昇る）、Birds fly（鳥が飛ぶ）';
      commonMistakes = 'よくある間違い：自動詞に目的語を付ける、主語と動詞の不一致';
      break;
    case 'pattern2':
      topicDescription = '第2文型（S+V+C）';
      examFocus = '補語の役割、be動詞と一般動詞、形容詞・名詞の補語';
      specificExamples = '例：I am happy（形容詞補語）、He became a teacher（名詞補語）、The flower smells sweet（形容詞補語）';
      commonMistakes = 'よくある間違い：補語と目的語の混同、be動詞の省略';
      break;
    case 'pattern3':
      topicDescription = '第3文型（S+V+O）';
      examFocus = '他動詞の使い方、目的語の役割、第3文型の特徴';
      specificExamples = '例：I study English（他動詞）、She likes music（他動詞）、He reads books（他動詞）';
      commonMistakes = 'よくある間違い：他動詞に目的語を付けない、自動詞と他動詞の混同';
      break;
    case 'pattern4':
      topicDescription = '第4文型（S+V+O+O）';
      examFocus = '間接目的語と直接目的語、give型動詞、to/forの使い分け';
      specificExamples = '例：I gave him a book（間接目的語+直接目的語）、She told me the truth、He bought me a present';
      commonMistakes = 'よくある間違い：目的語の順序、to/forの使い分け';
      break;
    case 'pattern5':
      topicDescription = '第5文型（S+V+O+C）';
      examFocus = '目的語補語、知覚動詞・使役動詞、形容詞・名詞の補語';
      specificExamples = '例：I found the book interesting（形容詞補語）、They elected him president（名詞補語）、I saw him running（現在分詞）';
      commonMistakes = 'よくある間違い：目的語補語と直接目的語の混同、知覚動詞の使い方';
      break;
    // 節
    case 'noun_clause':
      topicDescription = '名詞節（that節・whether節・疑問詞節）';
      examFocus = '名詞節の役割、主語・目的語・補語としての用法、thatの省略';
      specificExamples = '例：That he is honest is true（主語）、I know that he is honest（目的語）、The question is whether he will come（補語）';
      commonMistakes = 'よくある間違い：thatの不適切な省略、名詞節と副詞節の混同';
      break;
    case 'relative_pronoun':
      topicDescription = '関係代名詞（who・which・that・whose）';
      examFocus = '関係代名詞の使い分け、制限用法・非制限用法、関係代名詞の省略';
      specificExamples = '例：The man who lives next door（主格）、The book which I bought（目的格）、The man whose car is red（所有格）';
      commonMistakes = 'よくある間違い：関係代名詞の選択ミス、制限・非制限用法の混同';
      break;
    case 'relative_adverb':
      topicDescription = '関係副詞（where・when・why・how）';
      examFocus = '関係副詞の使い分け、前置詞+関係代名詞との書き換え';
      specificExamples = '例：The place where I was born（場所）、The time when I met him（時）、The reason why I came（理由）';
      commonMistakes = 'よくある間違い：関係副詞と関係代名詞の混同、前置詞の使い方';
      break;
    case 'subordinating_conjunction':
      topicDescription = '従属接続詞（because・if・when・althoughなど）';
      examFocus = '従属接続詞の使い分け、時・条件・理由・譲歩の表現';
      specificExamples = '例：I will go if it rains（条件）、I was happy because I passed（理由）、When I was young（時）';
      commonMistakes = 'よくある間違い：従属接続詞と等位接続詞の混同、時制の一致';
      break;
    // 句
    case 'infinitive':
      topicDescription = '不定詞（to不定詞・原形不定詞）';
      examFocus = '不定詞の3つの用法（名詞・形容詞・副詞）、原形不定詞の使い方';
      specificExamples = '例：To study is important（名詞用法）、I want to study（目的語）、I came to study（副詞用法）';
      commonMistakes = 'よくある間違い：不定詞と動名詞の混同、原形不定詞の使い方';
      break;
    case 'gerund':
      topicDescription = '動名詞（-ing形の名詞用法）';
      examFocus = '動名詞の用法、不定詞との使い分け、動名詞を目的語に取る動詞';
      specificExamples = '例：Reading is fun（主語）、I enjoy reading（目的語）、Thank you for helping（前置詞の目的語）';
      commonMistakes = 'よくある間違い：動名詞と不定詞の混同、前置詞の後の動詞の形';
      break;
    case 'participle':
      topicDescription = '分詞（現在分詞・過去分詞）';
      examFocus = '分詞の形容詞用法、分詞構文、分詞の位置';
      specificExamples = '例：The sleeping baby（現在分詞）、The broken window（過去分詞）、Walking down the street（分詞構文）';
      commonMistakes = 'よくある間違い：現在分詞と過去分詞の混同、分詞構文の使い方';
      break;
    case 'participle_construction':
      topicDescription = '分詞構文（分詞による副詞句）';
      examFocus = '分詞構文の作り方、時・理由・条件・譲歩の表現、主語の一致';
      specificExamples = '例：Walking down the street, I met him（時）、Being tired, I went to bed（理由）、Weather permitting（条件）';
      commonMistakes = 'よくある間違い：主語の不一致、分詞構文と従属節の混同';
      break;
    case 'indirect_question':
      topicDescription = '間接疑問文（疑問詞節・whether/if節）';
      examFocus = '直接疑問文から間接疑問文への変換、語順の変化、時制の一致';
      specificExamples = '例：I don\'t know where he lives（疑問詞節）、I wonder if he will come（whether/if節）';
      commonMistakes = 'よくある間違い：語順の間違い、時制の一致の不備';
      break;
    // 比較
    case 'positive':
      topicDescription = '原級比較（as...as・not as...as）';
      examFocus = '原級の表現、as...as構文、同等比較・不等比較';
      specificExamples = '例：He is as tall as I am（同等）、She is not as tall as he is（不等）、as much as possible（可能な限り）';
      commonMistakes = 'よくある間違い：as...as構文の語順、比較対象の不一致';
      break;
    case 'comparative':
      topicDescription = '比較級（-er・more・less）';
      examFocus = '比較級の作り方、thanの使い方、比較級の特殊用法';
      specificExamples = '例：He is taller than I am（比較級）、more interesting than（more+形容詞）、less expensive than（less+形容詞）';
      commonMistakes = 'よくある間違い：比較級の作り方、thanの後の代名詞の格';
      break;
    case 'superlative':
      topicDescription = '最上級（-est・most・least）';
      examFocus = '最上級の作り方、theの使い方、最上級の特殊用法';
      specificExamples = '例：He is the tallest in the class（最上級）、the most interesting book（most+形容詞）、the least expensive（least+形容詞）';
      commonMistakes = 'よくある間違い：最上級の作り方、theの有無';
      break;
    // 仮定法
    case 'subjunctive_past':
      topicDescription = '仮定法過去（現在の事実に反する仮定）';
      examFocus = '仮定法過去の作り方、wereの使用、if節と主節の時制';
      specificExamples = '例：If I were rich, I would buy a house（現在の事実に反する仮定）、I wish I were taller（願望）';
      commonMistakes = 'よくある間違い：仮定法と直説法の混同、wereの使い方';
      break;
    case 'subjunctive_past_perfect':
      topicDescription = '仮定法過去完了（過去の事実に反する仮定）';
      examFocus = '仮定法過去完了の作り方、had+過去分詞、if節と主節の時制';
      specificExamples = '例：If I had studied harder, I would have passed（過去の事実に反する仮定）、I wish I had studied harder（後悔）';
      commonMistakes = 'よくある間違い：仮定法過去と仮定法過去完了の混同、時制の一致';
      break;
    case 'subjunctive_future':
      topicDescription = '仮定法未来（未来の可能性の低い仮定）';
      examFocus = '仮定法未来の作り方、should・were to・couldの使い方';
      specificExamples = '例：If it should rain tomorrow（未来の可能性の低い仮定）、If I were to win the lottery';
      commonMistakes = 'よくある間違い：仮定法未来と直説法未来の混同、shouldの使い方';
      break;
    case 'subjunctive_inversion':
      topicDescription = '仮定法倒置（ifの省略・語順の倒置）';
      examFocus = 'ifの省略、助動詞の倒置、should・were・hadの倒置';
      specificExamples = '例：Were I rich, I would buy a house（ifの省略）、Had I known, I would have helped（ifの省略）';
      commonMistakes = 'よくある間違い：倒置の語順、ifの省略の条件';
      break;
    default:
      topicDescription = '英語文法の基礎';
      examFocus = '基本的な文法事項';
      specificExamples = '基本的な例文';
      commonMistakes = '一般的な間違い';
  }

  const difficultySettings = {
    easy: { complexity: '基本的な文法事項を使用した簡単な英作文', length: '1-2文程度の短い文章', vocabulary: '基本的な語彙を使用' },
    medium: { complexity: '複数の文法事項を組み合わせた中程度の英作文', length: '3-4文程度の文章', vocabulary: '中程度の語彙を使用' },
    hard: { complexity: '高度な文法事項を含む複雑な英作文', length: '5-6文程度の長い文章', vocabulary: '高度な語彙と表現を使用' }
  };

  const setting = difficultySettings[difficulty];

  const prompt = `
あなたは英語教育の専門家です。以下の条件に基づいて英作文問題を作成してください。

【トピック】${topicDescription}
【試験対象】${examFocus}
【具体的な例】${specificExamples}
【よくある間違い】${commonMistakes}

【難易度設定】
- 複雑さ: ${setting.complexity}
- 文章の長さ: ${setting.length}
- 語彙レベル: ${setting.vocabulary}

【英検レベル対応】
- 初級: 英検3級レベル（中学卒業程度）
- 中級: 英検準2級レベル（高校中級程度）
- 上級: 英検2級レベル（高校卒業程度）

【要求事項】
1. 日本語で問題文を作成してください
2. その文法事項の理解度を試すような実践的な問題にしてください
3. 難易度に応じた適切なヒントを2-3個提供してください
4. 問題は以下のJSON形式で返してください：

{
  "question": "問題文（日本語）",
  "hints": ["ヒント1", "ヒント2", "ヒント3"],
  "topic": "${topic}",
  "difficulty": "${difficulty}"
}

問題文は具体的で実践的で、学習者がその文法事項を実際に使って英作文できるような内容にしてください。
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは英語教育の専門家で、学習者のレベルに合わせた英作文問題を作成するプロフェッショナルです。"
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
    
    // JSONレスポンスを解析
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON response not found');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // フォールバック用のデフォルト問題
      return {
        question: "私は毎日英語を勉強しています。",
        hints: ["現在形を使いましょう", "「毎日」は「every day」です", "「勉強する」は「study」です"],
        topic: topic,
        difficulty: difficulty
      };
    }
  } catch (error) {
    console.error('Error generating writing question:', error);
    throw new Error('Failed to generate writing question');
  }
}

// 英作文添削関数
async function gradeWritingAnswer(topic, userAnswer, difficulty = 'medium') {
  // トピックに応じた評価基準を設定
  let evaluationCriteria = '';
  let commonMistakes = '';
  
  switch (topic) {
    case 'noun':
      evaluationCriteria = '名詞の可算・不可算の区別、単数・複数形の使い分け、冠詞の使用';
      commonMistakes = '可算名詞と不可算名詞の混同、単数・複数形の間違い、冠詞の誤用';
      break;
    case 'article':
      evaluationCriteria = '冠詞（a, an, the）の適切な使用、冠詞の有無の判断';
      commonMistakes = '冠詞の不適切な使用、冠詞の省略、母音・子音の判断ミス';
      break;
    case 'be_verb':
      evaluationCriteria = 'be動詞の適切な使用、主語との一致、時制の正確性';
      commonMistakes = '主語とbe動詞の不一致、時制の間違い、be動詞の省略';
      break;
    case 'verb':
      evaluationCriteria = '動詞の活用、三人称単数現在形、時制の正確性';
      commonMistakes = '三人称単数現在形のsの抜け、動詞の活用ミス、時制の間違い';
      break;
    case 'adjective':
      evaluationCriteria = '形容詞の適切な使用、語順、限定用法・叙述用法';
      commonMistakes = '形容詞の語順ミス、限定用法と叙述用法の混同';
      break;
    case 'adverb':
      evaluationCriteria = '副詞の適切な使用、位置、形容詞との区別';
      commonMistakes = '副詞の位置ミス、形容詞と副詞の混同';
      break;
    case 'preposition':
      evaluationCriteria = '前置詞の適切な使用、慣用表現での前置詞';
      commonMistakes = '前置詞の選択ミス、前置詞の省略、慣用表現の間違い';
      break;
    case 'conjunction':
      evaluationCriteria = '接続詞の適切な使用、等位接続詞と従属接続詞の区別';
      commonMistakes = '接続詞の選択ミス、接続詞の省略';
      break;
    // 助動詞
    case 'can':
      evaluationCriteria = '助動詞canの適切な使用、能力・可能性・許可・依頼の表現';
      commonMistakes = 'canとcouldの使い分け、be able toとの混同、canの用法の誤解';
      break;
    case 'will':
      evaluationCriteria = '助動詞willの適切な使用、未来・意志・推量・習慣の表現';
      commonMistakes = 'willとbe going toの使い分け、wouldとの混同、willの用法の誤解';
      break;
    case 'may':
      evaluationCriteria = '助動詞mayの適切な使用、許可・推量・可能性の表現';
      commonMistakes = 'mayとmightの使い分け、canとの混同、mayの用法の誤解';
      break;
    case 'must':
      evaluationCriteria = '助動詞mustの適切な使用、義務・推量・禁止の表現';
      commonMistakes = 'mustとhave toの使い分け、must notの意味の誤解、mustの用法の誤解';
      break;
    case 'should':
      evaluationCriteria = '助動詞shouldの適切な使用、義務・推量・提案・後悔の表現';
      commonMistakes = 'shouldとought toの使い分け、仮定法でのshouldの用法、shouldの用法の誤解';
      break;
    // 時制
    case 'present_tense':
      evaluationCriteria = '現在時制の適切な使用、現在形と現在進行形の使い分け';
      commonMistakes = '現在形と現在進行形の混同、状態動詞の進行形使用、時制の不一致';
      break;
    case 'past_tense':
      evaluationCriteria = '過去時制の適切な使用、過去形と過去進行形の使い分け';
      commonMistakes = '過去形と過去進行形の混同、used toとwouldの使い分け、時制の不一致';
      break;
    case 'present_perfect':
      evaluationCriteria = '現在完了時制の適切な使用、完了・経験・継続・結果の表現';
      commonMistakes = '現在完了と過去形の混同、since/forの使い分け、現在完了の用法の誤解';
      break;
    case 'past_perfect':
      evaluationCriteria = '過去完了時制の適切な使用、過去より前の完了・経験・継続の表現';
      commonMistakes = '過去完了と過去形の混同、時系列の理解不足、過去完了の用法の誤解';
      break;
    case 'future_perfect':
      evaluationCriteria = '未来完了時制の適切な使用、未来の完了・経験・継続の表現';
      commonMistakes = '未来完了と未来形の混同、by the timeの使い方、未来完了の用法の誤解';
      break;
    case 'progressive':
      evaluationCriteria = '進行形の適切な使用、現在・過去・未来進行形の使い分け';
      commonMistakes = '状態動詞の進行形使用、進行形と単純形の混同、進行形の用法の誤解';
      break;
    // 文型
    case 'pattern1':
      evaluationCriteria = '第1文型（S+V）の適切な使用、自動詞の使い方';
      commonMistakes = '自動詞に目的語を付ける、主語と動詞の不一致、第1文型の理解不足';
      break;
    case 'pattern2':
      evaluationCriteria = '第2文型（S+V+C）の適切な使用、補語の役割';
      commonMistakes = '補語と目的語の混同、be動詞の省略、第2文型の理解不足';
      break;
    case 'pattern3':
      evaluationCriteria = '第3文型（S+V+O）の適切な使用、他動詞の使い方';
      commonMistakes = '他動詞に目的語を付けない、自動詞と他動詞の混同、第3文型の理解不足';
      break;
    case 'pattern4':
      evaluationCriteria = '第4文型（S+V+O+O）の適切な使用、間接目的語と直接目的語';
      commonMistakes = '目的語の順序、to/forの使い分け、第4文型の理解不足';
      break;
    case 'pattern5':
      evaluationCriteria = '第5文型（S+V+O+C）の適切な使用、目的語補語';
      commonMistakes = '目的語補語と直接目的語の混同、知覚動詞の使い方、第5文型の理解不足';
      break;
    // 節
    case 'noun_clause':
      evaluationCriteria = '名詞節の適切な使用、that節・whether節・疑問詞節の使い分け';
      commonMistakes = 'thatの不適切な省略、名詞節と副詞節の混同、名詞節の用法の誤解';
      break;
    case 'relative_pronoun':
      evaluationCriteria = '関係代名詞の適切な使用、who・which・that・whoseの使い分け';
      commonMistakes = '関係代名詞の選択ミス、制限・非制限用法の混同、関係代名詞の用法の誤解';
      break;
    case 'relative_adverb':
      evaluationCriteria = '関係副詞の適切な使用、where・when・why・howの使い分け';
      commonMistakes = '関係副詞と関係代名詞の混同、前置詞の使い方、関係副詞の用法の誤解';
      break;
    case 'subordinating_conjunction':
      evaluationCriteria = '従属接続詞の適切な使用、時・条件・理由・譲歩の表現';
      commonMistakes = '従属接続詞と等位接続詞の混同、時制の一致、従属接続詞の用法の誤解';
      break;
    // 句
    case 'infinitive':
      evaluationCriteria = '不定詞の適切な使用、to不定詞・原形不定詞の使い分け';
      commonMistakes = '不定詞と動名詞の混同、原形不定詞の使い方、不定詞の用法の誤解';
      break;
    case 'gerund':
      evaluationCriteria = '動名詞の適切な使用、-ing形の名詞用法';
      commonMistakes = '動名詞と不定詞の混同、前置詞の後の動詞の形、動名詞の用法の誤解';
      break;
    case 'participle':
      evaluationCriteria = '分詞の適切な使用、現在分詞・過去分詞の使い分け';
      commonMistakes = '現在分詞と過去分詞の混同、分詞構文の使い方、分詞の用法の誤解';
      break;
    case 'participle_construction':
      evaluationCriteria = '分詞構文の適切な使用、分詞による副詞句';
      commonMistakes = '主語の不一致、分詞構文と従属節の混同、分詞構文の用法の誤解';
      break;
    case 'indirect_question':
      evaluationCriteria = '間接疑問文の適切な使用、疑問詞節・whether/if節の使い分け';
      commonMistakes = '語順の間違い、時制の一致の不備、間接疑問文の用法の誤解';
      break;
    // 比較
    case 'positive':
      evaluationCriteria = '原級比較の適切な使用、as...as・not as...asの使い分け';
      commonMistakes = 'as...as構文の語順、比較対象の不一致、原級比較の用法の誤解';
      break;
    case 'comparative':
      evaluationCriteria = '比較級の適切な使用、-er・more・lessの使い分け';
      commonMistakes = '比較級の作り方、thanの後の代名詞の格、比較級の用法の誤解';
      break;
    case 'superlative':
      evaluationCriteria = '最上級の適切な使用、-est・most・leastの使い分け';
      commonMistakes = '最上級の作り方、theの有無、最上級の用法の誤解';
      break;
    // 仮定法
    case 'subjunctive_past':
      evaluationCriteria = '仮定法過去の適切な使用、現在の事実に反する仮定の表現';
      commonMistakes = '仮定法と直説法の混同、wereの使い方、仮定法過去の用法の誤解';
      break;
    case 'subjunctive_past_perfect':
      evaluationCriteria = '仮定法過去完了の適切な使用、過去の事実に反する仮定の表現';
      commonMistakes = '仮定法過去と仮定法過去完了の混同、時制の一致、仮定法過去完了の用法の誤解';
      break;
    case 'subjunctive_future':
      evaluationCriteria = '仮定法未来の適切な使用、未来の可能性の低い仮定の表現';
      commonMistakes = '仮定法未来と直説法未来の混同、shouldの使い方、仮定法未来の用法の誤解';
      break;
    case 'subjunctive_inversion':
      evaluationCriteria = '仮定法倒置の適切な使用、ifの省略・語順の倒置';
      commonMistakes = '倒置の語順、ifの省略の条件、仮定法倒置の用法の誤解';
      break;
    default:
      evaluationCriteria = '基本的な文法の正確性、語順、語彙の適切性';
      commonMistakes = '基本的な文法ミス、語順の間違い、語彙の不適切な使用';
  }

  const difficultySettings = {
    easy: { tolerance: '基本的な文法ミスは厳しく指摘', scoreWeight: '文法70%、内容30%' },
    medium: { tolerance: '中程度の文法ミスまで指摘', scoreWeight: '文法60%、内容40%' },
    hard: { tolerance: '高度な表現や微妙なニュアンスまで評価', scoreWeight: '文法50%、内容50%' }
  };

  const setting = difficultySettings[difficulty];

  const prompt = `
あなたは英語教育の専門家です。以下の英作文を添削してください。

【評価対象】
トピック: ${topic}
難易度: ${difficulty}
評価基準: ${evaluationCriteria}
よくある間違い: ${commonMistakes}
評価方針: ${setting.tolerance}
配点: ${setting.scoreWeight}

【学習者の解答】
${userAnswer}

【要求事項】
以下のJSON形式で詳細な添削結果を返してください：

{
  "overallScore": 85,
  "overallComment": "全体的によく書けています。基本的な文法は正確ですが、いくつか改善点があります。",
  "grammarCheck": [
    {
      "type": "error",
      "original": "I study English everyday",
      "suggestion": "I study English every day",
      "explanation": "「everyday」は形容詞で「日常の」という意味です。「毎日」は「every day」と分けて書きます。"
    }
  ],
  "improvements": [
    "より自然な表現を使うことで、より良い文章になります",
    "接続詞を効果的に使うことで、文章の流れが良くなります"
  ],
  "modelAnswer": "模範解答例をここに記載"
}

【評価のポイント】
1. 総合評価（0-100点）とコメント
2. 文法チェック（エラー、警告、良い点）
3. 具体的な改善提案（2-3個）
4. 模範解答例

【重要】
- すべての説明・コメント・提案・模範解答も必ず日本語で書いてください。

評価は建設的で、学習者のモチベーションを保つような内容にしてください。
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは英語教育の専門家で、学習者の英作文を丁寧に添削し、建設的なフィードバックを提供するプロフェッショナルです。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    
    // JSONレスポンスを解析
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON response not found');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // フォールバック用のデフォルト添削
      return {
        overallScore: 70,
        overallComment: "基本的な文法は理解できていますが、いくつか改善点があります。",
        grammarCheck: [
          {
            type: "warning",
            original: userAnswer,
            suggestion: "より自然な表現に改善できます",
            explanation: "基本的な意味は通じますが、より自然な英語表現があります。"
          }
        ],
        improvements: [
          "語彙を豊かにすることで、より表現力豊かな文章になります",
          "文法の正確性をさらに向上させましょう"
        ],
        modelAnswer: "模範解答例を確認して、より良い表現を学びましょう。"
      };
    }
  } catch (error) {
    console.error('Error grading writing answer:', error);
    throw new Error('Failed to grade writing answer');
  }
}

// 和文英訳問題生成関数
async function generateTranslationQuestion(topic, difficulty = 'medium') {
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
    // 助動詞
    case 'can':
      topicDescription = '助動詞can（能力・可能性・許可・依頼）';
      examFocus = 'canの多様な用法、couldとの使い分け、be able toとの違い';
      specificExamples = '例：I can swim（能力）、Can I help you?（依頼）、It can be true（可能性）';
      commonMistakes = 'よくある間違い：canとcouldの使い分け、be able toとの混同';
      break;
    case 'will':
      topicDescription = '助動詞will（未来・意志・推量・習慣）';
      examFocus = 'willの多様な用法、be going toとの違い、wouldとの使い分け';
      specificExamples = '例：I will study hard（意志）、It will rain tomorrow（未来）、He will often work late（習慣）';
      commonMistakes = 'よくある間違い：willとbe going toの使い分け、wouldとの混同';
      break;
    case 'may':
      topicDescription = '助動詞may（許可・推量・可能性）';
      examFocus = 'mayの多様な用法、mightとの使い分け、canとの違い';
      specificExamples = '例：May I come in?（許可）、It may rain（推量）、He may be busy（可能性）';
      commonMistakes = 'よくある間違い：mayとmightの使い分け、canとの混同';
      break;
    case 'must':
      topicDescription = '助動詞must（義務・推量・禁止）';
      examFocus = 'mustの多様な用法、have toとの違い、must notの意味';
      specificExamples = '例：You must study hard（義務）、He must be tired（推量）、You must not smoke（禁止）';
      commonMistakes = 'よくある間違い：mustとhave toの使い分け、must notの意味の誤解';
      break;
    case 'should':
      topicDescription = '助動詞should（義務・推量・提案・後悔）';
      examFocus = 'shouldの多様な用法、ought toとの違い、仮定法でのshould';
      specificExamples = '例：You should study（義務）、He should be home（推量）、I should have studied（後悔）';
      commonMistakes = 'よくある間違い：shouldとought toの使い分け、仮定法でのshouldの用法';
      break;
    // 時制
    case 'present_tense':
      topicDescription = '現在時制（現在形・現在進行形）';
      examFocus = '現在形と現在進行形の使い分け、習慣・事実・進行中の動作';
      specificExamples = '例：I study English（習慣）、I am studying now（進行中）、The sun rises in the east（事実）';
      commonMistakes = 'よくある間違い：現在形と現在進行形の混同、状態動詞の進行形使用';
      break;
    case 'past_tense':
      topicDescription = '過去時制（過去形・過去進行形）';
      examFocus = '過去形と過去進行形の使い分け、過去の習慣・完了した動作';
      specificExamples = '例：I studied yesterday（完了）、I was studying when he called（進行中）、I used to play tennis（習慣）';
      commonMistakes = 'よくある間違い：過去形と過去進行形の混同、used toとwouldの使い分け';
      break;
    case 'present_perfect':
      topicDescription = '現在完了時制（完了・経験・継続・結果）';
      examFocus = '現在完了の4つの用法、過去形との違い、since/forの使い分け';
      specificExamples = '例：I have finished my homework（完了）、I have been to Paris（経験）、I have lived here for 5 years（継続）';
      commonMistakes = 'よくある間違い：現在完了と過去形の混同、since/forの使い分け';
      break;
    case 'past_perfect':
      topicDescription = '過去完了時制（過去より前の完了・経験・継続）';
      examFocus = '過去完了の用法、過去形との時系列、過去完了進行形';
      specificExamples = '例：I had finished my homework before he came（完了）、I had been to Paris before（経験）';
      commonMistakes = 'よくある間違い：過去完了と過去形の混同、時系列の理解不足';
      break;
    case 'future_perfect':
      topicDescription = '未来完了時制（未来の完了・経験・継続）';
      examFocus = '未来完了の用法、未来形との違い、by the timeとの組み合わせ';
      specificExamples = '例：I will have finished my homework by tomorrow（完了）、I will have lived here for 10 years（継続）';
      commonMistakes = 'よくある間違い：未来完了と未来形の混同、by the timeの使い方';
      break;
    case 'progressive':
      topicDescription = '進行形（現在・過去・未来進行形）';
      examFocus = '進行形の用法、状態動詞との関係、進行形の特殊用法';
      specificExamples = '例：I am studying（現在進行）、I was studying（過去進行）、I will be studying（未来進行）';
      commonMistakes = 'よくある間違い：状態動詞の進行形使用、進行形と単純形の混同';
      break;
    // 文型
    case 'pattern1':
      topicDescription = '第1文型（S+V）';
      examFocus = '自動詞の使い方、主語と動詞の関係、第1文型の特徴';
      specificExamples = '例：I run（走る）、The sun rises（太陽が昇る）、Birds fly（鳥が飛ぶ）';
      commonMistakes = 'よくある間違い：自動詞に目的語を付ける、主語と動詞の不一致';
      break;
    case 'pattern2':
      topicDescription = '第2文型（S+V+C）';
      examFocus = '補語の役割、be動詞と一般動詞、形容詞・名詞の補語';
      specificExamples = '例：I am happy（形容詞補語）、He became a teacher（名詞補語）、The flower smells sweet（形容詞補語）';
      commonMistakes = 'よくある間違い：補語と目的語の混同、be動詞の省略';
      break;
    case 'pattern3':
      topicDescription = '第3文型（S+V+O）';
      examFocus = '他動詞の使い方、目的語の役割、第3文型の特徴';
      specificExamples = '例：I study English（他動詞）、She likes music（他動詞）、He reads books（他動詞）';
      commonMistakes = 'よくある間違い：他動詞に目的語を付けない、自動詞と他動詞の混同';
      break;
    case 'pattern4':
      topicDescription = '第4文型（S+V+O+O）';
      examFocus = '間接目的語と直接目的語、give型動詞、to/forの使い分け';
      specificExamples = '例：I gave him a book（間接目的語+直接目的語）、She told me the truth、He bought me a present';
      commonMistakes = 'よくある間違い：目的語の順序、to/forの使い分け';
      break;
    case 'pattern5':
      topicDescription = '第5文型（S+V+O+C）';
      examFocus = '目的語補語、知覚動詞・使役動詞、形容詞・名詞の補語';
      specificExamples = '例：I found the book interesting（形容詞補語）、They elected him president（名詞補語）、I saw him running（現在分詞）';
      commonMistakes = 'よくある間違い：目的語補語と直接目的語の混同、知覚動詞の使い方';
      break;
    // 節
    case 'noun_clause':
      topicDescription = '名詞節（that節・whether節・疑問詞節）';
      examFocus = '名詞節の役割、主語・目的語・補語としての用法、thatの省略';
      specificExamples = '例：That he is honest is true（主語）、I know that he is honest（目的語）、The question is whether he will come（補語）';
      commonMistakes = 'よくある間違い：thatの不適切な省略、名詞節と副詞節の混同';
      break;
    case 'relative_pronoun':
      topicDescription = '関係代名詞（who・which・that・whose）';
      examFocus = '関係代名詞の使い分け、制限用法・非制限用法、関係代名詞の省略';
      specificExamples = '例：The man who lives next door（主格）、The book which I bought（目的格）、The man whose car is red（所有格）';
      commonMistakes = 'よくある間違い：関係代名詞の選択ミス、制限・非制限用法の混同';
      break;
    case 'relative_adverb':
      topicDescription = '関係副詞（where・when・why・how）';
      examFocus = '関係副詞の使い分け、前置詞+関係代名詞との書き換え';
      specificExamples = '例：The place where I was born（場所）、The time when I met him（時）、The reason why I came（理由）';
      commonMistakes = 'よくある間違い：関係副詞と関係代名詞の混同、前置詞の使い方';
      break;
    case 'subordinating_conjunction':
      topicDescription = '従属接続詞（because・if・when・althoughなど）';
      examFocus = '従属接続詞の使い分け、時・条件・理由・譲歩の表現';
      specificExamples = '例：I will go if it rains（条件）、I was happy because I passed（理由）、When I was young（時）';
      commonMistakes = 'よくある間違い：従属接続詞と等位接続詞の混同、時制の一致';
      break;
    // 句
    case 'infinitive':
      topicDescription = '不定詞（to不定詞・原形不定詞）';
      examFocus = '不定詞の3つの用法（名詞・形容詞・副詞）、原形不定詞の使い方';
      specificExamples = '例：To study is important（名詞用法）、I want to study（目的語）、I came to study（副詞用法）';
      commonMistakes = 'よくある間違い：不定詞と動名詞の混同、原形不定詞の使い方';
      break;
    case 'gerund':
      topicDescription = '動名詞（-ing形の名詞用法）';
      examFocus = '動名詞の用法、不定詞との使い分け、動名詞を目的語に取る動詞';
      specificExamples = '例：Reading is fun（主語）、I enjoy reading（目的語）、Thank you for helping（前置詞の目的語）';
      commonMistakes = 'よくある間違い：動名詞と不定詞の混同、前置詞の後の動詞の形';
      break;
    case 'participle':
      topicDescription = '分詞（現在分詞・過去分詞）';
      examFocus = '分詞の形容詞用法、分詞構文、分詞の位置';
      specificExamples = '例：The sleeping baby（現在分詞）、The broken window（過去分詞）、Walking down the street（分詞構文）';
      commonMistakes = 'よくある間違い：現在分詞と過去分詞の混同、分詞構文の使い方';
      break;
    case 'participle_construction':
      topicDescription = '分詞構文（分詞による副詞句）';
      examFocus = '分詞構文の作り方、時・理由・条件・譲歩の表現、主語の一致';
      specificExamples = '例：Walking down the street, I met him（時）、Being tired, I went to bed（理由）、Weather permitting（条件）';
      commonMistakes = 'よくある間違い：主語の不一致、分詞構文と従属節の混同';
      break;
    case 'indirect_question':
      topicDescription = '間接疑問文（疑問詞節・whether/if節）';
      examFocus = '直接疑問文から間接疑問文への変換、語順の変化、時制の一致';
      specificExamples = '例：I don\'t know where he lives（疑問詞節）、I wonder if he will come（whether/if節）';
      commonMistakes = 'よくある間違い：語順の間違い、時制の一致の不備';
      break;
    // 比較
    case 'positive':
      topicDescription = '原級比較（as...as・not as...as）';
      examFocus = '原級の表現、as...as構文、同等比較・不等比較';
      specificExamples = '例：He is as tall as I am（同等）、She is not as tall as he is（不等）、as much as possible（可能な限り）';
      commonMistakes = 'よくある間違い：as...as構文の語順、比較対象の不一致';
      break;
    case 'comparative':
      topicDescription = '比較級（-er・more・less）';
      examFocus = '比較級の作り方、thanの使い方、比較級の特殊用法';
      specificExamples = '例：He is taller than I am（比較級）、more interesting than（more+形容詞）、less expensive than（less+形容詞）';
      commonMistakes = 'よくある間違い：比較級の作り方、thanの後の代名詞の格';
      break;
    case 'superlative':
      topicDescription = '最上級（-est・most・least）';
      examFocus = '最上級の作り方、theの使い方、最上級の特殊用法';
      specificExamples = '例：He is the tallest in the class（最上級）、the most interesting book（most+形容詞）、the least expensive（least+形容詞）';
      commonMistakes = 'よくある間違い：最上級の作り方、theの有無';
      break;
    // 仮定法
    case 'subjunctive_past':
      topicDescription = '仮定法過去（現在の事実に反する仮定）';
      examFocus = '仮定法過去の作り方、wereの使用、if節と主節の時制';
      specificExamples = '例：If I were rich, I would buy a house（現在の事実に反する仮定）、I wish I were taller（願望）';
      commonMistakes = 'よくある間違い：仮定法と直説法の混同、wereの使い方';
      break;
    case 'subjunctive_past_perfect':
      topicDescription = '仮定法過去完了（過去の事実に反する仮定）';
      examFocus = '仮定法過去完了の作り方、had+過去分詞、if節と主節の時制';
      specificExamples = '例：If I had studied harder, I would have passed（過去の事実に反する仮定）、I wish I had studied harder（後悔）';
      commonMistakes = 'よくある間違い：仮定法過去と仮定法過去完了の混同、時制の一致';
      break;
    case 'subjunctive_future':
      topicDescription = '仮定法未来（未来の可能性の低い仮定）';
      examFocus = '仮定法未来の作り方、should・were to・couldの使い方';
      specificExamples = '例：If it should rain tomorrow（未来の可能性の低い仮定）、If I were to win the lottery';
      commonMistakes = 'よくある間違い：仮定法未来と直説法未来の混同、shouldの使い方';
      break;
    case 'subjunctive_inversion':
      topicDescription = '仮定法倒置（ifの省略・語順の倒置）';
      examFocus = 'ifの省略、助動詞の倒置、should・were・hadの倒置';
      specificExamples = '例：Were I rich, I would buy a house（ifの省略）、Had I known, I would have helped（ifの省略）';
      commonMistakes = 'よくある間違い：倒置の語順、ifの省略の条件';
      break;
    default:
      topicDescription = '英語文法の基礎';
      examFocus = '基本的な文法事項';
      specificExamples = '基本的な例文';
      commonMistakes = '一般的な間違い';
  }

  const difficultySettings = {
    easy: { complexity: '英検3級レベルの基本的な文法事項を使用した簡単な和文英訳', length: '1文程度の文章', vocabulary: '英検3級レベルの基本的な語彙を使用' },
    medium: { complexity: '英検準2級レベルの複数の文法事項を組み合わせた中程度の和文英訳', length: '1文程度の文章', vocabulary: '英検準2級レベルの語彙を使用' },
    hard: { complexity: '英検2級レベルの高度な文法事項を含む複雑な和文英訳', length: '1文程度の文章', vocabulary: '英検2級レベルの高度な語彙と表現を使用' }
  };

  const setting = difficultySettings[difficulty];

  const prompt = `
あなたは英語教育の専門家です。以下の条件に基づいて和文英訳問題を作成してください。

【トピック】${topicDescription}
【試験対象】${examFocus}
【具体的な例】${specificExamples}
【よくある間違い】${commonMistakes}

【難易度設定】
- 複雑さ: ${setting.complexity}
- 文章の長さ: ${setting.length}
- 語彙レベル: ${setting.vocabulary}

【英検レベル対応】
- 初級: 英検3級レベル（中学卒業程度）
- 中級: 英検準2級レベル（高校中級程度）
- 上級: 英検2級レベル（高校卒業程度）

【要求事項】
1. 日本語で1つの文章を問題文として作成してください（和文英訳用）
2. その文法事項の理解度を試すような実践的な問題にしてください
3. 難易度に応じた適切なヒントを2-3個提供してください
4. 問題は以下のJSON形式で返してください：

{
  "question": "問題文（日本語の1つの文章）",
  "hints": ["ヒント1", "ヒント2", "ヒント3"],
  "topic": "${topic}",
  "difficulty": "${difficulty}"
}

【重要】
- 問題文は必ず1つの文章のみにしてください
- 複数の文章や段落にしないでください
- 1文程度の長さにしてください（短すぎず長すぎない適切な長さ）
- その文法事項を効果的に練習できる内容にしてください
- 実用的で理解しやすい文章にしてください
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは英語教育の専門家で、学習者のレベルに合わせた和文英訳問題を作成するプロフェッショナルです。必ず1つの文章のみを問題文として作成してください。複数の文章や段落は作成しないでください。英検3級（初級）、英検準2級（中級）、英検2級（上級）のレベルに応じた適切な難易度で問題を作成してください。"
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
    
    // JSONレスポンスを解析
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON response not found');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // フォールバック用のデフォルト問題
      return {
        question: "私は毎日英語を勉強しています。",
        hints: ["現在形を使いましょう", "「毎日」は「every day」です", "「勉強する」は「study」です"],
        topic: topic,
        difficulty: difficulty
      };
    }
  } catch (error) {
    console.error('Error generating translation question:', error);
    throw new Error('Failed to generate translation question');
  }
}

// 和文英訳添削関数
async function gradeTranslationAnswer(topic, userAnswer, difficulty = 'medium') {
  // トピックに応じた評価基準を設定
  let evaluationCriteria = '';
  let commonMistakes = '';
  
  switch (topic) {
    case 'noun':
      evaluationCriteria = '名詞の可算・不可算の区別、単数・複数形の使い分け、冠詞の使用';
      commonMistakes = '可算名詞と不可算名詞の混同、単数・複数形の間違い、冠詞の誤用';
      break;
    case 'article':
      evaluationCriteria = '冠詞（a, an, the）の適切な使用、冠詞の有無の判断';
      commonMistakes = '冠詞の不適切な使用、冠詞の省略、母音・子音の判断ミス';
      break;
    case 'be_verb':
      evaluationCriteria = 'be動詞の適切な使用、主語との一致、時制の正確性';
      commonMistakes = '主語とbe動詞の不一致、時制の間違い、be動詞の省略';
      break;
    case 'verb':
      evaluationCriteria = '動詞の活用、三人称単数現在形、時制の正確性';
      commonMistakes = '三人称単数現在形のsの抜け、動詞の活用ミス、時制の間違い';
      break;
    case 'adjective':
      evaluationCriteria = '形容詞の適切な使用、語順、限定用法・叙述用法';
      commonMistakes = '形容詞の語順ミス、限定用法と叙述用法の混同';
      break;
    case 'adverb':
      evaluationCriteria = '副詞の適切な使用、位置、形容詞との区別';
      commonMistakes = '副詞の位置ミス、形容詞と副詞の混同';
      break;
    case 'preposition':
      evaluationCriteria = '前置詞の適切な使用、慣用表現での前置詞';
      commonMistakes = '前置詞の選択ミス、前置詞の省略、慣用表現の間違い';
      break;
    case 'conjunction':
      evaluationCriteria = '接続詞の適切な使用、等位接続詞と従属接続詞の区別';
      commonMistakes = '接続詞の選択ミス、接続詞の省略';
      break;
    default:
      evaluationCriteria = '基本的な文法の正確性、語順、語彙の適切性';
      commonMistakes = '基本的な文法ミス、語順の間違い、語彙の不適切な使用';
  }

  const difficultySettings = {
    easy: { tolerance: '基本的な文法ミスは厳しく指摘', scoreWeight: '文法70%、内容30%' },
    medium: { tolerance: '中程度の文法ミスまで指摘', scoreWeight: '文法60%、内容40%' },
    hard: { tolerance: '高度な表現や微妙なニュアンスまで評価', scoreWeight: '文法50%、内容50%' }
  };

  const setting = difficultySettings[difficulty];

  const prompt = `
あなたは英語教育の専門家です。以下の和文英訳の解答を添削してください。

【評価対象】
トピック: ${topic}
難易度: ${difficulty}
評価基準: ${evaluationCriteria}
よくある間違い: ${commonMistakes}
評価方針: ${setting.tolerance}
配点: ${setting.scoreWeight}

【学習者の解答】
${userAnswer}

【要求事項】
以下のJSON形式で詳細な添削結果を返してください：

{
  "overallScore": 85,
  "overallComment": "全体的によく訳せています。基本的な文法は正確ですが、いくつか改善点があります。",
  "grammarCheck": [
    {
      "type": "error",
      "original": "I study English everyday",
      "suggestion": "I study English every day",
      "explanation": "「everyday」は形容詞で「日常の」という意味です。「毎日」は「every day」と分けて書きます。"
    }
  ],
  "improvements": [
    "より自然な表現を使うことで、より良い訳文になります",
    "接続詞を効果的に使うことで、文章の流れが良くなります"
  ],
  "modelAnswer": "模範解答例をここに記載"
}

【評価のポイント】
1. 総合評価（0-100点）とコメント
2. 文法チェック（エラー、警告、良い点）
3. 具体的な改善提案（2-3個）
4. 模範解答例

評価は建設的で、学習者のモチベーションを保つような内容にしてください。
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは英語教育の専門家で、学習者の和文英訳を丁寧に添削し、建設的なフィードバックを提供するプロフェッショナルです。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    
    // JSONレスポンスを解析
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON response not found');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // フォールバック用のデフォルト添削
      return {
        overallScore: 70,
        overallComment: "基本的な文法は理解できていますが、いくつか改善点があります。",
        grammarCheck: [
          {
            type: "warning",
            original: userAnswer,
            suggestion: "より自然な表現に改善できます",
            explanation: "基本的な意味は通じますが、より自然な英語表現があります。"
          }
        ],
        improvements: [
          "語彙を豊かにすることで、より表現力豊かな訳文になります",
          "文法の正確性をさらに向上させましょう"
        ],
        modelAnswer: "模範解答例を確認して、より良い表現を学びましょう。"
      };
    }
  } catch (error) {
    console.error('Error grading translation answer:', error);
    throw new Error('Failed to grade translation answer');
  }
}

module.exports = {
  generateFillInTheBlank,
  gradeWritingAnswer,
  generateWritingQuestion,
  generateTranslationQuestion,
  gradeTranslationAnswer
}; 