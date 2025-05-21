
interface EnhancePromptResponse {
  enhancedPrompt: string;
  error?: string;
}

export const enhancePrompt = async (
  prompt: string, 
  type: "text" | "image" | "code"
): Promise<EnhancePromptResponse> => {
  try {
    // OpenRouter API key
    const apiKey = "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";
    
    // Create different system prompts based on the type
    let systemPrompt = "";
    
    if (type === "text") {
      systemPrompt = "You are an expert prompt engineer specialized in creating detailed, well-structured prompts that generate high-quality text content. Enhance the user's basic prompt to be more specific, detailed, and effective.";
    } else if (type === "image") {
      systemPrompt = "You are an expert prompt engineer specialized in creating detailed image generation prompts. Transform the user's basic prompt into a detailed prompt with specific style guidelines, composition details, lighting, and quality parameters that would work well with image generation models like Midjourney or DALL-E.";
    } else if (type === "code") {
      systemPrompt = "You are an expert prompt engineer specialized in creating detailed prompts for code generation. Transform the user's basic prompt into a comprehensive specification with clear requirements, edge cases to handle, and quality expectations.";
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Required for OpenRouter API
        "X-Title": "PromptP"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro-experimental", // Gemini 2.5 Pro Experimental
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Enhance this prompt to be more detailed and effective: "${prompt}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return { 
        enhancedPrompt: prompt, 
        error: `Error enhancing prompt: ${errorData.error?.message || "Unknown error"}` 
      };
    }

    const data = await response.json();
    return { enhancedPrompt: data.choices[0].message.content };
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return { 
      enhancedPrompt: prompt, 
      error: `Error enhancing prompt: ${(error as Error).message}` 
    };
  }
};
