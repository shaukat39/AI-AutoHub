
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isCreatorMode: boolean;
  onToggleCreatorMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isCreatorMode, onToggleCreatorMode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white italic">A</div>
            <span className="text-xl font-bold tracking-tight">AI<span className="text-indigo-500">Auto</span>Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#workflows" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Workflows</a>
            <button 
              onClick={onToggleCreatorMode}
              className={`text-sm font-medium transition-colors ${isCreatorMode ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              {isCreatorMode ? 'Exit Creator Mode' : 'Creator Mode'}
            </button>
          </nav>
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
            Contact Me
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-950 border-t border-gray-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs">A</div>
              <span className="font-bold">AIAutoHub</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Building the future of business through intelligent automation and agentic workflows.
            </p>
          </div>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
          <p className="text-gray-600 text-xs">
            &copy; 2024 AI Automation Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
