
import React from 'react';
import { Workflow } from '../types';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: (workflow: Workflow) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {
  return (
    <div 
      className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
      onClick={() => onClick(workflow)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={workflow.imageUrl} 
          alt={workflow.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider">
            {workflow.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{workflow.title}</h3>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {workflow.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            {workflow.nodesCount} Nodes
          </div>
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${
              workflow.complexity === 'Simple' ? 'bg-blue-500' : 
              workflow.complexity === 'Medium' ? 'bg-orange-500' : 'bg-red-500'
            }`}></span>
            {workflow.complexity}
          </div>
        </div>
      </div>
    </div>
  );
};
