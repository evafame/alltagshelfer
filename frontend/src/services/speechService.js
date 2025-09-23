// Minimal wrapper: speech recognition + TTS
export class SpeechService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    if(this.recognition) {
      this.recognition.lang = 'de-DE';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  startRecognition(onResult, onError) {
    if (!this.recognition) return onError && onError(new Error('SpeechRecognition not supported'));
    this.recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };
    this.recognition.onerror = (e) => onError && onError(e.error);
    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) this.recognition.stop();
  }

  speak(text, { rate = 1, pitch = 1, lang = 'de-DE' } = {}) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.pitch = pitch;
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  }

  cancelSpeak() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
}
