
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const PromptDemo = () => {
  const [inputPrompt, setInputPrompt] = useState("Create an image of a futuristic city");
  
  const enhancedPrompt = `Create a highly detailed, cinematic image of a futuristic metropolitan city skyline at golden hour sunset, featuring gleaming skyscrapers with holographic projections, flying vehicles between buildings, extensive vertical gardens with waterfalls cascading down structures, advanced maglev transport systems weaving between buildings, in a photorealistic style with atmospheric volumetric lighting, high contrast, ultra-high resolution --ar 16:9 --v 5.1 --q 2`;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See the <span className="gradient-text">Magic</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how PromptP transforms basic ideas into powerful, detailed prompts that get better results from AI tools.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Before */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center">
                <div className="bg-gray-200 text-gray-600 rounded-full px-4 py-1 text-sm font-medium">
                  Before: Basic Prompt
                </div>
              </div>
              <Textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Enter your basic prompt idea..."
                className="min-h-[150px] resize-none mb-4"
              />
              <div className="flex justify-end">
                <Button variant="outline" className="text-gray-500">
                  AI would generate a basic result
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
                value={enhancedPrompt}
                readOnly
                className="min-h-[150px] resize-none mb-4 bg-gray-50 border-promptp-purple/20"
              />
              <div className="flex justify-end">
                <Button className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                  Get Enhanced Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 italic">
            Works with ChatGPT, Midjourney, DALL-E, Stable Diffusion, Claude and more!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromptDemo;
