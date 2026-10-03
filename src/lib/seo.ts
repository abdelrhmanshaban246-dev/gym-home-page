import { useEffect } from "react";

/**
 * Document metadata for ELBODY.
 *
 * The app is a client-rendered SPA, so the static tags in `index.html` only
 * describe the landing page. This helper updates the document head whenever a
 * route renders, which is what gives each route its own title, description and
 * social preview.
 *
 * Deliberately dependency-free: a head-management library would be a new
 * dependency for ~60 lines of DOM work, and the site has no need for one.
 */

const SITE_NAME = "ELBODY";

/**
 * Absolute origin used for canonical/og:url. Read from the live document so it
 * is correct on localhost, a preview host and production without hard-coding a
 * domain that may not exist yet.
 */
function origin(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.origin;
}

/** Trailing-slash-free absolute URL for the current location. */
function currentUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const { origin: o, pathname } = window.location;
  // Hash routes are same-document scroll targets, never separate documents.
  return `${o}${pathname}`.replace(/\/$/, "") || `${o}/`;
}

/**
 * Set a <meta> tag, updating it in place when it already exists.
 * Reusing the node avoids accumulating duplicate tags across route changes.
 */
function setMeta(attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") {
    return;
  }

  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

export interface SeoOptions {
  /** Page title without the site name; the site name is appended. */
  title: string;
  /** Unique, natural summary of the page's actual content. */
  description: string;
  /** `website` for most routes; `article` is not used since nothing is an article. */
  type?: "website";
  /**
   * Set false on pages that must not be indexed (404, sign-in, dashboard).
   * Such pages get `noindex, nofollow` instead of a canonical URL.
   */
  indexable?: boolean;
}

export function useSeo({
  title,
  description,
  type = "website",
  indexable = true,
}: SeoOptions) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = currentUrl();

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "robots", indexable ? "index, follow" : "noindex, nofollow");

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:url", url);
    // Existing ELBODY artwork only: the coach photo that is already in the repo
    // and served from /images/profile.png. No image was generated for SEO.
    setMeta("property", "og:image", `${origin()}/images/profile.png`);
    setMeta("property", "og:locale", "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${origin()}/images/profile.png`);

    // Canonical and og:url both point at the current document. A non-indexable
    // page gets no canonical at all, so crawlers do not treat the 404 as the
    // canonical version of another page.
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (indexable) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    } else if (canonical) {
      canonical.remove();
    }
  }, [title, description, type, indexable]);
}