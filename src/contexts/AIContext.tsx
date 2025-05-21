
import { createContext, useContext, useState, ReactNode } from 'react';
import { AIModelConfig, AI_MODELS } from '@/types/ai';
import { PROMPT_CATEGORIES, PROMPT_TONES, PROMPT_FORMATS } from '@/services/promptPAIService';

interface AIContextType {
  activeModel: AIModelConfig;
  availableModels: AIModelConfig[];
  setActiveModel: (model: AIModelConfig) => void;
  isLocalAI: boolean;
  promptCategories: Record<string, string[]>;
  promptTones: string[];
  promptFormats: Record<string, string[]>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [activeModel, setActiveModel] = useState<AIModelConfig>(AI_MODELS[0]);
  
  // Always using our local proprietary AI implementation
  const isLocalAI = true;

  const value = {
    activeModel,
    availableModels: AI_MODELS,
    setActiveModel,
    isLocalAI,
    promptCategories: PROMPT_CATEGORIES,
    promptTones: PROMPT_TONES,
    promptFormats: PROMPT_FORMATS
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
