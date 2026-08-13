interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = 'gemini-flash-latest';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return (await response.json()) as GeminiResponse;
};

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible';
    content: string;
  };
  diagnosis: { content: string };
  suggestions: { items: string[] };
  extraIncome: { items: string[] };
  investment: { items: string[] };
  motivation: { content: string };
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt);
  const json = response.candidates[0].content.parts[0].text;
  return JSON.parse(json) as InsightData;
};

export const askEducator = async (
  userQuestion: string,
  simulationData: string,
  conversationHistory: Array<{ role: string; content: string }>
) => {
  const historyContext = conversationHistory
    .map((msg) => `${msg.role === 'user' ? 'Usuário' : 'Educador'}: ${msg.content}`)
    .join('\n');

  const prompt = `Você é um educador financeiro especializado em finanças pessoais. O usuário está fazendo perguntas sobre sua simulação financeira.

Dados da simulação:
${simulationData}

Histórico da conversa:
${historyContext}

Nova pergunta do usuário: ${userQuestion}

Responda de forma clara, didática e encorajadora, sempre em segunda pessoa ("você..."). Mantenha a coerência com as respostas anteriores. Seja conciso mas completo. Respeite o contexto financeiro do usuário.`;

  const response = await callGeminiAPI(prompt);
  const answer = response.candidates[0].content.parts[0].text;
  return answer;
};
