import { Request, Response } from 'express';
import { TeacherModel, UserModel } from '../models';
import { z } from 'zod';

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

export class TeacherController {
  static async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await TeacherModel.find().sort({ createdAt: -1 });
      res.json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ message: 'Failed to fetch teachers' });
    }
  }

  static async getTeacherById(req: Request, res: Response) {
    try {
      const teacher = await TeacherModel.findById(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.json(teacher);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      res.status(500).json({ message: 'Failed to fetch teacher' });
    }
  }

  static async createTeacher(req: any, res: Response) {
    try {
      const user = await UserModel.findById(req.user.claims.sub);
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = createTeacherSchema.parse(req.body);
      const teacher = new TeacherModel(validatedData);
      const savedTeacher = await teacher.save();
      
      console.log('Teacher saved successfully:', savedTeacher._id);
      res.status(201).json(savedTeacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error creating teacher:', error.errors);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error("Error creating teacher:", error);
      res.status(500).json({ message: "Failed to create teacher" });
    }
  }

  static async updateTeacher(req: any, res: Response) {
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
  }

  static async deleteTeacher(req: any, res: Response) {
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
  }
}