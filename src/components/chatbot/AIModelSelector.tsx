
import React, { useState } from 'react';
import { Info, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AIMode, ModelLoadingStatus } from './types';

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
  setOllamaModelName
}) => {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
      <div 
        className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
          currentMode === 'openai' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-green-50'
        }`}
        onClick={() => onChangeMode('openai')}
      >
        <Info className="h-3 w-3 mr-1" />
        OpenAI (ChatGPT)
      </div>
      <div 
        className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
          currentMode === 'huggingface' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
        }`}
        onClick={() => onChangeMode('huggingface')}
      >
        <Info className="h-3 w-3 mr-1" />
        Modelo Local {modelLoadingStatus.isLoading && "(Cargando...)"}
      </div>
      <div 
        className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
          currentMode === 'ollama' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800 hover:bg-purple-50'
        }`}
        onClick={() => onChangeMode('ollama')}
      >
        <Info className="h-3 w-3 mr-1" />
        Ollama (Servidor)
      </div>
      <div 
        className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
          currentMode === 'simulado' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'
        }`}
        onClick={() => onChangeMode('simulado')}
      >
        <Info className="h-3 w-3 mr-1" />
        Respuestas Simuladas
      </div>
      
      {currentMode === 'ollama' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2">
              <Settings className="h-3 w-3 mr-1" />
              Configurar Ollama
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Configuración de Ollama</DialogTitle>
              <DialogDescription>
                Configura la conexión a tu servidor local de Ollama
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="server-url" className="text-right">
                  URL del servidor
                </Label>
                <Input
                  id="server-url"
                  value={ollamaServerUrl}
                  onChange={(e) => setOllamaServerUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model-name" className="text-right">
                  Nombre del modelo
                </Label>
                <Input
                  id="model-name"
                  value={ollamaModelName}
                  onChange={(e) => setOllamaModelName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={testOllamaConnection}>Probar conexión</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AIModelSelector;
