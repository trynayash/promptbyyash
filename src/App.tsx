
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, SignedIn } from '@clerk/clerk-react';
import { AIProvider } from "./contexts/AIContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PromptHistory from "./pages/PromptHistory";
import Collections from "./pages/Collections";
import Marketplace from "./pages/Marketplace";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AIProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen">
              Loading authentication...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/dashboard" 
                element={
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <SignedIn>
                    <PromptHistory />
                  </SignedIn>
                } 
              />
              <Route 
                path="/collections" 
                element={
                  <SignedIn>
                    <Collections />
                  </SignedIn>
                } 
              />
              <Route 
                path="/marketplace" 
                element={
                  <Marketplace />
                } 
              />
              <Route 
                path="/explore" 
                element={
                  <Explore />
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ClerkLoaded>
        </BrowserRouter>
      </TooltipProvider>
    </AIProvider>
  </QueryClientProvider>
);

export default App;
