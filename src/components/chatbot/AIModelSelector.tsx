
import React, { useState } from 'react';
import { AIMode, ModelLoadingStatus } from '@/services/ai';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Server, Brain, Bot, Cpu } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

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

interface FormValues {
  mode: AIMode;
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
  const [isAdvancedSettings, setIsAdvancedSettings] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      mode: currentMode,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onChangeMode(values.mode);
    setIsOpen(false);
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button 
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center"
      >
        {currentMode === 'openai' && <Bot className="mr-2 h-4 w-4" />}
        {currentMode === 'huggingface' && <Brain className="mr-2 h-4 w-4" />}
        {currentMode === 'ollama' && <Server className="mr-2 h-4 w-4" />}
        {currentMode === 'simulado' && <Cpu className="mr-2 h-4 w-4" />}
        
        {currentMode === 'openai' && 'Usando OpenAI'}
        {currentMode === 'huggingface' && 'Usando Hugging Face (Local)'}
        {currentMode === 'ollama' && 'Usando Ollama (Servidor local)'}
        {currentMode === 'simulado' && 'Usando respuestas simuladas'}
        
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="openai" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 flex items-center">
                            <Bot className="mr-2 h-5 w-5" />
                            <div>
                              <div>OpenAI (Online)</div>
                              <div className="text-xs text-muted-foreground">
                                Utiliza los modelos de OpenAI para generar respuestas (requiere conexión a internet)
                              </div>
                            </div>
                          </FormLabel>
                          <Badge variant="outline">Recomendado</Badge>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="simulado" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 flex items-center">
                            <Cpu className="mr-2 h-5 w-5" />
                            <div>
                              <div>Respuestas Simuladas</div>
                              <div className="text-xs text-muted-foreground">
                                Utiliza respuestas predefinidas (no requiere conexión)
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="huggingface" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 flex items-center">
                            <Brain className="mr-2 h-5 w-5" />
                            <div>
                              <div>Hugging Face (Local)</div>
                              <div className="text-xs text-muted-foreground">
                                Utiliza modelos que se ejecutan directamente en tu navegador
                              </div>
                            </div>
                          </FormLabel>
                          {modelLoadingStatus.isLoaded && <Badge variant="outline" className="bg-green-50">Cargado</Badge>}
                          {modelLoadingStatus.isLoading && <Badge variant="outline" className="bg-yellow-50">Cargando...</Badge>}
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="ollama" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 flex items-center">
                            <Server className="mr-2 h-5 w-5" />
                            <div>
                              <div>Ollama (Servidor local)</div>
                              <div className="text-xs text-muted-foreground">
                                Conecta con tu propio servidor de Ollama
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("mode") === 'ollama' && (
                <div className="space-y-3 p-4 border rounded-md">
                  <h3 className="text-sm font-medium">Configuración de Ollama</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ollamaServerUrl">URL del servidor de Ollama</Label>
                    <Input 
                      id="ollamaServerUrl" 
                      value={ollamaServerUrl} 
                      onChange={(e) => setOllamaServerUrl(e.target.value)} 
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
                      value={ollamaModelName} 
                      onChange={(e) => setOllamaModelName(e.target.value)} 
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
                      testOllamaConnection();
                    }}
                  >
                    Probar conexión
                  </Button>
                </div>
              )}

              <DialogFooter>
                <Button type="submit">Guardar configuración</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIModelSelector;
