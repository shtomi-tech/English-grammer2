// examples.js

// 例文データ（例：比較級ページ用）
const examplesData = {
  comparative: [
    {
      title: "短い形容詞の比較級",
      examples: [
        { en: "This book is bigger than that one.", ja: "この本はあの本より大きい" },
        { en: "She is taller than her sister.", ja: "彼女は妹より背が高い" },
        { en: "He runs faster than I do.", ja: "彼は私より速く走る" }
      ]
    },
    {
      title: "長い形容詞の比較級",
      examples: [
        { en: "This movie is more interesting than that one.", ja: "この映画はあの映画より面白い" },
        { en: "She is more beautiful than her mother.", ja: "彼女は母親より美しい" },
        { en: "He speaks more clearly than I do.", ja: "彼は私より明確に話す" }
      ]
    },
    {
      title: "不規則変化の比較級",
      examples: [
        { en: "This is better than that.", ja: "これはあれより良い" },
        { en: "His condition is worse than before.", ja: "彼の状態は以前より悪い" },
        { en: "Tokyo is farther than Osaka.", ja: "東京は大阪より遠い" }
      ]
    }
  ],
  positive: [
    {
      title: "as...as の原級比較",
      examples: [
        { en: "This book is as interesting as that one.", ja: "この本はあの本と同じくらい面白い" },
        { en: "She is as tall as her sister.", ja: "彼女は妹と同じくらい背が高い" },
        { en: "He runs as fast as I do.", ja: "彼は私と同じくらい速く走る" }
      ]
    },
    {
      title: "not as...as の否定比較",
      examples: [
        { en: "This movie is not as good as that one.", ja: "この映画はあの映画ほど良くない" },
        { en: "He is not as smart as his brother.", ja: "彼は兄ほど賢くない" },
        { en: "She doesn't work as hard as I do.", ja: "彼女は私ほど一生懸命働かない" }
      ]
    },
    {
      title: "倍数表現",
      examples: [
        { en: "This building is twice as tall as that one.", ja: "この建物はあの建物の2倍の高さだ" },
        { en: "She earns three times as much as I do.", ja: "彼女は私の3倍稼いでいる" },
        { en: "This car is half as expensive as that one.", ja: "この車はあの車の半分の値段だ" }
      ]
    }
  ],
  superlative: [
    {
      title: "短い形容詞の最上級",
      examples: [
        { en: "This is the biggest book in the library.", ja: "これは図書館で一番大きな本だ" },
        { en: "She is the tallest girl in her class.", ja: "彼女はクラスで一番背が高い" },
        { en: "He runs the fastest in the team.", ja: "彼はチームで一番速く走る" }
      ]
    },
    {
      title: "長い形容詞の最上級",
      examples: [
        { en: "This is the most interesting movie I've ever seen.", ja: "これは私が見た中で一番面白い映画だ" },
        { en: "She is the most beautiful woman in the world.", ja: "彼女は世界で一番美しい女性だ" },
        { en: "He speaks the most clearly in the class.", ja: "彼はクラスで一番明確に話す" }
      ]
    },
    {
      title: "不規則変化の最上級",
      examples: [
        { en: "This is the best book I've ever read.", ja: "これは私が読んだ中で一番良い本だ" },
        { en: "That was the worst movie I've ever seen.", ja: "あれは私が見た中で一番悪い映画だった" },
        { en: "Tokyo is the farthest city I've visited.", ja: "東京は私が訪れた中で一番遠い都市だ" }
      ]
    }
  ],
  // 品詞セクション
  noun: [
    {
      title: "普通名詞",
      examples: [
        { en: "I have a book.", ja: "私は本を持っています" },
        { en: "The car is red.", ja: "その車は赤い" },
        { en: "She likes dogs.", ja: "彼女は犬が好きだ" }
      ]
    },
    {
      title: "固有名詞",
      examples: [
        { en: "Tokyo is the capital of Japan.", ja: "東京は日本の首都だ" },
        { en: "John lives in New York.", ja: "ジョンはニューヨークに住んでいる" },
        { en: "I love Mount Fuji.", ja: "私は富士山が大好きだ" }
      ]
    },
    {
      title: "抽象名詞",
      examples: [
        { en: "Happiness is important.", ja: "幸せは大切だ" },
        { en: "I need freedom.", ja: "私は自由が必要だ" },
        { en: "Love conquers all.", ja: "愛はすべてを征服する" }
      ]
    }
  ],
  verb: [
    {
      title: "動作動詞",
      examples: [
        { en: "I run every morning.", ja: "私は毎朝走る" },
        { en: "She reads books.", ja: "彼女は本を読む" },
        { en: "They play soccer.", ja: "彼らはサッカーをする" }
      ]
    },
    {
      title: "状態動詞",
      examples: [
        { en: "I know the answer.", ja: "私は答えを知っている" },
        { en: "She loves music.", ja: "彼女は音楽が大好きだ" },
        { en: "He has a car.", ja: "彼は車を持っている" }
      ]
    },
    {
      title: "助動詞",
      examples: [
        { en: "I can swim.", ja: "私は泳げる" },
        { en: "She will come.", ja: "彼女は来るだろう" },
        { en: "He must study.", ja: "彼は勉強しなければならない" }
      ]
    }
  ],
  adjective: [
    {
      title: "性質を表す形容詞",
      examples: [
        { en: "This is a big house.", ja: "これは大きな家だ" },
        { en: "She is beautiful.", ja: "彼女は美しい" },
        { en: "The food is delicious.", ja: "その食べ物は美味しい" }
      ]
    },
    {
      title: "状態を表す形容詞",
      examples: [
        { en: "I am happy.", ja: "私は幸せだ" },
        { en: "He is tired.", ja: "彼は疲れている" },
        { en: "She is busy.", ja: "彼女は忙しい" }
      ]
    },
    {
      title: "数量を表す形容詞",
      examples: [
        { en: "I have many books.", ja: "私は多くの本を持っている" },
        { en: "There is little water.", ja: "水が少ししかない" },
        { en: "She has few friends.", ja: "彼女は友達が少ない" }
      ]
    }
  ],
  adverb: [
    {
      title: "様態を表す副詞",
      examples: [
        { en: "He runs quickly.", ja: "彼は速く走る" },
        { en: "She speaks clearly.", ja: "彼女は明確に話す" },
        { en: "They work hard.", ja: "彼らは一生懸命働く" }
      ]
    },
    {
      title: "時を表す副詞",
      examples: [
        { en: "I will go tomorrow.", ja: "私は明日行く" },
        { en: "She came yesterday.", ja: "彼女は昨日来た" },
        { en: "He always studies.", ja: "彼はいつも勉強する" }
      ]
    },
    {
      title: "場所を表す副詞",
      examples: [
        { en: "I live here.", ja: "私はここに住んでいる" },
        { en: "She went there.", ja: "彼女はそこに行った" },
        { en: "He is upstairs.", ja: "彼は階上にいる" }
      ]
    }
  ],
  article: [
    {
      title: "不定冠詞（a/an）",
      examples: [
        { en: "I have a book.", ja: "私は本を持っています" },
        { en: "She is an actress.", ja: "彼女は女優だ" },
        { en: "He bought a car.", ja: "彼は車を買った" }
      ]
    },
    {
      title: "定冠詞（the）",
      examples: [
        { en: "The sun is bright.", ja: "太陽は明るい" },
        { en: "I like the book.", ja: "私はその本が好きだ" },
        { en: "The United States is large.", ja: "アメリカは大きい" }
      ]
    },
    {
      title: "無冠詞",
      examples: [
        { en: "I like music.", ja: "私は音楽が好きだ" },
        { en: "She studies English.", ja: "彼女は英語を勉強する" },
        { en: "He drinks coffee.", ja: "彼はコーヒーを飲む" }
      ]
    }
  ],
  preposition: [
    {
      title: "場所を表す前置詞",
      examples: [
        { en: "I live in Tokyo.", ja: "私は東京に住んでいる" },
        { en: "The book is on the table.", ja: "本は机の上にある" },
        { en: "He is at school.", ja: "彼は学校にいる" }
      ]
    },
    {
      title: "時を表す前置詞",
      examples: [
        { en: "I will meet you at 3 PM.", ja: "私は午後3時にあなたに会う" },
        { en: "She was born in 1990.", ja: "彼女は1990年に生まれた" },
        { en: "I work on Monday.", ja: "私は月曜日に働く" }
      ]
    },
    {
      title: "方向を表す前置詞",
      examples: [
        { en: "I go to school.", ja: "私は学校に行く" },
        { en: "She came from Japan.", ja: "彼女は日本から来た" },
        { en: "He walked toward the station.", ja: "彼は駅に向かって歩いた" }
      ]
    }
  ],
  conjunction: [
    {
      title: "等位接続詞",
      examples: [
        { en: "I like tea and coffee.", ja: "私は紅茶とコーヒーが好きだ" },
        { en: "She is smart but lazy.", ja: "彼女は賢いが怠け者だ" },
        { en: "You can go or stay.", ja: "あなたは行くか留まるかできる" }
      ]
    },
    {
      title: "従属接続詞",
      examples: [
        { en: "I will go if it rains.", ja: "雨が降れば私は行く" },
        { en: "She studies while he sleeps.", ja: "彼女は彼が寝ている間勉強する" },
        { en: "I know that he is honest.", ja: "私は彼が正直だと知っている" }
      ]
    },
    {
      title: "相関接続詞",
      examples: [
        { en: "Both you and I are students.", ja: "あなたも私も学生だ" },
        { en: "Either you or he must go.", ja: "あなたか彼のどちらかが行かなければならない" },
        { en: "Neither he nor she came.", ja: "彼も彼女も来なかった" }
      ]
    }
  ],
  be_verb: [
    {
      title: "現在形",
      examples: [
        { en: "I am a student.", ja: "私は学生だ" },
        { en: "You are tall.", ja: "あなたは背が高い" },
        { en: "He is busy.", ja: "彼は忙しい" }
      ]
    },
    {
      title: "過去形",
      examples: [
        { en: "I was tired yesterday.", ja: "私は昨日疲れていた" },
        { en: "You were late.", ja: "あなたは遅刻した" },
        { en: "They were happy.", ja: "彼らは幸せだった" }
      ]
    },
    {
      title: "進行形・受動態",
      examples: [
        { en: "I am studying now.", ja: "私は今勉強している" },
        { en: "The book was written by him.", ja: "その本は彼によって書かれた" },
        { en: "She is being helped.", ja: "彼女は助けられている" }
      ]
    }
  ],
  // 文型セクション
  pattern1: [
    {
      title: "第1文型（S+V）",
      examples: [
        { en: "I sleep.", ja: "私は眠る" },
        { en: "She runs.", ja: "彼女は走る" },
        { en: "The bird flies.", ja: "その鳥は飛ぶ" }
      ]
    },
    {
      title: "第1文型の例文",
      examples: [
        { en: "He works hard.", ja: "彼は一生懸命働く" },
        { en: "They arrived early.", ja: "彼らは早く到着した" },
        { en: "The sun rises in the east.", ja: "太陽は東から昇る" }
      ]
    }
  ],
  pattern2: [
    {
      title: "第2文型（S+V+C）",
      examples: [
        { en: "I am a student.", ja: "私は学生だ" },
        { en: "She is beautiful.", ja: "彼女は美しい" },
        { en: "He became a doctor.", ja: "彼は医者になった" }
      ]
    },
    {
      title: "第2文型の例文",
      examples: [
        { en: "The food tastes delicious.", ja: "その食べ物は美味しい" },
        { en: "She looks happy.", ja: "彼女は幸せそうに見える" },
        { en: "He seems tired.", ja: "彼は疲れているようだ" }
      ]
    }
  ],
  pattern3: [
    {
      title: "第3文型（S+V+O）",
      examples: [
        { en: "I like music.", ja: "私は音楽が好きだ" },
        { en: "She reads books.", ja: "彼女は本を読む" },
        { en: "He bought a car.", ja: "彼は車を買った" }
      ]
    },
    {
      title: "第3文型の例文",
      examples: [
        { en: "We study English.", ja: "私たちは英語を勉強する" },
        { en: "They play soccer.", ja: "彼らはサッカーをする" },
        { en: "She knows the answer.", ja: "彼女は答えを知っている" }
      ]
    }
  ],
  pattern4: [
    {
      title: "第4文型（S+V+O+O）",
      examples: [
        { en: "I gave him a book.", ja: "私は彼に本をあげた" },
        { en: "She sent me a letter.", ja: "彼女は私に手紙を送った" },
        { en: "He told us a story.", ja: "彼は私たちに話をした" }
      ]
    },
    {
      title: "第4文型の例文",
      examples: [
        { en: "My mother bought me a present.", ja: "母は私にプレゼントを買った" },
        { en: "The teacher taught us grammar.", ja: "先生は私たちに文法を教えた" },
        { en: "She showed me the way.", ja: "彼女は私に道を教えてくれた" }
      ]
    }
  ],
  pattern5: [
    {
      title: "第5文型（S+V+O+C）",
      examples: [
        { en: "I made him happy.", ja: "私は彼を幸せにした" },
        { en: "She called me Tom.", ja: "彼女は私をトムと呼んだ" },
        { en: "They elected him president.", ja: "彼らは彼を大統領に選んだ" }
      ]
    },
    {
      title: "第5文型の例文",
      examples: [
        { en: "The news made us sad.", ja: "そのニュースは私たちを悲しくさせた" },
        { en: "I found the book interesting.", ja: "私はその本を面白いと思った" },
        { en: "She kept the room clean.", ja: "彼女は部屋を清潔に保った" }
      ]
    }
  ],
  // 句セクション
  gerund: [
    {
      title: "動名詞の主語用法",
      examples: [
        { en: "Reading is fun.", ja: "読書は楽しい" },
        { en: "Swimming is good exercise.", ja: "水泳は良い運動だ" },
        { en: "Learning English takes time.", ja: "英語を学ぶには時間がかかる" }
      ]
    },
    {
      title: "動名詞の目的語用法",
      examples: [
        { en: "I enjoy reading books.", ja: "私は本を読むのが好きだ" },
        { en: "She stopped smoking.", ja: "彼女はタバコをやめた" },
        { en: "He finished writing the report.", ja: "彼はレポートを書き終えた" }
      ]
    },
    {
      title: "前置詞の目的語",
      examples: [
        { en: "I'm good at playing tennis.", ja: "私はテニスが得意だ" },
        { en: "Thank you for helping me.", ja: "助けてくれてありがとう" },
        { en: "He is interested in studying abroad.", ja: "彼は留学に興味がある" }
      ]
    }
  ],
  infinitive: [
    {
      title: "不定詞の名詞用法",
      examples: [
        { en: "To learn English is important.", ja: "英語を学ぶことは重要だ" },
        { en: "I want to go to Japan.", ja: "私は日本に行きたい" },
        { en: "She decided to study medicine.", ja: "彼女は医学を勉強することに決めた" }
      ]
    },
    {
      title: "不定詞の形容詞用法",
      examples: [
        { en: "I have a book to read.", ja: "私は読む本がある" },
        { en: "This is the place to visit.", ja: "これは訪れるべき場所だ" },
        { en: "He is the person to ask.", ja: "彼は尋ねるべき人だ" }
      ]
    },
    {
      title: "不定詞の副詞用法",
      examples: [
        { en: "I came here to see you.", ja: "私はあなたに会うためにここに来た" },
        { en: "She works hard to succeed.", ja: "彼女は成功するために一生懸命働く" },
        { en: "He is too young to drive.", ja: "彼は運転するには若すぎる" }
      ]
    }
  ],
  participle: [
    {
      title: "現在分詞（形容詞用法）",
      examples: [
        { en: "The sleeping baby is cute.", ja: "眠っている赤ちゃんはかわいい" },
        { en: "I saw a running dog.", ja: "私は走っている犬を見た" },
        { en: "The boiling water is hot.", ja: "沸騰している水は熱い" }
      ]
    },
    {
      title: "過去分詞（形容詞用法）",
      examples: [
        { en: "The broken window needs repair.", ja: "壊れた窓は修理が必要だ" },
        { en: "I bought a used car.", ja: "私は中古車を買った" },
        { en: "The written letter is clear.", ja: "書かれた手紙は明確だ" }
      ]
    },
    {
      title: "分詞の叙述用法",
      examples: [
        { en: "The movie was interesting.", ja: "その映画は面白かった" },
        { en: "I am interested in music.", ja: "私は音楽に興味がある" },
        { en: "She was surprised at the news.", ja: "彼女はそのニュースに驚いた" }
      ]
    }
  ],
  participle_construction: [
    {
      title: "分詞構文（時）",
      examples: [
        { en: "Walking down the street, I met my friend.", ja: "通りを歩いている時、友達に会った" },
        { en: "Having finished my homework, I went to bed.", ja: "宿題を終えた後、寝た" },
        { en: "Seeing the accident, I called the police.", ja: "事故を見て、警察に電話した" }
      ]
    },
    {
      title: "分詞構文（理由）",
      examples: [
        { en: "Being tired, I went to bed early.", ja: "疲れていたので、早く寝た" },
        { en: "Not knowing the answer, I kept silent.", ja: "答えを知らなかったので、黙っていた" },
        { en: "Having no money, I couldn't buy it.", ja: "お金がなかったので、買えなかった" }
      ]
    },
    {
      title: "分詞構文（条件・譲歩）",
      examples: [
        { en: "Weather permitting, we will go hiking.", ja: "天気が良ければ、ハイキングに行く" },
        { en: "Granted that he is young, he is very wise.", ja: "若いとはいえ、彼はとても賢い" },
        { en: "Considering his age, he is very active.", ja: "年齢を考えると、彼はとても活発だ" }
      ]
    }
  ],
  // 節セクション
  noun_clause: [
    {
      title: "that節（名詞節）",
      examples: [
        { en: "I think that he is honest.", ja: "私は彼が正直だと思う" },
        { en: "She said that she was tired.", ja: "彼女は疲れていると言った" },
        { en: "It is true that he passed the exam.", ja: "彼が試験に合格したのは本当だ" }
      ]
    },
    {
      title: "if/whether節（名詞節）",
      examples: [
        { en: "I don't know if he will come.", ja: "彼が来るかどうかわからない" },
        { en: "She asked whether I was busy.", ja: "彼女は私が忙しいか尋ねた" },
        { en: "Tell me if you need help.", ja: "助けが必要なら教えて" }
      ]
    },
    {
      title: "疑問詞節（名詞節）",
      examples: [
        { en: "I don't know what he wants.", ja: "私は彼が何を欲しいのかわからない" },
        { en: "She asked where I lived.", ja: "彼女は私がどこに住んでいるか尋ねた" },
        { en: "Do you know who he is?", ja: "あなたは彼が誰か知っていますか？" }
      ]
    }
  ],
  relative_pronoun: [
    {
      title: "主格の関係代名詞（who/which/that）",
      examples: [
        { en: "This is the boy who won the race.", ja: "これはレースに勝った少年です" },
        { en: "I have a book which is interesting.", ja: "私は面白い本を持っている" },
        { en: "She likes the dog that barks a lot.", ja: "彼女はよく吠える犬が好きだ" }
      ]
    },
    {
      title: "目的格の関係代名詞（whom/which/that）",
      examples: [
        { en: "The man whom I met was kind.", ja: "私が会った男性は親切だった" },
        { en: "This is the book which I bought.", ja: "これは私が買った本です" },
        { en: "The girl that I saw is my friend.", ja: "私が見た女の子は私の友達です" }
      ]
    },
    {
      title: "所有格の関係代名詞（whose）",
      examples: [
        { en: "I know a boy whose father is a doctor.", ja: "私は父親が医者の少年を知っている" },
        { en: "She has a friend whose mother is a teacher.", ja: "彼女には母親が先生の友達がいる" },
        { en: "This is the man whose car was stolen.", ja: "これは車が盗まれた男性です" }
      ]
    }
  ],
  relative_pronoun_usage: [
    {
      title: "制限用法（限定用法）",
      examples: [
        { en: "The students who study hard will pass the exam.", ja: "一生懸命勉強する生徒は試験に合格するだろう" },
        { en: "The book that I bought yesterday is interesting.", ja: "昨日私が買った本は面白い" },
        { en: "The people who live in this town are friendly.", ja: "この町に住んでいる人々は親切だ" }
      ]
    },
    {
      title: "非制限用法（非限定用法）",
      examples: [
        { en: "My brother, who lives in Tokyo, is a doctor.", ja: "私の兄は、東京に住んでいるが、医者です" },
        { en: "This book, which I bought yesterday, is very interesting.", ja: "この本は、昨日買ったのだが、とても面白い" },
        { en: "Mr. Smith, whose son is my classmate, teaches English.", ja: "スミス先生は、息子が私のクラスメートだが、英語を教えている" }
      ]
    },
    {
      title: "制限用法と非制限用法の比較",
      examples: [
        { en: "The students who study hard will pass. (制限用法)", ja: "一生懸命勉強する生徒は合格する（複数の生徒の中から）" },
        { en: "My brother, who studies hard, will pass. (非制限用法)", ja: "私の兄は、一生懸命勉強するが、合格する（兄は一人で特定されている）" },
        { en: "The books which are on the desk are mine. (制限用法)", ja: "机の上にある本は私のものだ（複数の本の中から）" },
        { en: "These books, which are on the desk, are mine. (非制限用法)", ja: "これらの本は、机の上にあるが、私のものだ（本は既に特定されている）" }
      ]
    }
  ],
  relative_pronoun_noun_clause: [
    {
      title: "whatの基本的な用法",
      examples: [
        { en: "What he said is true.", ja: "彼が言ったことは本当です" },
        { en: "I don't know what she wants.", ja: "私は彼女が何を欲しがっているのか分かりません" },
        { en: "Give me what you have.", ja: "あなたが持っているものを私にください" }
      ]
    },
    {
      title: "whatの主語としての用法",
      examples: [
        { en: "What happened yesterday was surprising.", ja: "昨日起こったことは驚きでした" },
        { en: "What you need is more practice.", ja: "あなたに必要なのはもっと練習することです" },
        { en: "What makes me happy is music.", ja: "私を幸せにするのは音楽です" }
      ]
    },
    {
      title: "whatの目的語としての用法",
      examples: [
        { en: "I understand what you mean.", ja: "私はあなたの言うことが分かります" },
        { en: "She told me what she saw.", ja: "彼女は私に彼女が見たことを話しました" },
        { en: "Do you know what time it is?", ja: "何時か知っていますか？" }
      ]
    }
  ],
  compound_relative_clause: [
    {
      title: "whoever（〜する人は誰でも）",
      examples: [
        { en: "Whoever comes will be welcome.", ja: "来る人は誰でも歓迎される" },
        { en: "I'll help whoever needs it.", ja: "必要とする人は誰でも助けます" },
        { en: "Whoever you are, you must follow the rules.", ja: "あなたが誰であっても、ルールに従わなければならない" }
      ]
    },
    {
      title: "whatever（〜するものは何でも）",
      examples: [
        { en: "Whatever you say is fine with me.", ja: "あなたが何を言っても私は構いません" },
        { en: "Take whatever you want.", ja: "欲しいものは何でも取ってください" },
        { en: "Whatever happens, I'll be there.", ja: "何が起こっても、私はそこにいるでしょう" }
      ]
    },
    {
      title: "wherever/whenever（〜する場所・時はどこでも・いつでも）",
      examples: [
        { en: "Wherever you go, I'll follow.", ja: "あなたがどこに行っても、私はついていきます" },
        { en: "Come whenever you want.", ja: "いつでも来てください" },
        { en: "You can sit wherever you like.", ja: "好きな場所に座ってください" }
      ]
    }
  ],
  emphatic_construction: [
    {
      title: "主語の強調",
      examples: [
        { en: "It was I that met him yesterday.", ja: "昨日彼に会ったのは私です" },
        { en: "It was she that wrote this letter.", ja: "この手紙を書いたのは彼女です" },
        { en: "It is you that I love.", ja: "私が愛しているのはあなたです" }
      ]
    },
    {
      title: "目的語の強調",
      examples: [
        { en: "It was him that I met yesterday.", ja: "昨日私が会ったのは彼です" },
        { en: "It was this book that she bought.", ja: "彼女が買ったのはこの本です" },
        { en: "It is music that makes me happy.", ja: "私を幸せにするのは音楽です" }
      ]
    },
    {
      title: "副詞句の強調",
      examples: [
        { en: "It was yesterday that I met him.", ja: "私が彼に会ったのは昨日です" },
        { en: "It is in Tokyo that she lives.", ja: "彼女が住んでいるのは東京です" },
        { en: "It was at 3 o'clock that the meeting started.", ja: "会議が始まったのは3時です" }
      ]
    }
  ],
  relative_adverb: [
    {
      title: "関係副詞（when/where/why）",
      examples: [
        { en: "This is the day when we met.", ja: "これは私たちが出会った日です" },
        { en: "I remember the place where I was born.", ja: "私は自分が生まれた場所を覚えている" },
        { en: "That is the reason why he left.", ja: "それが彼が去った理由です" }
      ]
    }
  ],
  subordinating_conjunction: [
    {
      title: "従属接続詞（because/if/when/thoughなど）",
      examples: [
        { en: "I went home because it was late.", ja: "遅かったので家に帰った" },
        { en: "If it rains, we will stay home.", ja: "雨が降ったら家にいる" },
        { en: "I will call you when I arrive.", ja: "到着したら電話します" },
        { en: "Though he is young, he is wise.", ja: "彼は若いけれど賢い" }
      ]
    }
  ],
  // 時制セクション
  present_tense: [
    {
      title: "現在形の肯定文",
      examples: [
        { en: "I play tennis.", ja: "私はテニスをします" },
        { en: "She studies English.", ja: "彼女は英語を勉強します" },
        { en: "The sun rises in the east.", ja: "太陽は東から昇る" }
      ]
    },
    {
      title: "現在形の否定文・疑問文",
      examples: [
        { en: "I don't like coffee.", ja: "私はコーヒーが好きではありません" },
        { en: "Does he play soccer?", ja: "彼はサッカーをしますか？" },
        { en: "She doesn't watch TV.", ja: "彼女はテレビを見ません" }
      ]
    }
  ],
  past_tense: [
    {
      title: "過去形の肯定文",
      examples: [
        { en: "I visited Kyoto last year.", ja: "私は去年京都を訪れました" },
        { en: "She watched a movie yesterday.", ja: "彼女は昨日映画を見ました" },
        { en: "They played soccer after school.", ja: "彼らは放課後サッカーをしました" }
      ]
    },
    {
      title: "過去形の否定文・疑問文",
      examples: [
        { en: "I didn't eat breakfast.", ja: "私は朝食を食べませんでした" },
        { en: "Did you see the news?", ja: "あなたはニュースを見ましたか？" },
        { en: "He didn't come to the party.", ja: "彼はパーティーに来ませんでした" }
      ]
    }
  ],
  present_perfect: [
    {
      title: "現在完了（経験・完了・継続）",
      examples: [
        { en: "I have been to America.", ja: "私はアメリカに行ったことがあります" },
        { en: "She has just finished her homework.", ja: "彼女はちょうど宿題を終えたところです" },
        { en: "He has lived here for five years.", ja: "彼はここに5年間住んでいます" }
      ]
    }
  ],
  past_perfect: [
    {
      title: "過去完了（大過去）",
      examples: [
        { en: "I had finished my homework before dinner.", ja: "私は夕食前に宿題を終えていました" },
        { en: "She had left when I arrived.", ja: "私が到着したとき、彼女は出発していました" },
        { en: "They had already eaten.", ja: "彼らはすでに食事を終えていました" }
      ]
    }
  ],
  future_perfect: [
    {
      title: "未来完了",
      examples: [
        { en: "I will have finished the work by tomorrow.", ja: "私は明日までにその仕事を終えているでしょう" },
        { en: "She will have left by then.", ja: "その時までに彼女は出発しているでしょう" },
        { en: "They will have arrived by noon.", ja: "彼らは正午までに到着しているでしょう" }
      ]
    }
  ],
  progressive: [
    {
      title: "進行形（現在・過去・未来）",
      examples: [
        { en: "I am studying now.", ja: "私は今勉強しています" },
        { en: "She was watching TV at that time.", ja: "彼女はその時テレビを見ていました" },
        { en: "They will be playing soccer at 3 o'clock.", ja: "彼らは3時にサッカーをしているでしょう" }
      ]
    }
  ],
  // 助動詞セクション
  "can-could": [
    {
      title: "能力・可能（can）",
      examples: [
        { en: "I can swim.", ja: "私は泳げます" },
        { en: "She can speak French.", ja: "彼女はフランス語を話せます" },
        { en: "He can drive a car.", ja: "彼は車を運転できます" }
      ]
    },
    {
      title: "許可・依頼（can）",
      examples: [
        { en: "Can I use your pen?", ja: "あなたのペンを使ってもいいですか？" },
        { en: "You can go now.", ja: "今行ってもいいです" },
        { en: "Can you help me?", ja: "手伝ってもらえますか？" }
      ]
    },
    {
      title: "可能性・推量（can）",
      examples: [
        { en: "It can be true.", ja: "それは本当かもしれません" },
        { en: "Anyone can make mistakes.", ja: "誰でも間違いを犯すことができます" },
        { en: "The weather can change quickly.", ja: "天気は急に変わる可能性があります" }
      ]
    },
    {
      title: "過去の能力（could）",
      examples: [
        { en: "I could swim when I was young.", ja: "私は若い頃泳げました" },
        { en: "She could speak French fluently.", ja: "彼女はフランス語を流暢に話せました" },
        { en: "He could drive a car before the accident.", ja: "彼は事故前は車を運転できました" }
      ]
    },
    {
      title: "丁寧な依頼・許可（could）",
      examples: [
        { en: "Could you help me?", ja: "手伝っていただけますか？" },
        { en: "Could I use your pen?", ja: "あなたのペンを使わせていただけますか？" },
        { en: "Could you please open the window?", ja: "窓を開けていただけますか？" }
      ]
    },
    {
      title: "控えめな可能性・推量（could）",
      examples: [
        { en: "It could be true.", ja: "それは本当かもしれません" },
        { en: "He could be at home now.", ja: "彼は今家にいるかもしれません" },
        { en: "She could have forgotten the meeting.", ja: "彼女は会議を忘れたかもしれません" }
      ]
    },
    {
      title: "仮定法（could）",
      examples: [
        { en: "If I had money, I could buy a car.", ja: "もしお金があれば、車を買えるのに" },
        { en: "I could help you if I had time.", ja: "もし時間があれば、あなたを手伝えるのに" },
        { en: "She could speak better if she practiced more.", ja: "もっと練習すれば、彼女はもっと上手に話せるのに" }
      ]
    }
  ],
  must: [
    {
      title: "義務・必要性（must）",
      examples: [
        { en: "You must study hard.", ja: "一生懸命勉強しなければなりません" },
        { en: "I must finish this work today.", ja: "私は今日この仕事を終えなければなりません" },
        { en: "Students must wear uniforms.", ja: "生徒は制服を着なければなりません" }
      ]
    },
    {
      title: "強い推量（must）",
      examples: [
        { en: "He must be tired.", ja: "彼は疲れているに違いありません" },
        { en: "She must know the truth.", ja: "彼女は真実を知っているに違いありません" },
        { en: "It must be expensive.", ja: "それは高いに違いありません" }
      ]
    }
  ],
  should: [
    {
      title: "義務・推奨（should）",
      examples: [
        { en: "You should study more.", ja: "もっと勉強すべきです" },
        { en: "I should call my mother.", ja: "母に電話すべきです" },
        { en: "We should protect the environment.", ja: "私たちは環境を守るべきです" }
      ]
    },
    {
      title: "推量・予想（should）",
      examples: [
        { en: "He should arrive soon.", ja: "彼はもうすぐ到着するはずです" },
        { en: "The movie should be good.", ja: "その映画は良いはずです" },
        { en: "She should be at home now.", ja: "彼女は今家にいるはずです" }
      ]
    }
  ],
  shall: [
    {
      title: "意志・決意（shall）",
      examples: [
        { en: "I shall do my best.", ja: "私は最善を尽くします" },
        { en: "We shall overcome this difficulty.", ja: "私たちはこの困難を乗り越えます" },
        { en: "I shall never give up.", ja: "私は決して諦めません" }
      ]
    },
    {
      title: "提案・申し出（shall）",
      examples: [
        { en: "Shall I help you?", ja: "お手伝いしましょうか？" },
        { en: "Shall we go to the movies?", ja: "映画に行きませんか？" },
        { en: "Shall I open the window?", ja: "窓を開けましょうか？" }
      ]
    },
    {
      title: "義務・約束（shall）",
      examples: [
        { en: "You shall not pass.", ja: "あなたは通ってはいけません" },
        { en: "He shall be punished.", ja: "彼は罰せられるでしょう" },
        { en: "The law shall be obeyed.", ja: "法律は守られなければなりません" }
      ]
    },
    {
      title: "予測・確信（shall）",
      examples: [
        { en: "You shall succeed.", ja: "あなたは成功するでしょう" },
        { en: "It shall be done.", ja: "それは実行されるでしょう" },
        { en: "The truth shall set you free.", ja: "真実はあなたを自由にするでしょう" }
      ]
    }
  ],
  need: [
    {
      title: "法助動詞として（否定文・疑問文）",
      examples: [
        { en: "You need not worry.", ja: "心配する必要はありません" },
        { en: "Need I go there?", ja: "そこに行く必要がありますか？" },
        { en: "He need not come.", ja: "彼は来る必要はありません" }
      ]
    },
    {
      title: "一般動詞として（need to + 動詞原形）",
      examples: [
        { en: "I need to study more.", ja: "もっと勉強する必要があります" },
        { en: "She needs to finish her work.", ja: "彼女は仕事を終える必要があります" },
        { en: "We need to hurry.", ja: "急ぐ必要があります" }
      ]
    },
    {
      title: "否定形の違い",
      examples: [
        { en: "You need not worry.", ja: "心配する必要はありません（法助動詞）" },
        { en: "You don't need to worry.", ja: "心配する必要はありません（一般動詞）" },
        { en: "He need not come.", ja: "彼は来る必要はありません（法助動詞）" }
      ]
    },
    {
      title: "疑問文での使い分け",
      examples: [
        { en: "Need I go there?", ja: "そこに行く必要がありますか？（法助動詞）" },
        { en: "Do I need to go there?", ja: "そこに行く必要がありますか？（一般動詞）" },
        { en: "Need you worry about it?", ja: "それについて心配する必要がありますか？（法助動詞）" }
      ]
    }
  ],
  will: [
    {
      title: "未来・意志（will）",
      examples: [
        { en: "I will help you.", ja: "私はあなたを手伝います" },
        { en: "She will come to the party.", ja: "彼女はパーティーに来るでしょう" },
        { en: "They will win the game.", ja: "彼らは試合に勝つでしょう" }
      ]
    },
    {
      title: "予測・習慣（will）",
      examples: [
        { en: "It will rain tomorrow.", ja: "明日雨が降るでしょう" },
        { en: "He will often work late.", ja: "彼はよく遅くまで働きます" },
        { en: "The sun will rise in the east.", ja: "太陽は東から昇るでしょう" }
      ]
    }
  ],
  "will-would": [
    {
      title: "未来・意志（will）",
      examples: [
        { en: "I will help you.", ja: "私はあなたを手伝います" },
        { en: "She will come to the party.", ja: "彼女はパーティーに来るでしょう" },
        { en: "They will win the game.", ja: "彼らは試合に勝つでしょう" }
      ]
    },
    {
      title: "予測・習慣（will）",
      examples: [
        { en: "It will rain tomorrow.", ja: "明日雨が降るでしょう" },
        { en: "He will often work late.", ja: "彼はよく遅くまで働きます" },
        { en: "The sun will rise in the east.", ja: "太陽は東から昇るでしょう" }
      ]
    },
    {
      title: "丁寧な依頼・仮定法・控えめな推量（would）",
      examples: [
        { en: "Would you help me?", ja: "手伝っていただけますか？" },
        { en: "Would you like some coffee?", ja: "コーヒーはいかがですか？" },
        { en: "If I had money, I would buy a car.", ja: "もしお金があれば、車を買うのに" },
        { en: "He said he would come.", ja: "彼は来ると言いました" },
        { en: "That would be difficult.", ja: "それは難しいでしょう" },
        { en: "When I was young, I would play tennis every day.", ja: "若い頃は毎日テニスをしていました" }
      ]
    }
  ],
  // 仮定法セクション
  subjunctive_present: [
    {
      title: "仮定法現在（要求・提案・願望）",
      examples: [
        { en: "I suggest that he study harder.", ja: "私は彼がもっと勉強することを提案します" },
        { en: "It is important that she be on time.", ja: "彼女が時間通りに来ることが重要です" },
        { en: "I demand that you tell the truth.", ja: "私はあなたが真実を話すことを要求します" }
      ]
    },
    {
      title: "仮定法現在（that節）",
      examples: [
        { en: "It is necessary that he go to school.", ja: "彼が学校に行くことが必要です" },
        { en: "I recommend that she take a rest.", ja: "私は彼女が休憩を取ることを勧めます" },
        { en: "The rule requires that students wear uniforms.", ja: "規則は生徒が制服を着ることを要求します" }
      ]
    }
  ],
  subjunctive_past: [
    {
      title: "仮定法過去（現在の事実に反する仮定）",
      examples: [
        { en: "If I were rich, I would buy a big house.", ja: "もし私がお金持ちだったら、大きな家を買うだろう" },
        { en: "If she were here, she would help us.", ja: "もし彼女がここにいたら、私たちを手伝うだろう" },
        { en: "If I had time, I would study more.", ja: "もし時間があったら、もっと勉強するだろう" }
      ]
    },
    {
      title: "仮定法過去（wish文）",
      examples: [
        { en: "I wish I were taller.", ja: "もっと背が高かったらいいのに" },
        { en: "She wishes she could speak French.", ja: "彼女はフランス語を話せたらいいのにと思っている" },
        { en: "I wish I had more money.", ja: "もっとお金があったらいいのに" }
      ]
    }
  ],
  subjunctive_future: [
    {
      title: "仮定法未来（未来の可能性の低い仮定）",
      examples: [
        { en: "If it should rain tomorrow, the game would be cancelled.", ja: "もし明日雨が降ったら、試合は中止されるだろう" },
        { en: "If he should come, I would be surprised.", ja: "もし彼が来たら、私は驚くだろう" },
        { en: "If she should win the lottery, she would travel the world.", ja: "もし彼女が宝くじに当たったら、世界を旅行するだろう" }
      ]
    }
  ],
  subjunctive_inversion: [
    {
      title: "仮定法の倒置（ifの省略）",
      examples: [
        { en: "Were I rich, I would help others.", ja: "もし私がお金持ちだったら、他の人を助けるだろう" },
        { en: "Had I known the truth, I would have told you.", ja: "もし真実を知っていたら、あなたに話していただろう" },
        { en: "Should it rain, we will stay home.", ja: "もし雨が降ったら、家にいるだろう" }
      ]
    },
    {
      title: "倒置の条件文",
      examples: [
        { en: "Were she to come, I would be happy.", ja: "もし彼女が来たら、私は幸せだろう" },
        { en: "Had he studied harder, he would have passed.", ja: "もし彼がもっと勉強していたら、合格していただろう" },
        { en: "Should you need help, call me.", ja: "もし助けが必要なら、私に電話してください" }
      ]
    }
  ],
  subjunctive_past_perfect: [
    {
      title: "仮定法過去完了（過去の事実に反する仮定）",
      examples: [
        { en: "If I had left home earlier, I would not have missed the train.", ja: "もしもっと早く家を出ていたら、電車に乗り遅れなかったのに。" },
        { en: "If she had studied harder, she could have passed the exam.", ja: "もし彼女がもっと勉強していたら、試験に合格できたかもしれない。" },
        { en: "If it hadn't rained yesterday, we would have gone hiking.", ja: "もし昨日雨が降らなかったら、ハイキングに行っていただろう。" }
      ]
    },
    {
      title: "仮定法過去完了（wish文）",
      examples: [
        { en: "I wish I had known about the party.", ja: "そのパーティーのことを知っていればよかったのに。" },
        { en: "She wishes she had taken the job offer.", ja: "彼女はその仕事のオファーを受けていればよかったのにと思っている。" },
        { en: "I wish I had brought my umbrella.", ja: "傘を持ってきていればよかったのに。" }
      ]
    }
  ],
  // 受動態セクション
  passive_pattern3: [
    {
      title: "第3文型の受動態（現在形）",
      examples: [
        { en: "A letter is written by me.", ja: "手紙は私によって書かれる" },
        { en: "The house is built by them.", ja: "その家は彼らによって建てられる" },
        { en: "English is spoken by many people.", ja: "英語は多くの人々によって話される" }
      ]
    },
    {
      title: "第3文型の受動態（過去形）",
      examples: [
        { en: "The letter was written by him.", ja: "手紙は彼によって書かれた" },
        { en: "This house was built by my father.", ja: "この家は父によって建てられた" },
        { en: "The book was published last year.", ja: "その本は去年出版された" }
      ]
    },
    {
      title: "第3文型の受動態（未来形・完了形）",
      examples: [
        { en: "The letter will be written by him.", ja: "手紙は彼によって書かれるだろう" },
        { en: "The house has been built by them.", ja: "その家は彼らによって建てられた" },
        { en: "The work will be finished by Friday.", ja: "その仕事は金曜日までに終えられるだろう" }
      ]
    }
  ],
  passive_pattern4: [
    {
      title: "第4文型の受動態（間接目的語を主語）",
      examples: [
        { en: "I was given a book by him.", ja: "私は彼によって本をもらった" },
        { en: "He was shown the picture by her.", ja: "彼は彼女によって写真を見せられた" },
        { en: "We were taught English by Mr. Smith.", ja: "私たちはスミス先生によって英語を教えられた" }
      ]
    },
    {
      title: "第4文型の受動態（直接目的語を主語）",
      examples: [
        { en: "A book was given to me by him.", ja: "本は彼によって私に与えられた" },
        { en: "The picture was shown to him by her.", ja: "写真は彼女によって彼に見せられた" },
        { en: "A present was bought for me by her.", ja: "プレゼントは彼女によって私のために買われた" }
      ]
    },
    {
      title: "第4文型の受動態（応用）",
      examples: [
        { en: "English was taught to us by Mr. Smith.", ja: "英語はスミス先生によって私たちに教えられた" },
        { en: "The money was sent to him by his mother.", ja: "お金は母親によって彼に送られた" },
        { en: "A letter was written to me by my friend.", ja: "手紙は友達によって私に書かれた" }
      ]
    }
  ],
  passive_pattern5: [
    {
      title: "第5文型の受動態（基本）",
      examples: [
        { en: "He was made president by them.", ja: "彼は彼らによって社長にされた" },
        { en: "She was elected captain by the team.", ja: "彼女はチームによってキャプテンに選ばれた" },
        { en: "I was appointed manager by the company.", ja: "私は会社によってマネージャーに任命された" }
      ]
    },
    {
      title: "第5文型の受動態（不定詞を含む）",
      examples: [
        { en: "He was seen to enter the room by me.", ja: "彼は私によって部屋に入るのを見られた" },
        { en: "I was asked to help them by them.", ja: "私は彼らによって助けてくれるよう頼まれた" },
        { en: "He is expected to come by us.", ja: "彼は私たちによって来ることが期待されている" }
      ]
    },
    {
      title: "第5文型の受動態（応用）",
      examples: [
        { en: "She was considered to be the best candidate.", ja: "彼女は最良の候補者だと考えられた" },
        { en: "He was believed to be innocent.", ja: "彼は無実だと信じられた" },
        { en: "The plan was thought to be impossible.", ja: "その計画は不可能だと考えられた" }
      ]
    }
  ],
  "emphatic_construction": [
    "It was I that met him yesterday.",
    "It was she that wrote this letter.",
    "It was him that I met yesterday.",
    "It was this book that she bought.",
    "It was yesterday that I met him.",
    "It is in Tokyo that she lives.",
    "It is you that I love.",
    "It was John that called you.",
    "It will be tomorrow that we leave.",
    "It is not you that I blame.",
    "It wasn't yesterday that I saw him."
  ],
  "modal_auxiliary_verb": [
    "He can swim.",
    "She will come tomorrow.",
    "You must study hard.",
    "She could help you.",
    "They would like to join us.",
    "May I come in?",
    "It might rain tomorrow.",
    "Shall we go now?",
    "You should see a doctor.",
    "You ought to try harder.",
    "I used to play tennis."
  ],
  "primary_auxiliary_verb": [
    "I am studying.",
    "She has finished her work.",
    "Do you like coffee?",
    "I have finished my work.",
    "She is reading a book.",
    "They are playing soccer.",
    "The letter was written by John.",
    "This book is read by many people.",
    "She has lived here for 10 years.",
    "They had already left when I arrived.",
    "I have a car.",
    "She has two children.",
    "Does she speak English?",
    "Did you go to the party?",
    "I do not like coffee.",
    "She does not speak French.",
    "They did not come to the meeting.",
    "I do like coffee.",
    "She does speak English."
  ],
  "semi_modal_auxiliary_verb": [
    "I am able to speak English.",
    "She was able to finish the work.",
    "They will be able to come tomorrow.",
    "I have been able to solve this problem.",
    "I am going to study abroad.",
    "It is going to rain.",
    "We are going to the park.",
    "I was going to call you.",
    "You have to finish this by tomorrow.",
    "She has to go to work.",
    "I had to study all night.",
    "We will have to leave early.",
    "He needs to study more.",
    "I need to buy some groceries.",
    "She needed to rest.",
    "You will need to bring your passport.",
    "I want to learn English.",
    "She wants to travel around the world.",
    "He wanted to become a doctor.",
    "They will want to join us.",
    "I used to play tennis.",
    "She used to live in Tokyo.",
    "I didn't use to like coffee.",
    "Did you use to study French?"
  ],
  conditionals: [
    {
      title: "Zero Conditional（ゼロ条件文）",
      examples: [
        { en: "If you heat water, it boils.", ja: "水を加熱すると沸騰する" },
        { en: "If it rains, the ground gets wet.", ja: "雨が降ると地面が濡れる" },
        { en: "If you don't eat, you get hungry.", ja: "食べないとお腹が空く" }
      ]
    },
    {
      title: "First Conditional（第一条件文）",
      examples: [
        { en: "If it rains tomorrow, I will stay home.", ja: "もし明日雨が降ったら家にいる" },
        { en: "If you study hard, you will pass the exam.", ja: "一生懸命勉強すれば試験に合格するだろう" },
        { en: "If he comes, I will be happy.", ja: "もし彼が来たら私は嬉しいだろう" }
      ]
    },
    {
      title: "Second Conditional（第二条件文）",
      examples: [
        { en: "If I had money, I would buy a car.", ja: "もしお金があれば車を買うのに" },
        { en: "If I were you, I would study harder.", ja: "もし私があなただったらもっと勉強するのに" },
        { en: "If it were sunny, we would go to the beach.", ja: "もし晴れていれば海に行くのに" }
      ]
    },
    {
      title: "Third Conditional（第三条件文）",
      examples: [
        { en: "If I had studied harder, I would have passed the exam.", ja: "もっと勉強していれば試験に合格していたのに" },
        { en: "If she had left earlier, she could have passed the exam.", ja: "もっと早く出ていれば試験に合格できたかもしれない。" },
        { en: "If it hadn't rained, we would have gone hiking.", ja: "雨が降っていなければハイキングに行っていたのに" }
      ]
    }
  ],
  if_less_subjunctive: [
    {
      title: "wish構文（現在の願望）",
      examples: [
        { en: "I wish I knew her email address.", ja: "彼女のメールアドレスを知っていればなあ" },
        { en: "I wish I were taller.", ja: "もっと背が高かったらいいのに" },
        { en: "I wish I could speak French.", ja: "フランス語を話せればなあ" }
      ]
    },
    {
      title: "wish構文（過去の後悔）",
      examples: [
        { en: "I wish I had studied harder in high school.", ja: "高校時代にもっと勉強しておけばよかったのに" },
        { en: "I wish I had met him earlier.", ja: "もっと早く彼に会っていればよかったのに" },
        { en: "I wished I had been a bird when the airplane crashed.", ja: "飛行機が墜落した時私は鳥だったらよかったのに、と思った" }
      ]
    },
    {
      title: "wish構文（未来への願望）",
      examples: [
        { en: "I wish it would stop raining.", ja: "雨が止んでくれたらいいのに" },
        { en: "I wish you would come to the party.", ja: "あなたがパーティーに来てくれたらいいのに" },
        { en: "I wish the weather would improve.", ja: "天気が良くなってくれたらいいのに" }
      ]
    },
    {
      title: "as if / as though構文（現在の仮定）",
      examples: [
        { en: "You talk as if you were an expert.", ja: "まるで専門家であるかのように君は話すね" },
        { en: "He talks as if he knew everything.", ja: "彼はまるですべてを知っているかのように話す" },
        { en: "She looks as if she is tired.", ja: "彼女は疲れているかのように見える" }
      ]
    },
    {
      title: "as if / as though構文（過去の仮定）",
      examples: [
        { en: "He looked as if he had seen a UFO.", ja: "まるでUFOを見たかのように彼は見えた" },
        { en: "She looked as if she had seen a ghost.", ja: "彼女はまるで幽霊を見たかのような顔をしていた" },
        { en: "They behaved as if they had won the lottery.", ja: "彼らは宝くじに当たったかのように振る舞った" }
      ]
    },
    {
      title: "without構文",
      examples: [
        { en: "Without your help, I couldn't have finished this project.", ja: "あなたの助けがなければ、このプロジェクトを完成させることができなかっただろう" },
        { en: "Without air, no one could live.", ja: "空気が無ければ、誰も生きることはできないだろう" },
        { en: "Without money, we cannot buy anything.", ja: "お金がなければ、何も買うことができない" }
      ]
    },
    {
      title: "but for構文",
      examples: [
        { en: "But for the rain, we would have gone hiking.", ja: "雨がなければ、ハイキングに行っていただろう" },
        { en: "But for the accident, he could have been an excellent baseball player.", ja: "事故が無かったら、彼は素晴らしい野球選手になれただろう" },
        { en: "But for your advice, I would have made a mistake.", ja: "あなたのアドバイスがなければ、私は間違いを犯していただろう" }
      ]
    },
    {
      title: "otherwise構文（現在・未来）",
      examples: [
        { en: "I have to study hard. Otherwise, I would fail the exam.", ja: "一生懸命勉強しなければならない。そうでなければ、試験に落ちるだろう" },
        { en: "You must hurry. Otherwise, you will miss the train.", ja: "急がなければならない。そうでなければ、電車に乗り遅れるだろう" },
        { en: "We need to leave now. Otherwise, we would be late.", ja: "今出発する必要がある。そうでなければ、遅刻するだろう" }
      ]
    },
    {
      title: "otherwise構文（過去）",
      examples: [
        { en: "I had to go then; otherwise I would have missed the last train.", ja: "その時私は出発せざるを得なかった。そうでなかったら私は終電を逃していただろう" },
        { en: "I studied hard. Otherwise, I would have failed the exam.", ja: "一生懸命勉強した。そうでなければ、試験に落ちていただろう" },
        { en: "She left early. Otherwise, she would have been late for the meeting.", ja: "彼女は早く出発した。そうでなければ、会議に遅れていただろう" }
      ]
    }
  ],
  dare: [
    {
      title: "法助動詞として（否定文・疑問文）",
      examples: [
        { en: "I dare not speak to him.", ja: "私は彼に話しかける勇気がありません" },
        { en: "Dare you tell the truth?", ja: "真実を言う勇気がありますか？" },
        { en: "He dare not go alone.", ja: "彼は一人で行く勇気がありません" }
      ]
    },
    {
      title: "一般動詞として（dare to + 動詞原形）",
      examples: [
        { en: "I dare to speak my mind.", ja: "私は自分の考えを言う勇気があります" },
        { en: "She dares to challenge the boss.", ja: "彼女は上司に挑戦する勇気があります" },
        { en: "They dare to dream big.", ja: "彼らは大きな夢を見る勇気があります" }
      ]
    },
    {
      title: "否定形の違い",
      examples: [
        { en: "I dare not do it.", ja: "私はそれをする勇気がありません（法助動詞）" },
        { en: "I don't dare to do it.", ja: "私はそれをする勇気がありません（一般動詞）" },
        { en: "He daren't say a word.", ja: "彼は一言も言う勇気がありません（法助動詞）" }
      ]
    },
    {
      title: "挑戦・挑発の表現",
      examples: [
        { en: "I dare you to jump.", ja: "飛び込む勇気があるか試してみろ" },
        { en: "How dare you speak to me like that!", ja: "よくもそんな口の利き方をしたものだ！" },
        { en: "No one dares to oppose him.", ja: "誰も彼に逆らう勇気がありません" }
      ]
    }
  ],
  infinitive_gerund_identification: [
    {
      title: "不定詞のみを目的語に取る動詞",
      examples: [
        { en: "I want to study abroad next year.", ja: "私は来年留学したい" },
        { en: "He decided to quit his job.", ja: "彼は仕事を辞めることに決めた" },
        { en: "She hopes to become a doctor.", ja: "彼女は医者になることを望んでいる" }
      ]
    },
    {
      title: "動名詞のみを目的語に取る動詞",
      examples: [
        { en: "I enjoy reading books in my free time.", ja: "私は暇な時間に本を読むことを楽しむ" },
        { en: "She finished writing the report.", ja: "彼女はレポートを書き終えた" },
        { en: "He suggested going to the movies.", ja: "彼は映画に行くことを提案した" }
      ]
    },
    {
      title: "両方を目的語に取る動詞（意味が変わる）",
      examples: [
        { en: "Remember to lock the door.", ja: "ドアをロックすることを忘れないで" },
        { en: "I remember meeting him before.", ja: "私は以前彼に会ったことを覚えている" },
        { en: "I forgot to call her yesterday.", ja: "私は昨日彼女に電話することを忘れた" }
      ]
    },
    {
      title: "前置詞の後は必ず動名詞",
      examples: [
        { en: "I'm interested in learning English.", ja: "私は英語を学ぶことに興味がある" },
        { en: "Thank you for helping me.", ja: "助けてくれてありがとう" },
        { en: "He is good at playing tennis.", ja: "彼はテニスをすることが上手だ" }
      ]
    },
    {
      title: "tryの使い分け",
      examples: [
        { en: "I tried to solve the problem.", ja: "私はその問題を解決しようと努力した" },
        { en: "Try using a different method.", ja: "別の方法を使ってみなさい" },
        { en: "Stop to buy some milk.", ja: "牛乳を買うために立ち止まる" }
      ]
    }
  ],
  infinitive_noun: [
    {
      title: "主語として",
      examples: [
        { en: "To study is important.", ja: "勉強することは大切だ" },
        { en: "To speak English is difficult.", ja: "英語を話すことは難しい" },
        { en: "To travel around the world is my dream.", ja: "世界中を旅行することは私の夢だ" }
      ]
    },
    {
      title: "目的語として",
      examples: [
        { en: "I want to study abroad.", ja: "私は留学したい" },
        { en: "She likes to read books.", ja: "彼女は本を読むことが好きだ" },
        { en: "He decided to quit his job.", ja: "彼は仕事を辞めることに決めた" }
      ]
    },
    {
      title: "補語として",
      examples: [
        { en: "My dream is to become a doctor.", ja: "私の夢は医者になることだ" },
        { en: "The plan is to finish by Friday.", ja: "計画は金曜日までに終えることだ" },
        { en: "Her goal is to learn French.", ja: "彼女の目標はフランス語を学ぶことだ" }
      ]
    },
    {
      title: "It is + 形容詞 + to do の構文",
      examples: [
        { en: "It is important to study hard.", ja: "一生懸命勉強することは大切だ" },
        { en: "It is difficult to learn a new language.", ja: "新しい言語を学ぶことは難しい" },
        { en: "It is easy to make mistakes.", ja: "間違いをすることは簡単だ" }
      ]
    }
  ],
  infinitive_adjective: [
    {
      title: "後置修飾（名詞の後）",
      examples: [
        { en: "I have a book to read.", ja: "私は読むべき本を持っている" },
        { en: "She has work to do.", ja: "彼女はすべき仕事がある" },
        { en: "There is nothing to eat.", ja: "食べるものは何もない" }
      ]
    },
    {
      title: "場所・時間・方法を表す",
      examples: [
        { en: "This is the place to meet.", ja: "これは会う場所だ" },
        { en: "That is the time to start.", ja: "それは始める時だ" },
        { en: "This is the way to solve the problem.", ja: "これは問題を解決する方法だ" }
      ]
    },
    {
      title: "感情・意志を表す形容詞の後",
      examples: [
        { en: "I am happy to see you.", ja: "私はあなたに会えて嬉しい" },
        { en: "She is ready to go.", ja: "彼女は行く準備ができている" },
        { en: "He is willing to help.", ja: "彼は手伝う気がある" }
      ]
    }
  ],
  infinitive_adverb: [
    {
      title: "目的を表す（〜するために）",
      examples: [
        { en: "I went to the library to study.", ja: "私は勉強するために図書館に行った" },
        { en: "She came here to see you.", ja: "彼女はあなたに会うためにここに来た" },
        { en: "He works hard to earn money.", ja: "彼はお金を稼ぐために一生懸命働く" }
      ]
    },
    {
      title: "結果を表す（〜して〜になる）",
      examples: [
        { en: "He grew up to be a doctor.", ja: "彼は成長して医者になった" },
        { en: "She lived to be 100.", ja: "彼女は100歳まで生きた" },
        { en: "The plan turned out to be successful.", ja: "その計画は成功することが判明した" }
      ]
    },
    {
      title: "感情の原因を表す",
      examples: [
        { en: "I am glad to hear the news.", ja: "私はその知らせを聞いて嬉しい" },
        { en: "She was surprised to see him.", ja: "彼女は彼を見て驚いた" },
        { en: "He was disappointed to fail the exam.", ja: "彼は試験に落ちてがっかりした" }
      ]
    },
    {
      title: "判断の根拠を表す",
      examples: [
        { en: "He must be rich to live in such a big house.", ja: "そんな大きな家に住んでいるなんて、彼は金持ちに違いない" },
        { en: "She must be smart to solve this problem.", ja: "この問題を解けるなんて、彼女は賢いに違いない" },
        { en: "It must be expensive to buy a car.", ja: "車を買うのは高価に違いない" }
      ]
    }
  ]
};

// 例文セクションを描画する関数
function renderExamples(topic, containerId) {
  const data = examplesData[topic];
  if (!data) return;
  let html = `<div class='apple-card mb-8'><h2 class='apple-card-title'>例文</h2><div class='mt-4 space-y-6'>`;
  data.forEach(section => {
    html += `<div class='bg-white/10 backdrop-blur-[20px] shadow-lg py-4 px-6 rounded-lg border border-white/20'>`;
    html += `<h3 class='font-semibold mb-3 text-lg'>${section.title}</h3><div class='space-y-3'>`;
    section.examples.forEach(ex => {
      html += `<p><span class='text-xl font-bold text-blue-300'>${ex.en}</span><br><span class='text-base font-semibold text-gray-200'>（${ex.ja}）</span></p>`;
    });
    html += `</div></div>`;
  });
  html += `</div></div>`;
  document.getElementById(containerId).innerHTML = html;
} 