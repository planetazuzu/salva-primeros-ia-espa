
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { saveUserQuery } from './simulatedService';

export const generateOpenAiResponse = async (
  message: string,
  conversationHistory: Array<{sender: string, text: string}> = []
): Promise<string> => {
  try {
    // Guardamos la consulta para análisis
    saveUserQuery(message);
    
    const response = await supabase.functions.invoke('perplexity-chat', {
      body: { message, conversationHistory }
    });

    if (response.error) {
      console.error('Error al invocar la función de Supabase:', response.error);
      toast({
        title: 'Error al comunicarse con la IA',
        description: 'No se pudo procesar tu consulta. Por favor, intenta de nuevo más tarde.',
        variant: 'destructive'
      });
      throw new Error(response.error.message || 'Error al procesar la consulta');
    }

    const data = response.data as { text: string; simulatedResponse: boolean; error?: string };
    
    if (data.error) {
      console.error('Error devuelto por la función:', data.error);
      throw new Error(data.error);
    }

    return data.text;
  } catch (error) {
    console.error('Error en openaiService:', error);
    throw error;
  }
};
