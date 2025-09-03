
import React, { useState } from 'react';
import { getHabitSuggestion } from '../../services/geminiService';
import { SparklesIcon, PaperAirplaneIcon } from '../icons/Icons';
import { useHabits } from '../../hooks/useHabits';

const AICoachScreen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useHabits();

  const handleGetSuggestion = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuggestion('');

    try {
      const habitsSummary = userData.habits.map(h => `- ${h.name} (Current streak: ${h.streak} days)`).join('\n');
      const fullPrompt = `Based on my current habits:\n${habitsSummary}\n\nHere is my problem: "${prompt}". \n\nGive me some encouraging, actionable, and concise advice. Address me as a friend.`;

      const result = await getHabitSuggestion(fullPrompt);
      setSuggestion(result);
    } catch (err) {
      setError('Sorry, the AI coach is taking a break. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-300">AI Coach</h1>
        <p className="text-gray-400">Stuck? Get a tip from your personal AI coach.</p>
      </div>

      <div className="flex-grow bg-gray-800 rounded-xl p-4 flex flex-col space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center flex-grow">
            <SparklesIcon className="w-8 h-8 text-teal-400 animate-pulse" />
            <p className="ml-2 text-gray-300">Coach is thinking...</p>
          </div>
        )}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {suggestion && (
          <div className="prose prose-invert prose-sm text-gray-200 whitespace-pre-wrap">{suggestion}</div>
        )}
        {!isLoading && !suggestion && !error && (
            <div className="text-center text-gray-500 flex-grow flex flex-col justify-center">
                <p>e.g., "I keep forgetting to exercise in the evening."</p>
                <p>"I lose motivation for studying after a few days."</p>
            </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Tell me what you're struggling with..."
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition resize-none"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={handleGetSuggestion}
          disabled={isLoading || !prompt.trim()}
          className="bg-teal-500 text-white p-3 rounded-full hover:bg-teal-600 transition-transform transform hover:scale-110 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AICoachScreen;
