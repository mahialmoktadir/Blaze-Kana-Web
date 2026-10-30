/**
 * Web Speech API and Web Audio API synthesized sound generator
 * Provides natural Japanese pronunciation and interactive UI audio feedback.
 */

class AudioService {
  private audioCtx: AudioContext | null = null;
  private isSpeechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  private isSpeakingState = false;
  private currentText: string | null = null;
  private listeners: Set<(state: { isSpeaking: boolean; currentText: string | null }) => void> = new Set();

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private notifyListeners(): void {
    const state = { isSpeaking: this.isSpeakingState, currentText: this.currentText };
    this.listeners.forEach(fn => fn(state));
  }

  public subscribe(listener: (state: { isSpeaking: boolean; currentText: string | null }) => void): () => void {
    this.listeners.add(listener);
    listener({ isSpeaking: this.isSpeakingState, currentText: this.currentText });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public isCurrentlySpeaking(text?: string): boolean {
    if (!this.isSpeakingState) return false;
    if (text) {
      return this.currentText === text;
    }
    return this.isSpeakingState;
  }

  public getCurrentText(): string | null {
    return this.currentText;
  }

  /**
   * Stop any current speech synthesis
   */
  public stopSpeech(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeakingState = false;
    this.currentText = null;
    this.notifyListeners();
  }

  /**
   * Toggle Japanese text speech:
   * If currently speaking this text, stop it.
   * If not speaking or speaking something else, start speaking this text.
   * Returns true if started, false if stopped.
   */
  public toggleSpeech(text: string, rate: number = 0.95): boolean {
    if (!text) return false;

    if (this.isSpeakingState && this.currentText === text) {
      this.stopSpeech();
      return false;
    }

    this.speakJapanese(text, rate);
    return true;
  }

  /**
   * Speak Japanese text using Web Speech API with ja-JP locale
   */
  public speakJapanese(text: string, rate: number = 0.95): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSpeechAvailable || !text) {
        this.isSpeakingState = false;
        this.currentText = null;
        this.notifyListeners();
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending utterance

      this.isSpeakingState = true;
      this.currentText = text;
      this.notifyListeners();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = Math.max(0.5, Math.min(1.5, rate));
      utterance.pitch = 1.0;

      // Select high quality Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      const finish = () => {
        if (this.currentText === text) {
          this.isSpeakingState = false;
          this.currentText = null;
          this.notifyListeners();
        }
        resolve();
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Pleasant harmonic chime for correct answers
   */
  public playCorrect(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2); // C6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.45);
  }

  /**
   * Gentle subtle soft buzz for incorrect attempts
   */
  public playIncorrect(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(174.61, now + 0.15); // F3

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  /**
   * Achievement / Lesson Complete Celebration Fanfare
   */
  public playCelebration(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const noteTime = startTime + index * 0.1;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.16, noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  /**
   * Subtle click for navigation & buttons
   */
  public playClick(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const audioService = new AudioService();
