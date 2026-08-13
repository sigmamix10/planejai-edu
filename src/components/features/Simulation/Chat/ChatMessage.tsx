import type { Message } from '@/hooks/useConversation';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 ${
          isUser
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span
          className={`mt-1 block text-xs ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
