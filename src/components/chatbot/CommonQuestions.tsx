
import React from 'react';

interface CommonQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const CommonQuestions: React.FC<CommonQuestionsProps> = ({ questions, onSelectQuestion }) => {
  return (
    <div className="auxilio-card p-4">
      <h2 className="font-semibold text-auxilio-azul mb-3">Preguntas frecuentes</h2>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            className="w-full text-left p-2 text-sm rounded-md hover:bg-blue-50 transition-colors"
            onClick={() => onSelectQuestion(question)}
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
  );
};

export default CommonQuestions;
