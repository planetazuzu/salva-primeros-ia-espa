
import React, { useState } from 'react';
import { AIMode, ModelLoadingStatus } from '../types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Settings, Server, Brain, Bot, Cpu } from 'lucide-react';
import ModelSelectorForm from './ModelSelectorForm';

interface AIModelSelectorProps {
  currentMode: AIMode;
  onChangeMode: (mode: AIMode) => void;
  modelLoadingStatus: ModelLoadingStatus;
  testOllamaConnection: () => Promise<void>;
  ollamaServerUrl: string;
  setOllamaServerUrl: (url: string) => void;
  ollamaModelName: string;
  setOllamaModelName: (name: string) => void;
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({
  currentMode,
  onChangeMode,
  modelLoadingStatus,
  testOllamaConnection,
  ollamaServerUrl,
  setOllamaServerUrl,
  ollamaModelName,
  setOllamaModelName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (values: { mode: AIMode }) => {
    onChangeMode(values.mode);
    setIsOpen(false);
  };

  const renderCurrentModeIcon = () => {
    switch (currentMode) {
      case 'openai': return <Bot className="mr-2 h-4 w-4" />;
      case 'huggingface': return <Brain className="mr-2 h-4 w-4" />;
      case 'ollama': return <Server className="mr-2 h-4 w-4" />;
      case 'simulado': return <Cpu className="mr-2 h-4 w-4" />;
    }
  };

  const getCurrentModeLabel = () => {
    switch (currentMode) {
      case 'openai': return 'Usando OpenAI';
      case 'huggingface': return 'Usando Hugging Face (Local)';
      case 'ollama': return 'Usando Ollama (Servidor local)';
      case 'simulado': return 'Usando respuestas simuladas';
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button 
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center"
      >
        {renderCurrentModeIcon()}
        {getCurrentModeLabel()}
        <Settings className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecciona el Motor de IA</DialogTitle>
            <DialogDescription>
              Elige el modelo de IA que deseas utilizar para generar las respuestas.
            </DialogDescription>
          </DialogHeader>

          <ModelSelectorForm
            currentMode={currentMode}
            onSubmit={handleSubmit}
            modelLoadingStatus={modelLoadingStatus}
            ollamaServerUrl={ollamaServerUrl}
            setOllamaServerUrl={setOllamaServerUrl}
            ollamaModelName={ollamaModelName}
            setOllamaModelName={setOllamaModelName}
            testOllamaConnection={testOllamaConnection}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIModelSelector;
