
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { CircleCheck, CircleX, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Preguntas de ejemplo
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "¿Cuál es el primer paso al encontrar a una persona inconsciente?",
      options: [
        "Comenzar inmediatamente la reanimación cardiopulmonar (RCP)",
        "Verificar la seguridad del entorno y luego comprobar la respuesta de la persona",
        "Llamar inmediatamente a emergencias",
        "Colocar a la persona en posición de recuperación"
      ],
      correctAnswer: 1,
      explanation: "Antes de actuar, verifica que el entorno sea seguro para ti y para la víctima. Luego, comprueba si la persona responde llamándola o sacudiéndola suavemente."
    },
    {
      id: 2,
      question: "¿Cuál es la proporción correcta de compresiones torácicas y ventilaciones en la RCP para adultos?",
      options: [
        "15 compresiones seguidas de 2 ventilaciones",
        "30 compresiones seguidas de 2 ventilaciones",
        "5 compresiones seguidas de 1 ventilación",
        "10 compresiones seguidas de 1 ventilación"
      ],
      correctAnswer: 1,
      explanation: "La proporción recomendada actualmente es de 30 compresiones seguidas de 2 ventilaciones. Sin embargo, si no estás entrenado o no puedes realizar ventilaciones, se recomienda realizar solo compresiones torácicas continuas a un ritmo de 100-120 por minuto."
    },
    {
      id: 3,
      question: "¿Qué debes hacer primero ante una quemadura leve?",
      options: [
        "Aplicar hielo directamente sobre la zona quemada",
        "Cubrir inmediatamente con vendaje apretado",
        "Aplicar pasta dental para aliviar el dolor",
        "Enfriar la zona con agua corriente a temperatura ambiente durante 10-20 minutos"
      ],
      correctAnswer: 3,
      explanation: "El primer paso para tratar una quemadura leve es enfriar la zona afectada con agua corriente a temperatura ambiente (no fría ni helada) durante 10-20 minutos para detener el proceso de quemado y aliviar el dolor."
    },
    {
      id: 4,
      question: "¿Cuál es la posición recomendada para una persona inconsciente que respira normalmente?",
      options: [
        "Posición supina (boca arriba)",
        "Posición prona (boca abajo)",
        "Posición lateral de seguridad",
        "Sentada con la cabeza inclinada hacia adelante"
      ],
      correctAnswer: 2,
      explanation: "La posición lateral de seguridad (PLS) es la recomendada para personas inconscientes que respiran normalmente. Esta posición ayuda a mantener las vías respiratorias abiertas y previene la aspiración en caso de vómito."
    },
    {
      id: 5,
      question: "¿Qué debes hacer si una persona está sufriendo un ataque cardíaco?",
      options: [
        "Darle aspirina y un vaso de agua si no es alérgica y puede tragar",
        "Hacerle beber alcohol para dilatar los vasos sanguíneos",
        "Sumergir sus manos en agua fría",
        "Hacerle correr para aumentar la circulación"
      ],
      correctAnswer: 0,
      explanation: "Durante un posible ataque cardíaco, se puede administrar aspirina (ácido acetilsalicílico) si la persona no es alérgica y puede tragar. La aspirina ayuda a prevenir la formación de coágulos. Sin embargo, lo más importante es llamar inmediatamente a emergencias y mantener a la persona en reposo, en una posición cómoda, generalmente sentada."
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
  };

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Quiz de Primeros Auxilios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pon a prueba tus conocimientos sobre primeros auxilios con nuestro quiz interactivo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <div className="auxilio-card p-6 md:p-8">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                  <span className="text-sm font-medium text-auxilio-azul">Puntuación: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-auxilio-azul h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-start">
                  <HelpCircle className="h-6 w-6 text-auxilio-azul mr-2 flex-shrink-0 mt-0.5" />
                  <span>{currentQuestion.question}</span>
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-colors ${
                      selectedOption === index
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                        : 'border-gray-200 hover:border-auxilio-azul'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => !showResult && handleOptionSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-start">
                      {selectedOption === index && (
                        <div className="flex-shrink-0 mr-2">
                          {index === currentQuestion.correctAnswer ? (
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

              {/* Result explanation */}
              {showResult && (
                <div className={`p-4 rounded-md mb-6 ${
                  selectedOption === currentQuestion.correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className="font-semibold mb-2">
                    {selectedOption === currentQuestion.correctAnswer
                      ? '¡Correcto!'
                      : 'Respuesta incorrecta'}
                  </h3>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next button */}
              {showResult && (
                <div className="flex justify-end">
                  <button 
                    className="auxilio-btn-primary flex items-center"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>Siguiente pregunta <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Ver resultados <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auxilio-card p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold text-auxilio-azul mb-4">Quiz completado</h2>
              <p className="text-lg mb-2">Tu puntuación final:</p>
              <div className="text-5xl font-bold text-auxilio-azul mb-6">{score} / {questions.length}</div>
              <p className="mb-6">
                {score === questions.length 
                  ? '¡Excelente! Tienes un gran conocimiento sobre primeros auxilios.' 
                  : score >= questions.length / 2 
                    ? 'Buen trabajo, pero aún hay espacio para mejorar tus conocimientos.' 
                    : 'Es recomendable que sigas aprendiendo sobre primeros auxilios.'}
              </p>
              <button 
                className="auxilio-btn-primary flex items-center mx-auto"
                onClick={resetQuiz}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
