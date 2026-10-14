import React, { useState, useMemo } from 'react';
import { LogEntry, FullJournalEntry, Mood, MoodCheckIn } from '../../types';
import MoodChart from './MoodChart';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import { generateWellnessReport } from '../../services/geminiService';

interface InsightsPageProps {
  entries: LogEntry[];
}

const InsightsPage: React.FC<InsightsPageProps> = ({ entries }) => {
  const [report, setReport] = useState<string>('');
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
  
  const journalAndMoodEntries = useMemo(() => 
    entries.filter((e): e is FullJournalEntry | MoodCheckIn => e.type === 'journal' || e.type === 'mood'),
    [entries]
  );
  
  const handleGenerateReport = async () => {
    setIsLoadingReport(true);
    setReport('');
    const result = await generateWellnessReport(entries);
    setReport(result);
    setIsLoadingReport(false);
  };

  const allEmotions = journalAndMoodEntries.flatMap(e => (e.type === 'journal' ? e.emotions : []));
  const emotionFrequency = allEmotions.reduce((acc, emotion) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const commonEmotions = Object.entries(emotionFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Your Progress Insights</h2>
      
      {entries.length < 3 ? (
        <Card className="text-center">
          <p className="text-text-secondary">Keep logging your mood and activities to unlock your trends. You need at least 3 entries.</p>
        </Card>
      ) : (
        <>
          <Card>
            <h3 className="text-lg font-semibold mb-4">Mood Trend</h3>
            <div className="h-64">
                <MoodChart data={journalAndMoodEntries} />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card>
                <h4 className="font-semibold mb-2">Common Emotions</h4>
                 {commonEmotions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {commonEmotions.map(([emotion]) => (
                             <span key={emotion} className="bg-violet-100 text-violet-800 text-sm font-medium px-2.5 py-0.5 rounded-full capitalize">
                                {emotion}
                            </span>
                        ))}
                    </div>
                 ) : <p className="text-sm text-text-secondary">No emotions logged yet.</p>}
            </Card>
            <Card>
                <h4 className="font-semibold mb-2">Total Activity Logs</h4>
                <p className="text-3xl font-bold text-primary">{entries.length}</p>
            </Card>
          </div>

           <Card>
                <h3 className="text-lg font-semibold mb-2">AI Wellness Report</h3>
                <p className="text-text-secondary mb-4">Get a personalized summary of your recent activity and moods.</p>
                <Button onClick={handleGenerateReport} isLoading={isLoadingReport} disabled={isLoadingReport}>
                    Generate My Report
                </Button>
                {isLoadingReport && <Loader text="Analyzing your progress..."/>}
                {report && (
                    <div className="mt-4 p-4 bg-violet-50 border-l-4 border-primary rounded-r-lg prose prose-sm max-w-none">
                        <p dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
                    </div>
                )}
            </Card>
        </>
      )}
    </div>
  );
};

export default InsightsPage;
