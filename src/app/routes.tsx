import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { BrandPage } from "./components/BrandPage";
import { CraftsmanshipPage } from "./components/CraftsmanshipPage";
import { SustainabilityPage } from "./components/SustainabilityPage";
import { InnovationPage } from "./components/InnovationPage";
import { GlobalPresencePage } from "./components/GlobalPresencePage";
import { InvestorRelationsPage } from "./components/InvestorRelationsPage";
import { NewsPage } from "./components/NewsPage";
import { NewsArticlePage } from "./components/NewsArticlePage";
import { CareersPage } from "./components/CareersPage";
import { ContactPage } from "./components/ContactPage";
import { LegalPage } from "./components/LegalPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "portfolio/:slug", Component: BrandPage },
      { path: "craftsmanship", Component: CraftsmanshipPage },
      { path: "sustainability", Component: SustainabilityPage },
      { path: "innovation", Component: InnovationPage },
      { path: "global-presence", Component: GlobalPresencePage },
      { path: "investor-relations", Component: InvestorRelationsPage },
      { path: "news", Component: NewsPage },
      { path: "news/:id", Component: NewsArticlePage },
      { path: "careers", Component: CareersPage },
      { path: "contact", Component: ContactPage },
      { path: "legal/:slug", Component: LegalPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
