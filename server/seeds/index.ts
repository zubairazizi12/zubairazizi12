import { connectDB } from "../db";
import { seedFaculty } from "./facultySeeds";
import { seedResidents } from "./residentSeeds";
import { UserModel, DEMO_CREDENTIALS } from "@shared/schema";

// Main seeding function
export async function seedDatabase(): Promise<void> {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Ensure database connection
    await connectDB();
    
    // Seed demo users if they don't exist
    await seedDemoUsers();
    
    // Seed faculty data
    await seedFaculty();
    
    // Seed resident data  
    await seedResidents();
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', (error as Error).message);
    throw error;
  }
}

// Function to seed demo users for authentication
async function seedDemoUsers(): Promise<void> {
  try {
    // Check if admin user exists
    const adminExists = await UserModel.findById(DEMO_CREDENTIALS.admin.id);
    if (!adminExists) {
      await UserModel.create({
        _id: DEMO_CREDENTIALS.admin.id,
        email: DEMO_CREDENTIALS.admin.username,
        firstName: DEMO_CREDENTIALS.admin.firstName,
        lastName: DEMO_CREDENTIALS.admin.lastName,
        role: DEMO_CREDENTIALS.admin.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Demo admin user created');
    }

    // Check if viewer user exists
    const viewerExists = await UserModel.findById(DEMO_CREDENTIALS.viewer.id);
    if (!viewerExists) {
      await UserModel.create({
        _id: DEMO_CREDENTIALS.viewer.id,
        email: DEMO_CREDENTIALS.viewer.username,
        firstName: DEMO_CREDENTIALS.viewer.firstName,
        lastName: DEMO_CREDENTIALS.viewer.lastName,
        role: DEMO_CREDENTIALS.viewer.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Demo viewer user created');
    }
    
  } catch (error) {
    console.error('❌ Error seeding demo users:', (error as Error).message);
    throw error;
  }
}

// Function to run seeds manually (for development)
export async function runSeeds(): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    await seedDatabase();
  }
}