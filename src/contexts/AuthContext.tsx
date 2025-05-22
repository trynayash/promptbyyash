
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, user: User | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Sign in error:", error.message);
      setAuthError(error.message);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign up error:", error.message);
      setAuthError(error.message);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    }
    return { error, user: data.user };
  };

  const signOut = async () => {
    setAuthError(null);
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in process...");
      setAuthError(null);
      
      // Get the current origin for proper redirect handling
      const origin = window.location.origin;
      console.log("Current origin:", origin);
      
      // Check if we're in a development environment
      const redirectTo = origin.includes('localhost') || origin.includes('127.0.0.1')
        ? `${origin}/auth`
        : `${origin}/auth`;
      
      console.log("Using redirect URL:", redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        console.error("Google sign-in error:", error.message);
        setAuthError(error.message);
        toast({
          title: "Google sign-in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        console.log("Redirecting to Google OAuth:", data.url);
        // Use window.location.href instead of a direct redirect
        window.location.href = data.url;
      } else {
        const errorMsg = "No redirect URL provided from Supabase";
        console.error(errorMsg);
        setAuthError(errorMsg);
        toast({
          title: "Authentication error",
          description: "Could not initiate Google sign-in",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred";
      console.error("Unexpected error during Google sign-in:", errorMsg);
      setAuthError(errorMsg);
      toast({
        title: "Authentication error",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    authError,
    setAuthError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
