import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import { recommendYouTubePlaylists } from '../../services/geminiService';
import { Mood, YouTubePlaylist } from '../../types';

const YouTubeRecommender: React.FC = () => {
    const [recommendations, setRecommendations] = useState<YouTubePlaylist[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecommendations = async (mood: Mood) => {
        setIsLoading(true);
        setRecommendations([]);
        const results = await recommendYouTubePlaylists(mood);
        setRecommendations(results);
        setIsLoading(false);
    }

    return (
        <Card>
            <h3 className="text-lg font-semibold mb-2">Mindful Media</h3>
            <p className="text-text-secondary mb-4">Find YouTube playlists tailored to your current mood.</p>
            <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="secondary" onClick={() => fetchRecommendations('Positive')} disabled={isLoading}>Uplifting</Button>
                <Button variant="secondary" onClick={() => fetchRecommendations('Neutral')} disabled={isLoading}>Calming</Button>
                <Button variant="secondary" onClick={() => fetchRecommendations('Negative')} disabled={isLoading}>Soothing</Button>
            </div>
            {isLoading && <Loader text="Finding playlists for you..." />}
            {recommendations.length > 0 && (
                <div className="mt-4 space-y-3">
                    {recommendations.map((playlist, index) => (
                        <a
                            key={index}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(playlist.query)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-base-200 hover:bg-base-300 rounded-lg transition-colors group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary mr-4">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium text-text-primary group-hover:text-primary">{playlist.title}</span>
                        </a>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default YouTubeRecommender;
