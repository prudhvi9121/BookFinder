import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-800 mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Book Finder AI. All rights reserved.</p>
        <p className="mt-1">
          Powered by React, Tailwind CSS, Open Library, and Gemini AI.
        </p>
      </div>
    </footer>
  );
};