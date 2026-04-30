import { Button } from "@/components/ui/button";
import { Menu, X, Mail } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Meet Pauline", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img alt="Bonded Care" className="h-14 md:h-18 w-auto" src={logo} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base px-7" asChild>
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-3 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3.5 text-lg text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-4 border-border" />
              <div className="px-4">
                <Button
                  size="lg"
                  className="w-full rounded-full text-lg"
                  asChild
                >
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
