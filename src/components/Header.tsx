import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Microscope } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/#how-it-works", label: "How It Works" },
  { path: "/#health-suggestions", label: "Health Suggestions" },
  { path: "/analysis", label: "Analysis" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash navigation on mount and when location changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);


  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/" && !location.hash) return true;
    if (path.includes("#")) {
      return location.hash === path.split("#")[1];
    }
    return location.pathname === path;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("/#")) {
      const hash = path.substring(2); // Remove "/#"

      // If we are on the home page, prevent default and scroll
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL without reload
          window.history.pushState(null, "", path);
        }
      }
      // If we are NOT on home page, normal Link behavior will take us to "/"
      // and the useEffect will handle the scrolling based on the hash.
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "glass-effect shadow-md py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-teal to-medical-blue flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <Microscope className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:block">
            CerviScan<span className="text-medical-teal">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`px-4 py-2 text-sm font-bold transition-all rounded-lg ${isActive(link.path)
                ? "text-medical-teal bg-medical-teal/5"
                : "text-muted-foreground hover:text-medical-teal hover:bg-muted/50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/analysis">
            <Button variant="hero" size="default" className="rounded-xl shadow-lg shadow-medical-teal/20">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-effect shadow-xl border-b border-border/20 animate-in slide-in-from-top-2 duration-300">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-bold rounded-xl transition-all ${isActive(link.path)
                  ? "text-medical-teal bg-medical-teal/5"
                  : "text-muted-foreground hover:bg-muted/50"
                  }`}
                onClick={(e) => handleNavClick(e, link.path)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/analysis" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="hero" size="lg" className="w-full mt-2 rounded-xl">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
