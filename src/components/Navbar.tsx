
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  BookOpen, 
  Grid2x2, 
  History, 
  Search, 
  Tag, 
  Sparkles,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

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
            if (!user && !item.showWhenLoggedOut) return null;
            
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-promptp-purple text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-promptp-purple"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
              <Button 
                className="bg-promptp-purple hover:bg-promptp-deep-purple text-white"
                onClick={() => navigate("/auth?tab=signup")}
              >
                Get Started
              </Button>
            </>
          )}
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
              if (!user && !item.showWhenLoggedOut) return null;
              
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
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-promptp-purple text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-promptp-purple hover:bg-promptp-purple/90 text-white"
                    onClick={() => {
                      navigate("/auth?tab=signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
