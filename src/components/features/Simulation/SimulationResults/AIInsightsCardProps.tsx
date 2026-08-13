import { useConversation } from '@/hooks/useConversation';
import { useInsight } from '@/hooks/useInsight';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { useState } from 'react';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

import { ChatInput } from '../Chat/ChatInput';
import { ChatMessage } from '../Chat/ChatMessage';
import { Content } from '../Insights/Content';
import { Error } from '../Insights/Error';

interface AIInsightCardProps {
  simulationId: string;
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  const { getFormData } = useSimulationStorage();
  const simulation = getFormData(simulationId);
  const {
    messages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
    messagesEndRef,
  } = useConversation(simulationId, simulation);
  const [activeTab, setActiveTab] = useState<'insight' | 'chat'>('insight');

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('insight')}
          className={`px-1 pb-2 text-sm font-medium transition-colors ${
            activeTab === 'insight'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Insights
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-1 pb-2 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Conversa ({messages.length})
        </button>
      </div>

      {/* Insight Tab */}
      {activeTab === 'insight' && (
        <>
          {isLoading && (
            <div className="flex">
              <Skeleton
                count={10.5}
                baseColor="var(--color-skeleton-base)"
                highlightColor="var(--color-skeleton-highlight)"
                className="mb-3 flex rounded-lg"
                containerClassName="flex-1"
                inline
              />
            </div>
          )}
          {!isLoading && error && (
            <Error
              simulationId={simulationId}
              message={error}
              onRetry={() => fetchInsight(simulationId)}
            />
          )}
          {!isLoading && insight && <Content insight={insight} />}
        </>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="flex flex-col gap-4">
          {/* Messages Container */}
          <div className="flex max-h-96 flex-col gap-4 overflow-y-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comece a conversa fazendo uma pergunta ao educador financeiro
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error Message */}
          {chatError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {chatError}
            </div>
          )}

          {/* Input */}
          <ChatInput onSendMessage={sendMessage} isLoading={isChatLoading} disabled={!simulation} />
        </div>
      )}
    </div>
  );
}
