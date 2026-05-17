import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import stackAnalysisRouter from "./server/api/stackAnalysis";
import stripeRouter from "./server/api/stripe";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Combined API Router
  const apiRouter = express.Router();

  // Logger middleware for API
  apiRouter.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.url}`);
    next();
  });

  // Health check route
  apiRouter.get("/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      stripe: !!process.env.STRIPE_SECRET_KEY
    });
  });

  // Stripe routes - stripeRouter handles its own body parsing (json/raw)
  apiRouter.use("/stripe", stripeRouter);

  // Other API routes - need JSON parsing
  apiRouter.use(express.json());
  apiRouter.use("/", stackAnalysisRouter);

  // Mount the API
  app.use("/api", apiRouter);

  // Diagnostic route
  app.get("/api-debug", (req, res) => {
    res.json({ message: "API Mount point reached", path: req.path });
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
