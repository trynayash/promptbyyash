
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-promptp-purple/10 rounded-full">
            <span className="text-sm font-medium text-promptp-purple">Powered by GPT Technology</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Turn Basic Ideas into{" "}
            <span className="gradient-text">Brilliant AI Prompts</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            PromptP enhances your raw inputs into powerful, structured prompts optimized for 
            ChatGPT, Midjourney, Stable Diffusion, and more.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-200">
            <Button 
              size="lg" 
              className="bg-promptp-purple hover:bg-promptp-deep-purple text-white px-8"
            >
              Start For Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-gray-300 hover:border-promptp-purple hover:text-promptp-purple"
            >
              See How It Works
            </Button>
          </div>

          <div className="mt-12 text-gray-500 text-sm flex items-center justify-center space-x-8 animate-fade-in animate-delay-300">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1.5 text-promptp-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1.5 text-promptp-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
