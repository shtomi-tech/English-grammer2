// Google Cloud Text-to-Speech API を使用した音声読み上げサービス
class TextToSpeechService {
    constructor() {
        this.apiKey = null;
        this.isInitialized = false;
        this.currentAudio = null;
        this.isPlaying = false;
        this.onStateChange = null;
    }

    // APIキーを設定して初期化
    async initialize(apiKey) {
        this.apiKey = apiKey;
        this.isInitialized = true;
        console.log('Text-to-Speech service initialized');
    }

    // Google Cloud Text-to-Speech APIを使用して音声を生成
    async synthesizeSpeech(text, options = {}) {
        if (!this.isInitialized) {
            throw new Error('Text-to-Speech service is not initialized. Please set API key first.');
        }

        const defaultOptions = {
            voice: 'ja-JP-Neural2-A', // 高品質な日本語音声
            language: 'ja-JP',
            speed: 0.9, // 読み上げ速度 (0.25-4.0)
            pitch: 0, // 音の高さ (-20.0-20.0)
            volume: 1.0 // 音量 (0.0-1.0)
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: {
                        text: text
                    },
                    voice: {
                        languageCode: config.language,
                        name: config.voice
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate: config.speed,
                        pitch: config.pitch,
                        volumeGainDb: Math.log10(config.volume) * 20
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Google TTS API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            return data.audioContent; // Base64エンコードされた音声データ

        } catch (error) {
            console.error('Text-to-Speech API Error:', error);
            throw error;
        }
    }

    // Base64音声データをAudioオブジェクトに変換
    base64ToAudio(base64Audio) {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const blob = new Blob([bytes], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        
        return audio;
    }

    // テキストを読み上げ
    async speak(text, options = {}) {
        try {
            // 既存の音声を停止
            this.stop();

            // 音声を生成
            const audioContent = await this.synthesizeSpeech(text, options);
            
            // Audioオブジェクトを作成
            this.currentAudio = this.base64ToAudio(audioContent);
            
            // イベントリスナーを設定
            this.currentAudio.addEventListener('ended', () => {
                this.isPlaying = false;
                if (this.onStateChange) {
                    this.onStateChange('ended');
                }
            });

            this.currentAudio.addEventListener('error', (error) => {
                console.error('Audio playback error:', error);
                this.isPlaying = false;
                if (this.onStateChange) {
                    this.onStateChange('error', error);
                }
            });

            // 音声を再生
            await this.currentAudio.play();
            this.isPlaying = true;
            
            if (this.onStateChange) {
                this.onStateChange('playing');
            }

            return true;

        } catch (error) {
            console.error('Speech synthesis error:', error);
            this.isPlaying = false;
            if (this.onStateChange) {
                this.onStateChange('error', error);
            }
            throw error;
        }
    }

    // 読み上げを停止
    stop() {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
            
            if (this.onStateChange) {
                this.onStateChange('stopped');
            }
        }
    }

    // 一時停止
    pause() {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
            
            if (this.onStateChange) {
                this.onStateChange('paused');
            }
        }
    }

    // 再開
    resume() {
        if (this.currentAudio && !this.isPlaying) {
            this.currentAudio.play();
            this.isPlaying = true;
            
            if (this.onStateChange) {
                this.onStateChange('playing');
            }
        }
    }

    // 現在の状態を取得
    getState() {
        return {
            isPlaying: this.isPlaying,
            isInitialized: this.isInitialized
        };
    }

    // 利用可能な音声一覧を取得
    async getAvailableVoices(languageCode = 'ja-JP') {
        if (!this.isInitialized) {
            throw new Error('Text-to-Speech service is not initialized');
        }

        try {
            const response = await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${this.apiKey}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch available voices');
            }

            const data = await response.json();
            return data.voices.filter(voice => 
                voice.languageCodes.includes(languageCode)
            );

        } catch (error) {
            console.error('Error fetching voices:', error);
            throw error;
        }
    }

    // リソースをクリーンアップ
    cleanup() {
        this.stop();
        if (this.currentAudio) {
            URL.revokeObjectURL(this.currentAudio.src);
            this.currentAudio = null;
        }
    }
}

// グローバルインスタンスを作成
const textToSpeechService = new TextToSpeechService();

// モジュールとしてエクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TextToSpeechService, textToSpeechService };
} 