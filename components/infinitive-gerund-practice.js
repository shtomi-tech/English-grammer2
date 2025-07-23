document.addEventListener('DOMContentLoaded', function() {
    // 問題データ
    const questions = [
        {
            sentence: "I want _____ English.",
            answer: "to study",
            explanation: "wantは不定詞のみを目的語に取る動詞です。I want to study English."
        },
        {
            sentence: "I enjoy _____ books.",
            answer: "reading",
            explanation: "enjoyは動名詞のみを目的語に取る動詞です。I enjoy reading books."
        },
        {
            sentence: "I decided _____ abroad.",
            answer: "to study",
            explanation: "decideは不定詞のみを目的語に取る動詞です。I decided to study abroad."
        },
        {
            sentence: "I finished _____ the report.",
            answer: "writing",
            explanation: "finishは動名詞のみを目的語に取る動詞です。I finished writing the report."
        },
        {
            sentence: "I hope _____ you soon.",
            answer: "to see",
            explanation: "hopeは不定詞のみを目的語に取る動詞です。I hope to see you soon."
        },
        {
            sentence: "I suggest _____ to the movies.",
            answer: "going",
            explanation: "suggestは動名詞のみを目的語に取る動詞です。I suggest going to the movies."
        },
        {
            sentence: "I stopped _____ to buy some milk.",
            answer: "to buy",
            explanation: "stop to doは『〜するために立ち止まる』の意味です。I stopped to buy some milk."
        },
        {
            sentence: "I stopped _____ cigarettes.",
            answer: "smoking",
            explanation: "stop doingは『〜するのをやめる』の意味です。I stopped smoking cigarettes."
        },
        {
            sentence: "I remember _____ him before.",
            answer: "meeting",
            explanation: "remember doingは『〜したことを覚えている』の意味です。I remember meeting him before."
        },
        {
            sentence: "Remember _____ the door.",
            answer: "to lock",
            explanation: "remember to doは『〜することを覚えている・忘れずに〜する』の意味です。Remember to lock the door."
        }
    ];

    const container = document.getElementById('infinitive-gerund-questions');
    const resultsDiv = document.getElementById('practice-results');
    const correctCountSpan = document.getElementById('correct-count');
    const accuracyRateSpan = document.getElementById('accuracy-rate');
    const resultMessage = document.getElementById('result-message');
    const resetButton = document.getElementById('reset-practice');

    function renderQuestions() {
        container.innerHTML = '';
        questions.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = 'question-card bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-400';
            card.innerHTML = `
                <h3 class="font-bold text-lg mb-4 text-gray-800">問題 ${idx + 1}</h3>
                <div class="mb-4">
                    <p class="text-gray-700 mb-2"><strong>英文：</strong></p>
                    <p class="text-lg font-medium text-blue-600">${q.sentence.replace('_____', '<input type=\'text\' class=\'answer-input-full\' data-correct=\'' + q.answer + '\' placeholder=\'空欄に入力\'>')}</p>
                </div>
                <button class="check-answer-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">答えを確認</button>
                <div class="answer-explanation hidden mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <p class="text-green-800"><strong>正解：</strong>${q.answer}</p>
                    <p class="text-sm text-green-700 mt-1">${q.explanation}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function setupLogic() {
        const checkButtons = document.querySelectorAll('.check-answer-btn');
        const inputs = document.querySelectorAll('.answer-input-full');
        const explanations = document.querySelectorAll('.answer-explanation');
        let answeredQuestions = new Set();

        checkButtons.forEach((button, idx) => {
            button.addEventListener('click', function() {
                const input = inputs[idx];
                const explanation = explanations[idx];
                const correctAnswer = input.dataset.correct.trim().toLowerCase();
                const userAnswer = input.value.trim().toLowerCase();
                if (answeredQuestions.has(idx)) return;
                if (userAnswer === correctAnswer) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                }
                explanation.classList.remove('hidden');
                answeredQuestions.add(idx);
                if (answeredQuestions.size === questions.length) {
                    showResults();
                }
            });
        });

        function showResults() {
            let correct = 0;
            inputs.forEach((input, i) => {
                if (input.value.trim().toLowerCase() === input.dataset.correct.trim().toLowerCase()) {
                    correct++;
                }
            });
            correctCountSpan.textContent = correct;
            accuracyRateSpan.textContent = Math.round((correct / questions.length) * 100) + '%';
            resultsDiv.classList.remove('hidden');
            if (correct === questions.length) {
                resultMessage.textContent = '全問正解！素晴らしいです！';
            } else if (correct >= questions.length * 0.7) {
                resultMessage.textContent = 'よくできました！もう少しで満点です。';
            } else {
                resultMessage.textContent = '復習して再チャレンジしましょう。';
            }
        }

        resetButton.addEventListener('click', function() {
            inputs.forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            });
            explanations.forEach(ex => ex.classList.add('hidden'));
            resultsDiv.classList.add('hidden');
            answeredQuestions.clear();
        });
    }

    renderQuestions();
    setupLogic();
}); 

