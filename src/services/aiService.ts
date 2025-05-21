
import { enhancePrompt as localEnhance, generatePrompt } from './localAIService';

interface EnhancePromptResponse {
  enhancedPrompt: string;
  error?: string;
}

export const enhancePrompt = async (
  prompt: string, 
  type: "text" | "image" | "code"
): Promise<EnhancePromptResponse> => {
  try {
    // Use local implementation instead of external API
    return localEnhance(prompt, type);
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return { 
      enhancedPrompt: prompt, 
      error: `Error enhancing prompt: ${(error as Error).message}` 
    };
  }
};

export const generateNewPrompt = async (
  input: string,
  type: "text" | "image" | "code"
): Promise<{ generatedPrompt: string; error?: string }> => {
  try {
    return generatePrompt(input, type);
  } catch (error) {
    console.error("Error generating prompt:", error);
    return {
      generatedPrompt: input,
      error: `Error generating prompt: ${(error as Error).message}`
    };
  }
};
