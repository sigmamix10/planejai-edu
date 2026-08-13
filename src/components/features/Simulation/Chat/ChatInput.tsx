import { Send } from 'lucide-react';
import { useRef, useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, isLoading = false, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Faça uma pergunta sobre sua simulação..."
        disabled={isLoading || disabled}
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
      />
      <button
        onClick={handleSend}
        disabled={isLoading || disabled || !input.trim()}
        className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
