
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { CircleCheck, CircleX, CheckCircle2, AlertCircle, BookOpen, Trophy, BarChart3, ListFilter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateOpenAiResponse, generateSimulatedResponse } from '@/services/ai';

// Tipos de datos para escenarios
interface ScenarioQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  topic: string;
  questions: ScenarioQuestion[];
  imageUrl?: string;
  videoUrl?: string;
}

// Mock data para escenarios
const mockScenarios: Scenario[] = [
  {
    id: '1',
    title: 'Emergencia en el parque',
    description: 'Te encuentras en un parque cuando una persona colapsa repentinamente mientras corría. ¿Cómo actuarías?',
    difficulty: 'principiante',
    topic: 'RCP',
    imageUrl: '/lovable-uploads/1c6800c8-567d-4a6f-ad12-476fecc055e3.png',
    questions: [
      {
        id: '1-1',
        text: '¿Cuál es la primera acción que debes tomar al ver a la persona colapsar?',
        options: [
          'Comenzar inmediatamente RCP',
          'Verificar la seguridad del entorno y luego comprobar respuesta',
          'Llamar a emergencias de inmediato sin hacer nada más',
          'Buscar ayuda de alguien más capacitado'
        ],
        correctIndex: 1,
        explanation: 'Siempre es fundamental verificar primero que el entorno sea seguro para ti y para la víctima antes de acercarte. Luego debes comprobar si la persona responde llamándola o sacudiéndola suavemente. Si no responde, pide a alguien que llame a emergencias mientras tú evalúas si respira.'
      },
      {
        id: '1-2',
        text: 'La persona no responde y no respira normalmente. ¿Qué debes hacer ahora?',
        options: [
          'Colocarla en posición lateral de seguridad',
          'Darle agua para que recobre el conocimiento',
          'Iniciar RCP comenzando con 30 compresiones torácicas',
          'Esperar a que lleguen los servicios de emergencia'
        ],
        correctIndex: 2,
        explanation: 'Si la persona no responde y no respira o lo hace anormalmente (jadeos), debes iniciar RCP inmediatamente comenzando con 30 compresiones torácicas, seguidas de 2 ventilaciones si estás capacitado. Si no, realiza solo compresiones continuas a un ritmo de 100-120 por minuto.'
      },
      {
        id: '1-3',
        text: 'Ves un desfibrilador externo automático (DEA) cerca. ¿Cuándo deberías usarlo?',
        options: [
          'Solo si la persona tiene antecedentes cardíacos conocidos',
          'Nunca, solo los profesionales pueden usar un DEA',
          'Tan pronto como esté disponible, siguiendo sus instrucciones',
          'Solo después de 5 minutos de RCP sin respuesta'
        ],
        correctIndex: 2,
        explanation: 'Un DEA debe utilizarse tan pronto como esté disponible. Estos dispositivos están diseñados para ser usados por cualquier persona siguiendo sus instrucciones de voz. El DEA analizará el ritmo cardíaco y solo recomendará una descarga si es necesario.'
      }
    ]
  },
  {
    id: '2',
    title: 'Situación de atragantamiento en un restaurante',
    description: 'Estás en un restaurante cuando una persona cercana comienza a mostrar signos de atragantamiento. ¿Cómo lo identificarías y qué harías?',
    difficulty: 'intermedio',
    topic: 'Atragantamiento',
    imageUrl: '/lovable-uploads/97b9846a-fbfa-4b66-9fe4-d4354331db09.png',
    questions: [
      {
        id: '2-1',
        text: '¿Cuál es el signo universal de atragantamiento?',
        options: [
          'Toser fuertemente',
          'Sujetarse el pecho con ambas manos',
          'Sujetarse la garganta con una o ambas manos',
          'Inclinarse hacia adelante sosteniendo la cabeza'
        ],
        correctIndex: 2,
        explanation: 'El signo universal de atragantamiento es cuando la persona se sujeta la garganta con una o ambas manos. Esto indica que la persona no puede hablar, respirar o toser efectivamente debido a una obstrucción en sus vías respiratorias.'
      },
      {
        id: '2-2',
        text: 'La persona puede toser, aunque con dificultad. ¿Cuál es la acción más apropiada?',
        options: [
          'Realizar inmediatamente la maniobra de Heimlich',
          'Darle golpes en la espalda para ayudar a expulsar el objeto',
          'Animarla a seguir tosiendo mientras la observas atentamente',
          'Ofrecerle agua para que el objeto baje'
        ],
        correctIndex: 2,
        explanation: 'Si la persona puede toser, aunque sea con dificultad, significa que aún tiene las vías respiratorias parcialmente abiertas. La acción correcta es animarla a seguir tosiendo, ya que la tos es el mecanismo más efectivo para expulsar un objeto extraño. Debes observarla atentamente para intervenir si la situación empeora.'
      }
    ]
  }
];

const EscenariosPage = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>(mockScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [userScore, setUserScore] = useState({ correct: 0, total: 0 });
  const [scenarioCompleted, setScenarioCompleted] = useState(false);
  const { toast } = useToast();

  // Filtrar escenarios por dificultad
  const filteredScenarios = activeTab === 'todos' 
    ? scenarios 
    : scenarios.filter(s => s.difficulty === activeTab);

  const startScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAiExplanation(null);
    setScenarioCompleted(false);
  };

  const exitScenario = () => {
    setCurrentScenario(null);
  };

  const handleOptionSelect = async (optionIndex: number) => {
    if (selectedOption !== null || !currentScenario) return;
    
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    
    const currentQuestion = currentScenario.questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    
    // Actualizar puntuación
    setUserScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
    
    // Solicitar explicación más detallada a la IA
    setIsLoadingAI(true);
    try {
      // Contexto de la pregunta y respuesta
      const questionContext = `
        Pregunta: ${currentQuestion.text}
        Opción seleccionada: ${currentQuestion.options[optionIndex]}
        Respuesta correcta: ${currentQuestion.options[currentQuestion.correctIndex]}
        Esta respuesta es: ${isCorrect ? 'CORRECTA' : 'INCORRECTA'}
        Explicación básica: ${currentQuestion.explanation}
      `;
      
      // Prompt para la IA
      const prompt = `
        Eres un instructor experto en primeros auxilios. Explica por qué esta respuesta es ${isCorrect ? 'correcta' : 'incorrecta'} 
        y proporciona información adicional educativa sobre este concepto de primeros auxilios.
        Sé detallado pero conciso (máximo 4 párrafos).
        
        ${questionContext}
      `;
      
      // Intentar usar OpenAI primero, si falla usar respuesta simulada
      let aiResponse;
      try {
        aiResponse = await generateOpenAiResponse(prompt, [{ sender: 'system', text: 'Instructor de primeros auxilios' }]);
      } catch (error) {
        console.log('Fallback a respuesta simulada', error);
        aiResponse = currentQuestion.explanation + "\n\nPara obtener explicaciones más detalladas, intenta conectar con OpenAI.";
      }
      
      setAiExplanation(aiResponse);
    } catch (error) {
      console.error('Error al obtener explicación de IA:', error);
      // Usar la explicación básica si falla la IA
      setAiExplanation(currentQuestion.explanation);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleNextQuestion = () => {
    if (!currentScenario) return;
    
    if (currentQuestionIndex < currentScenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setAiExplanation(null);
    } else {
      // Escenario completado
      setScenarioCompleted(true);
      
      // Mostrar toast con resultado
      const correctAnswers = userScore.correct - userScore.total + currentScenario.questions.length;
      const totalQuestions = currentScenario.questions.length;
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);
      
      toast({
        title: `Escenario completado: ${percentage}%`,
        description: `Has respondido correctamente ${correctAnswers} de ${totalQuestions} preguntas.`,
        variant: percentage >= 70 ? "default" : "destructive"
      });
    }
  };

  // Renderizar la lista de escenarios disponibles
  const renderScenariosList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredScenarios.map(scenario => (
        <Card key={scenario.id} className="overflow-hidden hover:shadow-md transition-shadow">
          {scenario.imageUrl && (
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={scenario.imageUrl} 
                alt={scenario.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{scenario.title}</CardTitle>
              <Badge variant={
                scenario.difficulty === 'principiante' ? 'outline' : 
                scenario.difficulty === 'intermedio' ? 'secondary' : 'destructive'
              }>
                {scenario.difficulty}
              </Badge>
            </div>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{scenario.topic}</span>
              <span className="mx-2">•</span>
              <span>{scenario.questions.length} preguntas</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => startScenario(scenario)} className="w-full">
              Iniciar escenario
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  // Renderizar el escenario actual
  const renderCurrentScenario = () => {
    if (!currentScenario) return null;
    
    const currentQuestion = currentScenario.questions[currentQuestionIndex];
    const isCorrect = selectedOption !== null && selectedOption === currentQuestion.correctIndex;
    
    return (
      <div className="space-y-6">
        {/* Cabecera del escenario */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-auxilio-azul">{currentScenario.title}</h2>
            <p className="text-muted-foreground">{currentScenario.description}</p>
          </div>
          <Button variant="outline" onClick={exitScenario}>
            Salir
          </Button>
        </div>
        
        {/* Progreso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Pregunta {currentQuestionIndex + 1} de {currentScenario.questions.length}</span>
            <span>Dificultad: {currentScenario.difficulty}</span>
          </div>
          <Progress 
            value={((currentQuestionIndex) / currentScenario.questions.length) * 100} 
            className="h-2"
          />
        </div>
        
        {/* Contenido multimedia (si existe) */}
        {currentScenario.imageUrl && !scenarioCompleted && (
          <div className="bg-muted rounded-lg overflow-hidden">
            <img 
              src={currentScenario.imageUrl} 
              alt={currentScenario.title} 
              className="w-full max-h-64 object-contain my-4"
            />
          </div>
        )}
        
        {/* Resultados finales */}
        {scenarioCompleted ? (
          <Card className="p-6 text-center">
            <div className="mb-4">
              <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
              <h3 className="text-2xl font-bold">¡Escenario completado!</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-lg mb-2">Tu puntuación:</p>
                <div className="text-3xl font-bold">
                  {userScore.correct - userScore.total + currentScenario.questions.length} / {currentScenario.questions.length}
                </div>
              </div>
              
              <Progress 
                value={((userScore.correct - userScore.total + currentScenario.questions.length) / currentScenario.questions.length) * 100}
                className="h-3"
              />
              
              <p className="text-muted-foreground">
                {((userScore.correct - userScore.total + currentScenario.questions.length) / currentScenario.questions.length) >= 0.7 
                  ? "¡Buen trabajo! Has completado este escenario con éxito."
                  : "Necesitas practicar más. Revisa los conceptos e intenta de nuevo."}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button onClick={() => {
                startScenario(currentScenario);
              }}>
                Reintentar escenario
              </Button>
              <Button variant="outline" onClick={exitScenario}>
                Volver a escenarios
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Pregunta actual */}
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-4">{currentQuestion.text}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-colors ${
                      selectedOption === index
                        ? index === currentQuestion.correctIndex
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                        : 'border-gray-200 hover:border-auxilio-azul'
                    } ${selectedOption !== null ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-start">
                      {selectedOption === index && (
                        <div className="flex-shrink-0 mr-2">
                          {index === currentQuestion.correctIndex ? (
                            <CircleCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <CircleX className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            
            {/* Explicación */}
            {showExplanation && (
              <Card className={`p-6 ${
                isCorrect ? 'border-green-200' : 'border-red-200'
              }`}>
                <div className="flex items-center mb-4">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                  )}
                  <h3 className="text-lg font-medium">
                    {isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                  </h3>
                </div>
                
                <div className="prose max-w-none">
                  <p>{currentQuestion.explanation}</p>
                  
                  {isLoadingAI ? (
                    <div className="flex items-center mt-4 text-muted-foreground">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-auxilio-azul border-t-transparent rounded-full"></div>
                      <span>Obteniendo explicación detallada...</span>
                    </div>
                  ) : aiExplanation ? (
                    <>
                      <h4 className="text-md font-medium mt-4">Explicación detallada:</h4>
                      <div className="mt-2 p-4 bg-slate-50 rounded-md text-sm">
                        {aiExplanation.split('\n').map((line, i) => (
                          <p key={i} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex < currentScenario.questions.length - 1 
                      ? 'Siguiente pregunta' 
                      : 'Ver resultados'}
                  </Button>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Escenarios Interactivos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pon a prueba tus conocimientos con situaciones realistas y recibe retroalimentación detallada.
          </p>
        </div>
        
        {currentScenario ? (
          renderCurrentScenario()
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="principiante">Principiante</TabsTrigger>
                  <TabsTrigger value="intermedio">Intermedio</TabsTrigger>
                  <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Tu puntuación: {userScore.correct}/{userScore.total}</span>
              </div>
            </div>
            
            {renderScenariosList()}
          </>
        )}
      </div>
    </Layout>
  );
};

export default EscenariosPage;
