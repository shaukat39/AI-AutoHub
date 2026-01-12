
import React, { useState, useEffect } from 'react';
import { Workflow } from '../types';

interface WorkflowFormProps {
  initialData?: Workflow | null;
  onSave: (workflow: Workflow) => void;
  onCancel: () => void;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Workflow>>({
    title: '',
    category: 'AI Agents',
    shortDescription: '',
    fullDescription: '',
    complexity: 'Medium',
    nodesCount: 5,
    tags: [],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.shortDescription) {
      onSave({
        ...formData,
        id: initialData?.id || Date.now().toString(),
      } as Workflow);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onCancel}></div>
      <form 
        onSubmit={handleSubmit}
        className="relative bg-gray-900 border border-gray-800 w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{initialData ? 'Edit Workflow' : 'Add New n8n Workflow'}</h2>
          <button type="button" onClick={onCancel} className="text-gray-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="space-y-6 overflow-y-auto flex-grow pr-4 custom-scrollbar">
          {/* Screenshot Preview */}
          <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-gray-800 aspect-video bg-gray-950 flex items-center justify-center">
            <img src={formData.imageUrl} className="w-full h-full object-cover opacity-60" alt="Preview" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-xl">
                {formData.imageUrl?.startsWith('data:') ? 'Change Screenshot' : 'Upload Screenshot'}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Supports PNG, JPG, GIF</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Workflow Title</label>
              <input 
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Daily CRM Sync"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
              >
                <option>AI Agents</option>
                <option>Data Extraction</option>
                <option>Business Ops</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Short Description</label>
            <input 
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-all"
              value={formData.shortDescription}
              onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="1 sentence summary for the card"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Description</label>
            <textarea 
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none resize-none focus:border-indigo-500 transition-all"
              value={formData.fullDescription}
              onChange={e => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed explanation of how the workflow operates..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Node Count</label>
              <input 
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-all"
                value={formData.nodesCount}
                onChange={e => setFormData(prev => ({ ...prev, nodesCount: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Complexity</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                value={formData.complexity}
                onChange={e => setFormData(prev => ({ ...prev, complexity: e.target.value as any }))}
              >
                <option>Simple</option>
                <option>Medium</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tech Stack Tags</label>
            <div className="flex gap-2 mb-3">
              <input 
                className="flex-grow bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-all"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Press Enter to add tags (e.g. OpenAI)"
              />
              <button type="button" onClick={handleAddTag} className="bg-indigo-600 px-6 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map(t => (
                <span key={t} className="group px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-[10px] rounded-full uppercase font-bold flex items-center gap-2">
                  {t}
                  <button type="button" onClick={() => removeTag(t)} className="text-gray-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
          <button type="button" onClick={onCancel} className="flex-1 py-3.5 text-gray-400 hover:text-white font-bold transition-colors">Cancel</button>
          <button type="submit" className="flex-1 py-3.5 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
            {initialData ? 'Update & Save changes' : 'Save to Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
};
