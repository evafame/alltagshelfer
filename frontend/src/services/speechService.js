// /frontend/src/services/speechService.js
// TTS + ASR mit kleinen Stabilitäts-Verbesserungen (Queue, Feature-Checks, Singleton)

export class SpeechService {
  constructor({ lang = 'de-DE', rate = 1, pitch = 1 } = {}) {
    this.lang = lang;
    this.rate = rate;
    this.pitch = pitch;

    // --- Speech Recognition (ASR) ---
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SR ? new SR() : null;
    this._recognizing = false;
    if (this.recognition) {
      this.recognition.lang = this.lang;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }

    // --- Speech Synthesis (TTS) ---
    this._queue = [];
    this._speaking = false;
    this._voicesLoaded = false;
    if ('speechSynthesis' in window) {
      // Manche Browser laden Stimmen asynchron
      window.speechSynthesis.onvoiceschanged = () => {
        this._voicesLoaded = true;
      };
    }
  }

  // ---------- Feature Checks ----------
  isAsrSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
  isTtsSupported() {
    return 'speechSynthesis' in window;
  }

  // ---------- ASR ----------
  startRecognition(onResult, onError) {
    if (!this.recognition) {
      onError && onError(new Error('SpeechRecognition not supported'));
      return () => {};
    }
    if (this._recognizing) return () => this.stopRecognition();

    this._recognizing = true;
    this.recognition.onresult = (e) => {
      try {
        const text = e.results[0][0].transcript;
        onResult && onResult(text);
      } catch (err) {
        onError && onError(err);
      }
    };
    this.recognition.onerror = (e) => {
      onError && onError(e?.error || e);
      this._recognizing = false;
    };
    this.recognition.onend = () => {
      this._recognizing = false;
    };
    try {
      this.recognition.start();
    } catch (e) {
      this._recognizing = false;
      onError && onError(e);
    }

    // Rückgabe: Stop-Funktion
    return () => this.stopRecognition();
  }

  stopRecognition() {
    try {
      this.recognition && this.recognition.stop();
    } catch {}
    this._recognizing = false;
  }

  // ---------- TTS ----------
  // Sofort sprechen (wie vorher)
  speak(text, { rate = this.rate, pitch = this.pitch, lang = this.lang } = {}) {
    if (!this.isTtsSupported()) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.rate = rate;
      u.pitch = pitch;
      u.lang = lang;
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn('TTS failed:', e);
    }
  }

  // Warteschlange + Promise: spricht nacheinander
  speakAsync(text, { rate = this.rate, pitch = this.pitch, lang = this.lang } = {}) {
    if (!this.isTtsSupported()) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this._queue.push({ text: String(text), rate, pitch, lang, resolve, reject });
      this._drain();
    });
  }

  async _drain() {
    if (this._speaking || !this._queue.length || !this.isTtsSupported()) return;
    this._speaking = true;

    const item = this._queue.shift();
    try {
      // Optional: passende Stimme wählen (de-DE), wenn verfügbar
      const u = new SpeechSynthesisUtterance(item.text);
      u.rate = item.rate;
      u.pitch = item.pitch;
      u.lang = item.lang;

      const finish = () => {
        u.onend = u.onerror = null;
        this._speaking = false;
        item.resolve();
        // Nächstes Element
        this._drain();
      };

      u.onend = finish;
      u.onerror = (e) => {
        console.warn('TTS error', e);
        this._speaking = false;
        item.reject(e);
        this._drain();
      };

      window.speechSynthesis.speak(u);
    } catch (e) {
      this._speaking = false;
      item.reject(e);
      this._drain();
    }
  }

  cancelSpeak() {
    if (this.isTtsSupported()) {
      window.speechSynthesis.cancel();
      this._queue = [];
      this._speaking = false;
    }
  }
}

// Singleton-Instanz: überall gleich verwenden
const speech = new SpeechService();
export default speech;

import speech from '../services/speechService';

{!speech.isAsrSupported() && (
  <p role="status">Sprachsteuerung nicht verfügbar – Sie können alle Schritte per Knopf bedienen.</p>
)}

await speech.speakAsync('Willkommen bei Alltagshelfer.');
await speech.speakAsync('Möchten Sie Hilfe erhalten oder Hilfe anbieten?');

