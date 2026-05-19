import { useMemo } from "react";
import { useLocation, useParams } from "react-router";
import { Seo } from "./Seo";

type SeoEntry = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

/**
 * Per-route SEO metadata. Keyed by the canonical pathname; dynamic params
 * (`:slug`) are matched against the first key that consumes them.
 *
 * Add new routes here — no per-page imports required.
 */
const ROUTES: Record<string, SeoEntry> = {
  "/": {
    title: "Building the Future of Luxury Retail",
    description:
      "Dholakia Retail Private Limited — a corporate house for modern luxury jewellery brands, beginning with Mayavé. Built on restraint, governance, and long-term thinking.",
    image: "/assets/images/P01_S01_home_hero_optA_image.png",
  },
  "/the-group": {
    title: "The Group · Vision, Leadership & Governance",
    description:
      "Inside Dholakia Retail — vision, leadership, and the governance framework that shapes a corporate house for modern luxury jewellery.",
    image: "/assets/web/P02_S01_the_group_about_hero_optA_image.jpg",
  },
  "/portfolio": {
    title: "Portfolio · A Curated House of Brands",
    description:
      "A curated portfolio of distinct jewellery houses, each shaped for a specific audience and emotional world.",
    image: "/assets/images/P03_S01_portfolio_hero_optA_image.png",
  },
  "/portfolio/mayave": {
    title: "Mayavé · Where Silence Becomes Jewellery",
    description:
      "Mayavé — the signature brand within Dholakia Retail's portfolio. A refined expression of bespoke luxury, crafted for those who seek rarity and quiet beauty.",
    image: "/assets/images/P01_S05_home_portfolio_preview_optA_image.png",
  },
  "/craftsmanship": {
    title: "Craftsmanship · The Hand Behind the Brilliance",
    description:
      "Luxury jewellery is defined by detail, balance, finish, and the intelligence of skilled hands. The craft philosophy at Dholakia Retail.",
    image: "/assets/images/P05_S01_craftsmanship_hero_optA_image.png",
  },
  "/sustainability": {
    title: "Sustainability · Luxury with Accountability",
    description:
      "Solar-powered lab-grown diamonds, SCS-007 certification and verifiable supply chains — sustainability that holds up to inspection.",
    image: "/assets/images/P06_S01_sustainability_hero_optA_image.png",
  },
  "/innovation": {
    title: "Innovation · Future-Ready Brand Systems",
    description:
      "Modern retail thinking, evolving consumer insight, and future-ready systems shaping the next generation of luxury jewellery.",
    image: "/assets/images/P07_S01_innovation_hero_optA_image.png",
  },
  "/global-presence": {
    title: "Global Presence · Partnerships & Markets",
    description:
      "Dholakia Retail's global partnerships, distribution networks and presence across luxury markets.",
    image:
      "/assets/images/P08_S01_global_presence_partnerships_hero_optA_image.png",
  },
  "/news": {
    title: "Newsroom · Press & Announcements",
    description:
      "Press releases, announcements and editorial coverage from Dholakia Retail Private Limited.",
    image: "/assets/images/P01_S08_home_news_press_preview_optA_image.png",
  },
  "/news/:id": {
    title: "Newsroom Article",
    description:
      "An article from the Dholakia Retail newsroom — press, brand updates, and editorial coverage.",
    type: "article",
  },
  "/blog": {
    title: "Journal · Editorial Notes",
    description:
      "Editorial reflections on craft, restraint, sustainability and the future of luxury jewellery.",
    image: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
  },
  "/blog/:slug": {
    title: "Journal Entry",
    description:
      "An editorial reflection from Dholakia Retail.",
    type: "article",
  },
  "/careers": {
    title: "Careers · Build the Future With Us",
    description:
      "Open roles, craft pathways and graduate programmes at Dholakia Retail Private Limited.",
    image: "/assets/images/P10_S01_careers_hero_optA_image.png",
  },
  "/careers/:slug": {
    title: "Open Role",
    description:
      "An open role at Dholakia Retail Private Limited.",
  },
  "/contact": {
    title: "Contact · Press, Investor, Partnership & Careers",
    description:
      "Get in touch with Dholakia Retail Private Limited — press, investor, partnership, careers and general enquiries.",
  },
  "/press-kit": {
    title: "Press Kit · Logos, Imagery & Fact Sheet",
    description:
      "Download logos, brand imagery and the official fact sheet for Dholakia Retail Private Limited.",
  },
  "/legal/:slug": {
    title: "Legal",
    description:
      "Legal notices for Dholakia Retail Private Limited — privacy, terms, cookies and disclaimers.",
    type: "website",
  },
  "/404": {
    title: "Not Found",
    description: "The page you're looking for could not be found.",
  },
};

function matchRoute(pathname: string): { entry: SeoEntry; path: string } {
  if (ROUTES[pathname]) return { entry: ROUTES[pathname], path: pathname };

  // Match dynamic patterns ":slug" / ":id" by walking known routes.
  for (const pattern of Object.keys(ROUTES)) {
    if (!pattern.includes(":")) continue;
    const regex = new RegExp(
      "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$"
    );
    if (regex.test(pathname))
      return { entry: ROUTES[pattern], path: pathname };
  }

  return { entry: ROUTES["/404"], path: pathname };
}

/**
 * Mount once at the Layout level — picks the right SEO block per-route.
 *
 * For article / detail routes the dynamic param is appended to the title so
 * each crawl looks unique even before the page-specific copy loads.
 */
export function RouteSeo() {
  const location = useLocation();
  const params = useParams();

  const { entry, path } = useMemo(
    () => matchRoute(location.pathname),
    [location.pathname]
  );

  const dynamicSuffix = useMemo(() => {
    const slug = params.slug ?? params.id;
    if (!slug) return "";
    return ` — ${String(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
  }, [params.slug, params.id]);

  return (
    <Seo
      title={entry.title + dynamicSuffix}
      description={entry.description}
      path={path}
      image={entry.image}
      type={entry.type}
    />
  );
}
