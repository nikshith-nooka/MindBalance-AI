import React from 'react';
import { LogEntry, FullJournalEntry, MoodCheckIn, LifestyleLog } from '../../types';
import JournalEntryCard from './JournalEntryCard';
import Card from '../ui/Card';

const MoodCheckInCard: React.FC<{ entry: MoodCheckIn }> = ({ entry }) => (
    <Card className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <span className="text-4xl">{entry.moodIcon}</span>
            <div>
                <p className="font-semibold">Mood Check-in</p>
                <p className="text-sm text-text-secondary">{entry.mood}</p>
            </div>
        </div>
        <p className="text-sm text-text-secondary">
            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
    </Card>
);

const LifestyleLogCard: React.FC<{ entry: LifestyleLog }> = ({ entry }) => (
    <Card>
         <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold">Lifestyle Log</p>
                <p className="text-sm text-text-secondary">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
            </div>
            <div className="flex gap-4 text-sm text-center">
                <div>😴 <span className="font-medium">{entry.sleep}</span>h</div>
                <div>🏃 <span className="font-medium">{entry.activity}</span>/5</div>
                <div>🧘 <span className="font-medium">{entry.stress}</span>/5</div>
            </div>
        </div>
    </Card>
);


interface LogListProps {
  entries: LogEntry[];
}

const LogList: React.FC<LogListProps> = ({ entries }) => {
  const renderEntry = (entry: LogEntry) => {
    switch(entry.type) {
      case 'journal':
        return <JournalEntryCard key={entry.id} entry={entry} />;
      case 'mood':
        return <MoodCheckInCard key={entry.id} entry={entry} />;
      case 'lifestyle':
        return <LifestyleLogCard key={entry.id} entry={entry} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
      {entries.length === 0 ? (
        <p className="text-text-secondary text-center py-8">Your activity log is empty. Check in with your mood or write a journal entry to get started!</p>
      ) : (
        <div className="space-y-4">
          {entries.map(renderEntry)}
        </div>
      )}
    </div>
  );
};

export default LogList;
