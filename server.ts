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
  const apiRouter = express.Router();

  // 1. Health check (at the top of /api)
  apiRouter.get("/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    });
  });

  // 2. Stripe (handles its own body parsing)
  apiRouter.use("/stripe", stripeRouter);

  // 3. Middlewares for other API routes
  apiRouter.use(express.json());

  // 4. Analysis
  apiRouter.use("/", stackAnalysisRouter);

  // 5. Catch-all for /api
  apiRouter.all("*", (req, res) => {
    console.warn(`[API 404] ${req.method} ${req.url}`);
    res.status(404).json({ 
      error: "API route not found", 
      method: req.method,
      path: req.url 
    });
  });

  // Mount the API router
  app.use("/api", apiRouter);

  // 6. Debug outside /api
  app.get("/api-debug", (req, res) => {
    res.json({ 
      message: "API Mount point reached", 
      base: "/api",
      headers: req.headers
    });
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
