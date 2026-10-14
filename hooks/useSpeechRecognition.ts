import { useState, useEffect, useRef } from 'react';

// TypeScript definitions for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
       if (finalTranscript) {
           setTranscript(prev => prev + finalTranscript + ' ');
       }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      if(isListening) setIsListening(false);
    };
    
    recognition.onend = () => {
      if(isListening) setIsListening(false);
    };
    
    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };
  }, [isListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      // Don't clear transcript, allow appending
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const toggleListening = () => {
      if (isListening) {
          stopListening();
      } else {
          startListening();
      }
  }

  return { isListening, transcript, setTranscript, toggleListening, hasRecognitionSupport: !!recognitionRef.current };
};

export default useSpeechRecognition;
