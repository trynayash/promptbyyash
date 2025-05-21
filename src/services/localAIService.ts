
/**
 * Smart Prompt Enhancement Service
 * Local implementation without external API dependencies
 */

// Templates for different prompt types
const TEMPLATES = {
  text: {
    enhancements: [
      "Add specific details about the target audience and their needs",
      "Include clear instructions about the desired tone (formal, conversational, etc.)",
      "Specify the preferred output format (bullet points, paragraphs, etc.)",
      "Request examples or analogies to illustrate key points",
      "Add context about how the information will be used",
      "Request citations or credible sources where relevant",
    ],
    structure: "Start with context → Present specific requirements → End with preferred format"
  },
  image: {
    enhancements: [
      "Specify the subject's position, expression, and action",
      "Define the environment/setting with details on lighting and atmosphere",
      "Include style references (photorealistic, anime, oil painting, etc.)",
      "Add technical parameters (camera angle, focal length, depth of field)",
      "Request specific color palette or mood",
      "Specify aspect ratio and quality parameters",
    ],
    structure: "Subject details → Setting/environment → Style/medium → Technical parameters → Quality modifiers"
  },
  code: {
    enhancements: [
      "Specify the programming language and version",
      "Include requirements for error handling and edge cases",
      "Request code comments and documentation",
      "Define performance expectations or constraints",
      "Specify any libraries or frameworks to use/avoid",
      "Request unit tests or examples of usage",
    ],
    structure: "Problem statement → Specific requirements → Edge cases → Expected output → Additional requirements"
  }
};

// Keywords that improve prompts when added
const ENHANCEMENT_KEYWORDS = {
  text: [
    "detailed", "comprehensive", "step-by-step", "nuanced", 
    "evidence-based", "actionable", "concise", "well-structured",
    "comparative", "analytical", "balanced perspective",
  ],
  image: [
    "photorealistic", "high resolution", "detailed", "dramatic lighting",
    "vibrant", "cinematic", "4K", "ultraHD", "professional", "high contrast",
    "depth of field", "rule of thirds", "golden ratio", "symmetrical",
  ],
  code: [
    "optimized", "efficient", "maintainable", "scalable", "well-documented",
    "robust", "clean", "modular", "tested", "secure", "performant",
    "reusable", "object-oriented", "functional", "concurrent",
  ]
};

/**
 * Analyzes the basic prompt and determines which enhancements would be most beneficial
 */
const analyzePrompt = (prompt: string, type: "text" | "image" | "code"): string[] => {
  const wordCount = prompt.split(/\s+/).length;
  const hasStructure = prompt.includes("\n") || prompt.includes(":");
  const hasSpecifics = prompt.length > 50;
  const lowercasePrompt = prompt.toLowerCase();
  
  // Select relevant enhancements based on analysis
  const suggestedEnhancements: string[] = [];
  
  if (wordCount < 15) {
    suggestedEnhancements.push("Add more details to get better results");
  }
  
  if (!hasStructure) {
    suggestedEnhancements.push("Structure your prompt with clear sections");
  }

  // Check if the prompt already contains enhancement keywords
  const typeKeywords = ENHANCEMENT_KEYWORDS[type];
  const missingKeywords = typeKeywords.filter(keyword => 
    !lowercasePrompt.includes(keyword.toLowerCase())
  ).slice(0, 3); // Limit to 3 keyword suggestions
  
  if (missingKeywords.length > 0) {
    suggestedEnhancements.push(`Add quality indicators like: ${missingKeywords.join(', ')}`);
  }
  
  // Add type-specific enhancements
  const typeEnhancements = TEMPLATES[type].enhancements;
  for (const enhancement of typeEnhancements) {
    const enhancementKeywords = enhancement.toLowerCase().split(' ');
    const isAlreadyCovered = enhancementKeywords.some(keyword => 
      keyword.length > 4 && lowercasePrompt.includes(keyword)
    );
    
    if (!isAlreadyCovered) {
      suggestedEnhancements.push(enhancement);
    }
  }
  
  return suggestedEnhancements.slice(0, 4); // Limit to avoid overwhelming users
};

/**
 * Enhance a basic prompt with smart suggestions
 */
export const enhancePrompt = (
  prompt: string,
  type: "text" | "image" | "code"
): { enhancedPrompt: string; error?: string } => {
  try {
    let enhancedPrompt = prompt.trim();
    
    // Get suggested enhancements
    const suggestions = analyzePrompt(enhancedPrompt, type);
    
    // Implement enhancements based on prompt type
    if (type === "text") {
      enhancedPrompt = addTextEnhancements(enhancedPrompt, suggestions);
    } else if (type === "image") {
      enhancedPrompt = addImageEnhancements(enhancedPrompt, suggestions);
    } else if (type === "code") {
      enhancedPrompt = addCodeEnhancements(enhancedPrompt, suggestions);
    }

    return { enhancedPrompt };
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return { 
      enhancedPrompt: prompt, 
      error: `Error enhancing prompt: ${(error as Error).message}` 
    };
  }
};

/**
 * Add text-specific enhancements
 */
const addTextEnhancements = (prompt: string, suggestions: string[]): string => {
  let enhanced = prompt;
  
  // Add structure if needed
  if (suggestions.some(s => s.includes("structure"))) {
    enhanced = `${enhanced}\n\nPlease provide a comprehensive response that is:\n- Well-structured with clear headings\n- Detailed with specific examples\n- Backed by evidence where possible\n- Formatted for easy reading`;
  }
  
  // Add audience specification if needed
  if (suggestions.some(s => s.includes("audience"))) {
    enhanced = `${enhanced}\n\nTarget audience: professionals looking for actionable insights`;
  }
  
  // Add quality modifiers
  const qualityTerms = ["comprehensive", "nuanced", "evidence-based", "actionable", "well-structured"];
  if (suggestions.some(s => s.includes("quality"))) {
    enhanced = `Create a ${qualityTerms.join(", ")} analysis on the following topic:\n\n${enhanced}`;
  }
  
  return enhanced;
};

/**
 * Add image-specific enhancements
 */
const addImageEnhancements = (prompt: string, suggestions: string[]): string => {
  let enhanced = prompt;
  
  // Add style specification
  if (suggestions.some(s => s.includes("style"))) {
    enhanced = `${enhanced}, photorealistic style, dramatic lighting, 4K resolution`;
  }
  
  // Add technical parameters
  if (suggestions.some(s => s.includes("technical"))) {
    enhanced = `${enhanced}, shallow depth of field, perfect composition, ultrasharp, detailed textures`;
  }
  
  // Add quality modifiers
  if (suggestions.some(s => s.includes("quality"))) {
    enhanced = `${enhanced} --ar 16:9 --v 5.1 --q 2`;
  }
  
  return enhanced;
};

/**
 * Add code-specific enhancements
 */
const addCodeEnhancements = (prompt: string, suggestions: string[]): string => {
  let enhanced = prompt;
  
  // Add requirements for comprehensive code
  if (suggestions.some(s => s.includes("requirements"))) {
    enhanced = `${enhanced}\n\nPlease include:\n- Error handling for edge cases\n- Clear comments explaining the logic\n- Examples of usage\n- Consideration for performance`;
  }
  
  // Structure the prompt better
  if (suggestions.some(s => s.includes("structure"))) {
    enhanced = `Create production-quality code that implements the following requirements:\n\n${enhanced}`;
  }
  
  return enhanced;
};

/**
 * Generate a new prompt from basic user input
 */
export const generatePrompt = (
  input: string,
  type: "text" | "image" | "code"
): { generatedPrompt: string; error?: string } => {
  try {
    let generatedPrompt = "";
    const cleanInput = input.trim();
    
    // Check if input is valid
    if (cleanInput.length < 3) {
      return { 
        generatedPrompt: input,
        error: "Input is too short to generate a meaningful prompt" 
      };
    }
    
    // Generate prompt based on type
    if (type === "text") {
      generatedPrompt = generateTextPrompt(cleanInput);
    } else if (type === "image") {
      generatedPrompt = generateImagePrompt(cleanInput);
    } else if (type === "code") {
      generatedPrompt = generateCodePrompt(cleanInput);
    }
    
    return { generatedPrompt };
  } catch (error) {
    console.error("Error generating prompt:", error);
    return { 
      generatedPrompt: input,
      error: `Error generating prompt: ${(error as Error).message}` 
    };
  }
};

/**
 * Generate a text prompt from user input
 */
const generateTextPrompt = (input: string): string => {
  // Extract key topics/subjects
  const topics = extractTopics(input);
  const topicPhrase = topics.length > 0 ? topics.join(", ") : input;
  
  // Determine the likely intent based on input
  const intent = determineIntent(input);
  
  // Generate an appropriate prompt template
  let template = "";
  if (intent === "explain") {
    template = `Provide a comprehensive explanation of ${topicPhrase} that covers the fundamental concepts, historical context, and real-world applications. Include concrete examples, address common misconceptions, and explain the significance and implications. Structure your response with clear headings, bullet points for key insights, and conclude with future trends or developments.`;
  } else if (intent === "compare") {
    template = `Present a detailed comparison of ${topicPhrase}, analyzing their similarities and differences across multiple dimensions including features, benefits, limitations, and use cases. Use a balanced approach that fairly represents each option, supported by factual evidence and expert perspectives. Include a comparative table for easy reference, and conclude with recommendations for different scenarios or user needs.`;
  } else if (intent === "guide") {
    template = `Create a comprehensive step-by-step guide on ${topicPhrase} that is suitable for beginners but includes advanced tips for experienced users. Include prerequisites, common pitfalls to avoid, troubleshooting advice, and practical examples for each step. Format the response with numbered steps, code snippets or examples where relevant, and visual descriptions. Conclude with next steps for further learning or practice.`;
  } else {
    template = `Write a detailed analysis of ${topicPhrase} covering key aspects, current trends, challenges, and opportunities. Include relevant statistics, expert insights, and case studies to support your points. Structure your response with clear headings, use bullet points for key takeaways, and conclude with practical implications and future outlook.`;
  }
  
  return template;
};

/**
 * Generate an image prompt from user input
 */
const generateImagePrompt = (input: string): string => {
  // Extract key visual elements
  const subject = input.trim();
  
  // Build a comprehensive image prompt
  const visualStyle = selectRandomItems([
    "photorealistic", "cinematic", "digital art", "oil painting", 
    "watercolor", "concept art", "3D render", "studio photography"
  ], 1)[0];
  
  const lighting = selectRandomItems([
    "dramatic lighting", "soft natural lighting", "golden hour sunlight", 
    "blue hour", "studio lighting", "moody atmospheric lighting"
  ], 1)[0];
  
  const perspective = selectRandomItems([
    "wide angle", "close-up", "bird's eye view", "low angle", 
    "ultra-wide shot", "medium shot", "dutch angle"
  ], 1)[0];
  
  const details = selectRandomItems([
    "highly detailed", "intricate details", "4K resolution", 
    "ultra HD", "high definition", "photographic", "hyperrealistic"
  ], 2);
  
  // Combine elements into a comprehensive prompt
  return `Create a ${visualStyle} image of ${subject}, with ${lighting}, ${perspective} perspective, ${details.join(", ")}, perfect composition, trending on artstation, award-winning photography --ar 16:9 --v 5.1 --q 2`;
};

/**
 * Generate a code prompt from user input
 */
const generateCodePrompt = (input: string): string => {
  // Determine likely programming context
  const programmingContext = determineProgrammingContext(input);
  const language = programmingContext.language || "JavaScript";
  
  // Build a comprehensive code prompt
  return `Write production-quality ${language} code that implements ${input.trim()}. 

The implementation should include:
1. Clear, modular architecture with separation of concerns
2. Comprehensive error handling and input validation
3. Performance optimization considerations
4. Thorough documentation and comments explaining the logic
5. Examples of how to use the code
6. Unit tests covering the main functionality and edge cases
7. Consideration of security best practices

The code should follow modern ${language} conventions and best practices, be maintainable, and scalable for future enhancements.`;
};

/**
 * Helper function to extract likely topics from user input
 */
const extractTopics = (input: string): string[] => {
  // Simple extraction based on common patterns
  const topics: string[] = [];
  
  // Look for "X and Y" patterns
  const andPattern = /(.+?)(?:\s+and\s+|&\s*)(.+)/i;
  const andMatch = input.match(andPattern);
  
  if (andMatch) {
    topics.push(andMatch[1].trim(), andMatch[2].trim());
  } 
  // Look for "X vs Y" patterns
  else {
    const vsPattern = /(.+?)(?:\s+vs\.?\s+|\s+versus\s+)(.+)/i;
    const vsMatch = input.match(vsPattern);
    
    if (vsMatch) {
      topics.push(vsMatch[1].trim(), vsMatch[2].trim());
    }
  }
  
  return topics;
};

/**
 * Helper function to determine likely intent from user input
 */
const determineIntent = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("how to") || 
      lowerInput.includes("steps") || 
      lowerInput.includes("guide") ||
      lowerInput.includes("tutorial") ||
      lowerInput.includes("instructions")) {
    return "guide";
  }
  
  if (lowerInput.includes("compare") || 
      lowerInput.includes("vs") || 
      lowerInput.includes("versus") ||
      lowerInput.includes("difference")) {
    return "compare";
  }
  
  if (lowerInput.includes("explain") || 
      lowerInput.includes("what is") || 
      lowerInput.includes("definition") ||
      lowerInput.includes("why is")) {
    return "explain";
  }
  
  return "analyze";
};

/**
 * Helper function to determine programming context from user input
 */
const determineProgrammingContext = (input: string): { language: string } => {
  const lowerInput = input.toLowerCase();
  const languages = [
    "javascript", "typescript", "python", "java", "c#", "c++", "golang", "rust",
    "php", "ruby", "swift", "kotlin", "r", "scala", "dart"
  ];
  
  for (const language of languages) {
    if (lowerInput.includes(language)) {
      return { language: language.charAt(0).toUpperCase() + language.slice(1) };
    }
  }
  
  // Default to JavaScript if no language detected
  return { language: "JavaScript" };
};

/**
 * Helper function to select random items from an array
 */
const selectRandomItems = (items: string[], count: number): string[] => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
