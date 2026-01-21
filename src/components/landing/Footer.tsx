import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Gifts & Care Packages", href: "#services" },
      { label: "Grocery Shopping", href: "#services" },
      { label: "Errands & Pickups", href: "#services" },
      { label: "Household Help", href: "#services" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background/90 py-16">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-background">
                Bonded Care
              </span>
            </a>
            <p className="text-background/70 leading-relaxed max-w-sm mb-6">
              Thoughtful everyday support for Ottawa's seniors. We help families
              coordinate personalized help—from groceries to gifts—with dignity
              and care.
            </p>
            <p className="text-sm text-background/50">
              A trusted extension of family care
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-background/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© {currentYear} Bonded Care. All rights reserved.</p>
          <p>Made with ❤️ in Ottawa, Canada</p>
        </div>
      </div>
    </footer>
  );
};
