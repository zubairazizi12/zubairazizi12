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
    
    const updated = { ...existing, ...resident, updatedAt: new Date() } as Resident;
    this.demoResidents.set(id, updated);
    return updated;
  }

  async deleteResident(id: string): Promise<void> {
    this.demoResidents.delete(id);
  }

  // Faculty operations
  async getAllFaculty(): Promise<Faculty[]> {
    return Array.from(this.demoFaculty.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getFaculty(id: string): Promise<Faculty | undefined> {
    return this.demoFaculty.get(id);
  }

  async createFaculty(facultyData: InsertFaculty): Promise<Faculty> {
    const id = `faculty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newFaculty: Faculty = {
      _id: id,
      ...facultyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Faculty;
    
    this.demoFaculty.set(id, newFaculty);
    return newFaculty;
  }

  async updateFaculty(id: string, facultyData: Partial<InsertFaculty>): Promise<Faculty> {
    const existing = this.demoFaculty.get(id);
    if (!existing) {
      throw new Error('Faculty not found');
    }
    
    const updated = { ...existing, ...facultyData, updatedAt: new Date() } as Faculty;
    this.demoFaculty.set(id, updated);
    return updated;
  }

  async deleteFaculty(id: string): Promise<void> {
    this.demoFaculty.delete(id);
  }

  // Form operations
  async getResidentForms(residentId: string): Promise<Form[]> {
    return Array.from(this.demoForms.values())
      .filter(form => form.residentId === residentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getForm(id: string): Promise<Form | undefined> {
    return this.demoForms.get(id);
  }

  async createForm(form: InsertForm): Promise<Form> {
    const id = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newForm: Form = {
      _id: id,
      ...form,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Form;
    
    this.demoForms.set(id, newForm);
    return newForm;
  }

  async updateForm(id: string, form: Partial<InsertForm>): Promise<Form> {
    const existing = this.demoForms.get(id);
    if (!existing) {
      throw new Error('Form not found');
    }
    
    const updated = { ...existing, ...form, updatedAt: new Date() } as Form;
    this.demoForms.set(id, updated);
    return updated;
  }

  async deleteForm(id: string): Promise<void> {
    this.demoForms.delete(id);
  }

  // Disciplinary action operations
  async getResidentDisciplinaryActions(residentId: string): Promise<DisciplinaryAction[]> {
    return Array.from(this.demoDisciplinaryActions.values())
      .filter(action => action.residentId === residentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createDisciplinaryAction(action: InsertDisciplinaryAction): Promise<DisciplinaryAction> {
    const id = `disciplinary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newAction: DisciplinaryAction = {
      _id: id,
      ...action,
    } as DisciplinaryAction;
    
    this.demoDisciplinaryActions.set(id, newAction);
    return newAction;
  }

  async updateDisciplinaryAction(
    id: string,
    action: Partial<InsertDisciplinaryAction>
  ): Promise<DisciplinaryAction> {
    const existing = this.demoDisciplinaryActions.get(id);
    if (!existing) {
      throw new Error('Disciplinary action not found');
    }
    
    const updated = { ...existing, ...action } as DisciplinaryAction;
    this.demoDisciplinaryActions.set(id, updated);
    return updated;
  }

  async deleteDisciplinaryAction(id: string): Promise<void> {
    this.demoDisciplinaryActions.delete(id);
  }

  // Reward operations
  async getResidentRewards(residentId: string): Promise<Reward[]> {
    return Array.from(this.demoRewards.values())
      .filter(reward => reward.residentId === residentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createReward(reward: InsertReward): Promise<Reward> {
    const id = `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newReward: Reward = {
      _id: id,
      ...reward,
    } as Reward;
    
    this.demoRewards.set(id, newReward);
    return newReward;
  }

  async updateReward(id: string, reward: Partial<InsertReward>): Promise<Reward> {
    const existing = this.demoRewards.get(id);
    if (!existing) {
      throw new Error('Reward not found');
    }
    
    const updated = { ...existing, ...reward } as Reward;
    this.demoRewards.set(id, updated);
    return updated;
  }

  async deleteReward(id: string): Promise<void> {
    this.demoRewards.delete(id);
  }
}

export const storage = new DatabaseStorage();
