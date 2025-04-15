
export interface KnowledgeSource {
  id: string;
  name: string;
  url: string;
  type: 'website' | 'pdf' | 'text';
  status: 'active' | 'inactive';
  last_synced: string | null;
  sync_interval: number;
}

export interface KnowledgeSourceFormData {
  name: string;
  url: string;
  type: 'website' | 'pdf' | 'text';
  status: 'active' | 'inactive';
  sync_interval: number;
}
