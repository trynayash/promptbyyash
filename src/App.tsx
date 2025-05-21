
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AIProvider } from "./contexts/AIContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PromptHistory from "./pages/PromptHistory";
import Collections from "./pages/Collections";
import Marketplace from "./pages/Marketplace";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading authentication...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AIProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <PromptHistory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collections" 
                element={
                  <ProtectedRoute>
                    <Collections />
                  </ProtectedRoute>
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
          </BrowserRouter>
        </TooltipProvider>
      </AIProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
