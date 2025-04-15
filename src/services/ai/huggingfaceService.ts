import { pipeline, env } from '@huggingface/transformers';
import { ModelStatus, ModelErrorType, ModelLoadingStatus } from './types';
import { identifyErrorType, getUserFriendlyErrorMessage, calculateSimilarity, trackEmbeddingError, showToast } from './utils';

// Configure to use WebGPU if available
env.useBrowserCache = true;
env.allowLocalModels = false;

// Model to use (MiniLM for text classification tasks)
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

// Retry configuration
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Lazy initialization to load the model only when needed
let _embeddingModel: any = null;
let _isModelLoading = false;

// Model loading status
const modelStatus: ModelStatus = {
  isLoaded: false,
  isLoading: false,
  error: null,
  errorType: null,
  lastAttempt: null,
  retryCount: 0
};

export const getModelStatus = (): ModelLoadingStatus => ({ 
  isLoaded: modelStatus.isLoaded,
  isLoading: modelStatus.isLoading,
  error: modelStatus.error
});

// Function to clear the error state
export const resetModelError = () => {
  modelStatus.error = null;
  modelStatus.errorType = null;
  modelStatus.retryCount = 0;
};

// This function initializes the embedding model with improved error handling
export const initEmbeddingModel = async (forceReload = false): Promise<any> => {
  try {
    // If the model is already loaded and no reload is required, return it
    if (_embeddingModel !== null && !forceReload) return _embeddingModel;
    
    // If a load is already in progress, wait
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

    // Start loading
    _isModelLoading = true;
    modelStatus.isLoading = true;
    modelStatus.lastAttempt = new Date();
    
    console.log('Cargando modelo de embedding...');
    
    // Advanced options for WebGPU control and fallback
    const options = {
      progress_callback: (progressInfo: any) => {
        console.log(`Progreso de carga: ${progressInfo.status || ''} - ${Math.round((progressInfo.progress || 0) * 100)}%`);
      }
    };
    
    try {
      // Try to load with WebGPU first
      _embeddingModel = await pipeline('feature-extraction', MODEL_ID, options);
    } catch (gpuError) {
      console.warn('No se pudo cargar con WebGPU, intentando sin aceleración:', gpuError);
      
      // If WebGPU fails, try without specifying device (fallback to CPU)
      _embeddingModel = await pipeline('feature-extraction', MODEL_ID);
    }
    
    // Model loaded successfully
    modelStatus.isLoaded = true;
    modelStatus.isLoading = false;
    modelStatus.error = null;
    modelStatus.errorType = null;
    modelStatus.retryCount = 0;
    _isModelLoading = false;
    
    console.log('Modelo de embedding cargado correctamente');
    
    // Notify user of success
    showToast("Modelo de IA cargado con éxito", "El modelo local está listo para responder a tus consultas");
    
    return _embeddingModel;
  } catch (error) {
    // Handle loading error
    console.error('Error al cargar el modelo de embedding:', error);
    
    // Identify error type
    const errorType = identifyErrorType(error);
    const errorMessage = getUserFriendlyErrorMessage(errorType);
    
    // Update state
    modelStatus.error = error instanceof Error ? error.message : String(error);
    modelStatus.errorType = errorType;
    modelStatus.isLoading = false;
    modelStatus.isLoaded = false;
    modelStatus.retryCount += 1;
    _isModelLoading = false;
    
    // Notify user of error
    showToast("Error al cargar el modelo de IA", errorMessage, "destructive");
    
    // Try to reload automatically if retry limit not exceeded
    if (modelStatus.retryCount < MAX_RETRY_COUNT) {
      console.log(`Reintentando carga (intento ${modelStatus.retryCount} de ${MAX_RETRY_COUNT})...`);
      
      // Notify user of retry
      showToast("Reintentando cargar el modelo", `Intento ${modelStatus.retryCount} de ${MAX_RETRY_COUNT}`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return initEmbeddingModel(true);
    }
    
    throw new Error(`Error al cargar el modelo después de ${MAX_RETRY_COUNT} intentos: ${errorMessage}`);
  }
};

// Knowledge base for first aid
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

// Fallback keyword search when embeddings fail
function fallbackKeywordSearch(userMessage: string, knowledgeBaseItems: Array<{context: string, response: string}>): string {
  const userMessageLower = userMessage.toLowerCase();
  
  // Look for keyword matches in user message
  for (const entry of knowledgeBaseItems) {
    const contextKeywords = entry.context.split(/\s+/);
    for (const keyword of contextKeywords) {
      if (keyword.length > 3 && userMessageLower.includes(keyword.toLowerCase())) {
        return entry.response;
      }
    }
  }
  
  // If no matches, return generic response
  return "No pude encontrar información específica sobre tu consulta. Por favor, intenta preguntar sobre temas de primeros auxilios como RCP, atragantamiento, quemaduras o fracturas.";
}

// Function to generate responses with the local model
export const generateLocalResponse = async (userMessage: string, conversationHistory: Array<{sender: string, text: string}>) => {
  try {
    // Initialize the model if not loaded
    const embeddingModel = await initEmbeddingModel();
    
    // Get embeddings for the user's question
    const userEmbedding = await embeddingModel(userMessage, { pooling: "mean", normalize: true });
    
    // Simulate searching for the most relevant response using embedding similarity
    let bestResponse = "";
    let highestSimilarity = 0;
    
    // Add error handling here too
    try {
      // Iterate through the knowledge base to find the most relevant response
      for (const entry of knowledgeBase) {
        // Get the embedding for the context
        const contextEmbedding = await embeddingModel(entry.context, { pooling: "mean", normalize: true });
        
        // Calculate similarity with dot product
        const similarity = calculateSimilarity(userEmbedding.data, contextEmbedding.data);
        
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestResponse = entry.response;
        }
      }
    } catch (embeddingError) {
      console.error('Error al calcular similitud de embeddings:', embeddingError);
      // Send telemetry of the error (for future analysis)
      trackEmbeddingError(embeddingError);
      // Show error message to user
      showToast("Error en el procesamiento", "Hubo un problema al analizar tu pregunta. Intentando método alternativo...", "destructive");
      
      // Alternative method: simple keyword search
      return fallbackKeywordSearch(userMessage, knowledgeBase);
    }
    
    // If we don't find a relevant response, return a generic message
    if (highestSimilarity < 0.25) {
      return "Gracias por tu pregunta. No tengo suficiente información sobre ese tema específico. Te recomiendo consultar sobre temas como atragantamiento, RCP, quemaduras, fracturas o emergencias cardíacas, donde puedo proporcionarte información más detallada.";
    }
    
    return bestResponse;
  } catch (error) {
    console.error('Error al generar respuesta local:', error);
    
    // Notify user of the error
    showToast("Error al generar respuesta", "No se pudo procesar tu consulta. Cambiando a modo simulado automáticamente.", "destructive");
    
    return "Lo siento, ha ocurrido un error al procesar tu consulta con el modelo local. Por favor, intenta de nuevo más tarde o utiliza el modo simulado.";
  }
};
