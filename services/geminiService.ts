import { GoogleGenAI } from "@google/genai";

// FIX: Initialized GoogleGenAI directly with process.env.API_KEY as per coding guidelines.
// The guidelines state to assume the API key is always available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHabitSuggestion = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are a friendly and encouraging habit coach for young people. Keep your advice positive, short (2-3 paragraphs max), and actionable. Use markdown for formatting like bolding and lists.",
            temperature: 0.7,
            topP: 1,
            topK: 32,
        },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the API.");
    }

    return text.trim();
  } catch (error) {
    console.error("Error fetching suggestion from Gemini API:", error);
    throw new Error("Failed to get a suggestion from the AI coach.");
  }
};
