
import { createContext, useContext, useState, ReactNode } from 'react';
import { AIModelConfig, AI_MODELS } from '@/types/ai';

interface AIContextType {
  activeModel: AIModelConfig;
  availableModels: AIModelConfig[];
  setActiveModel: (model: AIModelConfig) => void;
  isLocalAI: boolean; // New flag to indicate local AI usage
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [activeModel, setActiveModel] = useState<AIModelConfig>(AI_MODELS[0]);
  
  // Using local AI implementation
  const isLocalAI = true;

  const value = {
    activeModel,
    availableModels: AI_MODELS,
    setActiveModel,
    isLocalAI
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
