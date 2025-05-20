
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Code, Briefcase, Layout } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      id: "designers",
      icon: <Pencil className="h-5 w-5" />,
      title: "For Designers",
      description:
        "Create detailed image prompts that perfectly describe style, composition, lighting, and more. Generate consistent visual assets across projects.",
      examples: [
        "Branding assets in consistent style",
        "Detailed concept illustrations",
        "UI mockups with specific requirements",
        "Custom artwork for projects",
      ],
    },
    {
      id: "developers",
      icon: <Code className="h-5 w-5" />,
      title: "For Developers",
      description:
        "Get more accurate code samples, technical explanations, and debug assistance by providing context-rich prompts to AI coding assistants.",
      examples: [
        "Structured code generation prompts",
        "Detailed refactoring requests",
        "Architecture planning assistance",
        "Complex algorithm explanations",
      ],
    },
    {
      id: "marketers",
      icon: <Briefcase className="h-5 w-5" />,
      title: "For Marketers",
      description:
        "Create compelling copy, campaign ideas, and audience targeting strategies with AI assistance tuned to your brand voice and goals.",
      examples: [
        "Consistent brand voice across platforms",
        "Campaign concept development",
        "Social media content batches",
        "SEO-optimized blog content",
      ],
    },
    {
      id: "writers",
      icon: <Layout className="h-5 w-5" />,
      title: "For Writers",
      description:
        "Enhance your writing workflow with detailed prompts that help with research, outlining, editing, and generating ideas in your unique style.",
      examples: [
        "Character development profiles",
        "Plot outlines with specific themes",
        "Consistent story elements",
        "Research assistance for complex topics",
      ],
    },
  ];

  return (
    <section id="use-cases" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for <span className="gradient-text">Every Creator</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how PromptP enhances workflows across different creative fields.
          </p>
        </div>

        <Tabs defaultValue="designers" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {useCases.map((useCase) => (
              <TabsTrigger
                key={useCase.id}
                value={useCase.id}
                className="flex items-center gap-2 py-3"
              >
                {useCase.icon}
                {useCase.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {useCases.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id}>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium mb-3 text-promptp-purple">
                      What You Can Create:
                    </h4>
                    <ul className="space-y-3">
                      {useCase.examples.map((example, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-promptp-cyan"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UseCases;
