import { Dumbbell, Instagram, Mail } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { EXERCISE_MEDIA } from "@/data/exercise-media";

/** Distinct licences actually used by the exercise media, for attribution. */
const MEDIA_CREDITS = Array.from(
  new Set(Object.values(EXERCISE_MEDIA).map((media) => media.license)),
).join(", ");

const FOOTER_LINKS: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Explore",
    links: [
      { label: "Exercises", href: "#exercises" },
      { label: "Programs", href: "#programs" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const WHATSAPP_URL = "https://wa.me/201023604423";
const INSTAGRAM_URL = "https://www.instagram.com/abdelrhmanelmeniar/";
const EMAIL_URL = "mailto:abdelrhmanshaban246@gmail.com";

/** WhatsApp glyph — lucide-react has no brand icons, so it lives here. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

interface ContactLink {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
}

const CONTACT_LINKS: ContactLink[] = [
  { label: "WhatsApp", href: WHATSAPP_URL, icon: WhatsAppIcon, external: true },
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram, external: true },
  { label: "Email", href: EMAIL_URL, icon: Mail },
];

/**
 * The footer is shared by the landing page and the inner pages. Its links are
 * same-page anchors on the landing page, but on an inner page there is no
 * `#exercises` / `#programs` / `#top` element to scroll to, so they would do
 * nothing. Resolve them against the landing page instead — and only when we
 * are not already there, so the landing page keeps its exact behaviour.
 */
function HomeLink({
  onHome,
  href,
  className,
  children,
}: {
  onHome: boolean;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (onHome) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={`/${href}`} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Only the brand block and the "Explore" column exist, so the grid
            declares exactly two tracks. The previous four-column template left
            two permanently empty tracks on desktop and tablet. */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          {/* Brand */}
          <div>
            <HomeLink onHome={onHome} href="#top" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Dumbbell className="size-4.5" />
              </span>
              <span className="font-display text-xl tracking-wide">ELBODY</span>
            </HomeLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Personal coaching that turns effort into measurable, lasting
              results.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-bold uppercase tracking-wider">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <HomeLink
                      onHome={onHome}
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </HomeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Media attribution */}
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground/70">
          Exercise media from{" "}
          <a
            href="https://commons.wikimedia.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            Wikimedia Commons
          </a>
          ,{" "}
          <a
            href="https://mixkit.co/license/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            Mixkit
          </a>{" "}
          and{" "}
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            YouTube
          </a>{" "}
          . Photographs are resized and re-encoded for display; clips are shown as
          published. Licences in use: {MEDIA_CREDITS}. Each asset is credited to
          its author under the licence listed above.
        </p>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ELBODY. All rights reserved.
          </p>
          {/* Contact / social */}
          <div className="flex items-center gap-2">
            {CONTACT_LINKS.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                aria-label={contact.label}
                title={contact.label}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="flex size-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <contact.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
