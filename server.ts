import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import stackAnalysisRouter from "./server/api/stackAnalysis";
import stripeRouter from "./server/api/stripe";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Logger middleware for API routes
  app.use("/api", (req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.url}`);
    next();
  });

  // API Routes - IMPORTANT: mount stripe BEFORE global express.json() 
  // because the webhook needs raw body
  app.use("/api/stripe", stripeRouter);

  app.use(express.json());

  app.use("/api", stackAnalysisRouter);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      stripeConfigured: !!process.env.STRIPE_SECRET_KEY
    });
  });

  // Vite integration
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
