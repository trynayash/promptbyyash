
/**
 * PromptP Proprietary AI Service
 * Complete local implementation without external API dependencies
 */

// Type definitions for our AI service
export interface PromptRequest {
  input: string;
  category?: string;
  tone?: string;
  format?: string;
  type: "text" | "image" | "code";
  length?: "short" | "medium" | "long";
  goal?: string;
}

export interface PromptResponse {
  result: string;
  suggestions?: string[];
  metadata?: {
    strength?: number;
    improvement_areas?: string[];
    category?: string;
    estimatedPerformance?: number;
  };
  error?: string;
}

// Categories for different prompt types
export const PROMPT_CATEGORIES = {
  text: [
    "blog_post", "social_media", "email", "academic", 
    "creative_writing", "marketing", "technical", "storytelling"
  ],
  image: [
    "photography", "illustration", "3d_render", "concept_art",
    "product_design", "ui_design", "character", "landscape"
  ],
  code: [
    "function", "algorithm", "api", "frontend", 
    "backend", "database", "refactor", "optimization"
  ]
};

// Tones for different content types
export const PROMPT_TONES = [
  "professional", "casual", "enthusiastic", "authoritative", 
  "creative", "technical", "friendly", "persuasive", "minimalist"
];

// Format options
export const PROMPT_FORMATS = {
  text: ["paragraph", "bullet_points", "numbered_list", "qa_format", "script"],
  image: ["portrait", "landscape", "square", "panoramic", "close_up"],
  code: ["function", "class", "module", "script", "api_endpoint"]
};

/**
 * Smart prompt generation based on input, category and goals
 */
export const generatePrompt = (request: PromptRequest): PromptResponse => {
  try {
    const { input, category, type, tone = "professional", format, goal } = request;
    
    if (!input || input.trim().length < 3) {
      return { 
        result: "",
        error: "Input is too short to generate a meaningful prompt" 
      };
    }
    
    let generatedPrompt = "";
    
    // Generate based on prompt type
    switch (type) {
      case "text":
        generatedPrompt = generateTextPrompt(input, category, tone, format, goal);
        break;
      case "image":
        generatedPrompt = generateImagePrompt(input, category, tone, format, goal);
        break;
      case "code":
        generatedPrompt = generateCodePrompt(input, category, tone, format, goal);
        break;
      default:
        generatedPrompt = generateTextPrompt(input, category, tone, format, goal);
    }
    
    return {
      result: generatedPrompt,
      metadata: {
        category: category || detectCategory(input, type),
        estimatedPerformance: estimatePerformance(generatedPrompt, type)
      }
    };
  } catch (error) {
    console.error("Error generating prompt:", error);
    return { 
      result: "",
      error: `Error generating prompt: ${(error as Error).message}` 
    };
  }
};

/**
 * Enhance an existing prompt with additional context, details, and structure
 */
export const enhancePrompt = (request: PromptRequest): PromptResponse => {
  try {
    const { input, type, tone, format } = request;

    if (!input || input.trim().length < 3) {
      return { 
        result: input,
        error: "Input is too short to enhance" 
      };
    }
    
    // Analyze the input prompt
    const analysis = analyzePrompt(input, type);
    const suggestions = analysis.suggestions;
    
    // Apply enhancements based on analysis
    let enhancedPrompt = input.trim();
    
    switch (type) {
      case "text":
        enhancedPrompt = enhanceTextPrompt(enhancedPrompt, suggestions, tone, format);
        break;
      case "image":
        enhancedPrompt = enhanceImagePrompt(enhancedPrompt, suggestions, tone, format);
        break;
      case "code":
        enhancedPrompt = enhanceCodePrompt(enhancedPrompt, suggestions, tone, format);
        break;
      default:
        enhancedPrompt = enhanceTextPrompt(enhancedPrompt, suggestions, tone, format);
    }
    
    return {
      result: enhancedPrompt,
      suggestions,
      metadata: {
        strength: analysis.strength,
        improvement_areas: analysis.improvement_areas,
        estimatedPerformance: estimatePerformance(enhancedPrompt, type)
      }
    };
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return { 
      result: input,
      error: `Error enhancing prompt: ${(error as Error).message}` 
    };
  }
};

/**
 * Rewrite a prompt in different formats/tones
 */
export const rewritePrompt = (
  request: PromptRequest
): PromptResponse => {
  const { input, type, tone, format, length } = request;
  
  try {
    if (!input || input.trim().length < 3) {
      return { 
        result: input,
        error: "Input is too short to rewrite" 
      };
    }
    
    let rewrittenPrompt = input.trim();
    const toneModifier = tone || "professional";
    const lengthModifier = length || "medium";
    
    // Extract core content/intent from the prompt
    const coreContent = extractCoreContent(input, type);
    
    // Rewrite based on type, tone, and format
    switch (type) {
      case "text":
        rewrittenPrompt = rewriteTextPrompt(coreContent, toneModifier, format, lengthModifier);
        break;
      case "image":
        rewrittenPrompt = rewriteImagePrompt(coreContent, toneModifier, format, lengthModifier);
        break;
      case "code":
        rewrittenPrompt = rewriteCodePrompt(coreContent, toneModifier, format, lengthModifier);
        break;
      default:
        rewrittenPrompt = rewriteTextPrompt(coreContent, toneModifier, format, lengthModifier);
    }
    
    return {
      result: rewrittenPrompt,
      metadata: {
        estimatedPerformance: estimatePerformance(rewrittenPrompt, type)
      }
    };
  } catch (error) {
    console.error("Error rewriting prompt:", error);
    return { 
      result: input,
      error: `Error rewriting prompt: ${(error as Error).message}` 
    };
  }
};

/**
 * Analyze a prompt's quality and provide feedback
 */
export const analyzePrompt = (
  prompt: string,
  type: "text" | "image" | "code"
): { 
  strength: number; 
  suggestions: string[];
  improvement_areas: string[];
} => {
  const lowercasePrompt = prompt.toLowerCase();
  const wordCount = prompt.split(/\s+/).length;
  const hasStructure = prompt.includes("\n") || prompt.includes(":");
  const hasSpecifics = prompt.length > 50;
  
  // Calculate prompt strength (0-100)
  let strength = 0;
  
  // Base strength based on length
  if (wordCount < 5) strength += 10;
  else if (wordCount < 15) strength += 30;
  else if (wordCount < 30) strength += 50;
  else if (wordCount < 50) strength += 70;
  else strength += 90;
  
  // Adjust for structure
  if (hasStructure) strength += 15;
  
  // Adjust for specificity
  if (hasSpecifics) strength += 15;
  
  // Cap at 100
  strength = Math.min(100, strength);
  
  // Identify improvement areas
  const improvement_areas: string[] = [];
  const suggestions: string[] = [];
  
  if (wordCount < 15) {
    improvement_areas.push("length");
    suggestions.push("Add more details to get better results");
  }
  
  if (!hasStructure) {
    improvement_areas.push("structure");
    suggestions.push("Structure your prompt with clear sections");
  }
  
  // Check for presence of quality keywords
  const typeKeywords = ENHANCEMENT_KEYWORDS[type];
  const missingKeywords = typeKeywords.filter(keyword => 
    !lowercasePrompt.includes(keyword.toLowerCase())
  ).slice(0, 3);
  
  if (missingKeywords.length > 0) {
    improvement_areas.push("quality_indicators");
    suggestions.push(`Add quality indicators like: ${missingKeywords.join(', ')}`);
  }
  
  // Add type-specific suggestions
  const typeTemplates = TEMPLATES[type];
  for (const enhancement of typeTemplates.enhancements) {
    const enhancementKeywords = enhancement.toLowerCase().split(' ');
    const isAlreadyCovered = enhancementKeywords.some(keyword => 
      keyword.length > 4 && lowercasePrompt.includes(keyword)
    );
    
    if (!isAlreadyCovered) {
      suggestions.push(enhancement);
    }
  }
  
  return {
    strength: Math.max(10, Math.min(100, strength)),
    suggestions: suggestions.slice(0, 4), // Limit suggestions
    improvement_areas
  };
};

// ----------------- PRIVATE IMPLEMENTATION FUNCTIONS -----------------

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

/**
 * Generate a text prompt from user input and parameters
 */
const generateTextPrompt = (
  input: string,
  category?: string, 
  tone: string = "professional",
  format?: string,
  goal?: string
): string => {
  // Extract key topics/subjects
  const topics = extractTopics(input);
  const topicPhrase = topics.length > 0 ? topics.join(", ") : input;
  
  // Determine the likely intent based on input and category
  const intent = category ? mapCategoryToIntent(category, "text") : determineIntent(input);
  
  // Apply tone modifications
  const toneAdjectives = getToneAdjectives(tone);
  
  // Format specifier
  const formatSpecifier = format ? 
    `Format your response as ${formatToDescription(format, "text")}. ` : 
    "";
  
  // Goal-oriented additions
  const goalAddition = goal ? 
    `The purpose of this content is to ${goal}. ` : 
    "";
  
  // Generate an appropriate prompt template
  let template = "";
  if (intent === "explain") {
    template = `Provide a ${toneAdjectives.join(", ")} explanation of ${topicPhrase} that covers the fundamental concepts, historical context, and real-world applications. Include concrete examples, address common misconceptions, and explain the significance and implications. ${formatSpecifier}${goalAddition}Structure your response with clear headings, bullet points for key insights, and conclude with future trends or developments.`;
  } else if (intent === "compare") {
    template = `Present a ${toneAdjectives.join(", ")} comparison of ${topicPhrase}, analyzing their similarities and differences across multiple dimensions including features, benefits, limitations, and use cases. Use a balanced approach that fairly represents each option, supported by factual evidence and expert perspectives. ${formatSpecifier}${goalAddition}Include a comparative table for easy reference, and conclude with recommendations for different scenarios or user needs.`;
  } else if (intent === "guide") {
    template = `Create a ${toneAdjectives.join(", ")} step-by-step guide on ${topicPhrase} that is suitable for beginners but includes advanced tips for experienced users. Include prerequisites, common pitfalls to avoid, troubleshooting advice, and practical examples for each step. ${formatSpecifier}${goalAddition}Format the response with numbered steps, code snippets or examples where relevant, and visual descriptions. Conclude with next steps for further learning or practice.`;
  } else {
    template = `Write a ${toneAdjectives.join(", ")} analysis of ${topicPhrase} covering key aspects, current trends, challenges, and opportunities. Include relevant statistics, expert insights, and case studies to support your points. ${formatSpecifier}${goalAddition}Structure your response with clear headings, use bullet points for key takeaways, and conclude with practical implications and future outlook.`;
  }
  
  return template;
};

/**
 * Generate an image prompt from user input and parameters
 */
const generateImagePrompt = (
  input: string,
  category?: string,
  tone: string = "professional",
  format?: string,
  goal?: string
): string => {
  // Extract key visual elements
  const subject = input.trim();
  
  // Determine visual style based on category and tone
  const visualStyle = category ? 
    mapCategoryToStyle(category) : 
    selectRandomItems([
      "photorealistic", "cinematic", "digital art", "oil painting", 
      "watercolor", "concept art", "3D render", "studio photography"
    ], 1)[0];
  
  // Tone-based adjustments
  const moodAdjective = getToneMood(tone);
  
  // Format adjustments (aspect ratio, framing)
  const formatSpec = format ? 
    getFormatSpecification(format, "image") : 
    "--ar 16:9";
  
  // Goal-oriented additions
  const purposeSpecification = goal ? 
    `designed to ${goal}, ` : 
    "";
  
  // Randomly select complementary elements
  const lighting = selectRandomItems([
    `${moodAdjective} lighting`, "golden hour sunlight", 
    "studio lighting", "atmospheric lighting"
  ], 1)[0];
  
  const perspective = selectRandomItems([
    "wide angle", "close-up", "bird's eye view", 
    "ultra-wide shot", "medium shot"
  ], 1)[0];
  
  const details = selectRandomItems([
    "highly detailed", "intricate details", "4K resolution", 
    "ultra HD", "high definition", "photographic", "hyperrealistic"
  ], 2);
  
  // Combine elements into a comprehensive prompt
  return `Create a ${visualStyle} image of ${subject}, ${purposeSpecification}with ${lighting}, ${perspective} perspective, ${details.join(", ")}, perfect composition, trending on artstation, award-winning photography ${formatSpec} --v 5.1 --q 2`;
};

/**
 * Generate a code prompt from user input and parameters
 */
const generateCodePrompt = (
  input: string,
  category?: string,
  tone: string = "professional",
  format?: string,
  goal?: string
): string => {
  // Determine likely programming context
  const programmingContext = category ? 
    mapCategoryToLanguage(category) : 
    determineProgrammingContext(input);
  
  const language = programmingContext.language || "JavaScript";
  
  // Tone adjustments for code
  const codeStyle = getToneForCode(tone);
  
  // Format specifications
  const formatDescription = format ? 
    `Implement this as a ${format}. ` : 
    "";
  
  // Goal-oriented additions
  const purposeDescription = goal ? 
    `The code should be optimized for ${goal}. ` : 
    "";
  
  // Build a comprehensive code prompt
  return `Write ${codeStyle} ${language} code that implements ${input.trim()}. ${formatDescription}${purposeDescription}

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
 * Enhance a text prompt with smart suggestions
 */
const enhanceTextPrompt = (
  prompt: string, 
  suggestions: string[],
  tone?: string,
  format?: string
): string => {
  let enhanced = prompt;
  
  // Add structure if needed
  if (suggestions.some(s => s.includes("structure"))) {
    enhanced = `${enhanced}\n\nPlease provide a ${tone || "comprehensive"} response that is:\n- Well-structured with clear headings\n- Detailed with specific examples\n- Backed by evidence where possible\n- Formatted for easy reading`;
  }
  
  // Add audience specification if needed
  if (suggestions.some(s => s.includes("audience"))) {
    enhanced = `${enhanced}\n\nTarget audience: professionals looking for actionable insights`;
  }
  
  // Add format specification if needed
  if (format) {
    enhanced = `${enhanced}\n\nFormat the response as ${formatToDescription(format, "text")}`;
  }
  
  // Add tone specification
  if (tone) {
    const toneAdjectives = getToneAdjectives(tone);
    enhanced = `Create a ${toneAdjectives.join(", ")} analysis on the following topic:\n\n${enhanced}`;
  }
  
  return enhanced;
};

/**
 * Enhance an image prompt with smart suggestions
 */
const enhanceImagePrompt = (
  prompt: string, 
  suggestions: string[],
  tone?: string,
  format?: string
): string => {
  let enhanced = prompt;
  
  // Add style specification
  if (suggestions.some(s => s.includes("style")) || tone) {
    const styleKeywords = tone ? 
      getToneVisuals(tone) : 
      "photorealistic style, dramatic lighting";
    enhanced = `${enhanced}, ${styleKeywords}`;
  }
  
  // Add technical parameters
  if (suggestions.some(s => s.includes("technical"))) {
    enhanced = `${enhanced}, shallow depth of field, perfect composition, ultrasharp, detailed textures`;
  }
  
  // Add format if specified
  if (format) {
    enhanced = `${enhanced} ${getFormatSpecification(format, "image")}`;
  }
  
  // Add quality modifiers
  if (suggestions.some(s => s.includes("quality")) || !enhanced.includes("--q")) {
    enhanced = `${enhanced} --v 5.1 --q 2`;
  }
  
  return enhanced;
};

/**
 * Enhance a code prompt with smart suggestions
 */
const enhanceCodePrompt = (
  prompt: string, 
  suggestions: string[],
  tone?: string,
  format?: string
): string => {
  let enhanced = prompt;
  
  // Add requirements for comprehensive code
  if (suggestions.some(s => s.includes("requirements"))) {
    enhanced = `${enhanced}\n\nPlease include:\n- Error handling for edge cases\n- Clear comments explaining the logic\n- Examples of usage\n- Consideration for performance`;
  }
  
  // Add language/framework specifics if format is provided
  if (format) {
    enhanced = `${enhanced}\n\nImplement this using ${format}`;
  }
  
  // Add tone-specific requirements
  if (tone) {
    const codeStyle = getToneForCode(tone);
    enhanced = `Create ${codeStyle} code that implements the following requirements:\n\n${enhanced}`;
  }
  
  return enhanced;
};

/**
 * Rewrite a text prompt with different tone/format
 */
const rewriteTextPrompt = (
  content: string,
  tone: string,
  format?: string,
  length: string = "medium"
): string => {
  const toneAdjectives = getToneAdjectives(tone);
  const lengthDescriptor = getLengthDescriptor(length, "text");
  
  const formatPart = format ? 
    `Format the response as ${formatToDescription(format, "text")}. ` : 
    "";
  
  return `Write a ${lengthDescriptor}, ${toneAdjectives.join(", ")} piece about ${content}. ${formatPart}Include relevant details, examples, and insights to provide a comprehensive understanding of the topic.`;
};

/**
 * Rewrite an image prompt with different tone/format
 */
const rewriteImagePrompt = (
  content: string,
  tone: string,
  format?: string,
  length: string = "medium"
): string => {
  const toneVisuals = getToneVisuals(tone);
  const formatSpec = format ? 
    getFormatSpecification(format, "image") : 
    "--ar 16:9";
  
  // For image prompts, length affects the detail level
  const detailLevel = length === "short" ? 
    "simple, minimalist" : 
    length === "long" ? 
      "extremely detailed, intricate" : 
      "detailed";
  
  return `Create a ${detailLevel} image of ${content}, with ${toneVisuals}, perfect composition ${formatSpec} --v 5.1 --q 2`;
};

/**
 * Rewrite a code prompt with different tone/format
 */
const rewriteCodePrompt = (
  content: string,
  tone: string,
  format?: string,
  length: string = "medium"
): string => {
  const codeStyle = getToneForCode(tone);
  const programmingContext = format ? 
    { language: format } : 
    determineProgrammingContext(content);
  
  const language = programmingContext.language || "JavaScript";
  
  // Length affects the code complexity and documentation level
  const complexityLevel = length === "short" ? 
    "concise, focused on core functionality" : 
    length === "long" ? 
      "comprehensive with extensive documentation and error handling" : 
      "balanced with clear documentation";
  
  return `Write ${codeStyle} ${language} code that is ${complexityLevel} to implement: ${content}`;
};

/**
 * Extract the core content/intent from a prompt
 */
const extractCoreContent = (
  prompt: string, 
  type: "text" | "image" | "code"
): string => {
  // Remove common prompt engineering patterns
  let core = prompt
    .replace(/create|generate|write|make|develop|implement|produce|design/gi, "")
    .replace(/a|an|the/gi, "")
    .replace(/comprehensive|detailed|step-by-step|complete/gi, "");
  
  // Remove format specifications for image prompts
  if (type === "image") {
    core = core
      .replace(/--ar \d+:\d+|--v \d+\.\d+|--q \d+/g, "")
      .replace(/high resolution|4k|8k|hd|uhd/gi, "");
  }
  
  // Remove programming language specifications for code prompts
  if (type === "code") {
    core = core
      .replace(/in (javascript|python|typescript|java|c#|ruby|go|rust|php|swift)/gi, "")
      .replace(/using (react|vue|angular|node|express|django|flask|spring)/gi, "");
  }
  
  // Clean up excess whitespace
  core = core
    .replace(/\s+/g, " ")
    .trim();
  
  return core;
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
 * Map a category to a likely intent for text prompts
 */
const mapCategoryToIntent = (category: string, type: "text" | "image" | "code"): string => {
  if (type !== "text") return "analyze";
  
  const categoryIntentMap: Record<string, string> = {
    "blog_post": "analyze",
    "social_media": "persuade",
    "email": "persuade",
    "academic": "explain",
    "creative_writing": "describe",
    "marketing": "persuade",
    "technical": "explain",
    "storytelling": "describe"
  };
  
  return categoryIntentMap[category] || "analyze";
};

/**
 * Map a category to a visual style for image prompts
 */
const mapCategoryToStyle = (category: string): string => {
  const categoryStyleMap: Record<string, string> = {
    "photography": "photorealistic",
    "illustration": "digital illustration",
    "3d_render": "3D rendering",
    "concept_art": "concept art",
    "product_design": "professional product photography",
    "ui_design": "clean UI mockup",
    "character": "detailed character design",
    "landscape": "panoramic landscape photography"
  };
  
  return categoryStyleMap[category] || "high-quality image";
};

/**
 * Map a category to a programming language for code prompts
 */
const mapCategoryToLanguage = (category: string): { language: string } => {
  const categoryLangMap: Record<string, string> = {
    "function": "JavaScript",
    "algorithm": "Python",
    "api": "JavaScript",
    "frontend": "TypeScript",
    "backend": "Node.js",
    "database": "SQL",
    "refactor": "TypeScript",
    "optimization": "C++"
  };
  
  return { language: categoryLangMap[category] || "JavaScript" };
};

/**
 * Get tone-specific adjectives for text content
 */
const getToneAdjectives = (tone: string): string[] => {
  const toneMap: Record<string, string[]> = {
    "professional": ["authoritative", "well-researched", "objective"],
    "casual": ["conversational", "accessible", "relatable"],
    "enthusiastic": ["energetic", "passionate", "engaging"],
    "authoritative": ["definitive", "expert", "comprehensive"],
    "creative": ["innovative", "imaginative", "thought-provoking"],
    "technical": ["precise", "detailed", "technical"],
    "friendly": ["approachable", "helpful", "clear"],
    "persuasive": ["compelling", "convincing", "motivating"],
    "minimalist": ["concise", "essential", "focused"]
  };
  
  return toneMap[tone] || ["well-written", "informative"];
};

/**
 * Get tone-specific mood for image content
 */
const getToneMood = (tone: string): string => {
  const moodMap: Record<string, string> = {
    "professional": "polished",
    "casual": "relaxed",
    "enthusiastic": "vibrant",
    "authoritative": "dramatic",
    "creative": "imaginative",
    "technical": "precise",
    "friendly": "warm",
    "persuasive": "impactful",
    "minimalist": "clean"
  };
  
  return moodMap[tone] || "balanced";
};

/**
 * Get tone-specific visual elements for image prompts
 */
const getToneVisuals = (tone: string): string => {
  const visualMap: Record<string, string> = {
    "professional": "professional lighting, clean composition, high-contrast",
    "casual": "natural lighting, candid feel, soft focus",
    "enthusiastic": "vibrant colors, dynamic composition, high energy",
    "authoritative": "dramatic lighting, bold contrast, powerful composition",
    "creative": "artistic effects, unique perspective, experimental techniques",
    "technical": "precise details, technical diagram style, clear rendering",
    "friendly": "warm tones, approachable subjects, soft lighting",
    "persuasive": "eye-catching colors, compelling focal point, emotional impact",
    "minimalist": "clean background, minimal elements, perfect symmetry"
  };
  
  return visualMap[tone] || "balanced lighting, professional quality";
};

/**
 * Get tone-specific style for code prompts
 */
const getToneForCode = (tone: string): string => {
  const codeStyleMap: Record<string, string> = {
    "professional": "production-quality",
    "casual": "approachable, well-commented",
    "enthusiastic": "innovative, cutting-edge",
    "authoritative": "industry-standard",
    "creative": "elegant, creative",
    "technical": "highly optimized",
    "friendly": "well-documented, beginner-friendly",
    "persuasive": "robust, enterprise-grade",
    "minimalist": "clean, minimal"
  };
  
  return codeStyleMap[tone] || "professional";
};

/**
 * Convert format string to descriptive text
 */
const formatToDescription = (format: string, type: "text" | "image" | "code"): string => {
  if (type === "text") {
    const textFormatMap: Record<string, string> = {
      "paragraph": "flowing paragraphs with logical transitions",
      "bullet_points": "concise bullet points for quick scanning",
      "numbered_list": "a sequential numbered list",
      "qa_format": "a question-and-answer format",
      "script": "a conversational script"
    };
    
    return textFormatMap[format] || "a well-structured document";
  }
  
  if (type === "code") {
    return format; // For code, format is typically the language or framework
  }
  
  return format; // Default fallback
};

/**
 * Get format specifications for image prompts
 */
const getFormatSpecification = (format: string, type: "image"): string => {
  if (type !== "image") return "";
  
  const imageFormatMap: Record<string, string> = {
    "portrait": "--ar 3:4",
    "landscape": "--ar 16:9",
    "square": "--ar 1:1",
    "panoramic": "--ar 2:1",
    "close_up": "--ar 4:3"
  };
  
  return imageFormatMap[format] || "--ar 16:9";
};

/**
 * Get length descriptor based on length parameter
 */
const getLengthDescriptor = (length: string, type: "text" | "image" | "code"): string => {
  if (type === "text") {
    const textLengthMap: Record<string, string> = {
      "short": "concise, to-the-point",
      "medium": "comprehensive but focused",
      "long": "in-depth, exhaustive"
    };
    
    return textLengthMap[length] || "well-balanced";
  }
  
  return length; // Default fallback
};

/**
 * Helper function to select random items from an array
 */
const selectRandomItems = (items: string[], count: number): string[] => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Detect the most likely category for the input
 */
const detectCategory = (input: string, type: "text" | "image" | "code"): string => {
  const lowerInput = input.toLowerCase();
  const categories = PROMPT_CATEGORIES[type];
  
  // Simple keyword matching
  for (const category of categories) {
    const categoryKeywords = getCategoryKeywords(category, type);
    if (categoryKeywords.some(keyword => lowerInput.includes(keyword))) {
      return category;
    }
  }
  
  // Default categories for each type
  const defaults: Record<string, string> = {
    "text": "blog_post",
    "image": "concept_art",
    "code": "function"
  };
  
  return defaults[type];
};

/**
 * Get keywords associated with a category
 */
const getCategoryKeywords = (category: string, type: "text" | "image" | "code"): string[] => {
  const keywordMap: Record<string, Record<string, string[]>> = {
    "text": {
      "blog_post": ["blog", "post", "article", "write"],
      "social_media": ["social", "post", "facebook", "twitter", "instagram"],
      "email": ["email", "newsletter", "message"],
      "academic": ["research", "paper", "academic", "study"],
      "creative_writing": ["story", "fiction", "creative", "narrative"],
      "marketing": ["marketing", "advertisement", "promotion", "ad", "campaign"],
      "technical": ["technical", "manual", "documentation", "guide"],
      "storytelling": ["story", "storytelling", "tale", "narrative"]
    },
    "image": {
      "photography": ["photo", "photographic", "photograph", "realistic"],
      "illustration": ["illustration", "illustrate", "drawing", "sketch"],
      "3d_render": ["3d", "render", "model", "cgi"],
      "concept_art": ["concept", "art", "conceptual", "fantasy"],
      "product_design": ["product", "design", "package", "mockup"],
      "ui_design": ["ui", "interface", "app", "website", "screen"],
      "character": ["character", "person", "portrait", "figure"],
      "landscape": ["landscape", "scenery", "nature", "environment"]
    },
    "code": {
      "function": ["function", "method", "routine", "calculate"],
      "algorithm": ["algorithm", "compute", "process", "solve"],
      "api": ["api", "endpoint", "service", "request", "response"],
      "frontend": ["frontend", "ui", "interface", "component", "react", "vue"],
      "backend": ["backend", "server", "nodejs", "express", "api"],
      "database": ["database", "db", "sql", "query", "storage"],
      "refactor": ["refactor", "optimize", "clean", "improve"],
      "optimization": ["optimize", "performance", "speed", "efficient"]
    }
  };
  
  return keywordMap[type]?.[category] || [];
};

/**
 * Estimate performance score for a prompt
 */
const estimatePerformance = (prompt: string, type: "text" | "image" | "code"): number => {
  const wordCount = prompt.split(/\s+/).length;
  const hasStructure = prompt.includes("\n") || prompt.includes(":");
  const hasSpecifics = prompt.length > 50;
  
  // Base score by length (0-100)
  let score = 0;
  if (wordCount < 5) score = 30;
  else if (wordCount < 15) score = 50;
  else if (wordCount < 30) score = 70;
  else if (wordCount < 50) score = 85;
  else score = 95;
  
  // Adjustments
  if (hasStructure) score += 5;
  if (hasSpecifics) score += 5;
  
  // Check for quality keywords presence
  const typeKeywords = ENHANCEMENT_KEYWORDS[type];
  let keywordMatches = 0;
  
  for (const keyword of typeKeywords) {
    if (prompt.toLowerCase().includes(keyword.toLowerCase())) {
      keywordMatches++;
    }
  }
  
  // Boost score based on keywords matches
  if (keywordMatches >= 5) score += 5;
  else if (keywordMatches >= 3) score += 3;
  else if (keywordMatches >= 1) score += 1;
  
  // Cap at 100
  return Math.min(100, Math.max(0, score));
};
