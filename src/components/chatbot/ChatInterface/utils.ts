
/**
 * Format chat message text with proper line breaks
 */
export const formatMessageText = (text: string): JSX.Element[] => {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};

/**
 * Format timestamp for display in messages
 */
export const formatMessageTime = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
