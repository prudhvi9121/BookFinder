import React, { useState, useCallback, useEffect } from 'react';
import { Book, RecommendedBook } from './types';
import { searchBooks, getSearchSuggestions } from './services/openLibraryService';
import { getRecommendations } from './services/geminiService';
import { SearchBar } from './components/SearchBar';
import { BookList } from './components/BookList';
import { GeminiRecommender } from './components/GeminiRecommender';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBook[]>([]);
  const [isRecommending, setIsRecommending] = useState<boolean>(false);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);
  
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsSuggesting(true);
      try {
        const results = await getSearchSuggestions(searchQuery);
        setSuggestions(results);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
        setSuggestions([]);
      } finally {
        setIsSuggesting(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);


  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setBooks([]);
      setError(null);
      return;
    }
    setSearchQuery(query);
    setSuggestions([]);
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      if (results.length === 0) {
        setError('No books found for your query. Please try a different title or author.');
      }
      setBooks(results);
    } catch (err) {
      setError('Failed to fetch books. Please check your network connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetRecommendations = useCallback(async (prompt: string) => {
    if (!prompt) {
        setRecommendedBooks([]);
        setRecommendationError(null);
        return;
    }
    setIsRecommending(true);
    setRecommendationError(null);
    setRecommendedBooks([]);
    try {
      const recommendations = await getRecommendations(prompt);
      setRecommendedBooks(recommendations);
    } catch (err) {
      setRecommendationError('Could not get recommendations. The AI might be busy, please try again later.');
      console.error(err);
    } finally {
      setIsRecommending(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <section id="search" className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2 text-white">Find Your Next Read</h2>
            <p className="text-center text-slate-400 mb-6">Search for books by title, author, or keyword.</p>
            <SearchBar 
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSearch={handleSearch}
              suggestions={suggestions}
              isLoading={isLoading}
              isSuggesting={isSuggesting}
            />
          </section>

          <section id="results" className="mb-12">
            {error && <p className="text-center text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">{error}</p>}
            <BookList books={books} isLoading={isLoading} />
          </section>

          <div className="border-t border-slate-700 my-12"></div>

          <section id="recommendations">
            <GeminiRecommender 
              onRecommend={handleGetRecommendations} 
              recommendations={recommendedBooks}
              isLoading={isRecommending}
              error={recommendationError}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;