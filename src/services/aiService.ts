
import { 
  enhancePrompt as localEnhance,
  generatePrompt as localGenerate,
  rewritePrompt,
  PromptRequest
} from './promptPAIService';

interface EnhancePromptResponse {
  enhancedPrompt: string;
  error?: string;
}

export const enhancePrompt = async (
  prompt: string, 
  type: "text" | "image" | "code"
): Promise<EnhancePromptResponse> => {
  try {
    // Use our proprietary implementation
    const request: PromptRequest = {
      input: prompt,
      type
    };
    
    const result = localEnhance(request);
    
    return { 
      enhancedPrompt: result.result,
      error: result.error
    };
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
    const request: PromptRequest = {
      input,
      type
    };
    
    const result = localGenerate(request);
    
    return {
      generatedPrompt: result.result,
      error: result.error
    };
  } catch (error) {
    console.error("Error generating prompt:", error);
    return {
      generatedPrompt: input,
      error: `Error generating prompt: ${(error as Error).message}`
    };
  }
};

export const rewriteExistingPrompt = async (
  prompt: string,
  type: "text" | "image" | "code",
  tone?: string,
  format?: string,
  length?: "short" | "medium" | "long"
): Promise<{ rewrittenPrompt: string; error?: string }> => {
  try {
    const request: PromptRequest = {
      input: prompt,
      type,
      tone,
      format,
      length
    };
    
    const result = rewritePrompt(request);
    
    return {
      rewrittenPrompt: result.result,
      error: result.error
    };
  } catch (error) {
    console.error("Error rewriting prompt:", error);
    return {
      rewrittenPrompt: prompt,
      error: `Error rewriting prompt: ${(error as Error).message}`
    };
  }
};
