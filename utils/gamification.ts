import { LogEntry, GamificationStats, FullJournalEntry } from '../types';

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

export function calculateGamificationStats(entries: LogEntry[]): GamificationStats {
    const journalEntries = entries.filter((e): e is FullJournalEntry => e.type === 'journal');
    const totalJournalEntries = journalEntries.length;

    if (totalJournalEntries === 0) {
        return { currentStreak: 0, longestStreak: 0, totalJournalEntries: 0 };
    }
    
    const uniqueDays = [...new Set(journalEntries.map(e => new Date(new Date(e.date).toDateString()).getTime()))]
        .sort((a, b) => b - a);
    
    if (uniqueDays.length === 0) {
        return { currentStreak: 0, longestStreak: 0, totalJournalEntries: 0 };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    
    const today = new Date(new Date().toDateString());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (uniqueDays[0] === today.getTime() || uniqueDays[0] === yesterday.getTime()) {
        currentStreak = 1;
        let lastDate = new Date(uniqueDays[0]);

        for (let i = 1; i < uniqueDays.length; i++) {
            const currentDate = new Date(uniqueDays[i]);
            const expectedPrevious = new Date(lastDate);
            expectedPrevious.setDate(lastDate.getDate() - 1);

            if (isSameDay(currentDate, expectedPrevious)) {
                currentStreak++;
            } else {
                break;
            }
            lastDate = currentDate;
        }
    }

    let tempStreak = 0;
    if (uniqueDays.length > 0) {
        tempStreak = 1;
        longestStreak = 1;
        let lastDate = new Date(uniqueDays[0]);
        for (let i = 1; i < uniqueDays.length; i++) {
            const currentDate = new Date(uniqueDays[i]);
            const expectedPrevious = new Date(lastDate);
            expectedPrevious.setDate(lastDate.getDate() - 1);
            if(isSameDay(currentDate, expectedPrevious)) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
            }
            lastDate = currentDate;
        }
    }


    return { currentStreak, longestStreak, totalJournalEntries };
}
