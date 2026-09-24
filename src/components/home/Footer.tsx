import { Dumbbell, Instagram, Mail, MapPin, Youtube } from "lucide-react";

const FOOTER_LINKS: { heading: string; links: string[] }[] = [
  { heading: "Training", links: ["Exercises", "Programs", "Coaching", "Pricing"] },
  { heading: "Company", links: ["About", "Testimonials", "Blog", "Careers"] },
  { heading: "Legal", links: ["Privacy Policy", "Terms of Service"] },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@elbody.com" },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Dumbbell className="size-4.5" />
              </span>
              <span className="font-display text-xl tracking-wide">ELBODY</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Personal coaching that turns effort into measurable, lasting
              results.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary/70" />
              Ironworks Gym, Downtown District
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-bold uppercase tracking-wider">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ELBODY. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
