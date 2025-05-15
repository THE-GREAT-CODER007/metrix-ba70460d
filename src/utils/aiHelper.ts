import { supabase } from '@/integrations/supabase/client';

export interface AIResponse {
  suggestion: string;
  code?: string;
  explanation?: string;
}

export const getAISuggestion = async (prompt: string): Promise<AIResponse> => {
  try {
    // In a real app, this would call OpenAI or another AI service
    // For now, we'll return mock responses
    const suggestions: Record<string, AIResponse> = {
      'fix code': {
        suggestion: 'Here are the suggested fixes:',
        code: 'function fixedCode() {\n  // Fixed implementation\n}',
        explanation: 'The original code had potential memory leaks. This version properly handles cleanup.'
      },
      'optimize': {
        suggestion: 'Consider these optimizations:',
        code: 'const optimizedFunction = memoize(originalFunction);',
        explanation: 'Memoization will cache results and improve performance.'
      },
      'default': {
        suggestion: 'I suggest breaking this into smaller components for better maintainability.',
        explanation: 'This follows the single responsibility principle.'
      }
    };

    // Simple keyword matching for demo
    const response = Object.entries(suggestions).find(
      ([key]) => prompt.toLowerCase().includes(key)
    )?.[1] || suggestions.default;

    return response;
  } catch (error) {
    console.error('AI suggestion error:', error);
    throw new Error('Failed to get AI suggestion');
  }
};