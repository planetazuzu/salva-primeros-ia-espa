
import { useState, useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { MessageCircle, Send, Plus, ThumbsUp, ThumbsDown, Info, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  AIMode, 
  generateLocalResponse, 
  generateOllamaResponse,
  getModelStatus, 
  initEmbeddingModel 
} from '@/services/huggingFaceService';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual de primeros auxilios. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiMode, setAiMode] = useState<AIMode>('simulado');
  const [ollamaServerUrl, setOllamaServerUrl] = useState('http://localhost:11434');
  const [ollamaModelName, setOllamaModelName] = useState('mediachat');
  const [modelLoadingStatus, setModelLoadingStatus] = useState({
    isLoading: false,
    isLoaded: false,
    error: null as string | null,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
      
      // Notificar al usuario que el modelo está cargando
      toast({
        title: "Cargando modelo de IA",
        description: "Esto puede tardar unos momentos la primera vez",
      });
      
      await initEmbeddingModel();
      
      // Actualizar el estado con el estado del modelo
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
      
      // Notificar al usuario que estamos probando la conexión
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
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
          response = await generateOllamaResponse(input, messages, ollamaServerUrl);
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
    setInput(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, feedback: type } 
        : message
    ));
  };

  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
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
          <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
            <div 
              className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
                aiMode === 'openai' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-green-50'
              }`}
              onClick={() => handleChangeAIMode('openai')}
            >
              <Info className="h-3 w-3 mr-1" />
              OpenAI (ChatGPT)
            </div>
            <div 
              className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
                aiMode === 'huggingface' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
              }`}
              onClick={() => handleChangeAIMode('huggingface')}
            >
              <Info className="h-3 w-3 mr-1" />
              Modelo Local {modelLoadingStatus.isLoading && "(Cargando...)"}
            </div>
            <div 
              className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
                aiMode === 'ollama' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800 hover:bg-purple-50'
              }`}
              onClick={() => handleChangeAIMode('ollama')}
            >
              <Info className="h-3 w-3 mr-1" />
              Ollama (Servidor)
            </div>
            <div 
              className={`px-3 py-1 rounded-full text-xs flex items-center cursor-pointer transition-colors ${
                aiMode === 'simulado' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'
              }`}
              onClick={() => handleChangeAIMode('simulado')}
            >
              <Info className="h-3 w-3 mr-1" />
              Respuestas Simuladas
            </div>
            
            {aiMode === 'ollama' && (
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
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="auxilio-card p-4">
              <h2 className="font-semibold text-auxilio-azul mb-3">Preguntas frecuentes</h2>
              <div className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 text-sm rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <strong>Nota:</strong> Este asistente virtual proporciona información educativa básica y no reemplaza el consejo médico profesional.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 flex flex-col h-[600px] auxilio-card p-0 overflow-hidden">
            <div className="flex-grow overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-auxilio-azul text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {formatMessageText(message.text)}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'bot' && (
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleFeedback(message.id, 'like')}
                              className={`p-1 rounded-full ${message.feedback === 'like' ? 'bg-green-100' : 'hover:bg-gray-200'}`}
                              aria-label="Me gusta"
                            >
                              <ThumbsUp className="h-3 w-3 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleFeedback(message.id, 'dislike')}
                              className={`p-1 rounded-full ${message.feedback === 'dislike' ? 'bg-red-100' : 'hover:bg-gray-200'}`}
                              aria-label="No me gusta"
                            >
                              <ThumbsDown className="h-3 w-3 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                  aria-label="Opciones adicionales"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <div className="flex-grow relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu consulta sobre primeros auxilios..."
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-auxilio-azul resize-none"
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                    {input.length > 0 ? 'Enter para enviar' : ''}
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                  className={`p-2 rounded-full ${
                    input.trim() && !loading
                      ? 'bg-auxilio-azul text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                <span>
                  {aiMode === 'huggingface' 
                    ? 'Utilizando modelo de IA local. Las respuestas se procesan en tu navegador.' 
                    : aiMode === 'ollama'
                    ? 'Utilizando tu servidor Ollama local para generar respuestas.' 
                    : 'La información proporcionada es solo educativa. En emergencias reales, llama a los servicios de emergencia.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
