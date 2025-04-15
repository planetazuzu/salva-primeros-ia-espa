import { pipeline, env } from '@huggingface/transformers';
import { ModelStatus, ModelErrorType, ModelLoadingStatus } from './types';
import { identifyErrorType, getUserFriendlyErrorMessage, calculateSimilarity, trackEmbeddingError, showToast } from './utils';

// Initialize model state
let modelStatus: ModelStatus = {
  isLoaded: false,
  isLoading: false,
  error: null,
  errorType: null,
  lastAttempt: null,
  retryCount: 0
};

// Store for embeddings used in retrieval
let knowledgeEmbeddings: Array<{text: string, embedding: number[]}> = [];

// Configuration options
env.cacheDir = './models-cache';
env.allowLocalModels = true;

// References to the pipelines
let embeddingPipeline: any = null;
let generationPipeline: any = null;

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
    
    // Load sample knowledge for retrieval
    await loadSampleKnowledge();
    
    console.log('Modelos cargados correctamente');
    
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
    
    throw error;
  }
}

/**
 * Load sample knowledge for demonstration purposes
 */
async function loadSampleKnowledge(): Promise<void> {
  // Basic knowledge for retrieval
  const firstAidKnowledge = [
    "Para realizar la RCP correctamente, coloca tus manos en el centro del pecho de la víctima, mantén los brazos rectos y presiona con fuerza y rapidez, al menos 5 cm de profundidad y a un ritmo de 100-120 compresiones por minuto.",
    
    "La maniobra de Heimlich se realiza colocándote detrás de la persona, rodeando su cintura con tus brazos, haciendo un puño con una mano y colocándolo ligeramente por encima del ombligo, sujetando el puño con la otra mano y presionando hacia dentro y hacia arriba con movimientos rápidos.",
    
    "Para tratar una quemadura leve, enfría la zona afectada con agua corriente a temperatura ambiente durante 10-20 minutos, no apliques hielo, retira anillos u objetos ajustados, cubre con un vendaje estéril, y toma analgésicos si es necesario para el dolor.",
    
    "Para detener una hemorragia nasal, siéntate e inclina ligeramente la cabeza hacia adelante, presiona la parte blanda de la nariz con el pulgar y el índice durante al menos 10-15 minutos sin interrupciones, y respira por la boca.",
    
    "La posición lateral de seguridad (PLS) es recomendada para personas inconscientes que respiran normalmente. Ayuda a mantener las vías respiratorias abiertas y previene la aspiración en caso de vómito."
  ];
  
  if (!embeddingPipeline) {
    console.error('No se puede cargar conocimiento porque el modelo no está inicializado');
    return;
  }
  
  // Compute embeddings for each knowledge piece
  for (const text of firstAidKnowledge) {
    try {
      const output = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
      const embedding = Array.from(output.data);
      knowledgeEmbeddings.push({ text, embedding });
    } catch (error) {
      console.error('Error al calcular embedding para:', text, error);
    }
  }
  
  console.log(`Cargado conocimiento de ejemplo: ${knowledgeEmbeddings.length} entradas`);
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

/**
 * Generate a response using the local model
 */
export async function generateLocalResponse(
  userMessage: string,
  messages: Array<{sender: string, text: string}>
): Promise<string> {
  if (!modelStatus.isLoaded || !embeddingPipeline || !generationPipeline) {
    throw new Error('El modelo no está cargado. Por favor, inicializa el modelo primero.');
  }
  
  try {
    showToast("Generando respuesta local", "Procesando tu consulta...");
    
    // Generate embedding for the user query
    const queryOutput = await embeddingPipeline(userMessage, { pooling: 'mean', normalize: true });
    const queryEmbedding = Array.from(queryOutput.data);
    
    // Find the most similar knowledge
    let bestMatch = null;
    let highestSimilarity = -1;
    
    for (const knowledge of knowledgeEmbeddings) {
      const similarity = calculateSimilarity(queryEmbedding, knowledge.embedding);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = knowledge;
      }
    }
    
    // If we have a good match (similarity > 0.6) use it as context
    let response = "";
    if (bestMatch && highestSimilarity > 0.6) {
      response = `Según la información de primeros auxilios: ${bestMatch.text}`;
    } else {
      // Otherwise, use the generation model directly (will be more limited)
      // Create a prompt from the conversation history
      let prompt = "Conversación sobre primeros auxilios:\n";
      
      // Add the last few messages for context
      const relevantMessages = messages.slice(-5);
      for (const msg of relevantMessages) {
        prompt += `${msg.sender === 'user' ? 'Pregunta' : 'Respuesta'}: ${msg.text}\n`;
      }
      
      // Add the current query
      prompt += `Pregunta: ${userMessage}\nRespuesta:`;
      
      // Generate a response
      const output = await generationPipeline(prompt, {
        max_new_tokens: 100,
        temperature: 0.7
      });
      
      response = output[0].generated_text;
      
      // Clean up the response to extract just the assistant's reply
      response = response.split("Respuesta:").pop() || "";
      response = response.trim();
    }
    
    showToast("Respuesta generada localmente", "El modelo local ha procesado tu consulta");
    
    return response || "Lo siento, no puedo generar una respuesta relevante con el modelo local. Intenta ser más específico o usa otro modo de IA.";
    
  } catch (error) {
    console.error('Error al generar respuesta local:', error);
    showToast("Error al generar respuesta", "No se pudo procesar tu consulta con el modelo local", "destructive");
    throw error;
  }
}
