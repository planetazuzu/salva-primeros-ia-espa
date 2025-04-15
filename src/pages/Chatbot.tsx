
import React, { useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { AIMode } from '@/services/ai/types';
import { ModelLoadingStatus } from '@/services/ai/types';
import ChatInterface from '@/components/chatbot/ChatInterface';
import AIModelSelector from '@/components/chatbot/ModelSelector';
import { initHuggingFaceService, generateLocalResponse } from '@/services/ai/huggingface';
import { testOllamaConnection, generateOllamaResponse } from '@/services/ai/ollamaService';
import { generateSimulatedResponse } from '@/services/ai/simulatedService';
import { generateOpenAiResponse } from '@/services/ai/openaiService';
import { Message } from '@/components/chatbot/types';

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiMode, setAiMode] = useState<AIMode>('simulado');
  const [modelLoadingStatus, setModelLoadingStatus] = useState<ModelLoadingStatus>({
    isLoading: false,
    isLoaded: false,
    error: null
  });
  const [ollamaServerUrl, setOllamaServerUrl] = useState<string>('http://localhost:11434');
  const [ollamaModelName, setOllamaModelName] = useState<string>('mediachat');

  const loadHuggingFaceModel = useCallback(async () => {
    try {
      setModelLoadingStatus(prev => ({ ...prev, isLoading: true }));
      await initHuggingFaceService();
      setModelLoadingStatus({ isLoading: false, isLoaded: true, error: null });
      setAiMode('huggingface');
    } catch (error) {
      setModelLoadingStatus({ 
        isLoading: false, 
        isLoaded: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }, []);

  const handleChangeAIMode = (mode: AIMode) => {
    switch (mode) {
      case 'huggingface':
        if (!modelLoadingStatus.isLoaded) {
          loadHuggingFaceModel();
        } else {
          setAiMode(mode);
        }
        break;
      case 'ollama':
        testOllamaConnection(ollamaServerUrl, ollamaModelName);
        setAiMode(mode);
        break;
      default:
        setAiMode(mode);
    }
    
    let modeDescription = '';
    switch (mode) {
      case 'openai':
        modeDescription = 'ChatGPT';
        break;
      case 'huggingface':
        modeDescription = 'modelo local gratuito';
        break;
      case 'ollama':
        modeDescription = 'tu servidor Ollama local';
        break;
      case 'simulado':
        modeDescription = 'respuestas predefinidas';
        break;
    }
    
    toast({
      title: `Modo ${mode === 'openai' ? 'OpenAI' : mode === 'huggingface' ? 'Local (Hugging Face)' : mode === 'ollama' ? 'Ollama (Servidor local)' : 'Simulado'} activado`,
      description: `Ahora estás usando ${modeDescription}`,
    });
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      // Generate response based on selected AI mode
      let responseText = '';
      
      switch (aiMode) {
        case 'openai':
          responseText = await generateOpenAiResponse(message, conversationHistory);
          break;
        
        case 'huggingface':
          if (!modelLoadingStatus.isLoaded) {
            throw new Error('El modelo de Hugging Face no está cargado. Por favor, espera a que termine de cargar o selecciona otro modo.');
          }
          responseText = await generateLocalResponse(message, conversationHistory);
          break;
        
        case 'ollama':
          responseText = await generateOllamaResponse(message, conversationHistory, ollamaServerUrl, ollamaModelName);
          break;
        
        case 'simulado':
        default:
          responseText = await generateSimulatedResponse(message);
          break;
      }

      // Add bot response to the chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      
      // If there's an error with the selected mode, fall back to simulated response
      if (aiMode !== 'simulado') {
        toast({
          title: `Error en modo ${aiMode}`,
          description: `Usando respuestas simuladas como alternativa. ${error instanceof Error ? error.message : 'Error desconocido'}`,
          variant: "destructive"
        });
        
        const fallbackResponse = await generateSimulatedResponse(message);
        
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: fallbackResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      } else {
        // If even the simulated mode fails, show a generic error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: type } : msg
    ));
  };

  const testOllamaConnectionHandler = async () => {
    await testOllamaConnection(ollamaServerUrl, ollamaModelName);
  };

  return (
    <div className="flex flex-col h-screen">
      <AIModelSelector 
        currentMode={aiMode} 
        onChangeMode={handleChangeAIMode}
        modelLoadingStatus={modelLoadingStatus}
        testOllamaConnection={testOllamaConnectionHandler}
        ollamaServerUrl={ollamaServerUrl}
        setOllamaServerUrl={setOllamaServerUrl}
        ollamaModelName={ollamaModelName}
        setOllamaModelName={setOllamaModelName}
      />
      <ChatInterface 
        messages={messages}
        loading={loading}
        aiMode={aiMode}
        onSendMessage={handleSendMessage}
        onFeedback={handleFeedback}
      />
    </div>
  );
};

export default Chatbot;
