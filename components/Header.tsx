import React from 'react';
import { BookOpenIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#0b0f19]/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
             <BookOpenIcon className="h-8 w-8 text-indigo-500"/>
            <a href="/" className="font-serif text-2xl font-bold text-white">
              Book Finder AI
            </a>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <a href="#search" className="text-slate-400 hover:text-indigo-400 transition-colors">Search</a>
            <a href="#recommendations" className="text-slate-400 hover:text-indigo-400 transition-colors">Recommend</a>
          </nav>
        </div>
      </div>
    </header>
  );
};