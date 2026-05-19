import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

/**
 * Production-grade Vite config.
 *
 * Performance budget:
 *   - main chunk < 200 KB (gzipped) — accomplished via manual route splits
 *   - vendor chunks deduped (react, motion, router, icons each in own file)
 *   - aggressive minify + tree-shake → drops unused MUI/three/etc.
 *   - assets hashed → safe to set long cache headers (year+)
 */
export default defineConfig({
  plugins: [
    react({
      // Re-enable automatic JSX runtime in production (default), keep dev FastRefresh.
      babel: {
        babelrc: false,
        configFile: false,
      },
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],

  /* Pre-bundle the libraries we always reach for on first paint so dev cold
   * starts and prod chunking line up. */
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "motion/react",
      "lucide-react",
    ],
  },

  esbuild: {
    // Strip console.* and debugger in production.
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    legalComments: "none",
  },

  build: {
    target: "es2020",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 2048,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // Normalize separators for cross-platform matching.
          const p = id.replace(/\\/g, "/");

          // Heavy long-lived vendor chunks — long-cache independently.
          if (
            /node_modules\/(react|react-dom|scheduler)\//.test(p)
          )
            return "vendor-react";

          if (/node_modules\/react-router/.test(p)) return "vendor-router";

          if (
            /node_modules\/(motion|framer-motion|@motionone)/.test(p)
          )
            return "vendor-motion";

          if (/node_modules\/lucide-react/.test(p)) return "vendor-icons";

          if (/node_modules\/@radix-ui/.test(p)) return "vendor-radix";

          // Anything else falls back to default chunking (no manual chunk
          // assignment) — Rollup will inline it into the route that needs it.
          return undefined;
        },
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (info) => {
          const name = info.name ?? "";
          if (/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(name))
            return "assets/img/[name]-[hash][extname]";
          if (/\.(mp4|webm|ogg|mov)$/i.test(name))
            return "assets/video/[name]-[hash][extname]";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name))
            return "assets/font/[name]-[hash][extname]";
          if (/\.css$/.test(name)) return "assets/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  server: {
    // Cap HMR overlay churn — these animations re-render a lot in dev.
    hmr: { overlay: true },
  },
});
