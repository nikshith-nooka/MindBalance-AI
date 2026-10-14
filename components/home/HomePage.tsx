import React, { useState, useEffect, useMemo } from 'react';
import { LogEntry, GamificationStats, MoodCheckIn, LifestyleLog } from '../../types';
import JournalEditor from './JournalEditor';
import LogList from './LogList';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOOD_OPTIONS } from '../../constants';
import { calculateGamificationStats } from '../../utils/gamification';
import { generateDailyPrompt } from '../../services/geminiService';

interface HomePageProps {
  logEntries: LogEntry[];
  addEntry: (entry: LogEntry) => void;
}

const GamificationTracker: React.FC<{ stats: GamificationStats }> = ({ stats }) => (
    <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg">
            <div className="font-bold text-2xl">{stats.currentStreak} 🔥</div>
            <div className="text-sm">Current Streak</div>
        </div>
        <div className="bg-violet-50 text-violet-800 p-3 rounded-lg">
            <div className="font-bold text-2xl">{stats.longestStreak} 🏆</div>
            <div className="text-sm">Longest Streak</div>
        </div>
    </div>
);

const MoodCheckin: React.FC<{ onCheckIn: (mood: MoodCheckIn) => void }> = ({ onCheckIn }) => {
    return (
        <Card>
            <h3 className="font-bold text-center mb-4">Quick Check-in</h3>
            <div className="grid grid-cols-4 gap-2">
                {MOOD_OPTIONS.map(({ mood, icon, label }) => (
                    <button key={label} onClick={() => onCheckIn({ id: new Date().toISOString(), date: new Date().toISOString(), type: 'mood', mood, moodIcon: icon })} className="flex flex-col items-center p-2 rounded-lg hover:bg-base-200 transition-colors text-center">
                        <span className="text-3xl">{icon}</span>
                        <span className="text-xs mt-1 text-text-secondary">{label}</span>
                    </button>
                ))}
            </div>
        </Card>
    )
}

const LifestyleTracker: React.FC<{ onLog: (log: LifestyleLog) => void }> = ({ onLog }) => {
    const [sleep, setSleep] = useState(7);
    const [activity, setActivity] = useState(3);
    const [stress, setStress] = useState(3);

    const handleLog = () => {
        onLog({
            id: new Date().toISOString(),
            date: new Date().toISOString(),
            type: 'lifestyle',
            sleep,
            activity,
            stress,
        });
    };

    return (
        <Card>
            <h3 className="font-bold mb-4">Lifestyle Log</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary">Sleep: {sleep} hours</label>
                    <input type="range" min="0" max="12" step="0.5" value={sleep} onChange={(e) => setSleep(Number(e.target.value))} className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary">Activity Level: {activity}/5</label>
                    <input type="range" min="1" max="5" value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary">Stress Level: {stress}/5</label>
                    <input type="range" min="1" max="5" value={stress} onChange={(e) => setStress(Number(e.target.value))} className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
             <div className="flex justify-end mt-4">
                <Button onClick={handleLog}>Log Lifestyle</Button>
            </div>
        </Card>
    );
}

const HomePage: React.FC<HomePageProps> = ({ logEntries, addEntry }) => {
  const [dailyPrompt, setDailyPrompt] = useState('');
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);

  const gamificationStats = useMemo(() => calculateGamificationStats(logEntries), [logEntries]);

  useEffect(() => {
    generateDailyPrompt(logEntries)
      .then(setDailyPrompt)
      .finally(() => setIsLoadingPrompt(false));
  }, [logEntries]);

  return (
    <div className="space-y-6">
      <GamificationTracker stats={gamificationStats} />

      <Card>
        <h3 className="font-bold mb-2">Daily Prompt</h3>
        {isLoadingPrompt ? (
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
        ) : (
            <p className="text-text-secondary italic">"{dailyPrompt}"</p>
        )}
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
          <MoodCheckin onCheckIn={addEntry} />
          <LifestyleTracker onLog={addEntry} />
      </div>

      <JournalEditor addEntry={addEntry} dailyPrompt={dailyPrompt} />
      <LogList entries={logEntries} />
    </div>
  );
};

export default HomePage;
