import { Book } from '../types';

const API_BASE_URL = 'https://openlibrary.org/search.json';

export const searchBooks = async (query: string): Promise<Book[]> => {
  const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,cover_i&limit=20`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.docs as Book[];
};

export const getSearchSuggestions = async (query: string): Promise<Book[]> => {
  if (!query) return [];
  const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&fields=key,title,author_name&limit=5`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok for suggestions');
  }
  const data = await response.json();
  return data.docs as Book[];
};