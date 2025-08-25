import { z } from "zod";
import mongoose, { Document, Schema } from "mongoose";

// User Interface and Schema (mandatory for Replit Auth)
export interface IUser extends Document {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  role: { type: String, required: true, default: "viewer" }, // admin or viewer
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);

// Residents Interface and Schema
export interface IResident extends Document {
  _id: string;
  fullName: string;
  age: number;
  gender: string;
  department: string;
  startDate: Date;
  endDate?: Date;
  status: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const residentSchema = new Schema<IResident>({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  status: { type: String, required: true, default: "active" },
  profileImageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ResidentModel = mongoose.model<IResident>("Resident", residentSchema);

// Faculty Interface and Schema
export interface IFaculty extends Document {
  _id: string;
  name: string;
  department: string;
  role: string;
  contactInfo: string;
  status: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const facultySchema = new Schema<IFaculty>({
  name: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  contactInfo: { type: String, required: true },
  status: { type: String, required: true, default: "active" },
  profileImageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const FacultyModel = mongoose.model<IFaculty>("Faculty", facultySchema);

// Teacher Interface and Schema
export interface ITeacher extends Document {
  _id: string;
  name: string;
  fatherName: string;
  grandfatherName: string;
  academicRank: string;
  rankAchievementDate: Date;
  trainerAppointmentDate: Date;
  gender: string;
  province: string;
  subject: string;
  position: string;
  hospital: string;
  dateOfBirth: Date;
  idNumber: string;
  dutyStartDate: Date;
  contactInfo: string;
  whatsappNumber: string;
  emailAddress: string;
  postCode: string;
  appointmentType: string;
  department: string;
  experience: number;
  status: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  grandfatherName: { type: String, required: true },
  academicRank: { type: String, required: true },
  rankAchievementDate: { type: Date, required: true },
  trainerAppointmentDate: { type: Date, required: true },
  gender: { type: String, required: true },
  province: { type: String, required: true },
  subject: { type: String, required: true },
  position: { type: String, required: true },
  hospital: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  idNumber: { type: String, required: true },
  dutyStartDate: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  postCode: { type: String, required: true },
  appointmentType: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: Number, required: true },
  status: { type: String, required: true, default: "active" },
  profileImageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const TeacherModel = mongoose.model<ITeacher>("Teacher", teacherSchema);

// Forms Interface and Schema (J, F, D, I, G, E, C, H, K)
export interface IForm extends Document {
  _id: string;
  residentId: string;
  formType: string; // J, F, D, I, G, E, C, H, K
  formData: Record<string, any>;
  supervisorId?: string;
  status: string; // draft, completed
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema<IForm>({
  residentId: { type: String, required: true, ref: "Resident" },
  formType: { type: String, required: true }, // J, F, D, I, G, E, C, H, K
  formData: { type: Schema.Types.Mixed, required: true },
  supervisorId: { type: String, ref: "Faculty" },
  status: { type: String, required: true, default: "draft" }, // draft, completed
  completedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const FormModel = mongoose.model<IForm>("Form", formSchema);

// Disciplinary Actions Interface and Schema
export interface IDisciplinaryAction extends Document {
  _id: string;
  residentId: string;
  date: Date;
  description: string;
  actionTaken: string;
  severity: string; // minor, major, severe
  createdBy: string;
  createdAt: Date;
}

const disciplinaryActionSchema = new Schema<IDisciplinaryAction>({
  residentId: { type: String, required: true, ref: "Resident" },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  actionTaken: { type: String, required: true },
  severity: { type: String, required: true, default: "minor" }, // minor, major, severe
  createdBy: { type: String, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const DisciplinaryActionModel = mongoose.model<IDisciplinaryAction>("DisciplinaryAction", disciplinaryActionSchema);

// Rewards Interface and Schema
export interface IReward extends Document {
  _id: string;
  residentId: string;
  date: Date;
  description: string;
  rewardType: string;
  amount?: string; // for monetary rewards
  createdBy: string;
  createdAt: Date;
}

const rewardSchema = new Schema<IReward>({
  residentId: { type: String, required: true, ref: "Resident" },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  rewardType: { type: String, required: true },
  amount: String, // for monetary rewards
  createdBy: { type: String, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const RewardModel = mongoose.model<IReward>("Reward", rewardSchema);

// Demo User Credentials
export const DEMO_CREDENTIALS = {
  admin: {
    username: "admin@hospital.demo",
    password: "AdminDemo123!",
    id: "demo_admin_001",
    firstName: "Admin",
    lastName: "User",
    role: "admin"
  },
  viewer: {
    username: "viewer@hospital.demo",
    password: "ViewerDemo123!",
    id: "demo_viewer_001", 
    firstName: "Viewer",
    lastName: "User",
    role: "viewer"
  }
};

// Zod validation schemas
export const insertResidentSchema = z.object({
  fullName: z.string().min(1),
  age: z.number().min(1).max(150),
  gender: z.string().min(1),
  department: z.string().min(1),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.string().default("active"),
  profileImageUrl: z.string().optional(),
});

export const insertFacultySchema = z.object({
  name: z.string().min(1),
  department: z.string().min(1),
  role: z.string().min(1),
  contactInfo: z.string().min(1),
  status: z.string().default("active"),
  profileImageUrl: z.string().optional(),
});

export const insertTeacherSchema = z.object({
  name: z.string().min(1),
  fatherName: z.string().min(1),
  grandfatherName: z.string().min(1),
  academicRank: z.string().min(1),
  rankAchievementDate: z.date(),
  trainerAppointmentDate: z.date(),
  gender: z.string().min(1),
  province: z.string().min(1),
  subject: z.string().min(1),
  position: z.string().min(1),
  hospital: z.string().min(1),
  dateOfBirth: z.date(),
  idNumber: z.string().min(1),
  dutyStartDate: z.date(),
  contactInfo: z.string().min(1),
  whatsappNumber: z.string().min(1),
  emailAddress: z.string().email(),
  postCode: z.string().min(1),
  appointmentType: z.string().min(1),
  department: z.string().min(1),
  experience: z.number().min(0),
  status: z.string().default("active"),
  profileImageUrl: z.string().optional(),
});

export const insertFormSchema = z.object({
  residentId: z.string().min(1),
  formType: z.string().min(1),
  formData: z.record(z.any()),
  supervisorId: z.string().optional(),
  status: z.string().default("draft"),
  completedAt: z.date().optional(),
});

export const insertDisciplinaryActionSchema = z.object({
  residentId: z.string().min(1),
  date: z.date(),
  description: z.string().min(1),
  actionTaken: z.string().min(1),
  severity: z.string().default("minor"),
  createdBy: z.string().min(1),
});

export const insertRewardSchema = z.object({
  residentId: z.string().min(1),
  date: z.date(),
  description: z.string().min(1),
  rewardType: z.string().min(1),
  amount: z.string().optional(),
  createdBy: z.string().min(1),
});

// Types
export type UpsertUser = {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  role?: string;
};
export type User = IUser;
export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = IResident;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Faculty = IFaculty;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type Teacher = ITeacher;
export type InsertForm = z.infer<typeof insertFormSchema>;
export type Form = IForm;
export type InsertDisciplinaryAction = z.infer<typeof insertDisciplinaryActionSchema>;
export type DisciplinaryAction = IDisciplinaryAction;
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type Reward = IReward;
