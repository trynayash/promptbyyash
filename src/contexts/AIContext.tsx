
import { createContext, useContext, useState, ReactNode } from 'react';
import { AIModelConfig, AI_MODELS } from '@/types/ai';

interface AIContextType {
  activeModel: AIModelConfig;
  availableModels: AIModelConfig[];
  setActiveModel: (model: AIModelConfig) => void;
  isApiKeySet: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [activeModel, setActiveModel] = useState<AIModelConfig>(AI_MODELS[0]);
  
  // API key is now hardcoded in the service
  const isApiKeySet = true;

  const value = {
    activeModel,
    availableModels: AI_MODELS,
    setActiveModel,
    isApiKeySet
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
