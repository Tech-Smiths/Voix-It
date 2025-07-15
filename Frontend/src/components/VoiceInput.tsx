import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Square, Play, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (transcript: string, language: string) => void;
  isProcessing?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, isProcessing = false }) => {
  const { language, t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      // Set language based on current selection
      const langMap: { [key: string]: string } = {
        'en': 'en-US',
        'ta': 'ta-IN',
        'hi': 'hi-IN',
        'te': 'te-IN',
        'kn': 'kn-IN'
      };
      recognitionRef.current.lang = langMap[language] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        if (transcript.trim()) {
          onTranscript(transcript, language);
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, transcript, onTranscript]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio analysis for visual feedback
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      setIsRecording(true);
      setTranscript('');
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border border-border shadow-card">
      <div className="text-center space-y-4">
        <div className="relative">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            size="lg"
            className={`
              w-24 h-24 rounded-full text-white transition-all duration-300 transform
              ${isRecording 
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse-voice' 
                : 'bg-gradient-voice hover:scale-105 shadow-voice'
              }
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isProcessing ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : isRecording ? (
              <Square className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
          
          {isRecording && (
            <div 
              className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"
              style={{ 
                transform: `scale(${1 + audioLevel * 0.3})`,
                opacity: 0.7 - audioLevel * 0.3
              }}
            />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            {isProcessing ? t('processing') : isRecording ? t('recording') : t('speakNow')}
          </p>
          
          {transcript && (
            <div className="bg-secondary/50 rounded-lg p-3 mt-4">
              <p className="text-sm text-muted-foreground mb-1">Transcript:</p>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}
        </div>

        {isRecording && (
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 bg-voice-primary rounded-full animate-bounce-subtle"
                style={{
                  height: `${8 + audioLevel * 16}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceInput;