import React from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { Loader } from './Loader';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-md animate-pulse">
        <div className="h-48 bg-slate-700"></div>
        <div className="p-4">
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-slate-700 rounded w-1/4 mt-auto"></div>
        </div>
    </div>
);


export const BookList: React.FC<BookListProps> = ({ books, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};