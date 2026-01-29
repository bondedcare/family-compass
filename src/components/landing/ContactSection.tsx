import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you! We'll be in touch soon.");
    setFormData({ name: "", phone: "", email: "", message: "" });
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
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-base font-medium mb-6">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              We're Here to Help
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question or ready to get started? Fill out the form below 
              or give us a call. We'd love to hear from you.
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
                    We've received your message and will get back to you soon.
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
                      className="h-14 text-lg rounded-xl"
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
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-14 text-lg rounded-xl"
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
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">
                      How Can We Help?
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
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-6">
                  <a
                    href="tel:+15551234567"
                    className="flex items-start gap-4 p-6 bg-accent/50 rounded-2xl hover:bg-accent transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground mb-1">
                        Give Us a Call
                      </p>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mon–Fri, 8am–6pm
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@bondedcare.com"
                    className="flex items-start gap-4 p-6 bg-accent/50 rounded-2xl hover:bg-accent transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground mb-1">
                        Send an Email
                      </p>
                      <p className="text-muted-foreground">hello@bondedcare.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-6 bg-accent/50 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground mb-1">
                        Service Area
                      </p>
                      <p className="text-muted-foreground">
                        Proudly serving the greater metro area
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
                  questions, we're happy to chat. There's no obligation—just 
                  friendly folks ready to help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
