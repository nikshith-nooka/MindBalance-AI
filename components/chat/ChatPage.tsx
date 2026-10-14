
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { Persona } from '../../types';

const PersonaSelector: React.FC<{ selected: Persona; onSelect: (persona: Persona) => void; disabled: boolean }> = ({ selected, onSelect, disabled }) => {
  const personas: Persona[] = ['Listener', 'Motivator', 'Mentor', 'Media Finder'];
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-4">
      {personas.map(p => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          disabled={disabled}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors disabled:opacity-50 ${
            selected === p ? 'bg-primary text-white' : 'bg-white hover:bg-base-200 text-text-primary'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};


const ChatPage: React.FC = () => {
    const [persona, setPersona] = useState<Persona>('Listener');
    const [isChatActive, setIsChatActive] = useState(false);
    const [key, setKey] = useState(Date.now()); // Used to reset chat window

    const handlePersonaChange = (newPersona: Persona) => {
        setPersona(newPersona);
        // Reset the chat window when persona changes during an active chat
        if (isChatActive) {
            setKey(Date.now()); 
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)]">
            <h2 className="text-xl font-bold text-text-primary mb-2 text-center">Emotional Companion</h2>
            <p className="text-text-secondary mb-4 text-center">Choose a persona and start a conversation.</p>
            <PersonaSelector selected={persona} onSelect={handlePersonaChange} disabled={isChatActive} />
            <ChatWindow key={key} persona={persona} onChatStateChange={setIsChatActive} />
        </div>
    );
};

export default ChatPage;
