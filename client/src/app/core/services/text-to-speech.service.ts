import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextToSpeechService {
  private readonly synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private voices: SpeechSynthesisVoice[] = [];
  private utterance?: SpeechSynthesisUtterance;
  private queue: string[] = [];
  private playbackToken = 0;

  constructor() {
    this.loadVoices();
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const synth = this.synth;

    const setVoices = () => {
      this.voices = synth.getVoices();
    };

    setVoices();
    synth.addEventListener?.('voiceschanged', setVoices);
    synth.onvoiceschanged = setVoices;
  }

  speak(text: string): void {
    this.stop();
    const content = text?.trim();
    if (!content || !this.synth || typeof SpeechSynthesisUtterance === 'undefined') return;

    const token = ++this.playbackToken;
    this.queue = this.splitIntoSpeechChunks(content);
    this.speakNext(token);
  }

  pause(): void {
    if (this.synth?.speaking) this.synth.pause();
  }

  resume(): void {
    if (this.synth?.paused) this.synth.resume();
  }

  stop(): void {
    this.playbackToken++;
    this.queue = [];
    this.utterance = undefined;
    this.synth?.cancel();
  }

  private speakNext(token: number): void {
    if (!this.synth || token !== this.playbackToken) return;

    const text = this.queue.shift();
    if (!text) {
      this.utterance = undefined;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.92;
    utterance.pitch = 1.08;
    utterance.volume = 1.0;
    utterance.onend = () => this.speakNext(token);
    utterance.onerror = () => this.speakNext(token);

    this.utterance = utterance;
    this.synth.speak(utterance);
  }

  private getBestVoice(): SpeechSynthesisVoice | undefined {
    if (!this.voices.length && this.synth) this.voices = this.synth.getVoices();

    const normalized = this.voices.map((voice) => ({
      voice,
      name: voice.name.toLowerCase(),
      lang: voice.lang.toLowerCase(),
    }));

    const preferredNames = [
      'microsoft jenny',
      'microsoft aria',
      'google us english',
      'google uk english female',
      'google uk english',
      'siri',
      'samantha',
      'ava',
      'nicky',
      'susan',
      'karen',
      'daniel',
      'alex',
      'natural',
      'enhanced',
    ];

    for (const name of preferredNames) {
      const match = normalized.find((item) => item.name.includes(name) && item.lang.startsWith('en'));
      if (match) return match.voice;
    }

    return (
      normalized.find((item) => item.lang === 'en-us')?.voice ||
      normalized.find((item) => item.lang.startsWith('en'))?.voice ||
      this.voices[0]
    );
  }

  private splitIntoSpeechChunks(text: string): string[] {
    const sentences = text
      .replace(/\s+/g, ' ')
      .split(/(?<=[.!?])\s+|\n+/)
      .map((item) => item.trim())
      .filter(Boolean);

    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
      if ((current + ' ' + sentence).trim().length <= 240) {
        current = (current + ' ' + sentence).trim();
        continue;
      }

      if (current) chunks.push(current);
      if (sentence.length <= 240) {
        current = sentence;
        continue;
      }

      const words = sentence.split(' ');
      current = '';
      for (const word of words) {
        if ((current + ' ' + word).trim().length > 240 && current) {
          chunks.push(current);
          current = word;
        } else {
          current = (current + ' ' + word).trim();
        }
      }
    }

    if (current) chunks.push(current);
    return chunks;
  }
}
