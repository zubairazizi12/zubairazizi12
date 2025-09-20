import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { connectDB } from "./db";
import monographRoutes from "./routes/form-C";
import conferenceRoutes from "./routes/form-D";
import evaluationFormERoutes from "./routes/form-E";
import evaluationFormGRoutes from "./routes/form-G";
import formHRoutes from "./routes/form-H";
import monographEvaluationRoutes from "./routes/form-k";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/monograph", monographRoutes);
app.use("/api/conference", conferenceRoutes);
app.use("/api/evaluationFormE", evaluationFormERoutes);
app.use("/api/evaluationFormH", formHRoutes);
app.use("/api/evaluationFormG", evaluationFormGRoutes);
app.use("/api/monographEvaluation", monographEvaluationRoutes);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize database connection
  await connectDB();
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

<<<<<<< HEAD
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }


=======
  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    // reusePort: true,
  }, async () => {
    log(`serving on port ${port}`);
    
    // Setup vite after server is listening to avoid deadlock
    if (app.get("env") === "development") {
      try {
        await setupVite(app, server);
        log("Vite development server setup complete");
      } catch (error) {
        console.error("Vite setup failed:", error);
      }
    } else {
      serveStatic(app);
    }
  });
})();
