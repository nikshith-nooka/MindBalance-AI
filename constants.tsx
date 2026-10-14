import React from 'react';
import type { NavItem, Persona, Mood } from './types';

// Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ChatIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const InsightsIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const WellnessIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
  </svg>
);


// Navigation
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: (active) => <HomeIcon active={active} /> },
  { id: 'chat', label: 'Companion', icon: (active) => <ChatIcon active={active} /> },
  { id: 'insights', label: 'Insights', icon: (active) => <InsightsIcon active={active} /> },
  { id: 'wellness', label: 'Wellness', icon: (active) => <WellnessIcon active={active} /> },
];

// Chat Personas
export const PERSONA_SYSTEM_INSTRUCTIONS: Record<Persona, string> = {
  Listener: 'You are an empathetic and non-judgmental AI companion. Your primary role is to listen actively, validate the user\'s feelings, and create a safe space for them to express themselves. Avoid giving unsolicited advice. Use reflective listening techniques.',
  Motivator: 'You are an energetic and encouraging AI coach. Your goal is to inspire and motivate the user. Use positive affirmations, celebrate their small wins, and help them see their strengths. Be upbeat but not dismissive of their struggles.',
  Mentor: 'You are a wise and thoughtful AI mentor. You offer gentle guidance and perspective. Help the user explore their thoughts and feelings more deeply by asking insightful questions. You can suggest frameworks for thinking about problems, like CBT or mindfulness, but always as a suggestion, not a directive.',
  'Media Finder': 'You are a helpful media recommendation assistant. Your sole purpose is to analyze the user\'s message and suggest relevant YouTube playlists. You must not engage in conversation. Your response must be only the JSON object conforming to the schema, with no additional text or explanation.'
};

// Crisis Detection
export const CRISIS_KEYWORDS: string[] = [
  'kill myself', 'suicide', 'want to die', 'end my life', 'hopeless', 'no reason to live',
  'self-harm', 'cutting myself', 'hurt myself', 'overdose'
];

export const CRISIS_HELPLINE_MESSAGE = "It sounds like you are going through a very difficult time. Please know that there is support available. You can connect with people who can support you by calling or texting 988 anytime in the US and Canada. In the UK, you can call 111. These services are free, confidential, and available 24/7. Please reach out for help.";

// Moods for check-in
export const MOOD_OPTIONS: { mood: Mood; icon: string; label: string }[] = [
    { mood: 'Positive', icon: '😊', label: 'Happy' },
    { mood: 'Positive', icon: '😁', label: 'Excited' },
    { mood: 'Positive', icon: '😌', label: 'Calm' },
    { mood: 'Negative', icon: '😢', label: 'Sad' },
    { mood: 'Negative', icon: '😠', label: 'Angry' },
    { mood: 'Negative', icon: '😟', label: 'Anxious' },
    { mood: 'Neutral', icon: '😐', label: 'Neutral' },
    { mood: 'Neutral', icon: '🤔', label: 'Thinking' },
];
