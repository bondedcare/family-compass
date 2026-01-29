import { Heart, Phone, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-semibold">
                  Bonded Care
                </span>
              </div>
              <p className="text-background/70 leading-relaxed mb-6">
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
                Contact Us
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (555) 123-4567
                </a>
                <a
                  href="mailto:hello@bondedcare.com"
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  hello@bondedcare.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-background/20 text-center">
            <p className="text-background/60">
              © {currentYear} Bonded Care. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
