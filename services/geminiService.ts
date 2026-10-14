import { GoogleGenAI, Type, Chat } from "@google/genai";
import { FullJournalEntry, Mood, Persona, LogEntry, MoodCheckIn, YouTubePlaylist } from '../types';
import { PERSONA_SYSTEM_INSTRUCTIONS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const journalResponseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A concise, empathetic summary of the user's journal entry in 2-3 sentences.",
        },
        mood: {
            type: Type.STRING,
            enum: ['Positive', 'Negative', 'Neutral'],
            description: "The dominant overall mood of the entry."
        },
        emotions: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "A list of 3-5 specific emotions detected in the text (e.g., 'anxious', 'grateful', 'frustrated')."
        },
    },
    required: ["summary", "mood", "emotions"]
};

const youtubeResponseSchema = {
    type: Type.OBJECT,
    properties: {
        playlists: {
            type: Type.ARRAY,
            description: "A list of 3 YouTube playlist ideas.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A catchy, descriptive title for the playlist suggestion.",
                     },
                    query: {
                        type: Type.STRING,
                        description: "A specific, effective search query for YouTube to find this type of playlist."
                    }
                },
                required: ["title", "query"]
            }
        }
    },
    required: ["playlists"],
};


export async function analyzeJournalEntry(text: string): Promise<Omit<FullJournalEntry, 'id' | 'date' | 'text' | 'type'>> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following journal entry. Be insightful and empathetic. \n\nENTRY:\n"""${text}"""`,
            config: {
                responseMimeType: "application/json",
                responseSchema: journalResponseSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text;
        if (!jsonText) {
            throw new Error("API response for journal analysis was empty.");
        }
        const result = JSON.parse(jsonText.trim());

        return {
            summary: result.summary || "Could not generate summary.",
            mood: result.mood || "Neutral",
            emotions: result.emotions || [],
        };
    } catch (error) {
        console.error("Error analyzing journal entry:", error);
        return {
            summary: "There was an issue analyzing your entry. Please try again.",
            mood: "Neutral",
            emotions: [],
        };
    }
}

export function createChatSession(persona: Persona): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: PERSONA_SYSTEM_INSTRUCTIONS[persona],
            temperature: 0.8,
        },
    });
}

export async function generateWellnessTip(mood: Mood): Promise<string> {
    try {
        const prompt = `Based on a user feeling generally '${mood}', provide a short, actionable wellness tip or a simple mindfulness exercise. Make it encouraging and easy to do right now.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
                maxOutputTokens: 150,
            }
        });
        return response.text?.trim() || "Take a deep breath in, and slowly let it out. You are doing great.";
    } catch (error) {
        console.error("Error generating wellness tip:", error);
        return "Take a deep breath in, and slowly let it out. You are doing great.";
    }
}

export async function generateDailyPrompt(entries: LogEntry[]): Promise<string> {
    try {
        const recentMoods = entries
            .filter((e): e is FullJournalEntry | MoodCheckIn => e.type === 'journal' || e.type === 'mood')
            .slice(0, 5)
            .map(e => e.mood);

        const prompt = `Based on these recent moods (${recentMoods.join(', ') || 'no recent moods'}), generate a single, gentle, and insightful journal prompt for today. The prompt should be concise and open-ended, encouraging reflection. Don't greet the user.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { temperature: 0.8, maxOutputTokens: 100 }
        });
        return response.text?.trim() || "What is one thing you are grateful for today?";
    } catch (error) {
        console.error("Error generating daily prompt:", error);
        return "What is one thing you are grateful for today?";
    }
}

export async function generateWellnessReport(entries: LogEntry[]): Promise<string> {
    try {
        const dataSummary = JSON.stringify(entries.slice(0, 30).map(e => {
            if (e.type === 'journal') return { type: e.type, date: e.date, mood: e.mood, emotions: e.emotions };
            return e;
        }));

        const prompt = `Analyze the following user log data. Provide a short, kind, and actionable wellness report in markdown format. Identify one or two key patterns (e.g., "It seems your mood is often higher on days with more activity") and offer a gentle suggestion. The tone should be supportive, not clinical. Keep it under 150 words.\n\nDATA:\n${dataSummary}`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { temperature: 0.6, maxOutputTokens: 300 }
        });
        return response.text?.trim() || "Could not generate your report at this time. Keep tracking your progress, you're doing great!";
    } catch (error) {
        console.error("Error generating wellness report:", error);
        return "Could not generate your report at this time. Keep tracking your progress, you're doing great!";
    }
}

export async function reframeNegativeThought(thought: string): Promise<string> {
    try {
        const prompt = `A user is experiencing a negative thought: "${thought}". Using principles of Cognitive Behavioral Therapy (CBT), offer 2-3 alternative, more balanced perspectives in a list format. Frame it as "An alternative way to think about this could be..." or similar gentle phrasing. Be empathetic and supportive.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { temperature: 0.7, maxOutputTokens: 250 }
        });
        return response.text?.trim() || "It's understandable to feel that way. Sometimes, just noticing the thought without judgment can be a powerful step.";
    } catch (error) {
        console.error("Error reframing thought:", error);
        return "It's understandable to feel that way. Sometimes, just noticing the thought without judgment can be a powerful step.";
    }
}

export async function recommendYouTubePlaylists(mood: Mood): Promise<YouTubePlaylist[]> {
    try {
        const prompt = `Based on a user feeling generally '${mood}', generate a list of 3 diverse YouTube playlist ideas to support their mood. For each idea, provide a short, appealing title and a specific, effective YouTube search query.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: youtubeResponseSchema,
                temperature: 0.8,
            }
        });
        
        const jsonText = response.text;
        if (!jsonText) {
            return [];
        }
        const result = JSON.parse(jsonText.trim());

        return result.playlists || [];
    } catch (error) {
        console.error("Error recommending YouTube playlists:", error);
        return [];
    }
}

export async function getChatYouTubeRecommendations(message: string): Promise<YouTubePlaylist[]> {
    try {
        const prompt = `Analyze the user's message and generate a list of 3 diverse YouTube playlist ideas to support their mood or request. For each idea, provide a short, appealing title and a specific, effective YouTube search query. User Message: "${message}"`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: youtubeResponseSchema,
                temperature: 0.8,
            }
        });
        
        const jsonText = response.text;
        if (!jsonText) {
            return [];
        }
        const result = JSON.parse(jsonText.trim());

        return result.playlists || [];
    } catch (error) {
        console.error("Error recommending YouTube playlists for chat:", error);
        return [];
    }
}
