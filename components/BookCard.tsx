import React from 'react';
import { Book } from '../types';
import { BookIcon } from './Icons';

interface BookCardProps {
  book: Book;
}

const BookCardContent: React.FC<BookCardProps> = ({ book }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
    : null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-md hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="h-48 bg-slate-700/30 flex items-center justify-center overflow-hidden">
        {coverUrl ? (
          <img src={coverUrl} alt={`Cover for ${book.title}`} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <BookIcon className="h-16 w-16 text-slate-500" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-white mb-1 leading-tight">{book.title}</h3>
        <p className="text-sm text-slate-400 mb-2 flex-grow">
          {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
        </p>
        {book.first_publish_year && (
          <p className="text-xs text-slate-500 mt-auto">First published in {book.first_publish_year}</p>
        )}
      </div>
    </div>
  );
}

export const BookCard: React.FC<BookCardProps> = React.memo(BookCardContent);