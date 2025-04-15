
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

export type AIMode = 'simulado' | 'openai' | 'huggingface' | 'ollama';

export interface ModelLoadingStatus {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}
