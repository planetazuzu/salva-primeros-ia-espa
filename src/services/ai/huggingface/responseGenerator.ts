import { showToast } from '../utils';
import { embeddingPipeline, generationPipeline } from './modelLoader';
import { findRelevantKnowledge } from './knowledgeBase';

/**
 * Generate a response using the local model
 */
export async function generateLocalResponse(
  userMessage: string,
  messages: Array<{sender: string, text: string}>
): Promise<string> {
  if (!embeddingPipeline || !generationPipeline) {
    throw new Error('El modelo no está cargado. Por favor, inicializa el modelo primero.');
  }
  
  try {
    showToast("Generando respuesta local", "Procesando tu consulta...");
    
    // Generate embedding for the user query
    const queryOutput = await embeddingPipeline(userMessage, { pooling: 'mean', normalize: true });
    const queryEmbedding = Array.from(queryOutput.data) as number[];
    
    // Find the most similar knowledge
    const bestMatch = findRelevantKnowledge(queryEmbedding);
    
    // If we have a good match (similarity > 0.6) use it as context
    let response = "";
    if (bestMatch) {
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
