
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to PromptP</h2>
          <p className="text-gray-600">
            You've successfully logged in! This is your personal dashboard where you can access your saved prompts,
            history, and customize your PromptP experience.
          </p>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Get Started</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium">Create your first prompt</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Start with a simple idea and let PromptP transform it into a powerful AI prompt.
                </p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium">Explore the marketplace</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Browse community prompts and templates to kickstart your creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
