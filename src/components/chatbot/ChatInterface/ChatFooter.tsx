
import React from 'react';
import { MessageCircle, Bot, Brain, Server, Cpu } from 'lucide-react';
import { AIMode } from '../types';

interface ChatFooterProps {
  aiMode: AIMode;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ aiMode }) => {
  const renderAIInfo = () => {
    switch (aiMode) {
      case 'openai':
        return (
          <>
            <Bot className="h-3 w-3 mr-1" />
            <span>Utilizando OpenAI para generar respuestas. Las respuestas se procesan en la nube.</span>
          </>
        );
      case 'huggingface':
        return (
          <>
            <Brain className="h-3 w-3 mr-1" />
            <span>Utilizando modelo de IA local. Las respuestas se procesan en tu navegador.</span>
          </>
        );
      case 'ollama':
        return (
          <>
            <Server className="h-3 w-3 mr-1" />
            <span>Utilizando tu servidor Ollama local para generar respuestas.</span>
          </>
        );
      case 'simulado':
      default:
        return (
          <>
            <Cpu className="h-3 w-3 mr-1" />
            <span>Utilizando respuestas predefinidas. La información proporcionada es solo educativa. En emergencias reales, llama a los servicios de emergencia.</span>
          </>
        );
    }
  };

  return (
    <div className="px-4 pb-3 text-xs text-gray-500 flex items-center">
      <MessageCircle className="h-3 w-3 mr-1" />
      {renderAIInfo()}
    </div>
  );
};

export default ChatFooter;
