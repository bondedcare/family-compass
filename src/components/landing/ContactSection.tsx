import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // -------------------------------------------------------
      // FORMSPREE INTEGRATION
      // Replace "YOUR_FORM_ID" below with your actual Formspree
      // form ID. To get one:
      //   1. Go to https://formspree.io and sign up (free tier)
      //   2. Create a new form pointed at pauline@bonded-care.com
      //   3. Copy the form ID (e.g. "xpwzgkby")
      //   4. Replace YOUR_FORM_ID below
      // -------------------------------------------------------
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Thank you! A response will follow shortly.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try emailing directly.");
      }
    } catch {
      toast.error("Something went wrong. Please try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-accent/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Help Is Here When You Need It
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Have a question or ready to get started? Send a message or email
              anytime.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    Your message has been received. A response will follow
                    shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-full"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-13 text-lg rounded-xl"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(613) 555-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-13 text-lg rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-13 text-lg rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">
                      How Can Bonded Care Help?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us a bit about what you need..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] text-lg rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full text-lg py-7"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Responds within 24 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Reach Out Directly
                </h3>
                <div className="space-y-5">
                  <a
                    href="mailto:pauline@bonded-care.com"
                    className="flex items-start gap-4 p-6 bg-card rounded-2xl hover:bg-accent/60 transition-colors group border border-border"
                  >
                    <div className="w-13 h-13 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground mb-1">
                        Email
                      </p>
                      <p className="text-muted-foreground">
                        pauline@bonded-care.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                    <div className="w-13 h-13 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground mb-1">
                        Service Area
                      </p>
                      <p className="text-muted-foreground">
                        Proudly serving Ottawa and surrounding areas — Stittsville,
                        Almonte, Carp, Carleton Place, Richmond, Munster, and Perth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust message */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <h4 className="font-display text-xl font-semibold text-foreground mb-3">
                  No Pressure, Just Help
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're ready to get started or just want to ask a few
                  questions, support is always available. There's no obligation —
                  just friendly, personal assistance when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
