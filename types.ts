
export interface Workflow {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'AI Agents' | 'Data Extraction' | 'Business Ops' | 'Marketing';
  imageUrl: string;
  nodesCount: number;
  complexity: 'Simple' | 'Medium' | 'Advanced';
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
