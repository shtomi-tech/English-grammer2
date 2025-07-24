// API通信管理クラス
class ApiService {
  constructor(config) {
    this.config = config;
    this.baseUrl = config.api.baseUrl;
    this.timeout = config.api.timeout;
    this.retryAttempts = config.api.retryAttempts;
  }

  // リクエストヘッダーを取得
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // タイムアウト付きfetch
  async fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // リトライ機能付きAPI呼び出し
  async request(endpoint, options = {}, retryCount = 0) {
    const url = `${this.baseUrl}${endpoint}`;
    const requestOptions = {
      ...options,
      headers: this.getHeaders()
    };

    try {
      const response = await this.fetchWithTimeout(url, requestOptions, this.timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < this.retryAttempts && this.shouldRetry(error)) {
        console.warn(`API request failed, retrying... (${retryCount + 1}/${this.retryAttempts})`);
        await this.delay(1000 * (retryCount + 1)); // 指数バックオフ
        return this.request(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  // リトライすべきエラーかどうかを判定
  shouldRetry(error) {
    return error.name === 'AbortError' || 
           error.message.includes('network') ||
           error.message.includes('timeout');
  }

  // 遅延関数
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // GETリクエスト
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POSTリクエスト
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // 穴埋め問題生成
  async generateFillInTheBlank(topic, difficulty, numBlanks = 3) {
    return this.post('/api/generate-fill-blank', {
      topic,
      difficulty,
      numBlanks
    });
  }

  // 英作文問題生成
  async generateWritingQuestion(topic, difficulty) {
    const response = await this.post('/api/generate-writing-question', {
      topic,
      difficulty
    });
    return response.data;
  }

  // 英作文添削
  async gradeWritingAnswer(topic, userAnswer, difficulty) {
    const response = await this.post('/api/grade-writing-answer', {
      topic,
      userAnswer,
      difficulty
    });
    return response.data;
  }

  // 和文英訳問題生成
  async generateTranslationQuestion(topic, difficulty, grammarExplanation) {
    const response = await this.post('/api/generate-translation-question', {
      topic,
      difficulty,
      grammarExplanation
    });
    return response.data;
  }

  // 和文英訳添削
  async gradeTranslationAnswer(topic, userAnswer, difficulty) {
    const response = await this.post('/api/grade-translation-answer', {
      topic,
      userAnswer,
      difficulty
    });
    return response.data;
  }

  // サーバーヘルスチェック
  async checkHealth() {
    try {
      const response = await this.get('/health');
      return response.status === 'ok';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// グローバルインスタンスを作成
let apiService = null;

// APIサービスを初期化
function initializeApiService(config) {
  apiService = new ApiService(config);
  return apiService;
}

// APIサービスを取得
function getApiService() {
  if (!apiService) {
    throw new Error('ApiService not initialized. Call initializeApiService first.');
  }
  return apiService;
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApiService, initializeApiService, getApiService };
} else if (typeof window !== 'undefined') {
  window.ApiService = ApiService;
  window.initializeApiService = initializeApiService;
  window.getApiService = getApiService;
} 