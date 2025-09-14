import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupDemoAuth, isDemoAuthenticated } from "./demoAuth";
import { UserController, ResidentController, TeacherController } from "./controllers";
import { TeacherModel } from "./models";
import { trainerRoutes } from '../server/routes/trainerRoutes';

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo Auth middleware
  await setupDemoAuth(app);
//////////////////////////////////////
//tranerRoters
  app.use('/api/trainers', trainerRoutes);

  ///////////////////////////////////////////

  // Auth routes
  app.get('/api/auth/user', isDemoAuthenticated, UserController.getCurrentUser);

  // User routes
  app.get("/api/users", isDemoAuthenticated, UserController.getAllUsers);
  app.get("/api/users/:id", isDemoAuthenticated, UserController.getUserById);

  // Resident routes
  app.get("/api/residents", isDemoAuthenticated, ResidentController.getAllResidents);
  app.get("/api/residents/:id", isDemoAuthenticated, ResidentController.getResidentById);
  app.post("/api/residents", isDemoAuthenticated, ResidentController.createResident);
  app.put("/api/residents/:id", isDemoAuthenticated, ResidentController.updateResident);
  app.delete("/api/residents/:id", isDemoAuthenticated, ResidentController.deleteResident);

  // Teacher routes
  app.get("/api/teachers", isDemoAuthenticated, TeacherController.getAllTeachers);
  app.get("/api/teachers/:id", isDemoAuthenticated, TeacherController.getTeacherById);
  app.post("/api/teachers", isDemoAuthenticated, TeacherController.createTeacher);
  app.put("/api/teachers/:id", isDemoAuthenticated, TeacherController.updateTeacher);
  app.delete("/api/teachers/:id", isDemoAuthenticated, TeacherController.deleteTeacher);

  // Forms
  app.get("/api/forms", isDemoAuthenticated, async (req, res) => {
    try {
      // Return form types for the forms system
      const formTypes = [
        { id: 'J', name: 'Form J - Initial Assessment' },
        { id: 'F', name: 'Form F - Monthly Evaluation' },
        { id: 'D', name: 'Form D - Skills Assessment' },
        { id: 'I', name: 'Form I - Clinical Performance' },
        { id: 'G', name: 'Form G - Research Progress' },
        { id: 'E', name: 'Form E - Professional Development' },
        { id: 'C', name: 'Form C - Case Study Review' },
        { id: 'H', name: 'Form H - Final Evaluation' },
        { id: 'K', name: 'Form K - Competency Review' }
      ];
      res.json(formTypes);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ message: "Failed to fetch forms" });
    }
  });

  // Disciplinary actions
  app.get("/api/disciplinary", isDemoAuthenticated, async (req, res) => {
    try {
      // Placeholder for disciplinary actions
      res.json([]);
    } catch (error) {
      console.error("Error fetching disciplinary actions:", error);
      res.status(500).json({ message: "Failed to fetch disciplinary actions" });
    }
  });

  // Rewards
  app.get("/api/rewards", isDemoAuthenticated, async (req, res) => {
    try {
      // Placeholder for rewards
      res.json([]);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      res.status(500).json({ message: "Failed to fetch rewards" });
    }
  });

  // Reports
  app.get("/api/reports", isDemoAuthenticated, async (req, res) => {
    try {
      const { ResidentModel } = await import("./models");
      const reports = {
        residents: await ResidentModel.countDocuments(),
        teachers: await TeacherModel.countDocuments(),
        forms: 9, // Number of form types
        activeResidents: await ResidentModel.countDocuments({ status: 'active' }),
        inactiveResidents: await ResidentModel.countDocuments({ status: 'inactive' }),
        activeTeachers: await TeacherModel.countDocuments({ status: 'active' }),
        inactiveTeachers: await TeacherModel.countDocuments({ status: 'inactive' })
      };
      res.json(reports);
    } catch (error) {
      console.error("Error generating reports:", error);
      res.status(500).json({ message: "Failed to generate reports" });
    }
  });

  return createServer(app);
}