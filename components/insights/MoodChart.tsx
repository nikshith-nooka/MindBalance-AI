import React from 'react';
import { FullJournalEntry, Mood, MoodCheckIn } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MoodChartProps {
  data: (FullJournalEntry | MoodCheckIn)[];
}

const moodToValue = (mood: Mood): number => {
  switch (mood) {
    case 'Positive': return 1;
    case 'Neutral': return 0;
    case 'Negative': return -1;
    default: return 0;
  }
};

const valueToMood = (value: number): string => {
  if (value === 1) return 'Positive';
  if (value === -1) return 'Negative';
  return 'Neutral';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-lg">
        <p className="label">{`Date: ${label}`}</p>
        <p className="intro" style={{color: payload[0].stroke}}>{`Mood: ${valueToMood(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};


const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const chartData = data
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      moodValue: moodToValue(entry.mood),
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis 
            domain={[-1.1, 1.1]} 
            ticks={[-1, 0, 1]}
            tickFormatter={(tick) => valueToMood(tick)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="moodValue" name="Mood" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;
