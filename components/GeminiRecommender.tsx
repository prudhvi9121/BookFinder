import React, { useState } from 'react';
import { RecommendedBook } from '../types';
import { Loader } from './Loader';
import { SparklesIcon, LightBulbIcon } from './Icons';

interface GeminiRecommenderProps {
  onRecommend: (prompt: string) => void;
  recommendations: RecommendedBook[];
  isLoading: boolean;
  error: string | null;
}

const RecommendationCard: React.FC<{ book: RecommendedBook }> = ({ book }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/50">
        <h4 className="font-bold text-purple-400">{book.title}</h4>
        <p className="text-sm text-slate-400 mb-2">by {book.author}</p>
        <p className="text-sm text-slate-300 italic">"{book.reason}"</p>
    </div>
);


export const GeminiRecommender: React.FC<GeminiRecommenderProps> = ({ onRecommend, recommendations, isLoading, error }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecommend(prompt);
  };
  
  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    onRecommend(examplePrompt);
  };

  return (
    <div className="bg-black/20 p-6 md:p-8 rounded-xl shadow-inner border border-slate-800">
      <div className="flex items-center justify-center gap-3 mb-4">
        <SparklesIcon className="h-8 w-8 text-purple-500" />
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-white">AI Book Recommender</h2>
      </div>
      <p className="text-center text-slate-400 mb-6">
        Can't decide what to read? Ask our AI for recommendations based on a book, author, or genre!
      </p>
      
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Books like Dune' or 'Classic detective novels'"
          className="flex-grow px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : <LightBulbIcon className="h-5 w-5" />}
          <span className="ml-2 hidden sm:inline">{isLoading ? 'Thinking...' : 'Recommend'}</span>
        </button>
      </form>
      
      {(!isLoading && recommendations.length === 0 && !error) && (
         <div className="text-center text-sm text-slate-400">
            <p className="mb-2">Or try an example:</p>
            <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => handleExampleClick('High fantasy with dragons')} className="px-3 py-1 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">High fantasy with dragons</button>
                <button onClick={() => handleExampleClick('Isaac Asimov')} className="px-3 py-1 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">Isaac Asimov</button>
                <button onClick={() => handleExampleClick('Modern sci-fi for beginners')} className="px-3 py-1 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">Modern sci-fi for beginners</button>
            </div>
        </div>
      )}

      {isLoading && <div className="flex justify-center"><Loader /></div>}
      {error && <p className="text-center text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-lg max-w-xl mx-auto">{error}</p>}
      
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto">
          {recommendations.map((book, index) => (
            <RecommendationCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};