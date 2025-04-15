
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  AIMode as AIServiceMode, 
  generateLocalResponse, 
  generateOllamaResponse,
  getModelStatus, 
  initEmbeddingModel 
} from '@/services/huggingFaceService';

// Componentes refactorizados
import CommonQuestions from '@/components/chatbot/CommonQuestions';
import ChatInterface from '@/components/chatbot/ChatInterface';
import AIModelSelector from '@/components/chatbot/AIModelSelector';
import { Message, AIMode, ModelLoadingStatus } from '@/components/chatbot/types';

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

  const generateSimulatedResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userMessage.toLowerCase().includes('atragantamiento')) {
          resolve(
            'Para ayudar a alguien que se está atragantando: \n\n' +
            '1. Anima a la persona a toser para expulsar el objeto. \n' +
            '2. Si no puede toser, hablar o respirar, realiza la maniobra de Heimlich: \n' +
            '   - Colócate detrás de la persona y rodea su cintura con tus brazos. \n' +
            '   - Haz un puño con una mano y colócalo ligeramente por encima del ombligo. \n' +
            '   - Sujeta el puño con la otra mano y presiona hacia dentro y hacia arriba con movimientos rápidos. \n' +
            '3. Continúa hasta que el objeto sea expulsado o la persona pierda el conocimiento. \n' +
            '4. Si pierde el conocimiento, comienza la RCP.'
          );
        } else if (userMessage.toLowerCase().includes('rcp') || userMessage.toLowerCase().includes('reanimación')) {
          resolve(
            'Pasos básicos para realizar la RCP en adultos: \n\n' +
            '1. Asegura la escena y comprueba si la persona responde. \n' +
            '2. Si no responde y no respira o solo jadea, llama a emergencias. \n' +
            '3. Coloca a la persona boca arriba en una superficie firme. \n' +
            '4. Coloca las manos una sobre otra en el centro del pecho. \n' +
            '5. Mantén los brazos rectos y usa el peso de tu cuerpo para comprimir. \n' +
            '6. Realiza compresiones de al menos 5 cm de profundidad a un ritmo de 100-120 por minuto. \n' +
            '7. Si estás entrenado, da 2 respiraciones después de cada 30 compresiones. \n' +
            '8. Continúa hasta que llegue ayuda profesional o la persona muestre signos de vida.'
          );
        } else if (userMessage.toLowerCase().includes('quemadura')) {
          resolve(
            'Para tratar una quemadura leve: \n\n' +
            '1. Enfría la quemadura con agua corriente a temperatura ambiente durante 10-20 minutos. \n' +
            '2. No uses hielo, ya que puede empeorar la lesión. \n' +
            '3. Retira anillos, relojes u otros objetos ajustados cerca de la zona quemada. \n' +
            '4. Cubre la quemadura con un vendaje estéril no adherente o una gasa limpia. \n' +
            '5. Usa un analgésico de venta libre si es necesario para el dolor. \n' +
            '6. No apliques mantequilla, aceite, pasta dental ni remedios caseros. \n\n' +
            'Busca atención médica si la quemadura: \n' +
            '- Es mayor que el tamaño de la palma de la mano. \n' +
            '- Afecta articulaciones, cara, manos, pies o genitales. \n' +
            '- Forma ampollas o tiene aspecto blanco o carbonizado. \n' +
            '- Es causada por productos químicos o electricidad.'
          );
        } else if (userMessage.toLowerCase().includes('hemorragia') && userMessage.toLowerCase().includes('nasal')) {
          resolve(
            'Para detener una hemorragia nasal: \n\n' +
            '1. Siéntate e inclina ligeramente la cabeza hacia adelante (no hacia atrás). \n' +
            '2. Presiona la parte blanda de la nariz (justo debajo del puente) con el pulgar y el índice. \n' +
            '3. Mantén la presión constante durante al menos 10-15 minutos sin interrupciones. \n' +
            '4. Respira por la boca y escupe cualquier sangre que llegue a la garganta. \n' +
            '5. Puedes aplicar una compresa fría en el puente de la nariz para ayudar a contraer los vasos sanguíneos. \n\n' +
            'Busca atención médica si: \n' +
            '- El sangrado no se detiene después de 20-30 minutos. \n' +
            '- La hemorragia es abundante. \n' +
            '- Fue causada por un traumatismo fuerte. \n' +
            '- Ocurre frecuentemente.'
          );
        } else {
          resolve(
            'Gracias por tu pregunta. Como asistente virtual básico, tengo información limitada. Para obtener consejos específicos sobre primeros auxilios, te recomiendo: \n\n' +
            '1. Explorar las secciones educativas de nuestra plataforma. \n' +
            '2. Consultar preguntas frecuentes como atragantamiento, RCP, quemaduras o hemorragias nasales. \n' +
            '3. Para emergencias reales, siempre llama inmediatamente a los servicios de emergencia (911, 112 o el número local).'
          );
        }
      }, 1500);
    });
  };

  const generateOpenAiResponse = async (userMessage: string): Promise<string> => {
    try {
      const conversationHistory = messages.slice(0, -1);
      
      const { data, error } = await supabase.functions.invoke('perplexity-chat', {
        body: { 
          message: userMessage,
          conversationHistory: conversationHistory
        }
      });
      
      if (error) {
        console.error('Error al llamar a la función perplexity-chat:', error);
        throw new Error('Error al comunicarse con el servicio de IA');
      }
      
      if (data.simulatedResponse) {
        console.log('Usando respuesta simulada debido a: ', data.error || 'API key no configurada');
        setAiMode('simulado');
      }
      
      return data.text;
      
    } catch (error) {
      console.error('Error en generateOpenAiResponse:', error);
      setAiMode('simulado');
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con la IA. Usando respuestas simuladas.",
        variant: "destructive"
      });
      return generateSimulatedResponse(userMessage);
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
          response = await generateOpenAiResponse(input);
          break;
        case 'huggingface':
          response = await generateLocalResponse(input, messages);
          break;
        case 'ollama':
          response = await generateOllamaResponse(input, messages, ollamaServerUrl, ollamaModelName);
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
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.',
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
