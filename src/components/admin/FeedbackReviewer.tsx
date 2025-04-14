
import { ChevronRight, Users, Database } from 'lucide-react';

interface FeedbackItem {
  id: string;
  question: string;
  response: string;
  feedback: 'positive' | 'negative';
  comment?: string;
  date: string;
}

const FeedbackReviewer = () => {
  // Mock feedback data
  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      question: '¿Cómo tratar una quemadura de segundo grado?',
      response: 'Para tratar una quemadura de segundo grado, primero enfría la zona con agua corriente...',
      feedback: 'positive',
      date: '2023-04-11'
    },
    {
      id: '2',
      question: '¿Qué hacer en caso de ataque cardíaco?',
      response: 'En caso de un posible ataque cardíaco, lo primero es llamar a emergencias...',
      feedback: 'negative',
      comment: 'La respuesta no mencionó la posición correcta para la persona afectada',
      date: '2023-04-09'
    },
    {
      id: '3',
      question: '¿Cómo realizar correctamente un vendaje compresivo?',
      response: 'Para realizar un vendaje compresivo, primero coloca una gasa estéril sobre la herida...',
      feedback: 'positive',
      date: '2023-04-07'
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Feedback de Usuarios</h2>
      <p className="text-gray-600 mb-6">
        Revisa y utiliza el feedback de los usuarios para mejorar las respuestas del asistente de IA.
      </p>

      <div className="space-y-4">
        {feedbackItems.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center border-b px-4 py-3 bg-gray-50">
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    item.feedback === 'positive' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <span className="font-medium">Feedback {item.feedback === 'positive' ? 'positivo' : 'negativo'}</span>
              </div>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-medium flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  Pregunta del usuario:
                </h3>
                <p className="mt-1 text-gray-700">{item.question}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium flex items-center">
                  <Database className="h-4 w-4 mr-1 text-gray-500" />
                  Respuesta de la IA:
                </h3>
                <p className="mt-1 text-gray-700">{item.response}</p>
              </div>
              {item.comment && (
                <div className="mb-4">
                  <h3 className="font-medium">Comentario del usuario:</h3>
                  <p className="mt-1 text-gray-700">{item.comment}</p>
                </div>
              )}
              <div className="flex justify-end mt-2">
                <button className="auxilio-btn-secondary flex items-center text-sm">
                  Usar para entrenamiento <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackReviewer;
