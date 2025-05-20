
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, FolderPlus, Grid2x2, List, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Collection {
  id: string;
  name: string;
  description: string;
  promptCount: number;
  isPublic: boolean;
  coverColor: string;
}

const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Product Descriptions",
    description: "E-commerce product descriptions for various categories",
    promptCount: 24,
    isPublic: true,
    coverColor: "bg-gradient-to-br from-promptp-purple/80 to-promptp-cyan/80"
  },
  {
    id: "2",
    name: "Blog Ideas",
    description: "Content prompts for tech and marketing blogs",
    promptCount: 16,
    isPublic: false,
    coverColor: "bg-gradient-to-br from-cyan-500/80 to-blue-500/80"
  },
  {
    id: "3",
    name: "Character Concepts",
    description: "Fantasy character designs for artwork",
    promptCount: 8,
    isPublic: true,
    coverColor: "bg-gradient-to-br from-amber-500/80 to-red-500/80"
  },
  {
    id: "4",
    name: "UI Design Prompts",
    description: "Prompts for generating UI mockups and design concepts",
    promptCount: 12,
    isPublic: false,
    coverColor: "bg-gradient-to-br from-green-500/80 to-emerald-500/80"
  },
];

const Collections = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [collections, setCollections] = useState<Collection[]>(SAMPLE_COLLECTIONS);
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    isPublic: false
  });

  const createCollection = () => {
    const newId = (collections.length + 1).toString();
    const colorOptions = [
      "bg-gradient-to-br from-promptp-purple/80 to-promptp-cyan/80",
      "bg-gradient-to-br from-cyan-500/80 to-blue-500/80",
      "bg-gradient-to-br from-amber-500/80 to-red-500/80",
      "bg-gradient-to-br from-green-500/80 to-emerald-500/80",
      "bg-gradient-to-br from-pink-500/80 to-rose-500/80"
    ];
    
    const newCollectionItem: Collection = {
      id: newId,
      name: newCollection.name,
      description: newCollection.description,
      promptCount: 0,
      isPublic: newCollection.isPublic,
      coverColor: colorOptions[Math.floor(Math.random() * colorOptions.length)]
    };
    
    setCollections([...collections, newCollectionItem]);
    setNewCollection({ name: "", description: "", isPublic: false });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Collections</h1>
          <div className="flex items-center space-x-3">
            <div className="border rounded-md flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-promptp-purple text-white" : ""}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-promptp-purple text-white" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Collection
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Collection</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Collection Name</label>
                    <Input
                      id="name"
                      value={newCollection.name}
                      onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                      placeholder="E.g., Product Descriptions"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={newCollection.description}
                      onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                      placeholder="What kind of prompts will you store here?"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newCollection.isPublic}
                      onChange={(e) => setNewCollection({...newCollection, isPublic: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isPublic" className="text-sm">Make this collection public</label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={createCollection} disabled={!newCollection.name} className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                    Create Collection
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Folder className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Collections Yet</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Collections help you organize your prompts by project, theme, or any way you like.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-promptp-purple hover:bg-promptp-deep-purple text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Collection
                </Button>
              </DialogTrigger>
              <DialogContent>{/* Content same as above dialog */}</DialogContent>
            </Dialog>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className={`h-24 ${collection.coverColor} flex items-center justify-center`}
                >
                  <Folder className="h-12 w-12 text-white" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{collection.name}</h3>
                      <p className="text-sm text-gray-500">
                        {collection.promptCount} prompt{collection.promptCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {collection.isPublic && (
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Share className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">{collection.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/collections/${collection.id}`)}
                  >
                    View Collection
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className="border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${collection.coverColor} flex items-center justify-center mr-4`}>
                    <Folder className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="text-sm text-gray-500">
                      {collection.promptCount} prompt{collection.promptCount !== 1 ? 's' : ''} • 
                      {collection.isPublic ? ' Public' : ' Private'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
