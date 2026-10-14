import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import { reframeNegativeThought } from '../../services/geminiService';

const CognitiveReframingTool: React.FC = () => {
    const [thought, setThought] = useState('');
    const [reframe, setReframe] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReframe = async () => {
        if (!thought.trim()) return;
        setIsLoading(true);
        setReframe('');
        const result = await reframeNegativeThought(thought);
        setReframe(result);
        setIsLoading(false);
    };

    return (
        <Card>
            <h3 className="text-lg font-semibold mb-2">Cognitive Reframing</h3>
            <p className="text-text-secondary mb-4">Challenge negative thoughts by finding alternative perspectives. Enter a thought that's bothering you.</p>
            <div className="space-y-4">
                <textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="e.g., I'll never be good enough."
                    className="w-full p-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
                    disabled={isLoading}
                />
                <div className="flex justify-end">
                    <Button onClick={handleReframe} isLoading={isLoading} disabled={!thought.trim() || isLoading}>
                        Find a New Perspective
                    </Button>
                </div>
            </div>
            {isLoading && <Loader text="Finding alternative views..." />}
            {reframe && (
                <div className="mt-4 p-4 bg-violet-50 border-l-4 border-primary rounded-r-lg prose prose-sm max-w-none">
                     <p dangerouslySetInnerHTML={{ __html: reframe.replace(/\n/g, '<br />') }} />
                </div>
            )}
        </Card>
    );
};

export default CognitiveReframingTool;
