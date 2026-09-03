/**
 * Voice Assistant Service Abstraction for WeatherGPT
 * Supports Web Speech API for STT & TTS with ready contracts for Whisper/On-Device models
 */

export interface SpeechRecognitionResultHandler {
  onTranscript: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

// Extend Window interface for Webkit SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private synthesis: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  public isSpeechSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public isTTSSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public startListening(
    language: 'en' | 'hi' | 'mr' | 'hinglish',
    handlers: SpeechRecognitionResultHandler
  ): void {
    if (!this.isSpeechSupported()) {
      handlers.onError('Browser Speech Recognition is not supported on this browser. Try typing instead.');
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionClass();

    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    // Set BCP-47 language tag
    switch (language) {
      case 'hi':
        this.recognition.lang = 'hi-IN';
        break;
      case 'mr':
        this.recognition.lang = 'mr-IN';
        break;
      case 'hinglish':
      case 'en':
      default:
        this.recognition.lang = 'en-IN';
        break;
    }

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        handlers.onTranscript(finalTranscript, true);
      } else if (interimTranscript) {
        handlers.onTranscript(interimTranscript, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      handlers.onError(event.error || 'Voice input error occurred');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      handlers.onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (e) {
      handlers.onError('Could not start microphone');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public speak(text: string, lang: string = 'en-IN', onEnd?: () => void): void {
    if (!this.synthesis) return;

    this.synthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // Clear natural pace

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
