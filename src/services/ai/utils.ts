
import { ModelErrorType } from './types';
import { toast } from "@/hooks/use-toast";

// Utility functions shared across AI services

// Function to identify the type of error based on the message
export function identifyErrorType(error: any): ModelErrorType {
  const errorMessage = error?.message || String(error);
  
  if (errorMessage.includes('network') || 
      errorMessage.includes('fetch') || 
      errorMessage.includes('connection')) {
    return ModelErrorType.NETWORK;
  }
  
  if (errorMessage.includes('memory') || 
      errorMessage.includes('allocation') || 
      errorMessage.includes('out of memory')) {
    return ModelErrorType.MEMORY;
  }
  
  if (errorMessage.includes('browser') || 
      errorMessage.includes('not supported') || 
      errorMessage.includes('compatibility')) {
    return ModelErrorType.COMPATIBILITY;
  }
  
  if (errorMessage.includes('timeout') || 
      errorMessage.includes('time out') || 
      errorMessage.includes('timed out')) {
    return ModelErrorType.TIMEOUT;
  }
  
  return ModelErrorType.UNKNOWN;
}

// Function to get a user-friendly error message
export function getUserFriendlyErrorMessage(errorType: ModelErrorType): string {
  switch (errorType) {
    case ModelErrorType.NETWORK:
      return "Error de conexión al cargar el modelo. Verifica tu conexión a internet.";
    case ModelErrorType.MEMORY:
      return "No hay suficiente memoria para cargar el modelo. Cierra otras aplicaciones e intenta nuevamente.";
    case ModelErrorType.COMPATIBILITY:
      return "Tu navegador puede no ser compatible con este modelo. Intenta con Chrome o Edge actualizados.";
    case ModelErrorType.TIMEOUT:
      return "El tiempo de carga del modelo ha excedido el límite. La conexión puede ser lenta.";
    case ModelErrorType.UNKNOWN:
    default:
      return "Ha ocurrido un error inesperado al cargar el modelo.";
  }
}

// Calculate similarity between embeddings (cosine similarity)
export function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  try {
    // Implementación robusta de similitud coseno
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }
    
    // Prevenir división por cero
    if (norm1 === 0 || norm2 === 0) return 0;
    
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  } catch (error) {
    console.error('Error al calcular similitud:', error);
    return 0; // En caso de error, devolvemos la similitud mínima
  }
}

// Function for tracking and analyzing errors (telemetry)
export function trackEmbeddingError(error: any): void {
  // Here we would implement telemetry data sending
  // For now we just log to console
  console.log('Error de embedding para análisis:', {
    timestamp: new Date().toISOString(),
    errorMessage: error instanceof Error ? error.message : String(error),
    errorStack: error instanceof Error ? error.stack : undefined,
    browserInfo: navigator.userAgent
  });
}

// Show toast notification
export function showToast(title: string, description: string, variant: "default" | "destructive" = "default") {
  toast({
    title,
    description,
    variant
  });
}
