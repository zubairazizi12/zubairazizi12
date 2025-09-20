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

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }


  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    // reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
