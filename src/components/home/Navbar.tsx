import { useEffect, useState } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/201023604423";

const NAV_LINKS = [
  // The exercise library has its own page now; the rest are landing anchors.
  { label: "Exercises", href: "/exercises" },
  { label: "Programs", href: "#programs" },
  { label: "Coaching", href: "#coaching" },
  { label: "Contact", href: "#contact" },
];

/** Route links go through the router; `#` links stay plain same-page anchors. */
function NavAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
   >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-4.5" />
          </span>
          <span className="font-display text-xl tracking-wide">ELBODY</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavAnchor
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild size="sm" className="font-semibold tracking-wide">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              START TRAINING
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-4 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavAnchor>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-3 w-full font-semibold tracking-wide"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                START TRAINING
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
