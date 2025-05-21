
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
  logoUrl?: string;
  isLocal?: boolean;
}

export const AI_MODELS: AIModelConfig[] = [
  {
    id: "promptp-smart-ai",
    name: "PromptP Smart AI",
    description: "Proprietary PromptP AI enhancement with smart algorithms",
    capabilities: ["text", "image", "code"],
    provider: "PromptP",
    logoUrl: "/placeholder.svg",
    isLocal: true
  },
  {
    id: "promptp-creative",
    name: "PromptP Creative",
    description: "Specialized AI model for creative content generation",
    capabilities: ["text", "image"],
    provider: "PromptP",
    logoUrl: "/placeholder.svg",
    isLocal: true
  },
  {
    id: "promptp-technical",
    name: "PromptP Technical",
    description: "Specialized AI model for technical content and code generation",
    capabilities: ["text", "code"],
    provider: "PromptP",
    logoUrl: "/placeholder.svg",
    isLocal: true
  },
  {
    id: "promptp-professional",
    name: "PromptP Professional",
    description: "Business-focused AI model for marketing and professional content",
    capabilities: ["text", "image", "code"],
    provider: "PromptP",
    logoUrl: "/placeholder.svg",
    isLocal: true
  }
];
