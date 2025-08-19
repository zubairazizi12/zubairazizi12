import {
  UserModel,
  ResidentModel,
  FacultyModel,
  FormModel,
  DisciplinaryActionModel,
  RewardModel,
  type User,
  type UpsertUser,
  type Resident,
  type InsertResident,
  type Faculty,
  type InsertFaculty,
  type Form,
  type InsertForm,
  type DisciplinaryAction,
  type InsertDisciplinaryAction,
  type Reward,
  type InsertReward,
  DEMO_CREDENTIALS,
} from "@shared/schema";
import { connectDB } from "./db";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Resident operations
  getAllResidents(): Promise<Resident[]>;
  getResident(id: string): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  updateResident(id: string, resident: Partial<InsertResident>): Promise<Resident>;
  deleteResident(id: string): Promise<void>;

  // Faculty operations
  getAllFaculty(): Promise<Faculty[]>;
  getFaculty(id: string): Promise<Faculty | undefined>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  updateFaculty(id: string, faculty: Partial<InsertFaculty>): Promise<Faculty>;
  deleteFaculty(id: string): Promise<void>;

  // Form operations
  getResidentForms(residentId: string): Promise<Form[]>;
  getForm(id: string): Promise<Form | undefined>;
  createForm(form: InsertForm): Promise<Form>;
  updateForm(id: string, form: Partial<InsertForm>): Promise<Form>;
  deleteForm(id: string): Promise<void>;

  // Disciplinary action operations
  getResidentDisciplinaryActions(residentId: string): Promise<DisciplinaryAction[]>;
  createDisciplinaryAction(action: InsertDisciplinaryAction): Promise<DisciplinaryAction>;
  updateDisciplinaryAction(id: string, action: Partial<InsertDisciplinaryAction>): Promise<DisciplinaryAction>;
  deleteDisciplinaryAction(id: string): Promise<void>;

  // Reward operations
  getResidentRewards(residentId: string): Promise<Reward[]>;
  createReward(reward: InsertReward): Promise<Reward>;
  updateReward(id: string, reward: Partial<InsertReward>): Promise<Reward>;
  deleteReward(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private demoUsers: Map<string, User> = new Map();
  private demoResidents: Map<string, Resident> = new Map();
  private demoFaculty: Map<string, Faculty> = new Map();
  private demoForms: Map<string, Form> = new Map();
  private demoDisciplinaryActions: Map<string, DisciplinaryAction> = new Map();
  private demoRewards: Map<string, Reward> = new Map();

  constructor() {
    // Initialize database connection and demo data
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    await connectDB();
    this.createDemoUsers();
  }

  private createDemoUsers() {
    // Create demo admin user
    this.demoUsers.set(DEMO_CREDENTIALS.admin.id, {
      _id: DEMO_CREDENTIALS.admin.id,
      email: DEMO_CREDENTIALS.admin.username,
      firstName: DEMO_CREDENTIALS.admin.firstName,
      lastName: DEMO_CREDENTIALS.admin.lastName,
      role: DEMO_CREDENTIALS.admin.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);

    // Create demo viewer user
    this.demoUsers.set(DEMO_CREDENTIALS.viewer.id, {
      _id: DEMO_CREDENTIALS.viewer.id,
      email: DEMO_CREDENTIALS.viewer.username,
      firstName: DEMO_CREDENTIALS.viewer.firstName,
      lastName: DEMO_CREDENTIALS.viewer.lastName,
      role: DEMO_CREDENTIALS.viewer.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);

    console.log('Demo users initialized successfully');
  }

  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    return this.demoUsers.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      _id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role || "viewer",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    
    this.demoUsers.set(userData._id, user);
    return user;
  }

  // Resident operations
  async getAllResidents(): Promise<Resident[]> {
    return Array.from(this.demoResidents.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getResident(id: string): Promise<Resident | undefined> {
    return this.demoResidents.get(id);
  }

  async createResident(resident: InsertResident): Promise<Resident> {
    const id = `resident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newResident: Resident = {
      _id: id,
      ...resident,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Resident;
    
    this.demoResidents.set(id, newResident);
    return newResident;
  }

  async updateResident(id: string, resident: Partial<InsertResident>): Promise<Resident> {
    const existing = this.demoResidents.get(id);
    if (!existing) {
      throw new Error('Resident not found');
    }
    
    const updated = { ...existing, ...resident, updatedAt: new Date() };
    this.demoResidents.set(id, updated);
    return updated;
  }

  async deleteResident(id: string): Promise<void> {
    this.demoResidents.delete(id);
  }

  // Faculty operations
  async getAllFaculty(): Promise<Faculty[]> {
    return await FacultyModel.find().sort({ createdAt: -1 });
  }

  async getFaculty(id: string): Promise<Faculty | undefined> {
    const facultyMember = await FacultyModel.findById(id);
    return facultyMember || undefined;
  }

  async createFaculty(facultyData: InsertFaculty): Promise<Faculty> {
    const newFaculty = new FacultyModel(facultyData);
    return await newFaculty.save();
  }

  async updateFaculty(id: string, facultyData: Partial<InsertFaculty>): Promise<Faculty> {
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { ...facultyData, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedFaculty) {
      throw new Error('Faculty not found');
    }
    return updatedFaculty;
  }

  async deleteFaculty(id: string): Promise<void> {
    await FacultyModel.findByIdAndDelete(id);
  }

  // Form operations
  async getResidentForms(residentId: string): Promise<Form[]> {
    return await FormModel.find({ residentId }).sort({ createdAt: -1 });
  }

  async getForm(id: string): Promise<Form | undefined> {
    const form = await FormModel.findById(id);
    return form || undefined;
  }

  async createForm(form: InsertForm): Promise<Form> {
    const newForm = new FormModel(form);
    return await newForm.save();
  }

  async updateForm(id: string, form: Partial<InsertForm>): Promise<Form> {
    const updatedForm = await FormModel.findByIdAndUpdate(
      id,
      { ...form, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedForm) {
      throw new Error('Form not found');
    }
    return updatedForm;
  }

  async deleteForm(id: string): Promise<void> {
    await FormModel.findByIdAndDelete(id);
  }

  // Disciplinary action operations
  async getResidentDisciplinaryActions(residentId: string): Promise<DisciplinaryAction[]> {
    return await DisciplinaryActionModel.find({ residentId }).sort({ date: -1 });
  }

  async createDisciplinaryAction(action: InsertDisciplinaryAction): Promise<DisciplinaryAction> {
    const newAction = new DisciplinaryActionModel(action);
    return await newAction.save();
  }

  async updateDisciplinaryAction(
    id: string,
    action: Partial<InsertDisciplinaryAction>
  ): Promise<DisciplinaryAction> {
    const updatedAction = await DisciplinaryActionModel.findByIdAndUpdate(
      id,
      action,
      { new: true }
    );
    if (!updatedAction) {
      throw new Error('Disciplinary action not found');
    }
    return updatedAction;
  }

  async deleteDisciplinaryAction(id: string): Promise<void> {
    await DisciplinaryActionModel.findByIdAndDelete(id);
  }

  // Reward operations
  async getResidentRewards(residentId: string): Promise<Reward[]> {
    return await RewardModel.find({ residentId }).sort({ date: -1 });
  }

  async createReward(reward: InsertReward): Promise<Reward> {
    const newReward = new RewardModel(reward);
    return await newReward.save();
  }

  async updateReward(id: string, reward: Partial<InsertReward>): Promise<Reward> {
    const updatedReward = await RewardModel.findByIdAndUpdate(
      id,
      reward,
      { new: true }
    );
    if (!updatedReward) {
      throw new Error('Reward not found');
    }
    return updatedReward;
  }

  async deleteReward(id: string): Promise<void> {
    await RewardModel.findByIdAndDelete(id);
  }
}

export const storage = new DatabaseStorage();
