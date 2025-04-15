
import { env, pipeline } from '@huggingface/transformers';
import { ModelStatus, ModelErrorType, ModelLoadingStatus } from '../types';
import { identifyErrorType, trackEmbeddingError, showToast } from '../utils';

// Initialize model state
let modelStatus: ModelStatus = {
  isLoaded: false,
  isLoading: false,
  error: null,
  errorType: null,
  lastAttempt: null,
  retryCount: 0
};

// References to the pipelines
export let embeddingPipeline: any = null;
export let generationPipeline: any = null;

// Configuration options
env.cacheDir = './models-cache';
env.allowLocalModels = true;

/**
 * Initialize the embedding model for local use
 */
export async function initEmbeddingModel(): Promise<void> {
  if (modelStatus.isLoading) return;
  
  try {
    modelStatus = { 
      ...modelStatus, 
      isLoading: true, 
      error: null, 
      errorType: null 
    };
    
    // Load the embedding model
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    
    // Load a small text generation model for answering queries
    generationPipeline = await pipeline(
      'text-generation',
      'Xenova/distilgpt2'
    );
    
    // Update model status
    modelStatus = {
      isLoaded: true,
      isLoading: false,
      error: null,
      errorType: null,
      lastAttempt: new Date(),
      retryCount: 0
    };
    
    console.log('Modelos cargados correctamente');
    showToast("Modelo cargado", "El modelo de IA local ha sido cargado correctamente");
    
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
    
    const errorType = identifyErrorType(error);
    
    modelStatus = {
      isLoaded: false,
      isLoading: false,
      error: error instanceof Error ? error.message : String(error),
      errorType,
      lastAttempt: new Date(),
      retryCount: modelStatus.retryCount + 1
    };
    
    // Capture error for further analysis
    trackEmbeddingError(error);
    showToast("Error al cargar el modelo", "No se pudo cargar el modelo de IA local", "destructive");
    
    throw error;
  }
}

/**
 * Get the current status of the model
 */
export function getModelStatus(): ModelLoadingStatus {
  return {
    isLoaded: modelStatus.isLoaded,
    isLoading: modelStatus.isLoading,
    error: modelStatus.error
  };
}
