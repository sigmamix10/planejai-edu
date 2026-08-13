import type { SimulationRecord } from '@/data/simulation';
import { askEducator } from '@/services/aiService';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulationStorage } from './useSimulationStorage';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const CONVERSATION_STORAGE_KEY = 'simulation-conversations';

export const useConversation = (simulationId: string, simulation: SimulationRecord | null) => {
  const { updateSimulation } = useSimulationStorage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar conversas do localStorage
  useEffect(() => {
    const loadConversation = () => {
      const storage = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (!storage) {
        setMessages([]);
        return;
      }

      const conversations = JSON.parse(storage) as Record<string, Message[]>;
      setMessages(conversations[simulationId] || []);
    };

    loadConversation();
  }, [simulationId]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Salvar conversas no localStorage
  const saveConversation = useCallback(
    (updatedMessages: Message[]) => {
      const storage = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      const conversations = storage ? (JSON.parse(storage) as Record<string, Message[]>) : {};
      conversations[simulationId] = updatedMessages;
      localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations));
    },
    [simulationId]
  );

  // Enviar pergunta para a IA
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || !simulation) {
        return;
      }

      // Adicionar mensagem do usuário
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: userMessage,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      saveConversation(updatedMessages);
      setError(null);
      setIsLoading(true);

      try {
        // Preparar contexto da simulação para a IA
        const simulationContext = `
Renda mensal: ${simulation.income}
Despesas fixas: ${simulation.expenses}
Dívidas/Parcelas: ${simulation.debts}
Meta: ${simulation.goalName}
Custo da meta: ${simulation.goalAmount}
Prazo: ${simulation.goalDeadline} meses`;

        // Converter histórico para formato esperado
        const conversationHistory = updatedMessages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }));

        // Chamar API da IA
        const response = await askEducator(userMessage, simulationContext, conversationHistory);

        // Adicionar resposta da IA
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };

        const finalMessages = [...updatedMessages, assistantMsg];
        setMessages(finalMessages);
        saveConversation(finalMessages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao processar sua pergunta. Tente novamente.';
        setError(errorMessage);

        // Remover mensagem do usuário em caso de erro
        setMessages(messages);
        saveConversation(messages);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, simulation, saveConversation]
  );

  const clearConversation = useCallback(() => {
    setMessages([]);
    const storage = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (storage) {
      const conversations = JSON.parse(storage) as Record<string, Message[]>;
      delete conversations[simulationId];
      localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [simulationId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearConversation,
    messagesEndRef,
  };
};
