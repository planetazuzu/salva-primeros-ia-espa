
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  AIMode,
  ModelLoadingStatus,
  generateLocalResponse, 
  generateOllamaResponse,
  getModelStatus, 
  initEmbeddingModel,
  generateSimulatedResponse,
  generateOpenAiResponse
} from '@/services/ai';

// Componentes refactorizados
import CommonQuestions from '@/components/chatbot/CommonQuestions';
import ChatInterface from '@/components/chatbot/ChatInterface';
import AIModelSelector from '@/components/chatbot/AIModelSelector';
import { Message } from '@/components/chatbot/types';

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual de primeros auxilios. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [aiMode, setAiMode] = useState<AIMode>('simulado');
  const [ollamaServerUrl, setOllamaServerUrl] = useState('http://localhost:11434');
  const [ollamaModelName, setOllamaModelName] = useState('mediachat');
  const [modelLoadingStatus, setModelLoadingStatus] = useState<ModelLoadingStatus>({
    isLoading: false,
    isLoaded: false,
    error: null,
  });
  const { toast } = useToast();

  const commonQuestions = [
    "¿Qué debo hacer en caso de atragantamiento?",
    "¿Cómo realizar correctamente la RCP?",
    "¿Cómo tratar una quemadura leve?",
    "¿Cómo detener una hemorragia nasal?"
  ];

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('perplexity-chat', {
          body: { message: 'check_api_key', conversationHistory: [] }
        });
        
        if (!error && !data.simulatedResponse) {
          setAiMode('openai');
          console.log('Usando OpenAI');
        } else {
          console.log('Usando modo simulado');
        }
      } catch (error) {
        console.error('Error al comprobar la conexión con OpenAI:', error);
      }
    };

    checkApiKey();
  }, []);

  // Función para iniciar la carga del modelo de Hugging Face
  const loadHuggingFaceModel = async () => {
    try {
      setModelLoadingStatus({...modelLoadingStatus, isLoading: true});
      
      toast({
        title: "Cargando modelo de IA",
        description: "Esto puede tardar unos momentos la primera vez",
      });
      
      await initEmbeddingModel();
      
      const status = getModelStatus();
      setModelLoadingStatus(status);
      
      if (status.isLoaded) {
        setAiMode('huggingface');
        toast({
          title: "Modelo cargado correctamente",
          description: "Ahora puedes hacer preguntas usando el modelo local",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al cargar el modelo:', errorMessage);
      
      setModelLoadingStatus({
        isLoading: false,
        isLoaded: false,
        error: errorMessage
      });
      
      toast({
        title: "Error al cargar el modelo",
        description: "No se pudo cargar el modelo de IA. Usando respuestas simuladas.",
        variant: "destructive"
      });
    }
  };

  // Función para probar la conexión con Ollama
  const testOllamaConnection = async () => {
    try {
      setLoading(true);
      
      toast({
        title: "Probando conexión con Ollama",
        description: "Verificando la conexión con tu servidor local...",
      });
      
      const response = await fetch(`${ollamaServerUrl}/api/tags`);
      
      if (!response.ok) {
        throw new Error(`Error al conectar con Ollama: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.models && data.models.length > 0) {
        setAiMode('ollama');
        toast({
          title: "Conexión exitosa con Ollama",
          description: `Se encontraron ${data.models.length} modelos disponibles`,
        });
      } else {
        toast({
          title: "Conexión establecida, pero sin modelos",
          description: "No se encontraron modelos disponibles en tu servidor Ollama",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error al probar la conexión con Ollama:', error);
      
      toast({
        title: "Error de conexión",
        description: error instanceof Error ? error.message : 'No se pudo conectar con el servidor Ollama',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      let response;
      
      switch (aiMode) {
        case 'openai':
          response = await generateOpenAiResponse(input, messages.map(m => ({ sender: m.sender, text: m.text })));
          break;
        case 'huggingface':
          response = await generateLocalResponse(input, messages.map(m => ({ sender: m.sender, text: m.text })));
          break;
        case 'ollama':
          response = await generateOllamaResponse(input, messages.map(m => ({ sender: m.sender, text: m.text })), ollamaServerUrl, ollamaModelName);
          break;
        case 'simulado':
        default:
          response = await generateSimulatedResponse(input);
          break;
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generando respuesta:', error);
      
      // Intentar usar respuesta simulada si falla otro método
      let fallbackResponse = "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.";
      
      try {
        if (aiMode !== 'simulado') {
          fallbackResponse = await generateSimulatedResponse(input);
        }
      } catch (fallbackError) {
        console.error('Error generando respuesta de respaldo:', fallbackError);
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, feedback: type } 
        : message
    ));
  };

  // Cambiar entre modos de IA
  const handleChangeAIMode = (mode: AIMode) => {
    if (mode === 'huggingface' && !modelLoadingStatus.isLoaded) {
      loadHuggingFaceModel();
    } else if (mode === 'ollama') {
      testOllamaConnection();
    } else {
      setAiMode(mode);
      
      toast({
        title: `Modo ${mode === 'openai' ? 'OpenAI' : mode === 'huggingface' ? 'Local (Hugging Face)' : mode === 'ollama' ? 'Ollama (Servidor local)' : 'Simulado'} activado`,
        description: `Ahora estás usando ${mode === 'openai' ? 'ChatGPT' : mode === 'huggingface' ? 'modelo local gratuito' : mode === 'ollama' ? 'tu servidor Ollama local' : 'respuestas predefinidas'}`,
      });
    }
  };

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Asistente Virtual de Primeros Auxilios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Consulta tus dudas sobre primeros auxilios y recibe respuestas inmediatas basadas en información médica actualizada.
          </p>
          
          <AIModelSelector 
            currentMode={aiMode}
            onChangeMode={handleChangeAIMode}
            modelLoadingStatus={modelLoadingStatus}
            testOllamaConnection={testOllamaConnection}
            ollamaServerUrl={ollamaServerUrl}
            setOllamaServerUrl={setOllamaServerUrl}
            ollamaModelName={ollamaModelName}
            setOllamaModelName={setOllamaModelName}
          />
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <CommonQuestions 
              questions={commonQuestions}
              onSelectQuestion={handleQuickQuestion}
            />
          </div>
          
          <ChatInterface 
            messages={messages}
            loading={loading}
            aiMode={aiMode}
            onSendMessage={handleSendMessage}
            onFeedback={handleFeedback}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
