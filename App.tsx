import React, { useState, useEffect } from 'react';
import { NavItem, LogEntry } from './types';
import { NAV_ITEMS } from './constants';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import ChatPage from './components/chat/ChatPage';
import InsightsPage from './components/insights/InsightsPage';
import WellnessPage from './components/wellness/WellnessPage';
import useLocalStorage from './hooks/useLocalStorage';
import AuthPage from './components/auth/AuthPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItem>(NAV_ITEMS[0]);
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>('currentUser', null);
  
  // Use a dynamic key for log entries based on the current user
  // An invalid key is used when logged out to prevent data mismatch.
  const [logEntries, setLogEntries] = useLocalStorage<LogEntry[]>(
    currentUser ? `logEntries_${currentUser}` : '', 
    []
  );

  // Clear log entries when the user logs out
  useEffect(() => {
    if (!currentUser) {
      setLogEntries([]);
    }
  }, [currentUser, setLogEntries]);

  const addLogEntry = (entry: LogEntry) => {
    // Ensure no duplicate entries on fast clicks
    setLogEntries(prevEntries => {
      if (prevEntries.find(e => e.id === entry.id)) return prevEntries;
      return [entry, ...prevEntries];
    });
  };

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab.id) {
      case 'home':
        return <HomePage logEntries={logEntries} addEntry={addLogEntry} />;
      case 'chat':
        return <ChatPage />;
      case 'insights':
        return <InsightsPage entries={logEntries} />;
      case 'wellness':
        return <WellnessPage />;
      default:
        return <HomePage logEntries={logEntries} addEntry={addLogEntry} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} username={currentUser} onLogout={handleLogout}>
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
