import { pipeline, env } from '@huggingface/transformers';
import { toast } from "@/hooks/use-toast";

// Configuramos para usar WebGPU si está disponible
env.useBrowserCache = true;
env.allowLocalModels = false;

// Define el tipo para los modos de IA disponibles
export type AIMode = 'simulado' | 'openai' | 'huggingface' | 'ollama';

// Define tipos específicos de errores que pueden ocurrir
export enum ModelErrorType {
  NETWORK = 'network',
  MEMORY = 'memory',
  COMPATIBILITY = 'compatibility',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown'
}

// Estructura para el estado del modelo
export interface ModelStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  errorType: ModelErrorType | null;
  lastAttempt: Date | null;
  retryCount: number;
}

// Modelo a utilizar (MiniLM para tareas de clasificación de texto)
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

// Configuración de reintentos
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 2000; // 2 segundos

// Inicialización perezosa para cargar el modelo solo cuando se necesite
let _embeddingModel: any = null;
let _generationModel: any = null;
let _isModelLoading = false;

// Estado de carga del modelo
const modelStatus: ModelStatus = {
  isLoaded: false,
  isLoading: false,
  error: null,
  errorType: null,
  lastAttempt: null,
  retryCount: 0
};

export const getModelStatus = () => ({ ...modelStatus });

// Función para identificar el tipo de error basado en el mensaje
function identifyErrorType(error: any): ModelErrorType {
  const errorMessage = error?.message || String(error);
  
  if (errorMessage.includes('network') || 
      errorMessage.includes('fetch') || 
      errorMessage.includes('connection')) {
    return ModelErrorType.NETWORK;
  }
  
  if (errorMessage.includes('memory') || 
      errorMessage.includes('allocation') || 
      errorMessage.includes('out of memory')) {
    return ModelErrorType.MEMORY;
  }
  
  if (errorMessage.includes('browser') || 
      errorMessage.includes('not supported') || 
      errorMessage.includes('compatibility')) {
    return ModelErrorType.COMPATIBILITY;
  }
  
  if (errorMessage.includes('timeout') || 
      errorMessage.includes('time out') || 
      errorMessage.includes('timed out')) {
    return ModelErrorType.TIMEOUT;
  }
  
  return ModelErrorType.UNKNOWN;
}

// Función para obtener un mensaje de error amigable para el usuario
function getUserFriendlyErrorMessage(errorType: ModelErrorType): string {
  switch (errorType) {
    case ModelErrorType.NETWORK:
      return "Error de conexión al cargar el modelo. Verifica tu conexión a internet.";
    case ModelErrorType.MEMORY:
      return "No hay suficiente memoria para cargar el modelo. Cierra otras aplicaciones e intenta nuevamente.";
    case ModelErrorType.COMPATIBILITY:
      return "Tu navegador puede no ser compatible con este modelo. Intenta con Chrome o Edge actualizados.";
    case ModelErrorType.TIMEOUT:
      return "El tiempo de carga del modelo ha excedido el límite. La conexión puede ser lenta.";
    case ModelErrorType.UNKNOWN:
    default:
      return "Ha ocurrido un error inesperado al cargar el modelo.";
  }
}

// Función para limpiar el estado de errores
export const resetModelError = () => {
  modelStatus.error = null;
  modelStatus.errorType = null;
  modelStatus.retryCount = 0;
};

// Esta función inicializa el modelo de embedding con manejo mejorado de errores
export const initEmbeddingModel = async (forceReload = false): Promise<any> => {
  try {
    // Si el modelo ya está cargado y no se requiere recarga, retornarlo
    if (_embeddingModel !== null && !forceReload) return _embeddingModel;
    
    // Si ya hay una carga en progreso, esperar
    if (_isModelLoading) {
      console.log('Modelo ya está cargando, esperando...');
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!_isModelLoading && _embeddingModel !== null) {
            clearInterval(checkInterval);
            resolve(_embeddingModel);
          }
        }, 500);
      });
    }

    // Iniciar la carga
    _isModelLoading = true;
    modelStatus.isLoading = true;
    modelStatus.lastAttempt = new Date();
    
    console.log('Cargando modelo de embedding...');
    
    // Opciones avanzadas para control de WebGPU y fallback
    const options = {
      progress_callback: (progressInfo: any) => {
        console.log(`Progreso de carga: ${progressInfo.status || ''} - ${Math.round((progressInfo.progress || 0) * 100)}%`);
      }
    };
    
    try {
      // Intentar cargar con WebGPU primero
      _embeddingModel = await pipeline('feature-extraction', MODEL_ID, options);
    } catch (gpuError) {
      console.warn('No se pudo cargar con WebGPU, intentando sin aceleración:', gpuError);
      
      // Si falla WebGPU, intentar sin especificar dispositivo (fallback a CPU)
      _embeddingModel = await pipeline('feature-extraction', MODEL_ID);
    }
    
    // Modelo cargado con éxito
    modelStatus.isLoaded = true;
    modelStatus.isLoading = false;
    modelStatus.error = null;
    modelStatus.errorType = null;
    modelStatus.retryCount = 0;
    _isModelLoading = false;
    
    console.log('Modelo de embedding cargado correctamente');
    
    // Notificar al usuario del éxito
    toast({
      title: "Modelo de IA cargado con éxito",
      description: "El modelo local está listo para responder a tus consultas",
    });
    
    return _embeddingModel;
  } catch (error) {
    // Manejar el error de carga
    console.error('Error al cargar el modelo de embedding:', error);
    
    // Identificar el tipo de error
    const errorType = identifyErrorType(error);
    const errorMessage = getUserFriendlyErrorMessage(errorType);
    
    // Actualizar el estado
    modelStatus.error = error instanceof Error ? error.message : String(error);
    modelStatus.errorType = errorType;
    modelStatus.isLoading = false;
    modelStatus.isLoaded = false;
    modelStatus.retryCount += 1;
    _isModelLoading = false;
    
    // Notificar al usuario del error
    toast({
      title: "Error al cargar el modelo de IA",
      description: errorMessage,
      variant: "destructive"
    });
    
    // Intentar recargar automáticamente si no se excedió el límite de reintentos
    if (modelStatus.retryCount < MAX_RETRY_COUNT) {
      console.log(`Reintentando carga (intento ${modelStatus.retryCount} de ${MAX_RETRY_COUNT})...`);
      
      // Notificar al usuario del reintento
      toast({
        title: "Reintentando cargar el modelo",
        description: `Intento ${modelStatus.retryCount} de ${MAX_RETRY_COUNT}`,
      });
      
      // Esperar antes de reintentar
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return initEmbeddingModel(true);
    }
    
    throw new Error(`Error al cargar el modelo después de ${MAX_RETRY_COUNT} intentos: ${errorMessage}`);
  }
};

// Función para generar respuestas con el modelo local
export const generateLocalResponse = async (userMessage: string, conversationHistory: Array<{sender: string, text: string}>) => {
  try {
    // Inicializamos el modelo si no está cargado
    const embeddingModel = await initEmbeddingModel();
    
    // Obtenemos embeddings para la pregunta del usuario
    const userEmbedding = await embeddingModel(userMessage, { pooling: "mean", normalize: true });
    
    // Conocimiento base de primeros auxilios
    const knowledgeBase = [
      {
        context: "atragantamiento obstrucción vía aérea",
        response: "Para ayudar a alguien que se está atragantando: \n\n1. Anima a la persona a toser para expulsar el objeto.\n2. Si no puede toser, hablar o respirar, realiza la maniobra de Heimlich:\n   - Colócate detrás de la persona y rodea su cintura con tus brazos.\n   - Haz un puño con una mano y colócalo ligeramente por encima del ombligo.\n   - Sujeta el puño con la otra mano y presiona hacia dentro y hacia arriba con movimientos rápidos.\n3. Continúa hasta que el objeto sea expulsado o la persona pierda el conocimiento.\n4. Si pierde el conocimiento, comienza la RCP."
      },
      {
        context: "rcp reanimación cardiopulmonar",
        response: "Pasos básicos para realizar la RCP en adultos: \n\n1. Asegura la escena y comprueba si la persona responde.\n2. Si no responde y no respira o solo jadea, llama a emergencias.\n3. Coloca a la persona boca arriba en una superficie firme.\n4. Coloca las manos una sobre otra en el centro del pecho.\n5. Mantén los brazos rectos y usa el peso de tu cuerpo para comprimir.\n6. Realiza compresiones de al menos 5 cm de profundidad a un ritmo de 100-120 por minuto.\n7. Si estás entrenado, da 2 respiraciones después de cada 30 compresiones.\n8. Continúa hasta que llegue ayuda profesional o la persona muestre signos de vida."
      },
      {
        context: "quemadura quemaduras herida térmica",
        response: "Para tratar una quemadura leve: \n\n1. Enfría la quemadura con agua corriente a temperatura ambiente durante 10-20 minutos.\n2. No uses hielo, ya que puede empeorar la lesión.\n3. Retira anillos, relojes u otros objetos ajustados cerca de la zona quemada.\n4. Cubre la quemadura con un vendaje estéril no adherente o una gasa limpia.\n5. Usa un analgésico de venta libre si es necesario para el dolor.\n6. No apliques mantequilla, aceite, pasta dental ni remedios caseros.\n\nBusca atención médica si la quemadura:\n- Es mayor que el tamaño de la palma de la mano.\n- Afecta articulaciones, cara, manos, pies o genitales.\n- Forma ampollas o tiene aspecto blanco o carbonizado.\n- Es causada por productos químicos o electricidad."
      },
      {
        context: "hemorragia nasal sangrado nariz",
        response: "Para detener una hemorragia nasal: \n\n1. Siéntate e inclina ligeramente la cabeza hacia adelante (no hacia atrás).\n2. Presiona la parte blanda de la nariz (justo debajo del puente) con el pulgar y el índice.\n3. Mantén la presión constante durante al menos 10-15 minutos sin interrupciones.\n4. Respira por la boca y escupe cualquier sangre que llegue a la garganta.\n5. Puedes aplicar una compresa fría en el puente de la nariz para ayudar a contraer los vasos sanguíneos.\n\nBusca atención médica si:\n- El sangrado no se detiene después de 20-30 minutos.\n- La hemorragia es abundante.\n- Fue causada por un traumatismo fuerte.\n- Ocurre frecuentemente."
      },
      {
        context: "herida corte contusión",
        response: "Para tratar una herida leve: \n\n1. Lávate las manos con agua y jabón antes de tratar la herida.\n2. Limpia la herida con agua corriente limpia o solución salina.\n3. Retira cuidadosamente cualquier suciedad o desechos visibles con pinzas limpias.\n4. Aplica un antiséptico suave como povidona yodada.\n5. Cubre la herida con un apósito estéril o tirita.\n6. Cambia el vendaje si se moja o ensucia.\n\nBusca atención médica si:\n- La herida es profunda o los bordes están muy separados.\n- Hay un sangrado que no se detiene después de 15 minutos de presión.\n- Hay signos de infección (enrojecimiento, calor, hinchazón, pus).\n- La herida está contaminada con tierra, oxidada o sucia."
      },
      {
        context: "fractura hueso roto",
        response: "Para manejar una posible fractura: \n\n1. Inmoviliza la zona lesionada en la posición en que se encuentre.\n2. Aplica hielo envuelto en un paño (nunca directamente sobre la piel) durante 20 minutos.\n3. Eleva la extremidad lesionada si es posible y no causa dolor adicional.\n4. No intentas realinear un hueso roto o una articulación dislocada.\n5. Para transportar a la persona, inmoviliza la fractura con férulas improvisadas (revistas, tablillas).\n\nBusca atención médica de inmediato si:\n- Hay deformidad visible o asimetría.\n- Imposibilidad de mover la zona afectada.\n- Hinchazón severa o hematoma.\n- Exposición del hueso a través de la piel (fractura abierta)."
      },
      {
        context: "envenenamiento intoxicación veneno",
        response: "En caso de envenenamiento o intoxicación: \n\n1. Llama inmediatamente al centro de toxicología o a los servicios de emergencia.\n2. No induzcas el vómito a menos que te lo indique un profesional sanitario.\n3. Si la persona está inconsciente, colócala en posición lateral de seguridad.\n4. Conserva el envase del producto tóxico para mostrarlo al personal médico.\n5. Si hay contacto con la piel, retira la ropa contaminada y lava la zona con agua abundante.\n6. Si hay contacto con los ojos, lávalos con agua tibia durante 15-20 minutos.\n\nInformación importante para los servicios médicos:\n- Qué sustancia fue ingerida\n- Cuándo ocurrió la exposición\n- Cuánta cantidad fue ingerida o a cuánta fue expuesta la persona\n- Edad y peso aproximado de la persona"
      },
      {
        context: "emergencia emergencias cardíaca cardiaca infarto",
        response: "Ante una posible emergencia cardíaca: \n\n1. Llama inmediatamente a emergencias (112 o 911).\n2. Si la persona está inconsciente y no respira normalmente, inicia RCP:\n   - Coloca el talón de una mano en el centro del pecho.\n   - Coloca la otra mano encima entrelazando los dedos.\n   - Realiza compresiones rápidas y fuertes (100-120 por minuto).\n3. Si hay un desfibrilador automático (DEA) disponible, úsalo siguiendo las instrucciones.\n4. Si la persona está consciente:\n   - Ayúdala a sentarse en una posición cómoda.\n   - Afloja cualquier ropa ajustada.\n   - Si toma medicación para el corazón, ayúdala a tomarla.\n\nSeñales de advertencia de un ataque cardíaco:\n- Dolor o presión en el centro del pecho\n- Dolor que se irradia al brazo izquierdo, mandíbula, espalda\n- Dificultad para respirar\n- Sudoración fría\n- Náuseas o mareos"
      }
    ];
    
    // Simulamos la búsqueda de la respuesta más relevante usando similitud de embeddings
    let bestResponse = "";
    let highestSimilarity = 0;
    
    // Añadimos manejo de errores aquí también
    try {
      // Iteramos por la base de conocimiento para encontrar la respuesta más relevante
      for (const entry of knowledgeBase) {
        // Conseguimos el embedding del contexto
        const contextEmbedding = await embeddingModel(entry.context, { pooling: "mean", normalize: true });
        
        // Calculamos similitud con producto punto (dot product)
        const similarity = calculateSimilarity(userEmbedding.data, contextEmbedding.data);
        
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestResponse = entry.response;
        }
      }
    } catch (embeddingError) {
      console.error('Error al calcular similitud de embeddings:', embeddingError);
      // Enviar telemetría del error (para análisis futuro)
      trackEmbeddingError(embeddingError);
      // Mostrar mensaje de error al usuario
      toast({
        title: "Error en el procesamiento",
        description: "Hubo un problema al analizar tu pregunta. Intentando método alternativo...",
        variant: "destructive"
      });
      
      // Método alternativo: búsqueda de palabras clave simple
      return fallbackKeywordSearch(userMessage, knowledgeBase);
    }
    
    // Si no encontramos una respuesta relevante, devolvemos un mensaje genérico
    if (highestSimilarity < 0.25) {
      return "Gracias por tu pregunta. No tengo suficiente información sobre ese tema específico. Te recomiendo consultar sobre temas como atragantamiento, RCP, quemaduras, fracturas o emergencias cardíacas, donde puedo proporcionarte información más detallada.";
    }
    
    return bestResponse;
  } catch (error) {
    console.error('Error al generar respuesta local:', error);
    
    // Notificar al usuario del error
    toast({
      title: "Error al generar respuesta",
      description: "No se pudo procesar tu consulta. Cambiando a modo simulado automáticamente.",
      variant: "destructive"
    });
    
    return "Lo siento, ha ocurrido un error al procesar tu consulta con el modelo local. Por favor, intenta de nuevo más tarde o utiliza el modo simulado.";
  }
};

// Función para generar respuestas utilizando Ollama en un servidor local
export const generateOllamaResponse = async (
  userMessage: string, 
  messages: any[], 
  serverUrl: string,
  modelName: string = 'mediachat'
): Promise<string> => {
  try {
    // Preparamos el historial en el formato que espera Ollama
    const messages = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
    
    // Agregamos el mensaje actual del usuario
    messages.push({
      role: 'user',
      content: userMessage
    });
    
    // Configuramos la petición a la API de Ollama
    const response = await fetch(`${serverUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: messages,
        stream: false
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error del servidor Ollama: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    
    // Notificar éxito y retornar la respuesta
    toast({
      title: "Respuesta generada con Ollama",
      description: "Tu servidor local de IA ha procesado la consulta",
    });
    
    return data.message?.content || "No se pudo generar una respuesta con Ollama";
  } catch (error) {
    console.error('Error al generar respuesta con Ollama:', error);
    
    // Notificar al usuario del error
    toast({
      title: "Error al conectar con Ollama",
      description: "No se pudo conectar con tu servidor local. Verifica que esté en ejecución.",
      variant: "destructive"
    });
    
    return `Error al conectar con tu servidor Ollama: ${error instanceof Error ? error.message : String(error)}. Verifica que el servidor esté ejecutándose en la URL configurada.`;
  }
};

// Función auxiliar para calcular similitud entre embeddings
function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  try {
    // Implementación robusta de similitud coseno
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }
    
    // Prevenir división por cero
    if (norm1 === 0 || norm2 === 0) return 0;
    
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  } catch (error) {
    console.error('Error al calcular similitud:', error);
    return 0; // En caso de error, devolvemos la similitud mínima
  }
}

// Función de respaldo que usa palabras clave cuando fallan los embeddings
function fallbackKeywordSearch(userMessage: string, knowledgeBase: Array<{context: string, response: string}>): string {
  const userMessageLower = userMessage.toLowerCase();
  
  // Buscar coincidencias de palabras clave en el mensaje del usuario
  for (const entry of knowledgeBase) {
    const contextKeywords = entry.context.split(/\s+/);
    for (const keyword of contextKeywords) {
      if (keyword.length > 3 && userMessageLower.includes(keyword.toLowerCase())) {
        return entry.response;
      }
    }
  }
  
  // Si no hay coincidencias, devolver respuesta genérica
  return "No pude encontrar información específica sobre tu consulta. Por favor, intenta preguntar sobre temas de primeros auxilios como RCP, atragantamiento, quemaduras o fracturas.";
}

// Función para seguimiento y análisis de errores (telemetría)
function trackEmbeddingError(error: any): void {
  // Aquí se implementaría el envío de datos de telemetría
  // Por ahora solo registramos en consola
  console.log('Error de embedding para análisis:', {
    timestamp: new Date().toISOString(),
    errorMessage: error instanceof Error ? error.message : String(error),
    errorStack: error instanceof Error ? error.stack : undefined,
    browserInfo: navigator.userAgent
  });
}
