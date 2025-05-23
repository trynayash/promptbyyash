
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Cta = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 hero-gradient" id="cta">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start <span className="gradient-text">Prompting Smarter</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are getting better results from AI tools with PromptP. Start for free today!
          </p>
          
          {!user ? (
            <>
              <Button 
                size="lg" 
                className="bg-promptp-purple hover:bg-promptp-deep-purple text-white px-8"
                onClick={() => navigate('/auth?tab=signup')}
              >
                Start For Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-4 text-gray-500 text-sm">
                No credit card required • Free plan available forever
              </p>
            </>
          ) : (
            <>
              <Button 
                size="lg" 
                className="bg-promptp-purple hover:bg-promptp-deep-purple text-white px-8"
                onClick={() => window.location.href = "#prompt-demo"}
              >
                Try PromptP Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-4 text-gray-500 text-sm">
                You're logged in and ready to go!
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cta;
