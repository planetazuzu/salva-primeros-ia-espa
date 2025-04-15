
import React from 'react';

/**
 * Format chat message text with proper line breaks
 */
export const formatMessageText = (text: string): React.ReactNode[] => {
  return text.split('\n').map((line, i) => {
    const isLastLine = i < text.split('\n').length - 1;
    return React.createElement(
      React.Fragment,
      { key: i },
      line,
      isLastLine ? React.createElement('br') : null
    );
  });
};

/**
 * Format timestamp for display in messages
 */
export const formatMessageTime = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
