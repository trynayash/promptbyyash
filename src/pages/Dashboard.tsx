import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { 
  BarChart, 
  BookOpen, 
  Clock, 
  History, 
  Lightbulb, 
  Plus,
  Share,
  Sparkles, 
  Star, 
  Tag,
  TrendingUp,
  Wand
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enhancePrompt, generateNewPrompt } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { PromptType } from "@/types/ai";
import { useAI } from "@/contexts/AIContext";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLocalAI } = useAI();
  
  const [prompt, setPrompt] = useState("");
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [promptType, setPromptType] = useState<PromptType>("text");
  const [mode, setMode] = useState<"enhance" | "generate">("enhance");

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Only use AI service for text, image and code tabs
      if (promptType !== "chat") {
        const result = await enhancePrompt(prompt, promptType);
        
        if (result.error) {
          toast({
            title: "Enhancement Error",
            description: result.error,
            variant: "destructive"
          });
        } else {
          setEnhancedPrompt(result.enhancedPrompt);
          toast({
            title: "Prompt Enhanced",
            description: `Your prompt was successfully enhanced using ${isLocalAI ? 'Smart AI' : 'ChatGPT'}!`,
            variant: "default"
          });
        }
      } else {
        // Fallback for chat tab which isn't implemented yet
        toast({
          title: "Feature Unavailable",
          description: "Chat prompt enhancement is coming soon!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast({
        title: "Enhancement Error",
        description: "There was an error enhancing your prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePrompt = async () => {
    if (!inputText.trim()) return;
    
    setIsCreating(true);
    
    try {
      if (promptType !== "chat") {
        const result = await generateNewPrompt(inputText, promptType);
        
        if (result.error) {
          toast({
            title: "Generation Error",
            description: result.error,
            variant: "destructive"
          });
        } else {
          setPrompt(result.generatedPrompt);
          toast({
            title: "Prompt Generated",
            description: "Your prompt was successfully generated!",
            variant: "default"
          });
        }
      } else {
        toast({
          title: "Feature Unavailable",
          description: "Chat prompt generation is coming soon!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Generation Error",
        description: "There was an error generating your prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Your Prompt Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Sparkles className="h-8 w-8 text-promptp-purple mb-2" />
                    <span className="text-2xl font-bold">24</span>
                    <span className="text-xs text-gray-500">Prompts Created</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Star className="h-8 w-8 text-amber-400 mb-2" />
                    <span className="text-2xl font-bold">8</span>
                    <span className="text-xs text-gray-500">Saved Favorites</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Share className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-2xl font-bold">5</span>
                    <span className="text-xs text-gray-500">Shared Prompts</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                    <span className="text-2xl font-bold">12%</span>
                    <span className="text-xs text-gray-500">Weekly Growth</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/history")}
                >
                  <History className="h-4 w-4 mr-2" />
                  View Prompt History
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/collections")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Manage Collections
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/marketplace")}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Browse Marketplace
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Image Generation", "Content Writing", "Marketing", "SEO", "UI Design", "Character Design", "Product Descriptions"].map((category) => (
                    <Button 
                      key={category} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle & Right Columns - Prompt Creator and Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Create Enhanced Prompts
                  <span className="ml-2 text-xs bg-promptp-purple/20 text-promptp-purple rounded-full px-3 py-1">
                    Powered by Smart AI
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="text" 
                  className="w-full"
                  value={promptType}
                  onValueChange={(value) => setPromptType(value as PromptType)}
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>
                  
                  <div className="mb-4">
                    <Tabs 
                      value={mode} 
                      onValueChange={(value) => setMode(value as "enhance" | "generate")}
                      className="w-full"
                    >
                      <TabsList className="w-full">
                        <TabsTrigger value="enhance" className="flex-1">Enhance Existing Prompt</TabsTrigger>
                        <TabsTrigger value="generate" className="flex-1">Generate New Prompt</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <TabsContent value="text" className="space-y-4">
                    {mode === "enhance" ? (
                      <>
                        <div>
                          <label className="text-sm font-medium">Your Basic Prompt</label>
                          <Textarea
                            placeholder="Enter your basic prompt idea here..."
                            className="min-h-[120px] resize-none mt-2"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isGenerating || !prompt.trim()}
                          onClick={handleEnhancePrompt}
                        >
                          {isGenerating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Enhancing with Smart AI...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Enhance Prompt with Smart AI
                            </span>
                          )}
                        </Button>
                        
                        {enhancedPrompt && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Enhanced Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={enhancedPrompt}
                                readOnly
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                Suggest Improvements
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="inputText">What would you like a prompt about?</Label>
                          <Input
                            id="inputText"
                            placeholder="E.g., Benefits of meditation, comparing cloud providers, etc."
                            className="mt-2"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Provide a brief topic or idea, and we'll create a detailed prompt for you
                          </p>
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isCreating || !inputText.trim()}
                          onClick={handleGeneratePrompt}
                        >
                          {isCreating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Generating prompt...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Wand className="h-4 w-4 mr-2" />
                              Generate Complete Prompt
                            </span>
                          )}
                        </Button>
                        
                        {prompt && mode === "generate" && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Generated Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(prompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => {
                                  setMode("enhance");
                                  handleEnhancePrompt();
                                }}
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                Further Enhance This Prompt
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="image" className="space-y-4">
                    {mode === "enhance" ? (
                      <>
                        <div>
                          <label className="text-sm font-medium">Your Basic Prompt</label>
                          <Textarea
                            placeholder="Describe the image you want to generate..."
                            className="min-h-[120px] resize-none mt-2"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isGenerating || !prompt.trim()}
                          onClick={handleEnhancePrompt}
                        >
                          {isGenerating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Enhancing with Smart AI...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Enhance Image Prompt
                            </span>
                          )}
                        </Button>
                        
                        {enhancedPrompt && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Enhanced Image Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={enhancedPrompt}
                                readOnly
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                Suggest Improvements
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="imageInputText">What image would you like to create?</Label>
                          <Input
                            id="imageInputText"
                            placeholder="E.g., futuristic city, portrait of a warrior, etc."
                            className="mt-2"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Describe the subject or scene, and we'll create a detailed image prompt
                          </p>
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isCreating || !inputText.trim()}
                          onClick={handleGeneratePrompt}
                        >
                          {isCreating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Generating image prompt...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Wand className="h-4 w-4 mr-2" />
                              Generate Image Prompt
                            </span>
                          )}
                        </Button>
                        
                        {enhancedPrompt && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Enhanced Image Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={enhancedPrompt}
                                readOnly
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                Suggest Improvements
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="code" className="space-y-4">
                    {mode === "enhance" ? (
                      <>
                        <div>
                          <label className="text-sm font-medium">Your Basic Code Prompt</label>
                          <Textarea
                            placeholder="Describe the code you want to generate..."
                            className="min-h-[120px] resize-none mt-2"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isGenerating || !prompt.trim()}
                          onClick={handleEnhancePrompt}
                        >
                          {isGenerating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Enhancing with Smart AI...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Enhance Code Prompt
                            </span>
                          )}
                        </Button>
                        
                        {enhancedPrompt && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Enhanced Code Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={enhancedPrompt}
                                readOnly
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                Suggest Improvements
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="codeInputText">What code would you like to create?</Label>
                          <Input
                            id="codeInputText"
                            placeholder="E.g., user authentication system, data visualization, etc."
                            className="mt-2"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Describe the functionality needed, and we'll create a detailed code prompt
                          </p>
                        </div>
                        
                        <Button 
                          className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                          disabled={isCreating || !inputText.trim()}
                          onClick={handleGeneratePrompt}
                        >
                          {isCreating ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⚙️</span>
                              Generating code prompt...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Wand className="h-4 w-4 mr-2" />
                              Generate Code Prompt
                            </span>
                          )}
                        </Button>
                        
                        {enhancedPrompt && (
                          <div className="mt-6">
                            <label className="text-sm font-medium">Enhanced Code Prompt</label>
                            <div className="relative mt-2">
                              <Textarea
                                value={enhancedPrompt}
                                readOnly
                                className="min-h-[150px] resize-none bg-gray-50 border-promptp-purple/20"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-xs bg-white/80 backdrop-blur-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                Suggest Improvements
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Collection
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="chat">
                    <div className="text-center py-10">
                      <p className="text-gray-600">Chat prompt enhancement coming soon!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-3 border-b pb-3 last:border-0">
                      <div className="bg-gray-100 rounded-full p-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item === 1 ? "Created a new prompt" : item === 2 ? "Saved to favorites" : "Shared a prompt"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item === 1 ? "Product description for eco-friendly water bottle" : 
                           item === 2 ? "Fantasy landscape scene with dragons" : 
                           "Marketing campaign for fitness app"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Trending Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Creating realistic product mockups for e-commerce", 
                    "Generating engaging social media post templates", 
                    "Character design prompts for fantasy RPG games"].map((prompt, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-promptp-purple/10 text-promptp-purple font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{prompt}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
