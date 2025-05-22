
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleErrorHelp, setShowGoogleErrorHelp] = useState(false);
  const { signIn, signUp, signInWithGoogle, user, authError, setAuthError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'signin';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Check for auth error in URL
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      const errorMessage = `${error}${errorDescription ? ': ' + errorDescription : ''}`;
      setAuthError(errorMessage);
      toast({
        title: "Authentication Error",
        description: errorDescription || error,
        variant: "destructive",
      });
    }
  }, [searchParams, toast, setAuthError]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (!error) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      setAuthError(error.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { error, user } = await signUp(email, password);
      
      if (!error) {
        toast({
          title: "Account created",
          description: "Please check your email for verification instructions.",
        });
        // No immediate redirect as user needs to verify email first
      }
    } catch (error: any) {
      setAuthError(error.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
      // No immediate toast/redirect here as we'll be redirected to Google
    } catch (error: any) {
      setAuthError(error.message || "An unexpected error with Google sign in");
      toast({
        title: "Error with Google sign in",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      // Set timeout to reset loading state in case the redirect doesn't happen
      setTimeout(() => setGoogleLoading(false), 5000);
    }
  };

  if (user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-promptp-purple to-promptp-cyan">
            Welcome to PromptP
          </h1>
          <p className="text-gray-600 mt-2">Enhance your AI prompts and boost creativity</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Sign in or create a new account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-2">
                  {authError}
                  {authError.includes("403") && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowGoogleErrorHelp(true)}
                      className="self-start mt-1"
                    >
                      How to fix this?
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-promptp-purple hover:bg-promptp-deep-purple"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Google
                  </>
                )}
              </Button>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </CardFooter>
        </Card>
      </div>

      {/* Google Auth Error Help Dialog */}
      <Dialog open={showGoogleErrorHelp} onOpenChange={setShowGoogleErrorHelp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>How to Fix Google Authentication</DialogTitle>
            <DialogDescription>
              The 403 error occurs when Google's OAuth configuration does not match your application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Step 1: Check Google Cloud Console</h3>
              <p className="text-sm text-muted-foreground">
                Open Google Cloud Console and select your project.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 2: Verify OAuth Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Go to APIs & Services {'>'} Credentials {'>'} OAuth 2.0 Client IDs
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 3: Update Redirect URIs</h3>
              <p className="text-sm text-muted-foreground">
                Add these URIs to "Authorized redirect URIs":
                <code className="block bg-gray-100 p-2 mt-1 rounded text-sm">
                  {window.location.origin}/auth<br />
                  https://twkqxsbrrwodkgqqfhno.supabase.co/auth/v1/callback
                </code>
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 4: Update JavaScript Origins</h3>
              <p className="text-sm text-muted-foreground">
                Add to "Authorized JavaScript origins":
                <code className="block bg-gray-100 p-2 mt-1 rounded text-sm">
                  {window.location.origin}<br />
                  https://twkqxsbrrwodkgqqfhno.supabase.co
                </code>
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 5: Update Supabase Configuration</h3>
              <p className="text-sm text-muted-foreground">
                In Supabase Dashboard {'>'} Authentication {'>'} URL Configuration, set:
                <code className="block bg-gray-100 p-2 mt-1 rounded text-sm">
                  Site URL: {window.location.origin}<br />
                  Redirect URLs: {window.location.origin}/auth
                </code>
              </p>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => setShowGoogleErrorHelp(false)}
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthPage;
