
import React, { useState } from 'react';
import { FullJournalEntry } from '../../types';
import { analyzeJournalEntry } from '../../services/geminiService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { CRISIS_KEYWORDS, CRISIS_HELPLINE_MESSAGE } from '../../constants';

interface JournalEditorProps {
  addEntry: (entry: FullJournalEntry) => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ addEntry }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Crisis detection
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
      // You could add a user-facing error message here
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
            placeholder="Let your thoughts flow..."
            className="w-full h-40 p-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            disabled={isLoading}
          />
          <div className="flex justify-end">
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
