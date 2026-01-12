
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { WorkflowCard } from './components/WorkflowCard';
import { WorkflowModal } from './components/WorkflowModal';
import { AIAssistant } from './components/AIAssistant';
import { WorkflowForm } from './components/WorkflowForm';
import { WORKFLOWS as INITIAL_WORKFLOWS } from './data';
import { Workflow } from './types';

const App: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(INITIAL_WORKFLOWS);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Persistence to local storage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_workflows');
    if (saved) {
      setWorkflows(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_workflows', JSON.stringify(workflows));
  }, [workflows]);

  const categories = ['All', ...new Set(workflows.map(w => w.category))];
  
  const filteredWorkflows = filter === 'All' 
    ? workflows 
    : workflows.filter(w => w.category === filter);

  const handleSaveWorkflow = (wf: Workflow) => {
    setWorkflows(prev => {
      const exists = prev.find(item => item.id === wf.id);
      if (exists) {
        return prev.map(item => item.id === wf.id ? wf : item);
      }
      return [wf, ...prev];
    });
    setShowForm(false);
    setEditingWorkflow(null);
  };

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('Delete this workflow?')) {
      setWorkflows(prev => prev.filter(w => w.id !== id));
    }
  };

  const handleEditWorkflow = (wf: Workflow) => {
    setEditingWorkflow(wf);
    setShowForm(true);
  };

  const handleExportData = () => {
    const code = `import { Workflow } from './types';\n\nexport const WORKFLOWS: Workflow[] = ${JSON.stringify(workflows, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert('TS Code copied to clipboard! Paste it into your data.ts file.');
  };

  const handleDownloadData = () => {
    const code = `import { Workflow } from './types';\n\nexport const WORKFLOWS: Workflow[] = ${JSON.stringify(workflows, null, 2)};`;
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout isCreatorMode={isCreatorMode} onToggleCreatorMode={() => setIsCreatorMode(!isCreatorMode)}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-semibold text-indigo-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
            Available for new projects
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">Intelligent Automations</span> <br /> that scale your impact.
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Specializing in agentic n8n workflows, custom LLM integrations, and robust data pipelines to eliminate manual work and boost efficiency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95">
              Explore Workflows
            </button>
            <button className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-full font-bold transition-all active:scale-95">
              View Github
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="workflows" className="max-w-7xl mx-auto px-4 py-20 scroll-mt-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Workflows</h2>
            <p className="text-gray-400 max-w-xl">
              A curated selection of n8n automations designed to solve real-world business challenges.
            </p>
          </div>
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            {isCreatorMode && (
              <div className="flex flex-wrap gap-2 justify-end">
                 <button 
                  onClick={() => { setEditingWorkflow(null); setShowForm(true); }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  New Workflow
                </button>
                <button 
                  onClick={handleDownloadData}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-green-600/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Save data.ts
                </button>
                <button 
                  onClick={handleExportData}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  Copy TS Code
                </button>
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat 
                      ? 'bg-white text-black' 
                      : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkflows.map(workflow => (
            <div key={workflow.id} className="relative group/card">
              <WorkflowCard 
                workflow={workflow} 
                onClick={(w) => setSelectedWorkflow(w)} 
              />
              {isCreatorMode && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity z-10 scale-90 group-hover/card:scale-100 duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditWorkflow(workflow); }}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteWorkflow(workflow.id); }}
                    className="p-2.5 bg-red-600/80 hover:bg-red-600 rounded-full shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedWorkflow && (
        <WorkflowModal 
          workflow={selectedWorkflow} 
          onClose={() => setSelectedWorkflow(null)} 
        />
      )}

      {/* Form */}
      {showForm && (
        <WorkflowForm 
          initialData={editingWorkflow}
          onSave={handleSaveWorkflow} 
          onCancel={() => { setShowForm(false); setEditingWorkflow(null); }} 
        />
      )}

      {/* AI Assistant */}
      <AIAssistant workflows={workflows} />
    </Layout>
  );
};

export default App;
