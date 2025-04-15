
import { loadSampleKnowledge } from './knowledgeBase';
import { initEmbeddingModel } from './modelLoader';

// Initialize and load sample knowledge when model is loaded
export const initHuggingFaceService = async () => {
  await initEmbeddingModel();
  await loadSampleKnowledge();
};

export * from './modelLoader';
export * from './knowledgeBase';
export * from './responseGenerator';
