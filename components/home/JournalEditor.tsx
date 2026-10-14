import React, { useState, useEffect } from 'react';
import { FullJournalEntry } from '../../types';
import { analyzeJournalEntry } from '../../services/geminiService';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { CRISIS_KEYWORDS, CRISIS_HELPLINE_MESSAGE } from '../../constants';

interface JournalEditorProps {
  addEntry: (entry: FullJournalEntry) => void;
  dailyPrompt: string;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ addEntry, dailyPrompt }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const { isListening, transcript, setTranscript, toggleListening, hasRecognitionSupport } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
        setText(prevText => prevText.trim() ? `${prevText} ${transcript}` : transcript);
        setTranscript('');
    }
  }, [transcript, setTranscript]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const lowercasedText = text.toLowerCase();
    const isCrisis = CRISIS_KEYWORDS.some(keyword => lowercasedText.includes(keyword));
    if (isCrisis) {
      setIsCrisisModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await analyzeJournalEntry(text);
      const newEntry: FullJournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        type: 'journal',
        text,
        ...analysis,
      };
      addEntry(newEntry);
      setText('');
    } catch (error) {
      console.error("Failed to submit journal entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <h2 className="text-xl font-bold text-text-primary mb-4">How are you feeling today?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={dailyPrompt || "Let your thoughts flow..."}
            className="w-full h-40 p-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            {hasRecognitionSupport && (
                <button type="button" onClick={toggleListening} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-base-200 text-text-primary hover:bg-base-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path d="M6 10.5a.75.75 0 01.75.75v1.5a4.5 4.5 0 109 0v-1.5a.75.75 0 011.5 0v1.5a6 6 0 11-12 0v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                </button>
            )}
            <div className="flex-grow"></div>
            <Button type="submit" isLoading={isLoading} disabled={!text.trim() || isLoading}>
              Save & Reflect
            </Button>
          </div>
        </form>
      </Card>
      <Modal 
        isOpen={isCrisisModalOpen} 
        onClose={() => setIsCrisisModalOpen(false)} 
        title="Important: Please Reach Out for Help"
      >
        <p className="text-text-secondary">{CRISIS_HELPLINE_MESSAGE}</p>
      </Modal>
    </>
  );
};

export default JournalEditor;
