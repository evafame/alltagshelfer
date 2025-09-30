export class SpeechService {
  private recognition: SpeechRecognition | null;
  private lang: string;
  private rate: number;
  private pitch: number;
  private _recognizing = false;
  private _queue: Array<{
    text: string; rate: number; pitch: number; lang: string;
    resolve: () => void; reject: (e: unknown) => void;
  }> = [];
  private _speaking = false;

  constructor({ lang = 'de-DE', rate = 1, pitch = 1 }: { lang?: string; rate?: number; pitch?: number } = {}) {
    this.lang = lang;
    this.rate = rate;
    this.pitch = pitch;

    const SR: typeof SpeechRecognition | undefined =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = SR ? new SR() : null;
    if (this.recognition) {
      this.recognition.lang = this.lang;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  isAsrSupported() {
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }
  isTtsSupported() {
    return 'speechSynthesis' in window;
  }

  startRecognition(onResult?: (text: string) => void, onError?: (e: unknown) => void) {
    if (!this.recognition) {
      onError?.(new Error('SpeechRecognition not supported'));
      return () => {};
    }
    if (this._recognizing) return () => this.stopRecognition();

    this._recognizing = true;
    this.recognition.onresult = (e: SpeechRecognitionEvent) => {
      try { onResult?.(e.results[0][0].transcript); } catch (err) { onError?.(err); }
    };
    this.recognition.onerror = (e: any) => { onError?.(e?.error || e); this._recognizing = false; };
    this.recognition.onend = () => { this._recognizing = false; };

    try { this.recognition.start(); } catch (e) { this._recognizing = false; onError?.(e); }
    return () => this.stopRecognition();
  }

  stopRecognition() {
    try { this.recognition?.stop(); } catch {}
    this._recognizing = false;
  }

  speak(text: string, { rate = this.rate, pitch = this.pitch, lang = this.lang }: { rate?: number; pitch?: number; lang?: string } = {}) {
    if (!this.isTtsSupported()) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.rate = rate; u.pitch = pitch; u.lang = lang;
      window.speechSynthesis.speak(u);
    } catch (e) { console.warn('TTS failed:', e); }
  }

  speakAsync(text: string, { rate = this.rate, pitch = this.pitch, lang = this.lang }: { rate?: number; pitch?: number; lang?: string } = {}) {
    if (!this.isTtsSupported()) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      this._queue.push({ text: String(text), rate, pitch, lang, resolve, reject });
      this._drain();
    });
  }

  private _drain() {
    if (this._speaking || !this._queue.length || !this.isTtsSupported()) return;
    this._speaking = true;
    const item = this._queue.shift()!;
    try {
      const u = new SpeechSynthesisUtterance(item.text);
      u.rate = item.rate; u.pitch = item.pitch; u.lang = item.lang;

      const finish = () => { u.onend = u.onerror = null as any; this._speaking = false; item.resolve(); this._drain(); };
      u.onend = finish;
      u.onerror = (e) => { console.warn('TTS error', e); this._speaking = false; item.reject(e); this._drain(); };

      window.speechSynthesis.speak(u);
    } catch (e) {
      this._speaking = false; item.reject(e); this._drain();
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

const speech = new SpeechService();
export default speech;
