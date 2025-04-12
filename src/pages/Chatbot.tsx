
import { useState, useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { MessageCircle, Send, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Preguntas frecuentes predefinidas
  const commonQuestions = [
    "¿Qué debo hacer en caso de atragantamiento?",
    "¿Cómo realizar correctamente la RCP?",
    "¿Cómo tratar una quemadura leve?",
    "¿Cómo detener una hemorragia nasal?"
  ];

  // Función para generar respuestas del chatbot (simulada)
  const generateBotResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Respuestas simuladas basadas en palabras clave
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
      }, 1500); // Simulación de tiempo de respuesta
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      const response = await generateBotResponse(input);
      
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

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Asistente Virtual de Primeros Auxilios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Consulta tus dudas sobre primeros auxilios y recibe respuestas inmediatas basadas en información médica actualizada.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar con preguntas frecuentes */}
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
          
          {/* Chat principal */}
          <div className="md:col-span-3 flex flex-col h-[600px] auxilio-card p-0 overflow-hidden">
            {/* Mensajes */}
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
            
            {/* Input */}
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
                  La información proporcionada es solo educativa. En emergencias reales, llama a los servicios de emergencia.
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
