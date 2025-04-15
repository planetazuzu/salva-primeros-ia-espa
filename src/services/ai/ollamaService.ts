
import { showToast } from './utils';

// Function to generate responses using Ollama on a local server
export const generateOllamaResponse = async (
  userMessage: string, 
  messages: Array<{sender: string, text: string}>, 
  serverUrl: string,
  modelName: string = 'mediachat'
): Promise<string> => {
  try {
    // Prepare the history in the format expected by Ollama
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
    
    // Add the current user message
    formattedMessages.push({
      role: 'user',
      content: userMessage
    });
    
    // Configure the request to the Ollama API
    const response = await fetch(`${serverUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: formattedMessages,
        stream: false
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error del servidor Ollama: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    
    // Notify success and return response
    showToast("Respuesta generada con Ollama", "Tu servidor local de IA ha procesado la consulta");
    
    return data.message?.content || "No se pudo generar una respuesta con Ollama";
  } catch (error) {
    console.error('Error al generar respuesta con Ollama:', error);
    
    // Notify user of the error
    showToast("Error al conectar con Ollama", "No se pudo conectar con tu servidor local. Verifica que esté en ejecución.", "destructive");
    
    return `Error al conectar con tu servidor Ollama: ${error instanceof Error ? error.message : String(error)}. Verifica que el servidor esté ejecutándose en la URL configurada.`;
  }
};
