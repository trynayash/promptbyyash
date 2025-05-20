
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out PromptP",
      features: [
        "Up to 25 prompt enhancements per month",
        "Basic prompt templates",
        "Standard-quality enhancements",
        "Web application access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For creators who need consistent results",
      features: [
        "Unlimited prompt enhancements",
        "Access to all premium templates",
        "Priority processing",
        "Save prompts and history",
        "API access",
        "Early access to new features",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start for free and upgrade when you're ready. No hidden fees or complicated tiers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "border-promptp-purple shadow-lg shadow-promptp-purple/10"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-promptp-purple text-white text-xs font-semibold px-3 py-1 rounded-bl">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <CardHeader className="pb-0">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="text-promptp-purple shrink-0 mr-2 h-5 w-5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-promptp-purple hover:bg-promptp-deep-purple text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
