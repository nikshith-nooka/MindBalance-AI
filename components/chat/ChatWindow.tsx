
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Persona } from '../../types';
import { createChatSession, getChatYouTubeRecommendations } from '../../services/geminiService';
import ChatMessageBubble from './ChatMessageBubble';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { CRISIS_KEYWORDS, CRISIS_HELPLINE_MESSAGE } from '../../constants';
import type { Chat } from '@google/genai';


interface ChatWindowProps {
    persona: Persona;
    onChatStateChange: (isActive: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ persona, onChatStateChange }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
    const chatSession = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatSession.current = createChatSession(persona);
        setMessages([]);
        onChatStateChange(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [persona]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSend = async () => {
        if (!input.trim()) return;
        
        const lowercasedInput = input.toLowerCase();
        if (CRISIS_KEYWORDS.some(keyword => lowercasedInput.includes(keyword))) {
            setIsCrisisModalOpen(true);
            return;
        }

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', type: 'text', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        onChatStateChange(true);

        if (persona === 'Media Finder') {
            try {
                const playlists = await getChatYouTubeRecommendations(userMessage.text);
                if (playlists.length > 0) {
                    const modelMessage: ChatMessage = { id: Date.now().toString(), role: 'model', type: 'playlist', playlists };
                    setMessages(prev => [...prev, modelMessage]);
                } else {
                    const errorMessage: ChatMessage = { id: Date.now().toString(), role: 'model', type: 'text', text: "I couldn't find any specific playlists for that, but you can try searching for 'calming music'." };
                    setMessages(prev => [...prev, errorMessage]);
                }
            } catch (error) {
                console.error("Media Finder error:", error);
                const errorMessage: ChatMessage = { id: Date.now().toString(), role: 'model', type: 'text', text: "I'm having trouble finding media right now. Please try again later." };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        } else { // Conversational personas
            if (!chatSession.current) return;
            try {
                const stream = await chatSession.current.sendMessageStream({ message: input });
                
                let modelResponse = '';
                const modelMessageId = Date.now().toString();
                // Add a placeholder message that will be updated
                setMessages(prev => [...prev, { id: modelMessageId, role: 'model', type: 'text', text: '' }]);

                for await (const chunk of stream) {
                    modelResponse += chunk.text;
                    setMessages(prev => prev.map(msg => 
                        msg.id === modelMessageId && msg.type === 'text'
                            ? { ...msg, text: modelResponse } 
                            : msg
                    ));
                }
            } catch (error) {
                console.error("Chat error:", error);
                const errorMessage: ChatMessage = { id: Date.now().toString(), role: 'model', type: 'text', text: "I'm having trouble connecting right now. Please try again later." };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Card className="flex-grow flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
                {messages.map((msg) => (
                    <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                 {isLoading && (
                    <ChatMessageBubble message={{ id: 'loader', role: 'model', type: 'text', text: '...' }} />
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center space-x-2 border-t border-base-200 pt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    disabled={isLoading}
                />
                <Button onClick={handleSend} isLoading={isLoading}>
                    Send
                </Button>
            </div>
            <Modal 
                isOpen={isCrisisModalOpen} 
                onClose={() => setIsCrisisModalOpen(false)} 
                title="Important: Please Reach Out for Help"
            >
                <p className="text-text-secondary">{CRISIS_HELPLINE_MESSAGE}</p>
            </Modal>
        </Card>
    );
};

export default ChatWindow;
