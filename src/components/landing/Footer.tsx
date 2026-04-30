import { Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Meet Pauline", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <img
                  src={logo}
                  alt="Bonded Care"
                  className="h-16 w-auto brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-background/70 leading-relaxed">
                Reliable, friendly help for everyday tasks. Giving seniors
                independence and families peace of mind.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Contact
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:pauline@bonded-care.com"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  pauline@bonded-care.com
                </a>
              </div>
              <p className="mt-6 text-background/50 text-sm leading-relaxed">
                Serving Ottawa, Stittsville, Almonte, Carp, Carleton Place,
                Richmond, Munster, and Perth.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-background/20 text-center">
            <p className="text-background/50">
              &copy; {currentYear} Bonded Care. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
