import { MapPin } from "lucide-react";

interface AreaLocation {
  name: string;
  x: number;
  y: number;
  isPrimary?: boolean;
}

export const ServiceAreaMap = () => {
  // Relative positions on the SVG map area (percentage-based)
  const locations: AreaLocation[] = [
    { name: "Ottawa", x: 72, y: 38, isPrimary: true },
    { name: "Stittsville", x: 55, y: 42 },
    { name: "Richmond", x: 52, y: 58 },
    { name: "Munster", x: 45, y: 63 },
    { name: "Carp", x: 50, y: 28 },
    { name: "Almonte", x: 30, y: 25 },
    { name: "Carleton Place", x: 25, y: 48 },
    { name: "Perth", x: 12, y: 65 },
  ];

  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
            Service Area
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Serving Ottawa & Surrounding Communities
          </h2>
          <p className="text-muted-foreground text-lg">
            Bonded Care provides reliable help across the greater Ottawa area —
            from the city core to the surrounding towns and villages.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-6 md:p-10 shadow-sm border border-border">
            {/* Interactive map visualization */}
            <div className="relative w-full" style={{ paddingBottom: "60%" }}>
              {/* Map background with subtle topographic feel */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 60"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Subtle region shape */}
                <ellipse
                  cx="45"
                  cy="42"
                  rx="42"
                  ry="25"
                  fill="hsl(275 38% 42% / 0.06)"
                  stroke="hsl(275 38% 42% / 0.12)"
                  strokeWidth="0.3"
                  strokeDasharray="2 1"
                />

                {/* Connection lines from Ottawa to each community */}
                {locations
                  .filter((l) => !l.isPrimary)
                  .map((loc) => (
                    <line
                      key={loc.name}
                      x1="72"
                      y1="38"
                      x2={loc.x}
                      y2={loc.y}
                      stroke="hsl(275 38% 42% / 0.15)"
                      strokeWidth="0.2"
                      strokeDasharray="1 0.5"
                    />
                  ))}
              </svg>

              {/* Location pins */}
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  {loc.isPrimary ? (
                    <>
                      {/* Pulse ring for Ottawa */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/10 animate-pulse" />
                      </div>
                      <div className="relative flex flex-col items-center">
                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <span className="mt-1.5 text-xs md:text-sm font-bold text-foreground bg-card/90 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                          {loc.name}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="relative flex flex-col items-center">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/70 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:scale-125 transition-all z-10">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                      </div>
                      <span className="mt-1 text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors bg-card/80 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        {loc.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Community list below map */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap justify-center gap-3">
                {locations.map((loc) => (
                  <span
                    key={loc.name}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${
                      loc.isPrimary
                        ? "bg-primary text-white"
                        : "bg-primary/8 text-foreground border border-border"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.name}
                  </span>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">
                Not sure if you're in our area? Reach out — we're happy to check.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
