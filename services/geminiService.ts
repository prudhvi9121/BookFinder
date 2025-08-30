
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendedBook } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recommendationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The title of the recommended book.",
      },
      author: {
        type: Type.STRING,
        description: "The author of the recommended book.",
      },
      reason: {
        type: Type.STRING,
        description: "A brief, compelling reason why this book is a good recommendation.",
      },
    },
    required: ["title", "author", "reason"],
  },
};

export const getRecommendations = async (prompt: string): Promise<RecommendedBook[]> => {
  const systemInstruction = `You are a helpful and knowledgeable literary assistant. A user wants book recommendations. Based on their input of a book, author, or genre, provide a list of 5 similar books. Your response must be a JSON array of objects, conforming to the provided schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Based on this topic: "${prompt}", please recommend 5 books.`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: recommendationSchema,
    },
  });

  try {
    const jsonText = response.text.trim();
    const recommendations = JSON.parse(jsonText);
    return recommendations as RecommendedBook[];
  } catch (error) {
    console.error("Failed to parse Gemini response:", response.text, error);
    throw new Error("The AI returned an invalid response. Please try again.");
  }
};
