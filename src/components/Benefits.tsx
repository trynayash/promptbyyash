
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Rocket, Image, Users } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Rocket className="h-10 w-10 text-promptp-purple" />,
      title: "Boost Productivity",
      description:
        "Skip the trial and error. Get optimal results from AI tools on your first try with perfectly structured prompts.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-promptp-cyan" />,
      title: "Unlock Creativity",
      description:
        "Break through creative blocks with intelligent prompt suggestions tailored to your specific needs.",
    },
    {
      icon: <Image className="h-10 w-10 text-promptp-purple" />,
      title: "Perfect for Any AI Tool",
      description:
        "Optimize prompts for ChatGPT, Midjourney, DALL-E, Stable Diffusion, Claude, and more.",
    },
    {
      icon: <Users className="h-10 w-10 text-promptp-cyan" />,
      title: "Prompt Marketplace Coming Soon",
      description:
        "Access and share proven prompt templates created by experts across every industry and use case.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefits That Make a <span className="gradient-text">Difference</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            PromptP helps you get more out of every AI interaction, saving time and enhancing results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-sm card-hover bg-white">
              <CardContent className="pt-6">
                <div className="mb-5">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
