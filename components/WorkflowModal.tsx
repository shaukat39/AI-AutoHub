
import React, { useState } from 'react';
import { Workflow } from '../types';

interface WorkflowModalProps {
  workflow: Workflow;
  onClose: () => void;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ workflow, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = `Check out this n8n automation: ${workflow.title}`;

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    let url = '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyForSocial = async () => {
    const postText = `🚀 New Automation Workflow: ${workflow.title}\n\n${workflow.shortDescription}\n\n🛠 Tech Stack: ${workflow.tags.join(', ')}\n\nCheck it out here: ${shareUrl}\n\n#n8n #automation #AI #lowcode`;
    
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-950 border border-gray-800 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="md:w-1/2 h-64 md:h-auto relative group">
          <img src={workflow.imageUrl} alt={workflow.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-black/60 px-4 py-2 rounded-full text-xs font-medium">Right-click to copy image</span>
          </div>
        </div>

        <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col">
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase rounded">
              {workflow.category}
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{workflow.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            {workflow.fullDescription}
          </p>

          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {workflow.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-auto">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Share or Manual Post</h4>
               {copied && (
                 <span className="text-[10px] text-green-400 font-bold uppercase animate-pulse">Post text copied!</span>
               )}
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              <button 
                onClick={copyForSocial}
                className={`w-full py-3 ${copied ? 'bg-green-600' : 'bg-indigo-600'} hover:opacity-90 transition-all rounded-xl flex items-center justify-center gap-3 group shadow-lg shadow-indigo-600/10`}
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-sm font-bold">Post Text Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    <span className="text-sm font-bold">Copy Post Text for Manual Share</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-gray-500 text-center">
                Click above to copy the formatted text, then right-click the image to copy it before pasting to LinkedIn or Twitter.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => handleShare('twitter')}
                className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 transition-colors rounded-xl flex items-center justify-center group"
                title="Share on Twitter"
              >
                <svg className="w-4 h-4 fill-current text-gray-400 group-hover:text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 transition-colors rounded-xl flex items-center justify-center group"
                title="Share on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current text-gray-400 group-hover:text-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 transition-colors rounded-xl flex items-center justify-center group"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4 fill-current text-gray-400 group-hover:text-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
