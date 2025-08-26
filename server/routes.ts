import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupDemoAuth, isDemoAuthenticated } from "./demoAuth";
import { UserModel, ResidentModel, TeacherModel } from "./models";
import { z } from "zod";

// Teacher validation schema
const createTeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father name is required"),
  grandfatherName: z.string().min(1, "Grandfather name is required"),
  academicRank: z.string().min(1, "Academic rank is required"),
  rankAchievementDate: z.string().transform((str) => new Date(str)),
  trainerAppointmentDate: z.string().transform((str) => new Date(str)),
  gender: z.enum(["Male", "Female"]),
  province: z.string().min(1, "Province is required"),
  subject: z.string().min(1, "Subject is required"),
  position: z.string().min(1, "Position is required"),
  hospital: z.string().min(1, "Hospital is required"),
  dateOfBirth: z.string().transform((str) => new Date(str)),
  idNumber: z.string().min(1, "ID number is required"),
  dutyStartDate: z.string().transform((str) => new Date(str)),
  contactInfo: z.string().min(1, "Contact info is required"),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  emailAddress: z.string().email("Valid email is required"),
  postCode: z.string().min(1, "Post code is required"),
  appointmentType: z.string().min(1, "Appointment type is required"),
  department: z.string().min(1, "Department is required"),
  experience: z.number().min(0, "Experience must be non-negative"),
  status: z.string().optional().default("active"),
  profileImageUrl: z.string().optional(),
});

// Resident validation schema
const createResidentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  age: z.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  gender: z.enum(["Male", "Female"]),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  status: z.string().optional().default("active"),
  profileImageUrl: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo Auth middleware
  await setupDemoAuth(app);

  // Auth routes
  app.get('/api/auth/user', isDemoAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await UserModel.findById(userId);
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

  // User routes
  app.get("/api/users", isDemoAuthenticated, async (req, res) => {
    try {
      const users = await UserModel.find().sort({ createdAt: -1 });
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", isDemoAuthenticated, async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Resident routes
  app.get("/api/residents", isDemoAuthenticated, async (req, res) => {
    try {
      const residents = await ResidentModel.find().sort({ createdAt: -1 });
      res.json(residents);
    } catch (error) {
      console.error("Error fetching residents:", error);
      res.status(500).json({ message: "Failed to fetch residents" });
    }
  });

  app.get("/api/residents/:id", isDemoAuthenticated, async (req, res) => {
    try {
      const resident = await ResidentModel.findById(req.params.id);
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
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = createResidentSchema.parse(req.body);
      const resident = new ResidentModel(validatedData);
      const savedResident = await resident.save();
      res.status(201).json(savedResident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error("Error creating resident:", error);
      res.status(500).json({ message: "Failed to create resident" });
    }
  });

  app.put("/api/residents/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = createResidentSchema.partial().parse(req.body);
      const resident = await ResidentModel.findByIdAndUpdate(
        req.params.id,
        { ...validatedData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      
      res.json(resident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error("Error updating resident:", error);
      res.status(500).json({ message: "Failed to update resident" });
    }
  });

  app.delete("/api/residents/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const resident = await ResidentModel.findByIdAndDelete(req.params.id);
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      res.json({ message: "Resident deleted successfully" });
    } catch (error) {
      console.error("Error deleting resident:", error);
      res.status(500).json({ message: "Failed to delete resident" });
    }
  });

  // Teacher routes
  app.get("/api/teachers", isDemoAuthenticated, async (req, res) => {
    try {
      const teachers = await TeacherModel.find().sort({ createdAt: -1 });
      res.json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  app.get("/api/teachers/:id", isDemoAuthenticated, async (req, res) => {
    try {
      const teacher = await TeacherModel.findById(req.params.id);
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
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = createTeacherSchema.parse(req.body);
      const teacher = new TeacherModel(validatedData);
      const savedTeacher = await teacher.save();
      res.status(201).json(savedTeacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error("Error creating teacher:", error);
      res.status(500).json({ message: "Failed to create teacher" });
    }
  });

  app.put("/api/teachers/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = createTeacherSchema.partial().parse(req.body);
      const teacher = await TeacherModel.findByIdAndUpdate(
        req.params.id,
        { ...validatedData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      
      res.json(teacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error("Error updating teacher:", error);
      res.status(500).json({ message: "Failed to update teacher" });
    }
  });

  app.delete("/api/teachers/:id", isDemoAuthenticated, async (req: any, res) => {
    try {
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
      console.error("Error deleting teacher:", error);
      res.status(500).json({ message: "Failed to delete teacher" });
    }
  });

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