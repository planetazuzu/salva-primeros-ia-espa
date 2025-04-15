
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('PERPLEXITY_API_KEY');
    
    // Si no hay API key configurada, devolvemos un error
    if (!apiKey) {
      console.error('PERPLEXITY_API_KEY no está configurada');
      return new Response(
        JSON.stringify({ 
          error: "API key no configurada",
          simulatedResponse: true,
          text: "Lo siento, el servicio de IA no está configurado correctamente. Por favor, contacta con el administrador."
        }),
        { 
          status: 200, // Devolvemos 200 para que la app siga funcionando
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { message, conversationHistory } = await req.json();
    
    // Historia de conversación para contexto
    const messages = [
      {
        role: 'system',
        content: 'Eres un asistente virtual especializado en primeros auxilios. Proporciona información clara, concisa y médicamente precisa. Para emergencias graves, siempre recomienda llamar a los servicios de emergencia. No inventes información médica y sé honesto cuando no sepas algo. Responde siempre en español.'
      }
    ];

    // Añadimos el historial de conversación
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Añadimos el mensaje actual
    messages.push({
      role: 'user',
      content: message
    });

    console.log('Enviando consulta a Perplexity: ', message);
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Perplexity:', errorData);
      throw new Error(`Error de API: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta recibida de Perplexity');
    
    return new Response(
      JSON.stringify({ 
        text: data.choices[0].message.content,
        simulatedResponse: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error en función perplexity-chat:', error);
    
    // Si hay un error, devolvemos una respuesta simulada para que la app siga funcionando
    return new Response(
      JSON.stringify({
        simulatedResponse: true,
        error: error.message,
        text: "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta de nuevo más tarde."
      }),
      { 
        status: 200, // Devolvemos 200 para que la app siga funcionando
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
