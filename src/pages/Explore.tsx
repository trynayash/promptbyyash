
import { useState } from "react";
import { Search, Sparkles, Tag, ThumbsUp, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  likes: number;
  uses: number;
  imageUrl?: string;
}

const SAMPLE_TEMPLATES: PromptTemplate[] = [
  {
    id: "1",
    title: "Professional Headshot Generator",
    description: "Create stunning professional headshots for LinkedIn or business profiles",
    creator: {
      name: "PhotoPro",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    category: "Photography",
    tags: ["portrait", "headshot", "professional"],
    likes: 342,
    uses: 1245,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "2",
    title: "Blog Introduction Creator",
    description: "Generate engaging introductions for blog posts that hook readers instantly",
    creator: {
      name: "ContentCreator",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    category: "Writing",
    tags: ["blog", "content", "introduction"],
    likes: 189,
    uses: 823
  },
  {
    id: "3",
    title: "Product Feature Benefits",
    description: "Transform technical features into compelling benefit statements for customers",
    creator: {
      name: "MarketingGuru",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    category: "Marketing",
    tags: ["products", "benefits", "sales"],
    likes: 276,
    uses: 1098
  },
  {
    id: "4",
    title: "Fantasy Character Creator",
    description: "Generate detailed fantasy character descriptions and visual concepts",
    creator: {
      name: "StoryWeaver",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    category: "Creative",
    tags: ["fantasy", "characters", "fiction"],
    likes: 412,
    uses: 1578,
    imageUrl: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "5",
    title: "SEO Title Generator",
    description: "Create SEO-optimized titles that rank well and drive clicks",
    creator: {
      name: "SEOMaster",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    category: "Marketing",
    tags: ["SEO", "titles", "optimization"],
    likes: 205,
    uses: 967
  },
  {
    id: "6",
    title: "App UI Mockup Creator",
    description: "Generate realistic mobile app UI mockups for presentations and portfolios",
    creator: {
      name: "DesignPro",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg"
    },
    category: "Design",
    tags: ["UI", "mockup", "mobile"],
    likes: 289,
    uses: 874,
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const categories = ["All", "Marketing", "Design", "Photography", "Writing", "Creative", "Development"];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [templates, setTemplates] = useState<PromptTemplate[]>(SAMPLE_TEMPLATES);

  const filteredTemplates = templates.filter(template => {
    if (selectedCategory !== "All" && template.category !== selectedCategory) return false;
    if (searchQuery && !template.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Prompt Templates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and use community-created prompt templates to enhance your creativity
          </p>
          
          <div className="flex items-center mx-auto mt-8 max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search templates..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category ? "bg-promptp-purple text-white whitespace-nowrap" : "whitespace-nowrap"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="featured">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">No templates found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-md transition-all">
                    {template.imageUrl && (
                      <div 
                        className="h-40 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${template.imageUrl})` }}
                      />
                    )}
                    <CardHeader className={template.imageUrl ? "pb-2" : "pb-2 pt-6"}>
                      <div>
                        <h3 className="font-semibold text-lg">{template.title}</h3>
                        <div className="flex items-center mt-1">
                          <img 
                            src={template.creator.avatar} 
                            alt={template.creator.name}
                            className="h-6 w-6 rounded-full mr-2" 
                          />
                          <span className="text-sm text-gray-600">{template.creator.name}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="py-2 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {template.likes}
                        </span>
                        <span className="flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {template.uses} uses
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Follow
                        </Button>
                        <Button size="sm" className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                          Use Template
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="text-center py-16">
              <p className="text-gray-600">Popular templates are being loaded...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="newest">
            <div className="text-center py-16">
              <p className="text-gray-600">Newest templates are being loaded...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="text-center py-16">
              <p className="text-gray-600">Trending templates are being loaded...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;
