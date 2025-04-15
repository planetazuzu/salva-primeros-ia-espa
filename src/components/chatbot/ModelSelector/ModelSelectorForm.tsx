
import React from 'react';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AIMode, ModelLoadingStatus } from '../types';
import ModelOption from './ModelOption';
import OllamaSettings from './OllamaSettings';

interface ModelSelectorFormProps {
  currentMode: AIMode;
  onSubmit: (values: { mode: AIMode }) => void;
  modelLoadingStatus: ModelLoadingStatus;
  ollamaServerUrl: string;
  setOllamaServerUrl: (url: string) => void;
  ollamaModelName: string;
  setOllamaModelName: (name: string) => void;
  testOllamaConnection: () => Promise<void>;
}

interface FormValues {
  mode: AIMode;
}

const ModelSelectorForm: React.FC<ModelSelectorFormProps> = ({
  currentMode,
  onSubmit,
  modelLoadingStatus,
  ollamaServerUrl,
  setOllamaServerUrl,
  ollamaModelName,
  setOllamaModelName,
  testOllamaConnection
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      mode: currentMode,
    },
  });

  const selectedMode = form.watch("mode");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <ModelOption
                    value="openai"
                    title="OpenAI (Online)"
                    description="Utiliza los modelos de OpenAI para generar respuestas (requiere conexión a internet)"
                    icon="bot"
                    badge={{ text: "Recomendado" }}
                  />

                  <ModelOption
                    value="simulado"
                    title="Respuestas Simuladas"
                    description="Utiliza respuestas predefinidas (no requiere conexión)"
                    icon="cpu"
                  />

                  <ModelOption
                    value="huggingface"
                    title="Hugging Face (Local)"
                    description="Utiliza modelos que se ejecutan directamente en tu navegador"
                    icon="brain"
                    badge={
                      modelLoadingStatus.isLoaded 
                        ? { text: "Cargado", className: "bg-green-50" }
                        : modelLoadingStatus.isLoading 
                          ? { text: "Cargando...", className: "bg-yellow-50" }
                          : undefined
                    }
                  />

                  <ModelOption
                    value="ollama"
                    title="Ollama (Servidor local)"
                    description="Conecta con tu propio servidor de Ollama"
                    icon="server"
                  />
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {selectedMode === 'ollama' && (
          <OllamaSettings
            serverUrl={ollamaServerUrl}
            setServerUrl={setOllamaServerUrl}
            modelName={ollamaModelName}
            setModelName={setOllamaModelName}
            testConnection={testOllamaConnection}
          />
        )}

        <DialogFooter>
          <Button type="submit">Guardar configuración</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ModelSelectorForm;
