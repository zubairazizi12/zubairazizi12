import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupDemoAuth, isDemoAuthenticated } from "./demoAuth";
import { 
  insertResidentSchema,
  insertFacultySchema,
  insertTeacherSchema,
  insertFormSchema,
  insertDisciplinaryActionSchema,
  insertRewardSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo Auth middleware
  await setupDemoAuth(app);

  // Auth routes are handled in setupDemoAuth

  app.get('/api/auth/user', isDemoAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (user) {
        res.json({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Resident routes
  app.get("/api/residents", isDemoAuthenticated, async (req, res) => {
    try {
      const residents = await storage.getAllResidents();
      res.json(residents);
    } catch (error) {
      console.error("Error fetching residents:", error);
      res.status(500).json({ message: "Failed to fetch residents" });
    }
  });

  app.get("/api/residents/:id", isDemoAuthenticated, async (req, res) => {
    try {
      const resident = await storage.getResident(req.params.id);
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      res.json(resident);
    } catch (error) {
      console.error("Error fetching resident:", error);
      res.status(500).json({ message: "Failed to fetch resident" });
    }
  });

  app.post("/api/residents", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertResidentSchema.parse(req.body);
      const resident = await storage.createResident(validatedData);
      res.status(201).json(resident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating resident:", error);
      res.status(500).json({ message: "Failed to create resident" });
    }
  });

  app.put("/api/residents/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertResidentSchema.partial().parse(req.body);
      const resident = await storage.updateResident(req.params.id, validatedData);
      res.json(resident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating resident:", error);
      res.status(500).json({ message: "Failed to update resident" });
    }
  });

  app.delete("/api/residents/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteResident(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting resident:", error);
      res.status(500).json({ message: "Failed to delete resident" });
    }
  });

  // Faculty routes
  app.get("/api/faculty", isDemoAuthenticated, async (req, res) => {
    try {
      const faculty = await storage.getAllFaculty();
      res.json(faculty);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.post("/api/faculty", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFacultySchema.parse(req.body);
      const facultyMember = await storage.createFaculty(validatedData);
      res.status(201).json(facultyMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating faculty:", error);
      res.status(500).json({ message: "Failed to create faculty" });
    }
  });

  app.put("/api/faculty/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFacultySchema.partial().parse(req.body);
      const facultyMember = await storage.updateFaculty(req.params.id, validatedData);
      res.json(facultyMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating faculty:", error);
      res.status(500).json({ message: "Failed to update faculty" });
    }
  });

  app.delete("/api/faculty/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteFaculty(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting faculty:", error);
      res.status(500).json({ message: "Failed to delete faculty" });
    }
  });

  // Teacher routes
  app.get("/api/teachers", isDemoAuthenticated, async (req, res) => {
    try {
      const teachers = await storage.getTeachers();
      res.json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  app.get("/api/teachers/:id", isDemoAuthenticated, async (req, res) => {
    try {
      const teacher = await storage.getTeacher(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json(teacher);
    } catch (error) {
      console.error("Error fetching teacher:", error);
      res.status(500).json({ message: "Failed to fetch teacher" });
    }
  });

  app.post("/api/teachers", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertTeacherSchema.parse(req.body);
      const teacher = await storage.createTeacher(validatedData);
      res.status(201).json(teacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating teacher:", error);
      res.status(500).json({ message: "Failed to create teacher" });
    }
  });

  app.put("/api/teachers/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertTeacherSchema.partial().parse(req.body);
      const teacher = await storage.updateTeacher(req.params.id, validatedData);
      res.json(teacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating teacher:", error);
      res.status(500).json({ message: "Failed to update teacher" });
    }
  });

  app.delete("/api/teachers/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const success = await storage.deleteTeacher(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      res.status(500).json({ message: "Failed to delete teacher" });
    }
  });

  // Form routes
  app.get("/api/residents/:residentId/forms", isDemoAuthenticated, async (req, res) => {
    try {
      const forms = await storage.getResidentForms(req.params.residentId);
      res.json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ message: "Failed to fetch forms" });
    }
  });

  app.post("/api/forms", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFormSchema.parse(req.body);
      const form = await storage.createForm(validatedData);
      res.status(201).json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating form:", error);
      res.status(500).json({ message: "Failed to create form" });
    }
  });

  app.put("/api/forms/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFormSchema.partial().parse(req.body);
      const form = await storage.updateForm(req.params.id, validatedData);
      res.json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating form:", error);
      res.status(500).json({ message: "Failed to update form" });
    }
  });

  // Disciplinary action routes
  app.get("/api/residents/:residentId/disciplinary-actions", isDemoAuthenticated, async (req, res) => {
    try {
      const actions = await storage.getResidentDisciplinaryActions(req.params.residentId);
      res.json(actions);
    } catch (error) {
      console.error("Error fetching disciplinary actions:", error);
      res.status(500).json({ message: "Failed to fetch disciplinary actions" });
    }
  });

  app.post("/api/disciplinary-actions", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertDisciplinaryActionSchema.parse({
        ...req.body,
        createdBy: req.user.claims.sub,
      });
      const action = await storage.createDisciplinaryAction(validatedData);
      res.status(201).json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating disciplinary action:", error);
      res.status(500).json({ message: "Failed to create disciplinary action" });
    }
  });

  // Reward routes
  app.get("/api/residents/:residentId/rewards", isDemoAuthenticated, async (req, res) => {
    try {
      const rewards = await storage.getResidentRewards(req.params.residentId);
      res.json(rewards);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      res.status(500).json({ message: "Failed to fetch rewards" });
    }
  });

  app.post("/api/rewards", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertRewardSchema.parse({
        ...req.body,
        createdBy: req.user.claims.sub,
      });
      const reward = await storage.createReward(validatedData);
      res.status(201).json(reward);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating reward:", error);
      res.status(500).json({ message: "Failed to create reward" });
    }
  });

  // Development seeding route
  app.post("/api/seed", async (req: any, res) => {
    try {
      if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ message: "Seeding only allowed in development" });
      }
      
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { seedDatabase } = await import("./seeds");
      await seedDatabase();
      
      res.json({ 
        message: "Database seeded successfully with comprehensive faculty and resident data",
        details: {
          facultyMembers: "36 faculty members across 12 departments",
          residents: "14 residents across various departments",
          departments: ["Internal Medicine", "Surgery", "Cardiology", "Emergency Medicine", "Pediatrics", "Psychiatry", "Radiology", "Anesthesiology", "Obstetrics & Gynecology", "Orthopedic Surgery", "Neurology", "Dermatology"]
        }
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
