
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">PromptP</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#features" className="text-gray-700 hover:text-promptp-purple transition-colors">
            Features
          </a>
          <a href="#use-cases" className="text-gray-700 hover:text-promptp-purple transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-promptp-purple transition-colors">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700 hover:text-promptp-purple">
            Login
          </Button>
          <Button className="bg-promptp-purple hover:bg-promptp-purple/90 text-white">
            Get Started
          </Button>
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
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-promptp-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#use-cases" 
              className="text-gray-700 hover:text-promptp-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Use Cases
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-promptp-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="ghost" className="w-full justify-center">
                Login
              </Button>
              <Button className="w-full bg-promptp-purple hover:bg-promptp-purple/90 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
