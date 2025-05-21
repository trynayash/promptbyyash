
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Wand } from "lucide-react";

const PromptDemo = () => {
  const navigate = useNavigate();
  const [demoType, setDemoType] = useState<"text" | "image" | "code">("image");
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const textInputPrompt = "Write about the benefits of AI in content creation";
  const textEnhancedPrompt = `Write a comprehensive analysis of how AI technologies are transforming content creation across different industries. Include specific examples of AI tools currently being used by content creators, quantifiable benefits regarding time savings and quality improvements, potential limitations or ethical concerns, and predictions for how the relationship between AI and human creators will evolve over the next 5 years. Format the response with clear headings, bullet points for key benefits, and provide actionable takeaways for content creators looking to effectively incorporate AI into their workflows.`;
  
  const imageInputPrompt = "Create an image of a futuristic city";
  const imageEnhancedPrompt = `Create a highly detailed, cinematic image of a futuristic metropolitan city skyline at golden hour sunset, featuring gleaming skyscrapers with holographic projections, flying vehicles between buildings, extensive vertical gardens with waterfalls cascading down structures, advanced maglev transport systems weaving between buildings, in a photorealistic style with atmospheric volumetric lighting, high contrast, ultra-high resolution --ar 16:9 --v 5.1 --q 2`;

  const codeInputPrompt = "Write a function to calculate factorial";
  const codeEnhancedPrompt = `Write a highly optimized JavaScript function to calculate the factorial of a number with the following specifications:
  
1. Implement both recursive and iterative approaches
2. Include thorough input validation to handle edge cases (negative numbers, non-integers, etc.)
3. Implement memoization to avoid recalculating previously computed values
4. Add clear JSDoc comments explaining parameters, return values, and examples
5. Include performance benchmarking between the approaches
6. Implement BigInt support for handling very large factorials beyond standard JS number limits
7. Include comprehensive unit tests covering all edge cases

The function should follow modern JavaScript best practices and be usable in both Node.js and browser environments.`;

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See the <span className="bg-clip-text text-transparent bg-gradient-to-r from-promptp-purple to-promptp-cyan">Magic</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how PromptP transforms basic ideas into powerful, detailed prompts that get better results from AI tools.
          </p>
        </div>

        <Tabs 
          defaultValue="image" 
          value={demoType}
          onValueChange={(value) => setDemoType(value as "text" | "image" | "code")}
          className="max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="text">Text Generation</TabsTrigger>
              <TabsTrigger value="image">Image Creation</TabsTrigger>
              <TabsTrigger value="code">Code Writing</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="bg-gray-200 text-gray-600 rounded-full px-4 py-1 text-sm font-medium">
                    Before: Basic Prompt
                  </div>
                </div>
                <Textarea
                  value={
                    demoType === "text" 
                      ? textInputPrompt 
                      : demoType === "image" 
                        ? imageInputPrompt 
                        : codeInputPrompt
                  }
                  readOnly
                  className="min-h-[150px] resize-none mb-4"
                />
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="text-gray-500"
                    onClick={() => 
                      copyToClipboard(
                        demoType === "text" 
                          ? textInputPrompt 
                          : demoType === "image" 
                            ? imageInputPrompt 
                            : codeInputPrompt
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Basic Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border border-promptp-purple/30 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="bg-promptp-purple/20 text-promptp-purple rounded-full px-4 py-1 text-sm font-medium">
                    After: PromptP Enhancement
                  </div>
                </div>
                <Textarea
                  value={
                    demoType === "text" 
                      ? textEnhancedPrompt 
                      : demoType === "image" 
                        ? imageEnhancedPrompt 
                        : codeEnhancedPrompt
                  }
                  readOnly
                  className="min-h-[150px] resize-none mb-4 bg-gray-50 border-promptp-purple/20"
                />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    className="text-gray-500"
                    onClick={() => 
                      copyToClipboard(
                        demoType === "text" 
                          ? textEnhancedPrompt 
                          : demoType === "image" 
                            ? imageEnhancedPrompt 
                            : codeEnhancedPrompt
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Enhanced Prompt
                  </Button>
                  <Button 
                    className="bg-promptp-purple hover:bg-promptp-deep-purple text-white"
                    disabled={isEnhancing}
                    onClick={handleEnhance}
                  >
                    {isEnhancing ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⚙️</span>
                        Enhancing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Wand className="h-4 w-4 mr-2" />
                        Enhance Your Own
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 italic mb-4">
              Works with ChatGPT, Midjourney, DALL-E, Stable Diffusion, Claude and more!
            </p>
            <Button 
              className="bg-promptp-purple hover:bg-promptp-deep-purple text-white"
              onClick={() => {
                const isLoggedIn = false; // Replace with actual auth check
                if (isLoggedIn) {
                  navigate("/dashboard");
                } else {
                  navigate("/"); // Navigate to home/sign up flow
                }
              }}
            >
              Start Enhancing Your Prompts
            </Button>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default PromptDemo;
