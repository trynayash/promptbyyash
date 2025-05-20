
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      company: "DesignCraft",
      content:
        "PromptP transformed my workflow with Midjourney. I create consistent asset sets in half the time with much better results. It's like having an AI prompt expert at my side.",
      avatar: "A",
    },
    {
      name: "Sarah Chen",
      role: "Content Strategist",
      company: "ContentLabs",
      content:
        "The structured prompts I get from PromptP have completely changed how I use ChatGPT for content creation. More detailed, on-brand results every time.",
      avatar: "S",
    },
    {
      name: "Michael Rivera",
      role: "Web Developer",
      company: "CodeMatrix",
      content:
        "As a developer, I was skeptical, but PromptP genuinely makes my interactions with AI coding assistants more productive. Better code samples, better explanations.",
      avatar: "M",
    },
    {
      name: "Jessica Park",
      role: "Marketing Director",
      company: "GrowthPulse",
      content:
        "We use PromptP across our entire marketing team to ensure everyone gets consistent, high-quality outputs from our AI tools. It's standardized our approach.",
      avatar: "J",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= testimonials.length
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Creators <span className="gradient-text">Love</span> Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what professionals across industries say about PromptP.
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {testimonials
              .slice(currentIndex, currentIndex + visibleCount)
              .map((testimonial, index) => (
                <Card
                  key={index}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] border-gray-200 card-hover"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-1 mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-6">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-promptp-purple/20 text-promptp-purple rounded-full flex items-center justify-center font-medium mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {testimonials.length > visibleCount && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={prevSlide}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={nextSlide}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
