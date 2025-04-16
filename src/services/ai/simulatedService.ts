
// Modelo de datos para las respuestas simuladas con categorías
interface SimulatedResponse {
  keywords: string[];
  category: string;
  response: string;
  priority: number;
}

// Base de conocimiento para el asistente simulado
const knowledgeBase: SimulatedResponse[] = [
  {
    keywords: ['atragantamiento', 'asfixia', 'atragantado', 'heimlich'],
    category: 'emergencias-respiratorias',
    response: 
      'Para ayudar a alguien que se está atragantando: \n\n' +
      '1. Anima a la persona a toser para expulsar el objeto. \n' +
      '2. Si no puede toser, hablar o respirar, realiza la maniobra de Heimlich: \n' +
      '   - Colócate detrás de la persona y rodea su cintura con tus brazos. \n' +
      '   - Haz un puño con una mano y colócalo ligeramente por encima del ombligo. \n' +
      '   - Sujeta el puño con la otra mano y presiona hacia dentro y hacia arriba con movimientos rápidos. \n' +
      '3. Continúa hasta que el objeto sea expulsado o la persona pierda el conocimiento. \n' +
      '4. Si pierde el conocimiento, comienza la RCP.',
    priority: 90
  },
  {
    keywords: ['rcp', 'reanimación', 'cardiopulmonar', 'cardiac', 'paro', 'cardiaco'],
    category: 'soporte-vital',
    response: 
      'Pasos básicos para realizar la RCP en adultos: \n\n' +
      '1. Asegura la escena y comprueba si la persona responde. \n' +
      '2. Si no responde y no respira o solo jadea, llama a emergencias. \n' +
      '3. Coloca a la persona boca arriba en una superficie firme. \n' +
      '4. Coloca las manos una sobre otra en el centro del pecho. \n' +
      '5. Mantén los brazos rectos y usa el peso de tu cuerpo para comprimir. \n' +
      '6. Realiza compresiones de al menos 5 cm de profundidad a un ritmo de 100-120 por minuto. \n' +
      '7. Si estás entrenado, da 2 respiraciones después de cada 30 compresiones. \n' +
      '8. Continúa hasta que llegue ayuda profesional o la persona muestre signos de vida.',
    priority: 95
  },
  {
    keywords: ['quemadura', 'quemado', 'quemaduras', 'quemar'],
    category: 'lesiones-piel',
    response: 
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
      '- Es causada por productos químicos o electricidad.',
    priority: 85
  },
  {
    keywords: ['hemorragia', 'sangrado', 'nasal', 'nariz', 'epistaxis'],
    category: 'hemorragias',
    response: 
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
      '- Ocurre frecuentemente.',
    priority: 80
  },
  {
    keywords: ['corte', 'herida', 'cortadura', 'sangrado', 'hemorragia'],
    category: 'hemorragias',
    response: 
      'Para tratar un corte o herida con sangrado: \n\n' +
      '1. Lávate las manos antes de tratar la herida si es posible. \n' +
      '2. Aplica presión directa sobre la herida con un paño limpio o gasa para detener el sangrado. \n' +
      '3. Limpia la herida con agua corriente cuando pare de sangrar. Puedes usar jabón suave para limpiar alrededor de la herida, evitando poner jabón directamente en la herida. \n' +
      '4. Aplica un antiséptico suave como la povidona yodada. \n' +
      '5. Cubre la herida con un vendaje estéril o un apósito limpio. \n\n' +
      'Busca atención médica si: \n' +
      '- El sangrado es severo o no para después de 15 minutos de presión. \n' +
      '- La herida es profunda o los bordes están muy separados. \n' +
      '- Hay objetos o suciedad dentro de la herida que no puedes extraer fácilmente. \n' +
      '- La herida fue causada por un objeto sucio o oxidado. \n' +
      '- No has recibido la vacuna del tétanos en los últimos 5-10 años.',
    priority: 85
  },
  {
    keywords: ['posición lateral', 'inconsciencia', 'desmayo', 'pls'],
    category: 'soporte-vital',
    response: 
      'La Posición Lateral de Seguridad (PLS) se utiliza para personas inconscientes que respiran normalmente: \n\n' +
      '1. Arrodíllate junto a la persona y asegúrate de que ambas piernas estén estiradas. \n' +
      '2. Coloca el brazo más cercano a ti en ángulo recto con respecto al cuerpo, con la palma hacia arriba. \n' +
      '3. Trae el otro brazo cruzando el pecho y mantén el dorso de la mano contra la mejilla más cercana a ti. \n' +
      '4. Con tu otra mano, sujeta la pierna más alejada justo por encima de la rodilla y tírala hacia arriba, manteniendo el pie en el suelo. \n' +
      '5. Mientras mantienes la mano de la persona presionada contra su mejilla, tira de la pierna más alejada para hacer girar a la persona hacia ti y colocarla de lado. \n' +
      '6. Ajusta la pierna superior para que tanto la cadera como la rodilla estén dobladas en ángulos rectos. \n' +
      '7. Inclina la cabeza hacia atrás para asegurar que la vía aérea esté abierta. \n' +
      '8. Llama a emergencias y monitorea la respiración hasta que llegue la ayuda.',
    priority: 80
  },
  {
    keywords: ['fractura', 'hueso roto', 'esguince', 'torcedura'],
    category: 'lesiones-musculoesqueléticas',
    response: 
      'Para manejar una posible fractura o esguince: \n\n' +
      '1. Inmoviliza la zona lesionada: no muevas la parte afectada. \n' +
      '2. Aplica hielo envuelto en un paño (nunca directamente sobre la piel) durante 20 minutos cada hora. \n' +
      '3. Compresión: si es un esguince, puedes aplicar un vendaje compresivo sin apretar demasiado. \n' +
      '4. Elevación: mantén la zona lesionada elevada por encima del nivel del corazón si es posible. \n' +
      '5. No intentes realinear un hueso roto o una articulación dislocada. \n\n' +
      'Busca atención médica inmediata si: \n' +
      '- Sospechas una fractura (especialmente si hay deformidad visible). \n' +
      '- Hay dolor intenso y no puedes mover la parte afectada. \n' +
      '- Hay entumecimiento, hormigueo o cambio de color en la extremidad. \n' +
      '- La lesión afecta a la cabeza, cuello o espalda.',
    priority: 75
  },
  {
    keywords: ['botiquín', 'equipo', 'primeros auxilios', 'kit'],
    category: 'recursos',
    response: 
      'Un botiquín básico de primeros auxilios debe contener: \n\n' +
      '1. Materiales de limpieza y protección: \n' +
      '   - Guantes desechables \n' +
      '   - Solución antiséptica (povidona yodada, clorhexidina) \n' +
      '   - Jabón neutro \n' +
      '   - Alcohol al 70% \n' +
      '   - Toallitas antisépticas \n\n' +
      '2. Material de curación: \n' +
      '   - Gasas estériles de distintos tamaños \n' +
      '   - Vendas elásticas y de gasa \n' +
      '   - Esparadrapo hipoalergénico \n' +
      '   - Tiritas de varios tamaños \n' +
      '   - Apósitos estériles \n\n' +
      '3. Instrumentos y otros elementos: \n' +
      '   - Tijeras de punta roma \n' +
      '   - Pinzas \n' +
      '   - Termómetro \n' +
      '   - Manta térmica \n' +
      '   - Bolsas de frío instantáneo \n\n' +
      '4. Medicamentos básicos: \n' +
      '   - Analgésicos/antipiréticos (paracetamol, ibuprofeno) \n' +
      '   - Antihistamínicos para reacciones alérgicas \n' +
      '   - Crema para quemaduras \n' +
      '   - Suero fisiológico \n\n' +
      '5. Información: \n' +
      '   - Lista de teléfonos de emergencia \n' +
      '   - Guía básica de primeros auxilios',
    priority: 60
  },
  {
    keywords: ['embarazo', 'parto', 'embarazada', 'bebé', 'labor'],
    category: 'emergencias-obstétricas',
    response: 
      'Para asistir un parto de emergencia: \n\n' +
      '1. Llama inmediatamente a los servicios de emergencia (112, 911). \n' +
      '2. Prepara un espacio limpio y tranquilo. Lávate bien las manos si es posible. \n' +
      '3. Coloca a la madre en una superficie plana, con las rodillas flexionadas y las piernas separadas. \n' +
      '4. Coloca toallas o sábanas limpias debajo de las caderas de la madre. \n' +
      '5. Cuando la cabeza del bebé sea visible, pídele a la madre que jadee o haga respiraciones cortas y que evite empujar. \n' +
      '6. Sostén suavemente la cabeza del bebé mientras sale, pero NO tires del bebé. \n' +
      '7. Si el cordón umbilical está alrededor del cuello del bebé, desliza suavemente un dedo por debajo y muévelo con cuidado por encima de la cabeza. \n' +
      '8. Después de que nazca el bebé, límpialo suavemente y mantenlo al mismo nivel que la madre (no elevarlo por encima). \n' +
      '9. Coloca al bebé sobre el pecho de la madre para mantenerlo caliente y favorece el contacto piel con piel. \n' +
      '10. NO cortes el cordón umbilical – espera a la llegada de los servicios de emergencia. \n' +
      '11. La placenta normalmente se expulsa en los 30 minutos siguientes. No tires del cordón para acelerar el proceso. \n' +
      '12. Guarda la placenta para que los profesionales médicos la examinen.',
    priority: 90
  },
  {
    keywords: ['convulsión', 'convulsiones', 'epilepsia', 'ataque', 'epiléptico'],
    category: 'emergencias-neurológicas',
    response: 
      'Para ayudar a alguien durante una convulsión: \n\n' +
      '1. Mantén la calma y cronometra la duración de la convulsión. \n' +
      '2. Protege a la persona de lesiones: retira objetos peligrosos del área. \n' +
      '3. No intentes sujetar a la persona ni restringir sus movimientos. \n' +
      '4. No introduzcas nada en su boca. \n' +
      '5. Coloca algo blando y plano bajo su cabeza si es posible. \n' +
      '6. Afloja prendas ajustadas alrededor del cuello. \n' +
      '7. Coloca a la persona de lado (posición lateral de seguridad) una vez que las convulsiones hayan cesado. \n\n' +
      'Llama a emergencias si: \n' +
      '- Es la primera convulsión de la persona. \n' +
      '- La convulsión dura más de 5 minutos. \n' +
      '- La persona no recupera la conciencia después de la convulsión. \n' +
      '- La persona tiene convulsiones repetidas. \n' +
      '- La persona se ha lastimado durante la convulsión. \n' +
      '- La persona está embarazada o tiene una condición médica conocida.',
    priority: 85
  }
];

// Mantener registro de las consultas de los usuarios para análisis
let userQueries: {
  query: string;
  timestamp: Date;
  category?: string;
  matched?: boolean;
}[] = [];

// Función para guardar consultas de usuario para análisis posterior
export const saveUserQuery = (query: string, category?: string, matched: boolean = false) => {
  userQueries.push({
    query,
    timestamp: new Date(),
    category,
    matched
  });
  
  // Si la lista se hace muy larga, conservamos solo las últimas 100 consultas
  if (userQueries.length > 100) {
    userQueries = userQueries.slice(-100);
  }
  
  // En una implementación real, aquí enviaríamos los datos a un backend
  console.log(`Consulta guardada: "${query}". Categoría: ${category || 'no clasificada'}`);
};

// Función para obtener las consultas más frecuentes
export const getFrequentQueries = (limit: number = 5): {query: string, count: number}[] => {
  const queryCounts: Record<string, number> = {};
  
  // Contar ocurrencias de cada consulta
  userQueries.forEach(item => {
    // Normalizamos la consulta (minúsculas y sin espacios extras)
    const normalizedQuery = item.query.toLowerCase().trim();
    queryCounts[normalizedQuery] = (queryCounts[normalizedQuery] || 0) + 1;
  });
  
  // Convertir a array y ordenar por frecuencia
  return Object.entries(queryCounts)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// Función para clasificar una consulta dentro de una categoría
const classifyQuery = (query: string): { category: string; confidence: number } | null => {
  const normalizedQuery = query.toLowerCase();
  
  let bestMatch: { response: SimulatedResponse; matchCount: number } | null = null;
  
  for (const response of knowledgeBase) {
    const matchCount = response.keywords.filter(keyword => 
      normalizedQuery.includes(keyword.toLowerCase())
    ).length;
    
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.matchCount || 
        (matchCount === bestMatch.matchCount && response.priority > bestMatch.response.priority))) {
      bestMatch = { response, matchCount };
    }
  }
  
  if (bestMatch) {
    // Calculamos una confianza simple basada en la coincidencia
    const confidence = Math.min(bestMatch.matchCount * 0.3, 0.9);
    return { 
      category: bestMatch.response.category, 
      confidence 
    };
  }
  
  return null;
};

// Función para encontrar respuestas relevantes basadas en el contexto de la conversación
const findContextualResponses = (
  currentQuery: string, 
  conversationHistory: Array<{sender: string, text: string}> = []
): string | null => {
  // Combinamos la consulta actual con el contexto de la conversación
  let contextualQuery = currentQuery.toLowerCase();
  
  // Extraemos información relevante de la conversación anterior (últimos 3 mensajes)
  const recentHistory = conversationHistory.slice(-3);
  
  for (const msg of recentHistory) {
    if (msg.sender === 'user') {
      // Añadimos las palabras clave de consultas anteriores para mejorar el contexto
      contextualQuery += " " + msg.text.toLowerCase();
    }
  }
  
  // Buscamos coincidencias en la base de conocimiento
  let bestMatches: {response: SimulatedResponse, score: number}[] = [];
  
  for (const response of knowledgeBase) {
    // Calculamos una puntuación basada en coincidencias de palabras clave y prioridad
    let score = 0;
    for (const keyword of response.keywords) {
      if (contextualQuery.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    
    if (score > 0) {
      // La puntuación final incluye la prioridad para desempatar
      const finalScore = score + (response.priority / 100);
      bestMatches.push({ response, score: finalScore });
    }
  }
  
  // Ordenamos por puntuación y tomamos la mejor coincidencia
  bestMatches.sort((a, b) => b.score - a.score);
  
  if (bestMatches.length > 0) {
    // Guardamos la consulta para análisis
    saveUserQuery(currentQuery, bestMatches[0].response.category, true);
    return bestMatches[0].response.response;
  }
  
  // Si no hay coincidencias, guardamos la consulta sin categoría
  saveUserQuery(currentQuery);
  return null;
};

// Función para analizar tendencias en las consultas
export const analyzeQueryTrends = (): {
  topCategories: {category: string, count: number}[];
  queryVolume: {date: string, count: number}[];
  unansweredQueries: string[];
} => {
  // Análisis de categorías
  const categoryCounts: Record<string, number> = {};
  userQueries.forEach(query => {
    if (query.category) {
      categoryCounts[query.category] = (categoryCounts[query.category] || 0) + 1;
    }
  });
  
  const topCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Análisis de volumen por día
  const queryByDate: Record<string, number> = {};
  userQueries.forEach(query => {
    const date = query.timestamp.toISOString().split('T')[0];
    queryByDate[date] = (queryByDate[date] || 0) + 1;
  });
  
  const queryVolume = Object.entries(queryByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
  
  // Consultas sin respuesta
  const unansweredQueries = userQueries
    .filter(q => !q.matched)
    .map(q => q.query)
    .slice(0, 10);
  
  return {
    topCategories,
    queryVolume,
    unansweredQueries
  };
};

// Function to generate simulated responses based on keywords and conversation history
export const generateSimulatedResponse = (
  userMessage: string,
  conversationHistory: Array<{sender: string, text: string}> = []
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Intentamos encontrar una respuesta contextual
      const contextualResponse = findContextualResponses(userMessage, conversationHistory);
      
      if (contextualResponse) {
        resolve(contextualResponse);
        return;
      }
      
      // Si no hay respuesta contextual, usamos una respuesta genérica
      resolve(
        'Gracias por tu pregunta. Como asistente virtual básico, tengo información limitada. Para obtener consejos específicos sobre primeros auxilios, te recomiendo: \n\n' +
        '1. Explorar las secciones educativas de nuestra plataforma. \n' +
        '2. Consultar nuestras guías sobre situaciones comunes como atragantamiento, RCP, quemaduras, hemorragias o fracturas. \n' +
        '3. Para emergencias reales, siempre llama inmediatamente a los servicios de emergencia (911, 112 o el número local).'
      );
    }, 1000);
  });
};

// Exportamos funciones de análisis para su uso en el panel de administración
export const getFrequentQueriesData = () => getFrequentQueries(10);
export const getQueryTrendsData = () => analyzeQueryTrends();

