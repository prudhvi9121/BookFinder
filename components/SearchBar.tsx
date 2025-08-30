import React, { useState, useEffect, useRef } from 'react';
import { Book } from '../types';
import { SearchIcon } from './Icons';
import { Loader } from './Loader';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  suggestions: Book[];
  isLoading: boolean;
  isSuggesting: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange, onSearch, suggestions, isLoading, isSuggesting }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
        onSearch(suggestions[activeIndex].title);
    } else {
        onSearch(query);
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestionTitle: string) => {
    onQueryChange(suggestionTitle);
    onSearch(suggestionTitle);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    setShowSuggestions(query.length > 2 && suggestions.length > 0);
  }, [suggestions, query]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    }
  };

  return (
    <div className="relative max-w-xl mx-auto" ref={containerRef}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., The Lord of the Rings"
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            disabled={isLoading}
            autoComplete="off"
          />
          {isSuggesting && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader /></div>}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          <SearchIcon className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">{isLoading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>
      {showSuggestions && (
        <ul className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((book, index) => (
            <li
              key={book.key}
              className={`px-4 py-2 cursor-pointer ${
                index === activeIndex ? 'bg-indigo-600' : 'hover:bg-slate-700'
              }`}
              onClick={() => handleSuggestionClick(book.title)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-slate-400">{book.author_name?.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};