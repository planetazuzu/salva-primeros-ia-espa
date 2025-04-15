
import React, { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex space-x-2">
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          aria-label="Opciones adicionales"
        >
          <Plus className="h-5 w-5" />
        </button>
        <div className="flex-grow relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu consulta sobre primeros auxilios..."
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-auxilio-azul resize-none min-h-[44px]"
            rows={1}
            disabled={loading}
          />
          <div className="absolute right-2 bottom-2 text-xs text-gray-400">
            {input.length > 0 && !loading ? 'Enter para enviar' : ''}
          </div>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          className={`p-2 rounded-full ${
            input.trim() && !loading
              ? 'bg-auxilio-azul text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
          aria-label="Enviar mensaje"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
