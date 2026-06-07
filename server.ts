import express from "express";
import path from "path";
import stackAnalysisRouter from "./server/api/stackAnalysis";
import protocolAssistantRouter from "./server/api/protocolAssistant";
import stripeRouter from "./server/api/stripe";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // GLOBAL LOGGER
  app.use((req, res, next) => {
    if (!req.url.startsWith('/src/') && !req.url.startsWith('/@vite/')) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
  });

  // API ROUTES
  app.use(express.json());
  
  // 1. Logging
  app.use((req, res, next) => {
    if (!req.url.startsWith('/src/') && !req.url.startsWith('/@vite/')) {
      console.log(`[API REQUEST] ${req.method} ${req.url}`);
    }
    next();
  });

  // 2. Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      success: true, 
      data: {
        status: "ok", 
        timestamp: new Date().toISOString()
      }
    });
  });

  // 3. Stripe mounting
  app.use("/api/stripe", (req, res, next) => {
    console.log(`[DEBUG] Routers matching for ${req.url}`);
    next();
  }, stripeRouter);                
  console.log('[SERVER] Stripe router mounted at /api/stripe');

  // 4. Analysis
  app.use("/api/analyze-stack", stackAnalysisRouter);
  console.log('[SERVER] Stack analysis router mounted at /api/analyze-stack');

  // 5. AI Protocol Builder
  app.use("/api/protocol-assistant", protocolAssistantRouter);
  console.log('[SERVER] AI Protocol Builder router mounted at /api/protocol-assistant');

  // 6. Debug route
  app.get("/api/test-direct", (req, res) => {
    res.json({ success: true, data: { status: "reachable" } });
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

  // Short Links Promo
  app.get("/anual", (req, res) => {
    res.redirect("/?view=plans&coupon=Anual20#planos-vendas");
  });
  app.get("/mensal", (req, res) => {
    res.redirect("/?view=plans&coupon=Mensal20#planos-vendas");
  });
  
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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

  // Catch-all to log 404s
  app.use((req, res, next) => {
    console.log(`[404 NOT FOUND] ${req.method} ${req.url}`);
    res.status(404).send('Not Found');
  });
}

startServer();
