
export type PromptType = "text" | "image" | "code" | "chat";

export interface EnhancedPrompt {
  id?: string;
  originalPrompt: string;
  enhancedPrompt: string;
  type: PromptType;
  createdAt?: string;
  userId?: string;
  title?: string;
  isFavorite?: boolean;
  isPublic?: boolean;
  tags?: string[];
}

export interface AIModelConfig {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  provider: string;
  apiEndpoint?: string;
  logoUrl?: string;
  isLocal?: boolean;
}

export const AI_MODELS: AIModelConfig[] = [
  {
    id: "local-smart-ai",
    name: "Smart AI",
    description: "Local AI enhancement with smart algorithms",
    capabilities: ["text", "image", "code"],
    provider: "PromptP",
    logoUrl: "/placeholder.svg",
    isLocal: true
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's powerful language model for natural text generation",
    capabilities: ["text", "image", "code"],
    provider: "OpenAI (via RapidAPI)",
    logoUrl: "/placeholder.svg"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Latest OpenAI model with excellent general performance",
    capabilities: ["text", "image", "code", "chat"],
    provider: "OpenAI",
    logoUrl: "/placeholder.svg"
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Well-balanced AI model with strong reasoning",
    capabilities: ["text", "code", "chat"],
    provider: "Anthropic",
    logoUrl: "/placeholder.svg"
  }
];
