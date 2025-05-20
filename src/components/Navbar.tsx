
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, BookOpen, Grid2x2, History, Search, Tag, Sparkles } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      name: "Explore",
      path: "/explore",
      icon: <Search className="h-4 w-4 md:mr-2" />,
      showWhenLoggedOut: true
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Sparkles className="h-4 w-4 md:mr-2" />,
      showWhenLoggedOut: false
    },
    {
      name: "History",
      path: "/history",
      icon: <History className="h-4 w-4 md:mr-2" />,
      showWhenLoggedOut: false
    },
    {
      name: "Collections",
      path: "/collections",
      icon: <BookOpen className="h-4 w-4 md:mr-2" />,
      showWhenLoggedOut: false
    },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: <Tag className="h-4 w-4 md:mr-2" />,
      showWhenLoggedOut: true
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-promptp-purple to-promptp-cyan">PromptP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            if (!isSignedIn && !item.showWhenLoggedOut) return null;
            
            return (
              <Button 
                key={item.name}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`flex items-center ${isActive(item.path) ? "bg-promptp-purple text-white" : ""}`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="text-gray-700 hover:text-promptp-purple">
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-promptp-purple hover:bg-promptp-purple/90 text-white">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              if (!isSignedIn && !item.showWhenLoggedOut) return null;
              
              return (
                <Button 
                  key={item.name}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`justify-start ${isActive(item.path) ? "bg-promptp-purple text-white" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              );
            })}
            <div className="pt-4 flex flex-col space-y-2">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" className="w-full justify-center">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-promptp-purple hover:bg-promptp-purple/90 text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
