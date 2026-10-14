
import React, { useState } from 'react';
import { FullJournalEntry, Mood } from '../../types';
import Card from '../ui/Card';

interface JournalEntryCardProps {
  entry: FullJournalEntry;
}

const moodColors: Record<Mood, { bg: string; text: string; border: string }> = {
  Positive: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  Negative: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
  Neutral: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
};

const MoodBadge: React.FC<{ mood: Mood }> = ({ mood }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${moodColors[mood].bg} ${moodColors[mood].text}`}>
    {mood}
  </span>
);

const EmotionTag: React.FC<{ emotion: string }> = ({ emotion }) => (
    <span className="bg-sky-100 text-sky-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
        {emotion}
    </span>
);

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`border-l-4 ${moodColors[entry.mood].border}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-text-secondary">
            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <MoodBadge mood={entry.mood} />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-sky-600 text-sm font-semibold"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-text-primary">AI Reflection</h3>
        <p className="text-text-secondary italic">"{entry.summary}"</p>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-base-200">
           <h4 className="font-semibold text-text-primary mb-2">Emotions Detected</h4>
           <div className="flex flex-wrap gap-2 mb-4">
                {entry.emotions.map((emotion, index) => (
                    <EmotionTag key={index} emotion={emotion} />
                ))}
            </div>

          <h4 className="font-semibold text-text-primary">Your Entry</h4>
          <p className="text-text-secondary whitespace-pre-wrap">{entry.text}</p>
        </div>
      )}
    </Card>
  );
};

export default JournalEntryCard;
