
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
  onFeedback: (messageId: string, type: 'like' | 'dislike') => void;
}

const formatMessageText = (text: string) => {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  return (
    <div
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
                onClick={() => onFeedback(message.id, 'like')}
                className={`p-1 rounded-full ${message.feedback === 'like' ? 'bg-green-100' : 'hover:bg-gray-200'}`}
                aria-label="Me gusta"
              >
                <ThumbsUp className="h-3 w-3 text-gray-600" />
              </button>
              <button 
                onClick={() => onFeedback(message.id, 'dislike')}
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
  );
};

export default ChatMessage;
