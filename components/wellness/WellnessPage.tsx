import React, { useState } from 'react';
import BreathingExercise from './BreathingExercise';
import CognitiveReframingTool from './CognitiveReframingTool';
import YouTubeRecommender from './YouTubeRecommender';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateWellnessTip } from '../../services/geminiService';
import { Mood } from '../../types';

const WellnessPage: React.FC = () => {
    const [tip, setTip] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchTip = async (mood: Mood) => {
        setIsLoading(true);
        setTip('');
        const newTip = await generateWellnessTip(mood);
        setTip(newTip);
        setIsLoading(false);
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-text-primary">Wellness Tools</h2>
            
            <Card>
                <h3 className="text-lg font-semibold mb-4">Guided Breathing</h3>
                <p className="text-text-secondary mb-6">Focus on your breath. Follow the animation to inhale, hold, and exhale. This simple exercise can help calm your mind and reduce stress.</p>
                <BreathingExercise />
            </Card>

            <CognitiveReframingTool />

            <YouTubeRecommender />

            <Card>
                <h3 className="text-lg font-semibold mb-4">AI-Powered Wellness Tip</h3>
                <p className="text-text-secondary mb-4">How are you feeling right now? Get a personalized tip.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="secondary" onClick={() => fetchTip('Positive')} disabled={isLoading}>Feeling Good</Button>
                    <Button variant="secondary" onClick={() => fetchTip('Neutral')} disabled={isLoading}>Feeling Okay</Button>
                    <Button variant="secondary" onClick={() => fetchTip('Negative')} disabled={isLoading}>Feeling Down</Button>
                </div>
                {isLoading && <p className="text-text-secondary">Generating a tip for you...</p>}
                {tip && (
                    <div className="mt-4 p-4 bg-emerald-50 border-l-4 border-secondary rounded-r-lg">
                        <p className="text-emerald-800">{tip}</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default WellnessPage;
