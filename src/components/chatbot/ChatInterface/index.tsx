
import React from 'react';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import ChatFooter from './ChatFooter';
import { Message, AIMode } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  loading: boolean;
  aiMode: AIMode;
  onSendMessage: (message: string) => void;
  onFeedback: (messageId: string, type: 'like' | 'dislike') => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  loading,
  aiMode,
  onSendMessage,
  onFeedback
}) => {
  return (
    <div className="md:col-span-3 flex flex-col h-[600px] auxilio-card p-0 overflow-hidden">
      <MessageList 
        messages={messages} 
        loading={loading} 
        onFeedback={onFeedback} 
      />
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        loading={loading} 
      />
      
      <ChatFooter aiMode={aiMode} />
    </div>
  );
};

export default ChatInterface;
