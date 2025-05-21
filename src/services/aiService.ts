
interface EnhancePromptResponse {
  enhancedPrompt: string;
  error?: string;
}

export const enhancePrompt = async (
  prompt: string, 
  type: "text" | "image" | "code"
): Promise<EnhancePromptResponse> => {
  try {
    // RapidAPI key
    const apiKey = "2a7f98e0dcmsh6a515039897650dp112ad7jsn8682354afeb1";
    
    // Create a prompt that explains what we need based on the type
    let promptPrefix = "";
    
    if (type === "text") {
      promptPrefix = "Enhance this text prompt to be more detailed and effective: ";
    } else if (type === "image") {
      promptPrefix = "Transform this image prompt into a detailed prompt with style, composition, and quality parameters: ";
    } else if (type === "code") {
      promptPrefix = "Convert this into a comprehensive code specification with requirements and edge cases: ";
    }

    const fullPrompt = `${promptPrefix}${prompt}`;
    
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const url = `https://free-chatgpt-api.p.rapidapi.com/chat-completion-one?prompt=${encodedPrompt}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'free-chatgpt-api.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("RapidAPI error:", errorData);
      return { 
        enhancedPrompt: prompt, 
        error: `Error enhancing prompt: ${errorData?.message || "Unknown error"}` 
      };
    }

    const data = await response.json();
    // Extract the enhanced prompt from the API response
    const enhancedPrompt = data?.content || prompt;
    
    return { enhancedPrompt };
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return { 
      enhancedPrompt: prompt, 
      error: `Error enhancing prompt: ${(error as Error).message}` 
    };
  }
};
