import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { RouteLoader } from "./components/ui/RouteLoader";
import { BootSignal } from "./components/ui/BootSignal";

/*
 * Route-level code-splitting.
 *
 * Each page is bundled into its own chunk and only fetched on navigation.
 * `Suspense` shows the editorial RouteLoader skeleton during chunk load so
 * the user never sees a blank screen.
 *
 * Lazy modules expect default exports — adapt named exports inline.
 */
const Home = lazy(() => import("./components/HomePage").then(m => ({ default: m.HomePage })));
const About = lazy(() => import("./components/AboutPage").then(m => ({ default: m.AboutPage })));
const Portfolio = lazy(() => import("./components/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const Brand = lazy(() => import("./components/BrandPage").then(m => ({ default: m.BrandPage })));
const Craftsmanship = lazy(() => import("./components/CraftsmanshipPage").then(m => ({ default: m.CraftsmanshipPage })));
const Sustainability = lazy(() => import("./components/SustainabilityPage").then(m => ({ default: m.SustainabilityPage })));
const Innovation = lazy(() => import("./components/InnovationPage").then(m => ({ default: m.InnovationPage })));
const GlobalPresence = lazy(() => import("./components/GlobalPresencePage").then(m => ({ default: m.GlobalPresencePage })));
const News = lazy(() => import("./components/NewsPage").then(m => ({ default: m.NewsPage })));
const NewsArticle = lazy(() => import("./components/NewsArticlePage").then(m => ({ default: m.NewsArticlePage })));
const Careers = lazy(() => import("./components/CareersPage").then(m => ({ default: m.CareersPage })));
const CareerDetail = lazy(() => import("./components/CareerDetailPage").then(m => ({ default: m.CareerDetailPage })));
const Contact = lazy(() => import("./components/ContactPage").then(m => ({ default: m.ContactPage })));
const Legal = lazy(() => import("./components/LegalPage").then(m => ({ default: m.LegalPage })));
const Blog = lazy(() => import("./components/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPost = lazy(() => import("./components/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const PressKit = lazy(() => import("./components/PressKitPage").then(m => ({ default: m.PressKitPage })));
const NotFoundPage = lazy(() => import("./components/NotFound").then(m => ({ default: m.NotFound })));

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<RouteLoader />}>
      {/*
        BootSignal mounts only after the Suspense fallback resolves — at
        that point the lazy chunk has loaded and the real page is in the
        DOM. It tells the inline boot loader it's safe to fade out.
      */}
      <BootSignal />
      <Component />
    </Suspense>
  );
}

/**
 * Routes per build spec §1.13.
 * /the-group is the canonical About route; /about redirects.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: withSuspense(Home) },

      // The Group
      { path: "the-group", element: withSuspense(About) },
      { path: "about", element: <Navigate to="/the-group" replace /> },

      // Portfolio
      { path: "portfolio", element: withSuspense(Portfolio) },
      { path: "portfolio/:slug", element: withSuspense(Brand) },

      // Editorial / responsibility / innovation
      { path: "craftsmanship", element: withSuspense(Craftsmanship) },
      { path: "sustainability", element: withSuspense(Sustainability) },
      { path: "innovation", element: withSuspense(Innovation) },
      { path: "global-presence", element: withSuspense(GlobalPresence) },

      // News
      { path: "news", element: withSuspense(News) },
      { path: "news/:id", element: withSuspense(NewsArticle) },

      // Blog (Journal)
      { path: "blog", element: withSuspense(Blog) },
      { path: "blog/:slug", element: withSuspense(BlogPost) },

      // Careers
      { path: "careers", element: withSuspense(Careers) },
      { path: "careers/:slug", element: withSuspense(CareerDetail) },

      // Contact
      { path: "contact", element: withSuspense(Contact) },

      // Press kit
      { path: "press-kit", element: withSuspense(PressKit) },

      // Legal
      { path: "legal/:slug", element: withSuspense(Legal) },
      { path: "legal", element: <Navigate to="/legal/privacy" replace /> },

      // Compatibility — old IR route → contact
      { path: "investor-relations", element: <Navigate to="/contact?type=investor#write-to-us" replace /> },

      // 404
      { path: "*", element: withSuspense(NotFoundPage) },
    ],
  },
]);
