
import { showToast } from './utils';
import { supabase } from '@/integrations/supabase/client';

// Function to generate responses using OpenAI
export const generateOpenAiResponse = async (
  userMessage: string,
  messages: Array<{sender: string, text: string}>
): Promise<string> => {
  try {
    const conversationHistory = messages.map(m => ({ 
      sender: m.sender, 
      text: m.text 
    }));
    
    const { data, error } = await supabase.functions.invoke('perplexity-chat', {
      body: { 
        message: userMessage,
        conversationHistory: conversationHistory
      }
    });
    
    if (error) {
      console.error('Error al llamar a la función perplexity-chat:', error);
      throw new Error('Error al comunicarse con el servicio de IA');
    }
    
    if (data.simulatedResponse) {
      console.log('Usando respuesta simulada debido a: ', data.error || 'API key no configurada');
      showToast("Usando respuesta simulada", "No se pudo conectar con OpenAI, usando respuestas simuladas", "destructive");
      throw new Error('Usando respuesta simulada');
    }
    
    // Notify success
    showToast("Respuesta generada con OpenAI", "Tu consulta ha sido procesada correctamente");
    
    return data.text;
    
  } catch (error) {
    console.error('Error en generateOpenAiResponse:', error);
    showToast("Error al generar respuesta", "No se pudo conectar con OpenAI", "destructive");
    throw error;
  }
};
