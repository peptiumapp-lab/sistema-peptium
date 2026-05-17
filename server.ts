import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import stackAnalysisRouter from "./server/api/stackAnalysis";
import stripeRouter from "./server/api/stripe";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // GLOBAL LOGGER
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // API ROUTES
  app.use(express.json());
  
  // 1. Logging
  app.use((req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.url}`);
    next();
  });

  // 2. Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Explicit route definition for testing (bypassing router)
  app.post("/api/stripe/create-checkout-session-test", (req, res) => {
    console.log('[DEBUG] Direct route reached');
    res.json({ success: true, message: 'Direct route hit' });
  });

  // 3. Stripe mounting - explicit
  app.use("/api/stripe", stripeRouter);
  console.log('[SERVER] Stripe router mounted at /api/stripe');

  // 4. Analysis
  app.use("/api/analyze-stack", stackAnalysisRouter);
  console.log('[SERVER] Stack analysis router mounted at /api/analyze-stack');

  // 6. Debug route
  app.get("/api/test-direct", (req, res) => {
    res.json({ success: true });
  });
  
  app.get("/api-routes", (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push(middleware.route.path);
      } else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
          if (handler.route) {
            routes.push(handler.route.path);
          }
        });
      }
    });
    res.json({ routes });
  });

  // VITE INTEGRATION
  app.post("/test-api", express.json(), (req, res) => {
      res.json({ success: true });
  });
  
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
