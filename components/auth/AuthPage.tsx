import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AuthPageProps {
  onLogin: (username: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-emerald-50 p-4">
      <Card className="max-w-sm w-full">
        <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
                <svg className="h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-text-primary">MindBalance AI</h1>
            </div>
          <p className="text-text-secondary">Your personalized mental wellness companion.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-1">
              Enter your name to begin
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., Alex"
              className="w-full px-3 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login / Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
