import type { Express, RequestHandler } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { storage } from "./storage";
import { DEMO_CREDENTIALS } from "@shared/schema";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const mongoStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/hospital-residents',
    touchAfter: 24 * 3600,
  });
  
  return session({
    secret: process.env.SESSION_SECRET || 'demo-secret-key-for-hospital-system',
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for development
      maxAge: sessionTtl,
    },
  });
}

export async function setupDemoAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Demo login endpoint
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Check demo credentials
    const isAdmin = username === DEMO_CREDENTIALS.admin.username && 
                   password === DEMO_CREDENTIALS.admin.password;
    const isViewer = username === DEMO_CREDENTIALS.viewer.username && 
                    password === DEMO_CREDENTIALS.viewer.password;

    if (isAdmin || isViewer) {
      const credentials = isAdmin ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.viewer;
      
      // Store user in session
      (req.session as any).user = {
        claims: {
          sub: credentials.id,
          email: credentials.username,
          first_name: credentials.firstName,
          last_name: credentials.lastName,
        },
        expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 1 week from now
      };

      // Also ensure user exists in database
      await storage.upsertUser({
        _id: credentials.id,
        email: credentials.username,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role: credentials.role,
      });

      res.json({ success: true, user: credentials });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Demo logout endpoint
  app.get("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Get current demo user
  app.get("/api/demo-info", (req, res) => {
    res.json({
      admin: {
        username: DEMO_CREDENTIALS.admin.username,
        password: DEMO_CREDENTIALS.admin.password,
      },
      viewer: {
        username: DEMO_CREDENTIALS.viewer.username,  
        password: DEMO_CREDENTIALS.viewer.password,
      }
    });
  });
}

export const isDemoAuthenticated: RequestHandler = async (req, res, next) => {
  const user = (req.session as any)?.user;

  if (!user || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > user.expires_at) {
    return res.status(401).json({ message: "Session expired" });
  }

  // Add user to request for compatibility
  (req as any).user = user;
  return next();
};