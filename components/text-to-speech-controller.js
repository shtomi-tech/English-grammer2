// 音声読み上げプレーヤーのコントローラー
class TextToSpeechController {
    constructor(containerId, textElementId, apiKey) {
        this.containerId = containerId;
        this.textElementId = textElementId;
        this.apiKey = apiKey;
        this.isInitialized = false;
        this.currentText = '';
        
        this.init();
    }

    async init() {
        try {
            // Text-to-Speechサービスを初期化
            await textToSpeechService.initialize(this.apiKey);
            
            // UIを設定
            this.setupUI();
            
            // イベントリスナーを設定
            this.setupEventListeners();
            
            // 状態変更コールバックを設定
            textToSpeechService.onStateChange = (state, error) => {
                this.updateUIState(state, error);
            };
            
            this.isInitialized = true;
            this.updateStatus('準備完了', 'ready');
            
        } catch (error) {
            console.error('Text-to-Speech controller initialization failed:', error);
            this.showError('音声読み上げサービスの初期化に失敗しました: ' + error.message);
        }
    }

    setupUI() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            throw new Error(`Container with ID '${this.containerId}' not found`);
        }

        // スライダーのイベントリスナーを設定
        const speedSlider = document.getElementById('speedSlider');
        const volumeSlider = document.getElementById('volumeSlider');
        const speedValue = document.getElementById('speedValue');
        const volumeValue = document.getElementById('volumeValue');

        if (speedSlider && speedValue) {
            speedSlider.addEventListener('input', (e) => {
                speedValue.textContent = e.target.value;
            });
        }

        if (volumeSlider && volumeValue) {
            volumeSlider.addEventListener('input', (e) => {
                volumeValue.textContent = e.target.value;
            });
        }
    }

    setupEventListeners() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const stopBtn = document.getElementById('stopBtn');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.stop();
            });
        }
    }

    async togglePlayPause() {
        if (!this.isInitialized) {
            this.showError('音声読み上げサービスが初期化されていません');
            return;
        }

        const state = textToSpeechService.getState();
        
        if (state.isPlaying) {
            textToSpeechService.pause();
        } else {
            await this.startPlayback();
        }
    }

    async startPlayback() {
        try {
            // テキストを取得
            const textElement = document.getElementById(this.textElementId);
            if (!textElement) {
                this.showError('読み上げるテキストが見つかりません');
                return;
            }

            const text = textElement.textContent.trim();
            if (!text) {
                this.showError('読み上げるテキストが空です');
                return;
            }

            this.currentText = text;

            // 設定を取得
            const options = this.getPlaybackOptions();

            // 読み上げを開始
            this.updateStatus('音声を生成中...', 'loading');
            await textToSpeechService.speak(text, options);

        } catch (error) {
            console.error('Playback error:', error);
            this.showError('読み上げに失敗しました: ' + error.message);
        }
    }

    stop() {
        textToSpeechService.stop();
    }

    getPlaybackOptions() {
        const voiceSelect = document.getElementById('voiceSelect');
        const speedSlider = document.getElementById('speedSlider');
        const volumeSlider = document.getElementById('volumeSlider');

        return {
            voice: voiceSelect ? voiceSelect.value : 'ja-JP-Neural2-A',
            speed: speedSlider ? parseFloat(speedSlider.value) : 0.9,
            volume: volumeSlider ? parseInt(volumeSlider.value) / 100 : 1.0
        };
    }

    updateUIState(state, error) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const playButtonText = document.getElementById('playButtonText');
        const playIcon = document.getElementById('playIcon');

        switch (state) {
            case 'playing':
                this.updateStatus('読み上げ中...', 'playing');
                if (playPauseBtn) {
                    playPauseBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                    playPauseBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
                }
                if (playButtonText) playButtonText.textContent = '一時停止';
                if (playIcon) {
                    playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />';
                }
                if (stopBtn) stopBtn.disabled = false;
                break;

            case 'paused':
                this.updateStatus('一時停止中', 'paused');
                if (playPauseBtn) {
                    playPauseBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
                    playPauseBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                }
                if (playButtonText) playButtonText.textContent = '再開';
                if (playIcon) {
                    playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
                }
                break;

            case 'ended':
                this.updateStatus('読み上げ完了', 'completed');
                if (playPauseBtn) {
                    playPauseBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600', 'bg-green-500', 'hover:bg-green-600');
                    playPauseBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
                }
                if (playButtonText) playButtonText.textContent = '読み上げ開始';
                if (playIcon) {
                    playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
                }
                if (stopBtn) stopBtn.disabled = true;
                break;

            case 'stopped':
                this.updateStatus('停止', 'stopped');
                if (playPauseBtn) {
                    playPauseBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600', 'bg-green-500', 'hover:bg-green-600');
                    playPauseBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
                }
                if (playButtonText) playButtonText.textContent = '読み上げ開始';
                if (playIcon) {
                    playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
                }
                if (stopBtn) stopBtn.disabled = true;
                break;

            case 'error':
                this.showError('読み上げエラー: ' + (error ? error.message : '不明なエラー'));
                break;
        }
    }

    updateStatus(message, type) {
        const statusDisplay = document.getElementById('statusDisplay');
        const statusText = document.getElementById('statusText');
        const statusIcon = document.getElementById('statusIcon');

        if (statusDisplay) statusDisplay.classList.remove('hidden');
        if (statusText) statusText.textContent = message;

        if (statusIcon) {
            statusIcon.className = 'w-3 h-3 rounded-full mr-2';
            switch (type) {
                case 'ready':
                    statusIcon.classList.add('bg-green-500');
                    break;
                case 'loading':
                    statusIcon.classList.add('bg-yellow-500');
                    break;
                case 'playing':
                    statusIcon.classList.add('bg-blue-500');
                    break;
                case 'paused':
                    statusIcon.classList.add('bg-orange-500');
                    break;
                case 'completed':
                    statusIcon.classList.add('bg-green-500');
                    break;
                case 'stopped':
                    statusIcon.classList.add('bg-gray-500');
                    break;
                default:
                    statusIcon.classList.add('bg-gray-500');
            }
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        if (errorMessage) errorMessage.classList.remove('hidden');
        if (errorText) errorText.textContent = message;

        // 3秒後にエラーメッセージを非表示
        setTimeout(() => {
            if (errorMessage) errorMessage.classList.add('hidden');
        }, 3000);
    }

    // リソースをクリーンアップ
    cleanup() {
        textToSpeechService.cleanup();
    }
} 