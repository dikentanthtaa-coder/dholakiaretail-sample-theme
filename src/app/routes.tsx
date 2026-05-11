import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { BrandPage } from "./components/BrandPage";
import { CraftsmanshipPage } from "./components/CraftsmanshipPage";
import { SustainabilityPage } from "./components/SustainabilityPage";
import { InnovationPage } from "./components/InnovationPage";
import { GlobalPresencePage } from "./components/GlobalPresencePage";
import { NewsPage } from "./components/NewsPage";
import { NewsArticlePage } from "./components/NewsArticlePage";
import { CareersPage } from "./components/CareersPage";
import { CareerDetailPage } from "./components/CareerDetailPage";
import { ContactPage } from "./components/ContactPage";
import { LegalPage } from "./components/LegalPage";
import { BlogPage } from "./components/BlogPage";
import { BlogPostPage } from "./components/BlogPostPage";
import { PressKitPage } from "./components/PressKitPage";
import { NotFound } from "./components/NotFound";

/**
 * Routes per build spec §1.13.
 * /the-group is the canonical About route; /about redirects.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },

      // The Group
      { path: "the-group", Component: AboutPage },
      { path: "about", element: <Navigate to="/the-group" replace /> },

      // Portfolio
      { path: "portfolio", Component: PortfolioPage },
      { path: "portfolio/:slug", Component: BrandPage },

      // Editorial / responsibility / innovation
      { path: "craftsmanship", Component: CraftsmanshipPage },
      { path: "sustainability", Component: SustainabilityPage },
      { path: "innovation", Component: InnovationPage },
      { path: "global-presence", Component: GlobalPresencePage },

      // News
      { path: "news", Component: NewsPage },
      { path: "news/:id", Component: NewsArticlePage },

      // Blog (Journal)
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },

      // Careers
      { path: "careers", Component: CareersPage },
      { path: "careers/:slug", Component: CareerDetailPage },

      // Contact
      { path: "contact", Component: ContactPage },

      // Press kit
      { path: "press-kit", Component: PressKitPage },

      // Legal
      { path: "legal/:slug", Component: LegalPage },
      { path: "legal", element: <Navigate to="/legal/privacy" replace /> },

      // Compatibility — old IR route → contact
      { path: "investor-relations", element: <Navigate to="/contact?type=investor" replace /> },

      // 404
      { path: "*", Component: NotFound },
    ],
  },
]);
