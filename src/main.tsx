import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { registerServiceWorker } from "./lib/registerSW";

declare global {
  interface Window {
    __bootReady?: (gate: string) => void;
    __hideBoot?: () => void;
  }
}

createRoot(document.getElementById("root")!).render(<App />);

/*
 * Boot dismissal lives downstream — the first real route component will
 * call window.__bootReady("app") from inside its Suspense boundary, after
 * its chunk has been fetched and rendered. We intentionally do NOT dismiss
 * here, because at this point the lazy route chunk may still be loading
 * and the user would just see the RouteLoader skeleton flashing into view.
 */

// Register the service worker (production only, on `load`). This is what
// makes repeat visits feel instant even on Slow 3G: the SW serves images,
// videos, JS, CSS, and fonts straight from disk while quietly revalidating
// in the background.
registerServiceWorker();
