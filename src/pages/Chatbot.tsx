import React, { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AIMode } from '@/services/ai/types';
import { ModelLoadingStatus } from '@/services/ai/types';
import ChatInterface from '@/components/chatbot/ChatInterface';
import AIModelSelector from '@/components/chatbot/ModelSelector';
import { initHuggingFaceService } from '@/services/ai/huggingface';
import { testOllamaConnection } from '@/services/ai/ollamaService';
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

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
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
