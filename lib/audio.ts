// Web Audio API Synthesized Sound Effects (No external mp3 required, instantaneous & reliable)
class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(enabled?: boolean) {
    this.soundEnabled = enabled !== undefined ? enabled : !this.soundEnabled;
    return this.soundEnabled;
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  // Soft button click
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // Quiz correct / Task complete melodic chime
  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch {}
  }

  // Level station switch gentle swoosh chime
  public playStationSwitch() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  // Certificate / Celebration fanfare
  public playCelebration() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.5, d: 0.35 }, // C6
      ];
      let t = ctx.currentTime;
      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + note.d);
        t += note.d * 0.85;
      });
    } catch {}
  }
}

export const sounds = new SoundEngine();

// Web Speech API Turkish TTS Voice Reader
export class SpeechReader {
  private static synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static speak(text: string, onEnd?: () => void, onError?: () => void) {
    if (!this.synth) return;
    this.stop();

    // Clean markdown formatting characters for clean speech
    const cleanText = text
      .replace(/[*#_`>]/g, '')
      .replace(/🎯|💡|🌟|👋|🏛️|📜|👴|👵|🔍|🌱|📚|🧪|🏺|🕌/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.95; // Slightly measured for 5th grade students
    utterance.pitch = 1.05;

    // Pick Turkish voice if available
    const voices = this.synth.getVoices();
    const trVoice = voices.find(v => v.lang.startsWith('tr'));
    if (trVoice) {
      utterance.voice = trVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onError) onError();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}
