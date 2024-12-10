import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900" />
      
      <div className="relative container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full mb-8">
          <Sparkles size={20} />
          <span className="text-sm font-medium">AI-Powered UI/UX Enhancement</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Enhance Your Website's UI/UX with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            AI-Powered Suggestions
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
          Upload your website screenshot and let our AI analyze and recommend improvements
          to create a more engaging and user-friendly experience.
        </p>
        
        <button
          onClick={onGetStarted}
          className="group inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all"
        >
          Get Started
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}