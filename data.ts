
import { Workflow } from './types';

export const WORKFLOWS: Workflow[] = [
  {
    id: '1',
    title: 'AI Customer Support Agent',
    shortDescription: 'Multi-lingual customer support agent using GPT-4 and Vector Databases.',
    fullDescription: 'This workflow connects your Intercom or Zendesk to a custom RAG (Retrieval-Augmented Generation) pipeline. It uses n8n to orchestrate the flow: receiving webhooks, querying Pinecone for knowledge base context, generating a response via OpenAI, and posting back to the customer service platform.',
    category: 'AI Agents',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1200',
    nodesCount: 12,
    complexity: 'Advanced',
    tags: ['OpenAI', 'Pinecone', 'Intercom', 'Webhooks']
  },
  {
    id: '2',
    title: 'Automated SEO Blog Generator',
    shortDescription: 'Generate SEO-optimized blog posts from keywords using Gemini API.',
    fullDescription: 'A comprehensive pipeline that takes a primary keyword, generates a content outline, creates full-length articles, finds relevant images, and publishes directly to WordPress or Ghost. It includes a human-in-the-loop approval step via Slack.',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    nodesCount: 8,
    complexity: 'Medium',
    tags: ['Gemini', 'WordPress', 'Slack', 'SEO']
  },
  {
    id: '3',
    title: 'Lead Enrichment Pipeline',
    shortDescription: 'Automatically enrich new CRM leads with LinkedIn and financial data.',
    fullDescription: 'Triggered by a new lead in HubSpot, this workflow uses Apollo.io and Clearbit APIs to find detailed contact and company information. It then uses an LLM to categorize the lead and draft a personalized outreach email.',
    category: 'Business Ops',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    nodesCount: 15,
    complexity: 'Advanced',
    tags: ['HubSpot', 'Apollo', 'LLM', 'Data Analysis']
  },
  {
    id: '4',
    title: 'Voice-to-Task Automation',
    shortDescription: 'Transcribe voice memos and turn them into structured project tasks.',
    fullDescription: 'Connects your mobile audio recorder (via Telegram or WhatsApp) to Notion and Linear. Uses Whisper for transcription and Gemini for extracting action items, deadlines, and project tags from natural speech.',
    category: 'Business Ops',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1200',
    nodesCount: 6,
    complexity: 'Medium',
    tags: ['Whisper', 'Notion', 'Linear', 'Transcription']
  }
];
