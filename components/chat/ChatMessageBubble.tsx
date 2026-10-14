
import React from 'react';
import { ChatMessage, YouTubePlaylist } from '../../types';

interface ChatMessageProps {
  message: ChatMessage;
}

const PlaylistBubble: React.FC<{ playlists: YouTubePlaylist[] }> = ({ playlists }) => {
    return (
        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-base-200 text-text-primary rounded-bl-lg">
            <p className="font-semibold text-sm mb-2">Here are some playlists I found for you:</p>
            <div className="space-y-2">
                {playlists.map((playlist, index) => (
                    <a
                        key={index}
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(playlist.query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 bg-white hover:bg-violet-50 rounded-lg transition-colors group border border-base-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary mr-3 flex-shrink-0">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-text-primary group-hover:text-primary">{playlist.title}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

const ChatMessageBubble: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (message.type === 'playlist') {
      return (
          <div className="flex justify-start animate-fade-in">
              <PlaylistBubble playlists={message.playlists} />
          </div>
      )
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-primary text-white rounded-br-lg'
            : 'bg-base-200 text-text-primary rounded-bl-lg'
        }`}
      >
        <p className="text-sm break-words">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
