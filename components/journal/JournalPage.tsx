
import React from 'react';
import { FullJournalEntry } from '../../types';
import JournalEditor from './JournalEditor';
import JournalList from './JournalList';

interface JournalPageProps {
  entries: FullJournalEntry[];
  addEntry: (entry: FullJournalEntry) => void;
}

const JournalPage: React.FC<JournalPageProps> = ({ entries, addEntry }) => {
  return (
    <div className="space-y-8">
      <JournalEditor addEntry={addEntry} />
      <JournalList entries={entries} />
    </div>
  );
};

export default JournalPage;
