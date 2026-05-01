import { MapPin } from "lucide-react";

export const ServiceAreaMap = () => {
  const areas = [
    "Ottawa",
    "Stittsville",
    "Almonte",
    "Carp",
    "Carleton Place",
    "Richmond",
    "Munster",
    "Perth",
  ];

  return (
    <section id="service-area" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
            Service Area
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Proudly Serving Ottawa & Surrounding Areas
          </h2>
          <p className="text-muted-foreground text-lg">
            Local, trusted, and close to home — wherever home may be in the
            region.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[400px] lg:h-full min-h-[360px]">
            <iframe
              title="Bonded Care service area map — Ottawa and surrounding communities"
              src="https://www.google.com/maps?q=Ottawa,Ontario&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>

          {/* Areas list */}
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm flex flex-col">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Communities Served
            </h3>
            <ul className="grid grid-cols-2 gap-3 mb-8">
              {areas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-base md:text-lg font-medium">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-auto">
              Not sure if your community is covered? Reach out — additional
              areas may be available based on availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
