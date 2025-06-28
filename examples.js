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
  can: [
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
    }
  ],
  may: [
    {
      title: "許可・可能性（may）",
      examples: [
        { en: "May I come in?", ja: "入ってもよろしいですか？" },
        { en: "You may leave early.", ja: "早退してもいいです" },
        { en: "It may rain tomorrow.", ja: "明日雨が降るかもしれません" }
      ]
    },
    {
      title: "推量・可能性（may）",
      examples: [
        { en: "He may be at home.", ja: "彼は家にいるかもしれません" },
        { en: "She may not know the answer.", ja: "彼女は答えを知らないかもしれません" },
        { en: "The train may be delayed.", ja: "電車が遅れるかもしれません" }
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
        { en: "If it had not rained yesterday, we would have gone hiking.", ja: "もし昨日雨が降らなかったら、ハイキングに行っていただろう。" }
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
  ]
  // 他のトピックも同様に追加可能
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