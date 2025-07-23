(function() {
  // クイズデータ
  const quizData = [
    {
      sentence: "My doctor advised me (  ) more vegetables every day.",
      translation: "私の医者は毎日もっと野菜を食べるようにと私に助言した。",
      options: ["eat", "to eat", "eating", "for eating"],
      correct: 2,
      explanation: "advise A to do で『Aに〜するよう助言する』。正解は (2) to eat。"
    },
    {
      sentence: "She enjoys (  ) tennis on weekends.",
      translation: "彼女は週末にテニスをするのを楽しんでいる。",
      options: ["to play", "playing", "play", "for playing"],
      correct: 2,
      explanation: "enjoyは動名詞のみを目的語に取る動詞。正解は (2) playing。"
    },
    {
      sentence: "I decided (  ) abroad next year.",
      translation: "私は来年留学することを決めた。",
      options: ["studying", "study", "to study", "for studying"],
      correct: 3,
      explanation: "decide to do で『〜することを決める』。正解は (3) to study。"
    },
    {
      sentence: "He stopped (  ) and looked at the map.",
      translation: "彼は立ち止まって地図を見た。",
      options: ["to walk", "walking", "walk", "for walking"],
      correct: 2,
      explanation: "stop doing で『〜するのをやめる』。文脈的に『歩くのをやめて』なので (2) walking。"
    },
    {
      sentence: "I forgot (  ) my homework.",
      translation: "私は宿題をするのを忘れた。",
      options: ["to do", "doing", "do", "for doing"],
      correct: 1,
      explanation: "forget to do で『〜するのを忘れる』。正解は (1) to do。"
    },
    {
      sentence: "He promised (  ) me tomorrow.",
      translation: "彼は明日私に電話すると約束した。",
      options: ["calling", "to call", "call", "for calling"],
      correct: 2,
      explanation: "promise to do で『〜することを約束する』。正解は (2) to call。"
    },
    {
      sentence: "Would you mind (  ) the window?",
      translation: "窓を閉めていただけませんか。",
      options: ["to close", "close", "closing", "for closing"],
      correct: 3,
      explanation: "mindは動名詞のみを目的語に取る。正解は (3) closing。"
    },
    {
      sentence: "I hope (  ) you again soon.",
      translation: "またすぐにあなたに会えることを願っています。",
      options: ["seeing", "see", "to see", "for seeing"],
      correct: 3,
      explanation: "hope to do で『〜することを望む』。正解は (3) to see。"
    },
    {
      sentence: "She gave up (  ) to the party.",
      translation: "彼女はパーティーに行くのをあきらめた。",
      options: ["to go", "going", "go", "for going"],
      correct: 2,
      explanation: "give up doing で『〜するのをあきらめる』。正解は (2) going。"
    },
    {
      sentence: "I want (  ) English better.",
      translation: "私はもっと英語が上手になりたい。",
      options: ["to speak", "speaking", "speak", "for speaking"],
      correct: 1,
      explanation: "want to do で『〜したい』。正解は (1) to speak。"
    },
    {
      sentence: "He finished (  ) his homework.",
      translation: "彼は宿題を終えた。",
      options: ["to do", "doing", "do", "for doing"],
      correct: 2,
      explanation: "finishは動名詞のみを目的語に取る。正解は (2) doing。"
    },
    {
      sentence: "They decided (  ) by train.",
      translation: "彼らは電車で行くことに決めた。",
      options: ["going", "to go", "go", "for going"],
      correct: 2,
      explanation: "decide to do で『〜することを決める』。正解は (2) to go。"
    },
    {
      sentence: "He avoided (  ) about the problem.",
      translation: "彼はその問題について話すのを避けた。",
      options: ["to talk", "talking", "talk", "for talking"],
      correct: 2,
      explanation: "avoidは動名詞のみを目的語に取る。正解は (2) talking。"
    },
    {
      sentence: "She needs (  ) harder.",
      translation: "彼女はもっと一生懸命勉強する必要がある。",
      options: ["to study", "studying", "study", "for studying"],
      correct: 1,
      explanation: "need to do で『〜する必要がある』。正解は (1) to study。"
    },
    {
      sentence: "I remember (  ) the door.",
      translation: "私はドアを閉めたことを覚えている。",
      options: ["to close", "closing", "close", "for closing"],
      correct: 2,
      explanation: "remember doing で『〜したことを覚えている』。正解は (2) closing。"
    },
    {
      sentence: "Don't forget (  ) your umbrella.",
      translation: "傘を持っていくのを忘れないで。",
      options: ["to take", "taking", "take", "for taking"],
      correct: 1,
      explanation: "forget to do で『〜するのを忘れる』。正解は (1) to take。"
    },
    {
      sentence: "He suggested (  ) a taxi.",
      translation: "彼はタクシーに乗ることを提案した。",
      options: ["to take", "taking", "take", "for taking"],
      correct: 2,
      explanation: "suggestは動名詞のみを目的語に取る。正解は (2) taking。"
    },
    {
      sentence: "She refused (  ) the invitation.",
      translation: "彼女は招待を断った。",
      options: ["to accept", "accepting", "accept", "for accepting"],
      correct: 1,
      explanation: "refuse to do で『〜するのを断る』。正解は (1) to accept。"
    },
    {
      sentence: "He stopped (  ) to me.",
      translation: "彼は私に話すために立ち止まった。",
      options: ["to talk", "talking", "talk", "for talking"],
      correct: 1,
      explanation: "stop to do で『〜するために立ち止まる』。正解は (1) to talk。"
    },
    {
      sentence: "I enjoy (  ) music.",
      translation: "私は音楽を聴くのが好きだ。",
      options: ["to listen to", "listening to", "listen to", "for listening to"],
      correct: 2,
      explanation: "enjoyは動名詞のみを目的語に取る。正解は (2) listening to。"
    },
    {
      sentence: "He hopes (  ) a doctor.",
      translation: "彼は医者になることを望んでいる。",
      options: ["to become", "becoming", "become", "for becoming"],
      correct: 1,
      explanation: "hope to do で『〜することを望む』。正解は (1) to become。"
    },
    {
      sentence: "She finished (  ) her letter.",
      translation: "彼女は手紙を書き終えた。",
      options: ["to write", "writing", "write", "for writing"],
      correct: 2,
      explanation: "finishは動名詞のみを目的語に取る。正解は (2) writing。"
    },
    {
      sentence: "I tried (  ) the machine, but it didn't work.",
      translation: "私はその機械を動かそうとしたが、動かなかった。",
      options: ["to start", "starting", "start", "for starting"],
      correct: 1,
      explanation: "try to do で『〜しようとする』。正解は (1) to start。"
    },
    {
      sentence: "He admitted (  ) the vase.",
      translation: "彼は花瓶を壊したことを認めた。",
      options: ["to break", "breaking", "break", "for breaking"],
      correct: 2,
      explanation: "admitは動名詞のみを目的語に取る。正解は (2) breaking。"
    },
    {
      sentence: "I hope (  ) from you soon.",
      translation: "あなたからすぐに連絡があることを願っています。",
      options: ["to hear", "hearing", "hear", "for hearing"],
      correct: 1,
      explanation: "hope to do で『〜することを望む』。正解は (1) to hear。"
    },
    {
      sentence: "He avoided (  ) late.",
      translation: "彼は遅刻するのを避けた。",
      options: ["to be", "being", "be", "for being"],
      correct: 2,
      explanation: "avoidは動名詞のみを目的語に取る。正解は (2) being。"
    },
    {
      sentence: "She offered (  ) me home.",
      translation: "彼女は私を家まで送ると申し出た。",
      options: ["to drive", "driving", "drive", "for driving"],
      correct: 1,
      explanation: "offer to do で『〜することを申し出る』。正解は (1) to drive。"
    },
    {
      sentence: "He suggested (  ) together.",
      translation: "彼は一緒に行くことを提案した。",
      options: ["to go", "going", "go", "for going"],
      correct: 2,
      explanation: "suggestは動名詞のみを目的語に取る。正解は (2) going。"
    },
    {
      sentence: "I want (  ) a new car.",
      translation: "私は新しい車が欲しい。",
      options: ["to buy", "buying", "buy", "for buying"],
      correct: 1,
      explanation: "want to do で『〜したい』。正解は (1) to buy。"
    },
    {
      sentence: "He finished (  ) the report.",
      translation: "彼はレポートを書き終えた。",
      options: ["to write", "writing", "write", "for writing"],
      correct: 2,
      explanation: "finishは動名詞のみを目的語に取る。正解は (2) writing。"
    }
  ];

  // クイズコンテナの中から要素を取得
  const container = document.getElementById('infinitive-gerund-quiz-container');
  if (!container) return;
  const quizArea = container.querySelector('#quiz-area');
  const nextBtn = container.querySelector('#next-question-btn');

  let current = 0;
  let answered = false;

  function renderQuestion(idx) {
    const q = quizData[idx];
    answered = false;
    nextBtn.classList.add('hidden');
    let html = `<div class=\"mb-4\">
      <div class=\"text-lg font-bold text-white mb-2\">Q${idx+1}. ${q.sentence}</div>
      <div class=\"text-white mb-4\">${q.translation}</div>
      <form id=\"quiz-form\">
        <div class=\"space-y-2\">`;
    q.options.forEach((opt, i) => {
      html += `<label class=\"flex items-center cursor-pointer\">
        <input type=\"radio\" name=\"option\" value=\"${i+1}\" class=\"mr-2\">
        <span class=\"text-base text-white\">(${i+1}) ${opt}</span>
      </label>`;
    });
    html += `</div>
        <button type=\"submit\" class=\"mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors\">答えを確認</button>
      </form>
      <div id=\"quiz-feedback\" class=\"mt-4 hidden\"></div>
    </div>`;
    quizArea.innerHTML = html.replace(/\\"/g, '"');
    quizArea.querySelector('#quiz-form').onsubmit = function(e) {
      e.preventDefault();
      if (answered) return;
      const selected = quizArea.querySelector('input[name="option"]:checked');
      const feedback = quizArea.querySelector('#quiz-feedback');
      if (!selected) {
        feedback.className = 'mt-4 text-red-600';
        feedback.textContent = '選択肢を選んでください。';
        feedback.classList.remove('hidden');
        return;
      }
      const ans = parseInt(selected.value);
      if (ans === q.correct) {
        feedback.className = 'mt-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded';
        feedback.innerHTML = `正解です！<br>${q.explanation}`;
      } else {
        feedback.className = 'mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 rounded';
        feedback.innerHTML = `不正解です。<br>正解は (${q.correct}) ${q.options[q.correct-1]}<br>${q.explanation}`;
      }
      feedback.classList.remove('hidden');
      answered = true;
      nextBtn.classList.remove('hidden');
    };
  }

  nextBtn.onclick = function() {
    if (current < quizData.length - 1) {
      current++;
      renderQuestion(current);
    } else {
      quizArea.innerHTML = `<div class='text-xl text-center text-green-700 font-bold my-8'>全問終了です！お疲れさまでした。</div>`;
      nextBtn.classList.add('hidden');
    }
  };

  renderQuestion(current);
})(); 

