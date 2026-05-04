import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface ServiceLocation {
  name: string;
  lat: number;
  lng: number;
  isPrimary?: boolean;
}

const locations: ServiceLocation[] = [
  { name: "Ottawa", lat: 45.4215, lng: -75.6972, isPrimary: true },
  { name: "Stittsville", lat: 45.2588, lng: -75.9214 },
  { name: "Richmond", lat: 45.1924, lng: -75.8410 },
  { name: "Munster", lat: 45.1512, lng: -75.8802 },
  { name: "Carp", lat: 45.3519, lng: -76.0502 },
  { name: "Almonte", lat: 45.2271, lng: -76.1951 },
  { name: "Carleton Place", lat: 45.1407, lng: -76.1432 },
];

export const ServiceAreaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const loadLeaflet = (): Promise<void> => {
      return new Promise((resolve) => {
        if ((window as any).L) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadLeaflet().then(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = (window as any).L;

      // Center map over Ottawa and surrounding communities
      const map = L.map(mapRef.current, {
        center: [45.27, -75.85],
        zoom: 10,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Use a clean, muted map style
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom icon for primary location (Ottawa)
      const primaryIcon = L.divIcon({
        html: `<div style="
          width: 36px; height: 36px;
          background: hsl(275, 38%, 42%);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 6px hsla(275, 38%, 42%, 0.2);
          display: flex; align-items: center; justify-content: center;
        "><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      // Custom icon for secondary locations
      const secondaryIcon = L.divIcon({
        html: `<div style="
          width: 22px; height: 22px;
          background: hsl(275, 38%, 52%);
          border: 2.5px solid white;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
        "></div>`,
        className: "",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      // Add markers
      locations.forEach((loc) => {
        const icon = loc.isPrimary ? primaryIcon : secondaryIcon;
        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

        marker.bindPopup(
          `<div style="text-align:center; font-family: 'Source Sans 3', sans-serif; padding: 4px 2px;">
            <strong style="font-size: 15px; color: hsl(275, 38%, 42%);">${loc.name}</strong>
            <br/>
            <span style="font-size: 13px; color: #666;">
              ${loc.isPrimary ? "Primary service area" : "We serve this area"}
            </span>
          </div>`,
          { className: "bonded-care-popup" }
        );
      });

      // Draw a subtle service area boundary (convex hull approximation)
      const boundaryCoords = [
        [45.50, -75.60],  // North of Ottawa
        [45.42, -75.55],  // East Ottawa
        [45.10, -75.75],  // South of Richmond
        [44.84, -76.30],  // South of Perth
        [45.18, -76.28],  // West of Almonte
        [45.40, -76.12],  // Northwest of Carp
      ];

      L.polygon(boundaryCoords, {
        color: "hsl(275, 38%, 42%)",
        weight: 2,
        opacity: 0.35,
        fillColor: "hsl(275, 38%, 52%)",
        fillOpacity: 0.06,
        dashArray: "8, 6",
      }).addTo(map);

      setIsLoaded(true);

      // Fix map rendering after container becomes visible
      setTimeout(() => map.invalidateSize(), 200);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="service-area" className="py-20 md:py-28 bg-accent/30">
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

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border">
            {/* Interactive map */}
            <div className="relative">
              <div
                ref={mapRef}
                className="w-full h-[400px] md:h-[500px]"
                style={{ zIndex: 1 }}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-accent/50">
                  <div className="text-muted-foreground">Loading map...</div>
                </div>
              )}
            </div>

            {/* Community pills below map */}
            <div className="p-6 md:p-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-3">
                {locations.map((loc) => (
                  <span
                    key={loc.name}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      loc.isPrimary
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-foreground border border-border hover:bg-primary/15"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.name}
                  </span>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">
                Not sure if you're in our area? Reach out — we're happy to
                check.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
