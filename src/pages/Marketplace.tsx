
import { useState } from "react";
import { Search, Filter, Star, Users, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptPack {
  id: string;
  title: string;
  description: string;
  creator: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
}

const SAMPLE_PACKS: PromptPack[] = [
  {
    id: "1",
    title: "Ultimate UX/UI Design Prompt Pack",
    description: "150+ prompts for designing beautiful interfaces with Midjourney and DALL-E",
    creator: "DesignMasters",
    price: 19.99,
    rating: 4.8,
    reviewCount: 124,
    category: "Design",
    tags: ["UI/UX", "Midjourney", "DALL-E"],
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "2",
    title: "E-commerce Product Description Generator",
    description: "Optimize your product listings with these GPT prompts designed for conversion",
    creator: "MarketingPro",
    price: 29.99,
    rating: 4.9,
    reviewCount: 89,
    category: "Marketing",
    tags: ["E-commerce", "SEO", "ChatGPT"],
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "3",
    title: "Character Design Master Collection",
    description: "Create stunning character concepts for games, comics and animation",
    creator: "ArtisticMinds",
    price: 24.99,
    rating: 4.7,
    reviewCount: 56,
    category: "Art",
    tags: ["Characters", "Stable Diffusion", "Midjourney"],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "4",
    title: "Programming Assistant Pro",
    description: "Boost your coding productivity with specialized prompts for different programming tasks",
    creator: "CodeCrafters",
    price: 39.99,
    rating: 4.5,
    reviewCount: 42,
    category: "Development",
    tags: ["Coding", "ChatGPT", "API Design"],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "5",
    title: "Social Media Content Strategy",
    description: "Generate months of engaging social content with these template prompts",
    creator: "SocialGurus",
    price: 34.99,
    rating: 4.6,
    reviewCount: 73,
    category: "Marketing",
    tags: ["Social Media", "Content", "Engagement"],
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "6",
    title: "Storyboard Creator Pack",
    description: "Turn your ideas into visual narratives with these specialized prompts",
    creator: "FilmCrew",
    price: 19.99,
    rating: 4.3,
    reviewCount: 28,
    category: "Art",
    tags: ["Storyboarding", "Film", "Visual Narrative"],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const categories = ["All", "Marketing", "Design", "Development", "Art", "Writing"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [packs, setPacks] = useState<PromptPack[]>(SAMPLE_PACKS);

  const filteredPacks = packs.filter(pack => {
    if (selectedCategory !== "All" && pack.category !== selectedCategory) return false;
    if (searchQuery && !pack.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featuredPacks = packs.filter(pack => pack.featured);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Prompt Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and purchase premium prompt collections from top creators
          </p>
          
          <div className="flex items-center mx-auto mt-8 max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search for prompt packs..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Packs</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category ? "bg-promptp-purple text-white" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="all">
            {filteredPacks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">No prompt packs found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPacks.map((pack) => (
                  <Card key={pack.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div 
                      className="h-48 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${pack.imageUrl})` }}
                    />
                    <CardHeader className="pb-2">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{pack.title}</h3>
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{pack.rating}</span>
                            <span className="text-gray-500 ml-1">({pack.reviewCount})</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">by {pack.creator}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{pack.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {pack.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="font-semibold">${pack.price.toFixed(2)}</span>
                      <Button className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPacks.map((pack) => (
                <Card key={pack.id} className="overflow-hidden hover:shadow-md transition-all">
                  {/* Same card content as above */}
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${pack.imageUrl})` }}
                  />
                  <CardHeader className="pb-2">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{pack.title}</h3>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{pack.rating}</span>
                          <span className="text-gray-500 ml-1">({pack.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">by {pack.creator}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{pack.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {pack.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="font-semibold">${pack.price.toFixed(2)}</span>
                    <Button className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="text-center py-16">
              <p className="text-gray-600">New arrivals coming soon!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="text-center py-16">
              <p className="text-gray-600">Most popular packs coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
