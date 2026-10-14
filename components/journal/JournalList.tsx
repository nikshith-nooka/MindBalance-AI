
import React from 'react';
import { FullJournalEntry } from '../../types';
import JournalEntryCard from './JournalEntryCard';

interface JournalListProps {
  entries: FullJournalEntry[];
}

const JournalList: React.FC<JournalListProps> = ({ entries }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Past Reflections</h2>
      {entries.length === 0 ? (
        <p className="text-text-secondary text-center py-8">Your journal is empty. Write your first entry to get started!</p>
      ) : (
        <div className="space-y-4">
          {entries.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalList;
