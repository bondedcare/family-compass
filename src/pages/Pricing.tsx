import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Clock,
  Car,
  Sparkles,
  CreditCard,
  Banknote,
  Send,
  Mail,
} from "lucide-react";

interface PriceRow {
  service: string;
  rate: string;
  note?: string;
}

const hourlyServices: PriceRow[] = [
  { service: "Errands & Deliveries", rate: "$40 / hour", note: "1-hour minimum" },
  { service: "Check-Ins & Connection (in person)", rate: "$40 / hour" },
  { service: "Scheduled Family Video Calls", rate: "$30 / 30 min" },
  { service: "General Home Help", rate: "$40 / hour" },
  { service: "Gift Pickup & Delivery", rate: "$40 / hour", note: "Plus cost of gift" },
  { service: "Odd Jobs & Pet Care", rate: "$40 / hour" },
  { service: "Dog Walking", rate: "$30 / 30 min walk" },
];

const flatServices: PriceRow[] = [
  { service: "Car Wash (exterior)", rate: "$40 flat" },
  { service: "Interior Detail", rate: "$80 flat" },
  { service: "Full Detail (in & out)", rate: "$120 flat" },
];

const PriceTable = ({
  title,
  icon,
  rows,
}: {
  title: string;
  icon: React.ReactNode;
  rows: PriceRow[];
}) => (
  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-border bg-primary/5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
        {title}
      </h3>
    </div>
    <ul className="divide-y divide-border">
      {rows.map((row) => (
        <li
          key={row.service}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4"
        >
          <div>
            <p className="text-base font-medium text-foreground">{row.service}</p>
            {row.note && (
              <p className="text-sm text-muted-foreground">{row.note}</p>
            )}
          </div>
          <p className="text-base font-semibold text-primary whitespace-nowrap">
            {row.rate}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");

    document.title = "Pricing & Payment — Bonded Care Ottawa";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Transparent pricing and accepted payment methods for Bonded Care services in Ottawa and surrounding areas.",
      );

    return () => {
      document.title = prevTitle;
      if (prevDesc) {
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", prevDesc);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                Pricing & Payment
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Simple, transparent rates
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Fair pricing for trusted, dependable help. No hidden fees — just
                honest support whenever it's needed.
              </p>
            </div>
          </div>
        </section>

        {/* Price tables */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto grid gap-8">
              <PriceTable
                title="Hourly Services"
                icon={<Clock className="w-5 h-5" />}
                rows={hourlyServices}
              />
              <PriceTable
                title="Car Care — Flat Rates"
                icon={<Car className="w-5 h-5" />}
                rows={flatServices}
              />

              {/* Travel & extras */}
              <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      Travel & Extras
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        Travel within Ottawa is included.
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        Surrounding areas (Stittsville, Almonte, Carp, Carleton
                        Place, Richmond, Munster): $0.75 / km from Ottawa.
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        Out-of-pocket purchases (groceries, gifts, supplies) are
                        billed at cost with a receipt.
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        Recurring weekly support — ask about discounted bundles.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="py-16 md:py-20 bg-primary/5 border-y border-border">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Accepted Payment Methods
                </h2>
                <p className="text-muted-foreground text-lg">
                  Convenient payment options that work for you and your family.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Send className="w-6 h-6" />,
                    title: "E-Transfer",
                    desc: "Sent to pauline@bonded-care.com — the easiest and preferred option.",
                  },
                  {
                    icon: <Banknote className="w-6 h-6" />,
                    title: "Cash or Cheque",
                    desc: "Paid in person at the time of service.",
                  },
                  {
                    icon: <CreditCard className="w-6 h-6" />,
                    title: "Debit or Credit Card",
                    desc: "Processed securely through Square — tap, chip, or swipe in person.",
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: "Square Invoice",
                    desc: "A secure pay-by-card link emailed to you, powered by Square.",
                  },
                ].map((method) => (
                  <div
                    key={method.title}
                    className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      {method.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {method.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
                Invoices can be sent by email after each visit (or monthly for
                recurring clients), with a clear breakdown of time, travel, and
                any out-of-pocket items.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Questions about pricing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Every situation is a little different. Reach out for a friendly
                conversation and a tailored quote — no pressure, no obligation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" className="rounded-full text-base px-7" asChild>
                  <a href="mailto:pauline@bonded-care.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base px-7"
                  asChild
                >
                  <Link to="/#services">Back to Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
