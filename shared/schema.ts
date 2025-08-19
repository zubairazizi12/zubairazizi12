import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("viewer"), // admin or viewer
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Residents table
export const residents = pgTable("residents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: varchar("full_name").notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender").notNull(),
  department: varchar("department").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  status: varchar("status").notNull().default("active"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Faculty table
export const faculty = pgTable("faculty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  department: varchar("department").notNull(),
  role: varchar("role").notNull(),
  contactInfo: varchar("contact_info").notNull(),
  status: varchar("status").notNull().default("active"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forms table (J, F, D, I, G, E, C, H, K)
export const forms = pgTable("forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  residentId: varchar("resident_id").notNull().references(() => residents.id),
  formType: varchar("form_type").notNull(), // J, F, D, I, G, E, C, H, K
  formData: jsonb("form_data").notNull(),
  supervisorId: varchar("supervisor_id").references(() => faculty.id),
  status: varchar("status").notNull().default("draft"), // draft, completed
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Disciplinary Actions table
export const disciplinaryActions = pgTable("disciplinary_actions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  residentId: varchar("resident_id").notNull().references(() => residents.id),
  date: date("date").notNull(),
  description: text("description").notNull(),
  actionTaken: text("action_taken").notNull(),
  severity: varchar("severity").notNull().default("minor"), // minor, major, severe
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Rewards table
export const rewards = pgTable("rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  residentId: varchar("resident_id").notNull().references(() => residents.id),
  date: date("date").notNull(),
  description: text("description").notNull(),
  rewardType: varchar("reward_type").notNull(),
  amount: varchar("amount"), // for monetary rewards
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const residentsRelations = relations(residents, ({ many }) => ({
  forms: many(forms),
  disciplinaryActions: many(disciplinaryActions),
  rewards: many(rewards),
}));

export const formsRelations = relations(forms, ({ one }) => ({
  resident: one(residents, {
    fields: [forms.residentId],
    references: [residents.id],
  }),
  supervisor: one(faculty, {
    fields: [forms.supervisorId],
    references: [faculty.id],
  }),
}));

export const disciplinaryActionsRelations = relations(disciplinaryActions, ({ one }) => ({
  resident: one(residents, {
    fields: [disciplinaryActions.residentId],
    references: [residents.id],
  }),
  createdBy: one(users, {
    fields: [disciplinaryActions.createdBy],
    references: [users.id],
  }),
}));

export const rewardsRelations = relations(rewards, ({ one }) => ({
  resident: one(residents, {
    fields: [rewards.residentId],
    references: [residents.id],
  }),
  createdBy: one(users, {
    fields: [rewards.createdBy],
    references: [users.id],
  }),
}));

export const facultyRelations = relations(faculty, ({ many }) => ({
  supervisedForms: many(forms),
}));

// Insert schemas
export const insertResidentSchema = createInsertSchema(residents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFacultySchema = createInsertSchema(faculty).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFormSchema = createInsertSchema(forms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDisciplinaryActionSchema = createInsertSchema(disciplinaryActions).omit({
  id: true,
  createdAt: true,
});

export const insertRewardSchema = createInsertSchema(rewards).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = typeof residents.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Faculty = typeof faculty.$inferSelect;
export type InsertForm = z.infer<typeof insertFormSchema>;
export type Form = typeof forms.$inferSelect;
export type InsertDisciplinaryAction = z.infer<typeof insertDisciplinaryActionSchema>;
export type DisciplinaryAction = typeof disciplinaryActions.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type Reward = typeof rewards.$inferSelect;
