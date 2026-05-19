import { useEffect } from "react";
import { useLocation } from "react-router";

type Props = {
  title: string;
  description?: string;
  /** Canonical path on the deployed origin (e.g. "/the-group"). */
  path?: string;
  /** Absolute or root-relative URL for OpenGraph image. */
  image?: string;
  /** "website" | "article" — defaults to "website". */
  type?: "website" | "article";
  /** Optional JSON-LD structured data — pass a plain object, will be stringified. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Robots directive — defaults to "index, follow". */
  robots?: string;
};

const SITE = {
  name: "Dholakia Retail",
  legal: "Dholakia Retail Private Limited",
  origin: "https://dholakiaretail.com",
  defaultImage: "/assets/images/P01_S01_home_hero_optA_image.webp",
  twitter: "@dholakiaretail",
};

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, payload: object | object[] | undefined) {
  const existing = document.head.querySelector<HTMLScriptElement>(
    `script[data-seo-jsonld="${id}"]`
  );
  if (!payload) {
    existing?.remove();
    return;
  }
  const next = JSON.stringify(payload);
  if (existing) {
    existing.textContent = next;
    return;
  }
  const el = document.createElement("script");
  el.setAttribute("type", "application/ld+json");
  el.setAttribute("data-seo-jsonld", id);
  el.textContent = next;
  document.head.appendChild(el);
}

/**
 * Per-route SEO. Renders nothing — mutates the document head.
 *
 * Manages: <title>, description, OpenGraph, Twitter card, canonical link,
 * theme-color, and a per-route JSON-LD block.
 */
export function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
  robots = "index, follow",
}: Props) {
  const location = useLocation();
  const fullPath = path ?? location.pathname;
  const canonical = `${SITE.origin}${fullPath}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE.origin}${image}`
    : `${SITE.origin}${SITE.defaultImage}`;

  useEffect(() => {
    const fullTitle = title.includes(SITE.name)
      ? title
      : `${title} · ${SITE.legal}`;
    document.title = fullTitle;

    if (description) upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "theme-color", "#0B1426");

    upsertMeta("property", "og:title", fullTitle);
    if (description) upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:site_name", SITE.name);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    if (description) upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("name", "twitter:site", SITE.twitter);

    upsertLink("canonical", canonical);

    upsertJsonLd("route", jsonLd);
  }, [title, description, canonical, ogImage, type, robots, jsonLd]);

  return null;
}

/** Shared site-wide JSON-LD (Organization). Mount once at the layout root. */
export function OrganizationJsonLd() {
  useEffect(() => {
    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.origin}#organization`,
      name: SITE.legal,
      alternateName: SITE.name,
      url: SITE.origin,
      logo: `${SITE.origin}/fevicon.png`,
      sameAs: [
        "https://www.linkedin.com/company/dholakia-retail-private-limited",
        "https://www.instagram.com/dholakiaretail",
        "https://twitter.com/dholakiaretail",
        "https://www.youtube.com/@dholakiaretail",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Dholakia Ventures, Plot No. D-02 and D-11, Gem & Jewellery Park, GHB, Ichchhapor",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "394510",
        addressCountry: "IN",
      },
      foundingDate: "2024",
      industry: "Luxury Retail & Jewellery",
      identifier: "U32111GJ2024PTC155690",
    });
    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.origin}#website`,
      url: SITE.origin,
      name: SITE.legal,
      publisher: { "@id": `${SITE.origin}#organization` },
    });
  }, []);
  return null;
}
