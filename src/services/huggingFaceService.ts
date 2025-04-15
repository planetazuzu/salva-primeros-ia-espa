
import { pipeline, env } from '@huggingface/transformers';

// Configuramos para usar WebGPU si está disponible
env.useBrowserCache = true;
env.allowLocalModels = false;

// Define el tipo para los modos de IA disponibles
export type AIMode = 'openai' | 'simulado' | 'huggingface';

// Modelo a utilizar (MiniLM para tareas de clasificación de texto)
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

// Inicialización perezosa para cargar el modelo solo cuando se necesite
let _embeddingModel: any = null;
let _generationModel: any = null;
let _isModelLoading = false;

// Estado de carga del modelo
const modelStatus = {
  isLoaded: false,
  isLoading: false,
  error: null as string | null,
};

export const getModelStatus = () => ({ ...modelStatus });

// Esta función inicializa el modelo de embedding
export const initEmbeddingModel = async () => {
  try {
    if (_embeddingModel !== null) return _embeddingModel;
    if (_isModelLoading) return null;

    _isModelLoading = true;
    modelStatus.isLoading = true;
    
    console.log('Cargando modelo de embedding...');
    
    // Cargar el modelo para obtener embeddings de texto
    _embeddingModel = await pipeline('feature-extraction', MODEL_ID, {
      quantized: true // Usar versión cuantizada para menor uso de memoria
    });
    
    modelStatus.isLoaded = true;
    modelStatus.isLoading = false;
    _isModelLoading = false;
    
    console.log('Modelo de embedding cargado correctamente');
    return _embeddingModel;
  } catch (error) {
    console.error('Error al cargar el modelo de embedding:', error);
    modelStatus.error = error instanceof Error ? error.message : String(error);
    modelStatus.isLoading = false;
    _isModelLoading = false;
    throw error;
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
        response: "Para manejar una posible fractura: \n\n1. Inmoviliza la zona lesionada en la posición en que se encuentre.\n2. Aplica hielo envuelto en un paño (nunca directamente sobre la piel) durante 20 minutos.\n3. Eleva la extremidad lesionada si es posible y no causa dolor adicional.\n4. No intentes realinear un hueso roto o una articulación dislocada.\n5. Para transportar a la persona, inmoviliza la fractura con férulas improvisadas (revistas, tablillas).\n\nBusca atención médica de inmediato si:\n- Hay deformidad visible o asimetría.\n- Imposibilidad de mover la zona afectada.\n- Hinchazón severa o hematoma.\n- Exposición del hueso a través de la piel (fractura abierta)."
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
    
    // Si no encontramos una respuesta relevante, devolvemos un mensaje genérico
    if (highestSimilarity < 0.25) {
      return "Gracias por tu pregunta. No tengo suficiente información sobre ese tema específico. Te recomiendo consultar sobre temas como atragantamiento, RCP, quemaduras, fracturas o emergencias cardíacas, donde puedo proporcionarte información más detallada.";
    }
    
    return bestResponse;
  } catch (error) {
    console.error('Error al generar respuesta local:', error);
    return "Lo siento, ha ocurrido un error al procesar tu consulta con el modelo local. Por favor, intenta de nuevo más tarde o utiliza el modo simulado.";
  }
};

// Función auxiliar para calcular similitud entre embeddings
function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  // Implementación simplificada de similitud coseno
  let dotProduct = 0;
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
  }
  return dotProduct;
}
