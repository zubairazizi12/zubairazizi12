import { Router } from "express";
import { storage } from "../storage";
import { insertFacultySchema } from "@shared/schema";
import { seedFaculty, getFacultyByDepartment, getAllDepartmentsWithFaculty } from "../seeds/facultySeeds";

const router = Router();

// Get all faculty members
router.get("/", async (req, res) => {
  try {
    const faculty = await storage.getAllFaculty();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
});

// Get faculty by department
router.get("/department/:department", async (req, res) => {
  try {
    const { department } = req.params;
    const faculty = await getFacultyByDepartment(department);
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty by department" });
  }
});

// Get all departments with faculty
router.get("/departments", async (req, res) => {
  try {
    const departments = await getAllDepartmentsWithFaculty();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

// Get faculty by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await storage.getFaculty(id);
    
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
});

// Create new faculty member
router.post("/", async (req, res) => {
  try {
    const validatedData = insertFacultySchema.parse(req.body);
    const faculty = await storage.createFaculty(validatedData);
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: "Failed to create faculty", error: (error as Error).message });
  }
});

// Update faculty member
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertFacultySchema.partial().parse(req.body);
    const faculty = await storage.updateFaculty(id, validatedData);
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: "Failed to update faculty", error: (error as Error).message });
  }
});

// Delete faculty member
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await storage.deleteFaculty(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete faculty" });
  }
});

// Seed faculty data (development only)
router.post("/seed", async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ message: "Seeding only allowed in development" });
    }
    
    await seedFaculty();
    res.json({ message: "Faculty data seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to seed faculty data", error: (error as Error).message });
  }
});

export default router;