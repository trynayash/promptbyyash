
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Calendar, Copy, Sparkles, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface PromptEntry {
  id: string;
  title: string;
  input_value: string;
  output_value: string;
  created_at: string;
  language?: string;
  favorite?: boolean;
  metrics?: {
    uses: number;
    likes: number;
  };
}

const PromptHistory = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [promptHistory, setPromptHistory] = useState<PromptEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/");
    } else if (isLoaded && isSignedIn && userId) {
      fetchPromptHistory();
    }
  }, [isLoaded, isSignedIn, navigate, userId]);

  const fetchPromptHistory = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("code_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setPromptHistory(data || []);
    } catch (error) {
      console.error("Error fetching prompt history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Prompt History</h1>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Create New Prompt
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Prompts</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="images">Image Prompts</TabsTrigger>
            <TabsTrigger value="text">Text Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">Loading your prompt history...</div>
            ) : promptHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">You haven't created any prompts yet.</p>
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="bg-promptp-purple hover:bg-promptp-deep-purple text-white"
                >
                  Create Your First Prompt
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promptHistory.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg truncate">
                            {entry.title || "Untitled Prompt"}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(entry.created_at)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-promptp-purple"
                          onClick={() => {}}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Input:</p>
                        <p className="text-sm line-clamp-2 bg-gray-50 p-2 rounded">
                          {entry.input_value}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Enhanced Result:</p>
                        <p className="text-sm line-clamp-3 bg-promptp-purple/5 p-2 rounded border border-promptp-purple/20">
                          {entry.output_value}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => {}}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {entry.metrics?.likes || 0}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(entry.output_value)}
                          className="text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/prompt/${entry.id}`)}
                          className="text-xs"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="text-center py-12">
              <p className="text-gray-600">Your favorite prompts will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="images">
            <div className="text-center py-12">
              <p className="text-gray-600">Your image generation prompts will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="text-center py-12">
              <p className="text-gray-600">Your text generation prompts will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PromptHistory;
