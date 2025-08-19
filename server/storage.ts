import {
  users,
  residents,
  faculty,
  forms,
  disciplinaryActions,
  rewards,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Resident operations
  async getAllResidents(): Promise<Resident[]> {
    return await db.select().from(residents).orderBy(desc(residents.createdAt));
  }

  async getResident(id: string): Promise<Resident | undefined> {
    const [resident] = await db.select().from(residents).where(eq(residents.id, id));
    return resident;
  }

  async createResident(resident: InsertResident): Promise<Resident> {
    const [newResident] = await db.insert(residents).values(resident).returning();
    return newResident;
  }

  async updateResident(id: string, resident: Partial<InsertResident>): Promise<Resident> {
    const [updatedResident] = await db
      .update(residents)
      .set({ ...resident, updatedAt: new Date() })
      .where(eq(residents.id, id))
      .returning();
    return updatedResident;
  }

  async deleteResident(id: string): Promise<void> {
    await db.delete(residents).where(eq(residents.id, id));
  }

  // Faculty operations
  async getAllFaculty(): Promise<Faculty[]> {
    return await db.select().from(faculty).orderBy(desc(faculty.createdAt));
  }

  async getFaculty(id: string): Promise<Faculty | undefined> {
    const [facultyMember] = await db.select().from(faculty).where(eq(faculty.id, id));
    return facultyMember;
  }

  async createFaculty(facultyData: InsertFaculty): Promise<Faculty> {
    const [newFaculty] = await db.insert(faculty).values(facultyData).returning();
    return newFaculty;
  }

  async updateFaculty(id: string, facultyData: Partial<InsertFaculty>): Promise<Faculty> {
    const [updatedFaculty] = await db
      .update(faculty)
      .set({ ...facultyData, updatedAt: new Date() })
      .where(eq(faculty.id, id))
      .returning();
    return updatedFaculty;
  }

  async deleteFaculty(id: string): Promise<void> {
    await db.delete(faculty).where(eq(faculty.id, id));
  }

  // Form operations
  async getResidentForms(residentId: string): Promise<Form[]> {
    return await db
      .select()
      .from(forms)
      .where(eq(forms.residentId, residentId))
      .orderBy(desc(forms.createdAt));
  }

  async getForm(id: string): Promise<Form | undefined> {
    const [form] = await db.select().from(forms).where(eq(forms.id, id));
    return form;
  }

  async createForm(form: InsertForm): Promise<Form> {
    const [newForm] = await db.insert(forms).values(form).returning();
    return newForm;
  }

  async updateForm(id: string, form: Partial<InsertForm>): Promise<Form> {
    const [updatedForm] = await db
      .update(forms)
      .set({ ...form, updatedAt: new Date() })
      .where(eq(forms.id, id))
      .returning();
    return updatedForm;
  }

  async deleteForm(id: string): Promise<void> {
    await db.delete(forms).where(eq(forms.id, id));
  }

  // Disciplinary action operations
  async getResidentDisciplinaryActions(residentId: string): Promise<DisciplinaryAction[]> {
    return await db
      .select()
      .from(disciplinaryActions)
      .where(eq(disciplinaryActions.residentId, residentId))
      .orderBy(desc(disciplinaryActions.date));
  }

  async createDisciplinaryAction(action: InsertDisciplinaryAction): Promise<DisciplinaryAction> {
    const [newAction] = await db.insert(disciplinaryActions).values(action).returning();
    return newAction;
  }

  async updateDisciplinaryAction(
    id: string,
    action: Partial<InsertDisciplinaryAction>
  ): Promise<DisciplinaryAction> {
    const [updatedAction] = await db
      .update(disciplinaryActions)
      .set(action)
      .where(eq(disciplinaryActions.id, id))
      .returning();
    return updatedAction;
  }

  async deleteDisciplinaryAction(id: string): Promise<void> {
    await db.delete(disciplinaryActions).where(eq(disciplinaryActions.id, id));
  }

  // Reward operations
  async getResidentRewards(residentId: string): Promise<Reward[]> {
    return await db
      .select()
      .from(rewards)
      .where(eq(rewards.residentId, residentId))
      .orderBy(desc(rewards.date));
  }

  async createReward(reward: InsertReward): Promise<Reward> {
    const [newReward] = await db.insert(rewards).values(reward).returning();
    return newReward;
  }

  async updateReward(id: string, reward: Partial<InsertReward>): Promise<Reward> {
    const [updatedReward] = await db
      .update(rewards)
      .set(reward)
      .where(eq(rewards.id, id))
      .returning();
    return updatedReward;
  }

  async deleteReward(id: string): Promise<void> {
    await db.delete(rewards).where(eq(rewards.id, id));
  }
}

export const storage = new DatabaseStorage();
