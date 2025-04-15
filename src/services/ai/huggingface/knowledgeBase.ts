
import { calculateSimilarity } from '../utils';
import { embeddingPipeline } from './modelLoader';

// Store for embeddings used in retrieval
let knowledgeEmbeddings: Array<{text: string, embedding: number[]}> = [];

/**
 * Load sample knowledge for demonstration purposes
 */
export async function loadSampleKnowledge(): Promise<void> {
  // Basic knowledge for retrieval
  const firstAidKnowledge = [
    "Para realizar la RCP correctamente, coloca tus manos en el centro del pecho de la víctima, mantén los brazos rectos y presiona con fuerza y rapidez, al menos 5 cm de profundidad y a un ritmo de 100-120 compresiones por minuto.",
    
    "La maniobra de Heimlich se realiza colocándote detrás de la persona, rodeando su cintura con tus brazos, haciendo un puño con una mano y colocándolo ligeramente por encima del ombligo, sujetando el puño con la otra mano y presionando hacia dentro y hacia arriba con movimientos rápidos.",
    
    "Para tratar una quemadura leve, enfría la zona afectada con agua corriente a temperatura ambiente durante 10-20 minutos, no apliques hielo, retira anillos u objetos ajustados, cubre con un vendaje estéril, y toma analgésicos si es necesario para el dolor.",
    
    "Para detener una hemorragia nasal, siéntate e inclina ligeramente la cabeza hacia adelante, presiona la parte blanda de la nariz con el pulgar y el índice durante al menos 10-15 minutos sin interrupciones, y respira por la boca.",
    
    "La posición lateral de seguridad (PLS) es recomendada para personas inconscientes que respiran normalmente. Ayuda a mantener las vías respiratorias abiertas y previene la aspiración en caso de vómito."
  ];
  
  if (!embeddingPipeline) {
    console.error('No se puede cargar conocimiento porque el modelo no está inicializado');
    return;
  }
  
  // Compute embeddings for each knowledge piece
  for (const text of firstAidKnowledge) {
    try {
      const output = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
      const embedding = Array.from(output.data) as number[];
      knowledgeEmbeddings.push({ text, embedding });
    } catch (error) {
      console.error('Error al calcular embedding para:', text, error);
    }
  }
  
  console.log(`Cargado conocimiento de ejemplo: ${knowledgeEmbeddings.length} entradas`);
}

/**
 * Find the most relevant knowledge for a given query
 */
export function findRelevantKnowledge(queryEmbedding: number[]): { text: string, similarity: number } | null {
  if (knowledgeEmbeddings.length === 0) {
    return null;
  }
  
  let bestMatch = null;
  let highestSimilarity = -1;
  
  for (const knowledge of knowledgeEmbeddings) {
    const similarity = calculateSimilarity(queryEmbedding, knowledge.embedding);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = knowledge;
    }
  }
  
  if (bestMatch && highestSimilarity > 0.6) {
    return { text: bestMatch.text, similarity: highestSimilarity };
  }
  
  return null;
}
