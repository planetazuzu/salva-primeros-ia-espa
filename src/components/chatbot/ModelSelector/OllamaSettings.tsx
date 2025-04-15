
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OllamaSettingsProps {
  serverUrl: string;
  setServerUrl: (url: string) => void;
  modelName: string;
  setModelName: (name: string) => void;
  testConnection: () => Promise<void>;
}

const OllamaSettings: React.FC<OllamaSettingsProps> = ({
  serverUrl,
  setServerUrl,
  modelName,
  setModelName,
  testConnection
}) => {
  return (
    <div className="space-y-3 p-4 border rounded-md">
      <h3 className="text-sm font-medium">Configuración de Ollama</h3>
      
      <div className="space-y-2">
        <Label htmlFor="ollamaServerUrl">URL del servidor de Ollama</Label>
        <Input 
          id="ollamaServerUrl" 
          value={serverUrl} 
          onChange={(e) => setServerUrl(e.target.value)} 
          placeholder="http://localhost:11434"
        />
        <p className="text-xs text-muted-foreground">
          Por defecto, Ollama se ejecuta en http://localhost:11434
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ollamaModelName">Nombre del modelo</Label>
        <Input 
          id="ollamaModelName" 
          value={modelName} 
          onChange={(e) => setModelName(e.target.value)} 
          placeholder="mediachat"
        />
        <p className="text-xs text-muted-foreground">
          Nombre del modelo que deseas utilizar (por ejemplo: llama2, mistral, mediachat)
        </p>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={(e) => {
          e.preventDefault();
          testConnection();
        }}
      >
        Probar conexión
      </Button>
    </div>
  );
};

export default OllamaSettings;
