import type { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: (active: boolean) => ReactNode;
}

// Data Structures
export type Mood = 'Positive' | 'Negative' | 'Neutral';

export interface FullJournalEntry {
  id: string;
  date: string;
  type: 'journal';
  text: string;
  summary: string;
  mood: Mood;
  emotions: string[];
}

export interface MoodCheckIn {
    id: string;
    date: string;
    type: 'mood';
    mood: Mood;
    moodIcon: string;
}

export interface LifestyleLog {
    id: string;
    date: string;
    type: 'lifestyle';
    sleep: number; // hours
    activity: number; // 1-5 scale
    stress: number; // 1-5 scale
}

export type LogEntry = FullJournalEntry | MoodCheckIn | LifestyleLog;

// Chat
export type ChatMessage = {
  id: string;
  role: 'user' | 'model';
} & ({
  type: 'text';
  text: string;
} | {
  type: 'playlist';
  playlists: YouTubePlaylist[];
});

export type Persona = 'Motivator' | 'Listener' | 'Mentor' | 'Media Finder';

// Gamification
export interface GamificationStats {
    currentStreak: number;
    longestStreak: number;
    totalJournalEntries: number;
}

// Wellness Tools
export interface YouTubePlaylist {
    title: string;
    query: string;
}
