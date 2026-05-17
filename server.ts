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
  // 1. Stripe (handles its own body parsing)
  app.use("/api/stripe", stripeRouter);

  // 2. JSON Parser for other routes
  app.use("/api", express.json());

  // 3. Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    });
  });

  // 4. Analysis
  app.use("/api", stackAnalysisRouter);

  // 5. Catch-all API
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: "Route not found", path: req.url });
  });

  // 6. Debug
  app.get("/api-debug", (req, res) => {
    res.json({ message: "API Mount point reached", path: req.path });
  });

  // VITE INTEGRATION
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
