
// Common types used across AI services
export type AIMode = 'simulado' | 'openai' | 'huggingface' | 'ollama';

export enum ModelErrorType {
  NETWORK = 'network',
  MEMORY = 'memory',
  COMPATIBILITY = 'compatibility',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown'
}

export interface ModelStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  errorType: ModelErrorType | null;
  lastAttempt: Date | null;
  retryCount: number;
}

export interface ModelLoadingStatus {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}
