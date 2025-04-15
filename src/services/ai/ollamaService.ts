
import { showToast } from './utils';

// Function to test connection to Ollama server
export const testOllamaConnection = async (serverUrl = 'http://localhost:11434', modelName = 'mediachat') => {
  try {
    const response = await fetch(`${serverUrl}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the requested model is available
    const modelExists = data.models?.some(model => model.name === modelName);
    
    if (modelExists) {
      showToast("Conexión con Ollama exitosa", `Servidor conectado y modelo "${modelName}" disponible`);
    } else {
      showToast("Conexión con Ollama exitosa", `Servidor conectado, pero el modelo "${modelName}" no está disponible. Considera ejecutar: ollama pull ${modelName}`, "warning");
    }
    
    return true;
  } catch (error) {
    console.error('Error al conectar con Ollama:', error);
    showToast("Error de conexión con Ollama", `No se pudo conectar al servidor en ${serverUrl}. Verifica que Ollama esté en ejecución.`, "destructive");
    return false;
  }
};

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
