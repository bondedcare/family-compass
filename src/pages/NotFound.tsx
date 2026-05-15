import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = "Page Not Found — Bonded Care";

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      return { el, prev };
    };

    const desc = setMeta('meta[name="description"]', "name", "description", "The page you're looking for isn't available. Return to Bonded Care to find everyday help for seniors in Ottawa.");
    const ogTitle = setMeta('meta[property="og:title"]', "property", "og:title", "Page Not Found — Bonded Care");
    const ogDesc = setMeta('meta[property="og:description"]', "property", "og:description", "The page you're looking for isn't available.");

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    return () => {
      document.title = prevTitle;
      if (desc.prev !== null) desc.el.setAttribute("content", desc.prev);
      if (ogTitle.prev !== null) ogTitle.el.setAttribute("content", ogTitle.prev);
      if (ogDesc.prev !== null) ogDesc.el.setAttribute("content", ogDesc.prev);
      robots.remove();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
