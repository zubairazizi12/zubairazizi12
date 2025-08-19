import { ResidentModel, type InsertResident } from "@shared/schema";

// Sample resident data for different departments
export const residentSeeds: InsertResident[] = [
  // Internal Medicine Residents
  {
    fullName: "Dr. Alex Johnson",
    age: 28,
    gender: "Male",
    department: "Internal Medicine",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. Priya Patel",
    age: 27,
    gender: "Female", 
    department: "Internal Medicine",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. Marcus Williams",
    age: 29,
    gender: "Male",
    department: "Internal Medicine",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2026-06-30"),
    status: "active"
  },

  // Surgery Residents
  {
    fullName: "Dr. Sarah Kim",
    age: 30,
    gender: "Female",
    department: "Surgery",
    startDate: new Date("2022-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. Robert Chen",
    age: 31,
    gender: "Male",
    department: "Surgery", 
    startDate: new Date("2021-07-01"),
    endDate: new Date("2026-06-30"),
    status: "active"
  },

  // Emergency Medicine Residents
  {
    fullName: "Dr. Jessica Martinez",
    age: 26,
    gender: "Female",
    department: "Emergency Medicine",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. David Liu",
    age: 28,
    gender: "Male", 
    department: "Emergency Medicine",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2026-06-30"),
    status: "active"
  },

  // Pediatrics Residents
  {
    fullName: "Dr. Emily Rodriguez",
    age: 27,
    gender: "Female",
    department: "Pediatrics",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. Michael Thompson",
    age: 29,
    gender: "Male",
    department: "Pediatrics",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2026-06-30"),
    status: "active"
  },

  // Cardiology Residents
  {
    fullName: "Dr. Amanda Foster",
    age: 30,
    gender: "Female",
    department: "Cardiology",
    startDate: new Date("2022-07-01"),
    endDate: new Date("2025-06-30"),
    status: "active"
  },

  // Psychiatry Residents
  {
    fullName: "Dr. James Wilson",
    age: 28,
    gender: "Male",
    department: "Psychiatry",
    startDate: new Date("2023-07-01"), 
    endDate: new Date("2027-06-30"),
    status: "active"
  },
  {
    fullName: "Dr. Lisa Zhang",
    age: 26,
    gender: "Female",
    department: "Psychiatry",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2028-06-30"),
    status: "active"
  },

  // Radiology Residents
  {
    fullName: "Dr. Kevin Brown",
    age: 29,
    gender: "Male",
    department: "Radiology",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2027-06-30"),
    status: "active"
  },

  // Anesthesiology Residents
  {
    fullName: "Dr. Rachel Green",
    age: 27,
    gender: "Female",
    department: "Anesthesiology",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2028-06-30"),
    status: "active"
  }
];

// Function to seed resident data to MongoDB
export async function seedResidents(): Promise<void> {
  try {
    // Clear existing resident data (for development purposes)
    await ResidentModel.deleteMany({});
    
    // Insert new resident data
    const insertedResidents = await ResidentModel.insertMany(residentSeeds);
    
    console.log(`✅ Successfully seeded ${insertedResidents.length} residents to MongoDB`);
    
    // Log summary by department
    const departmentCounts: Record<string, number> = {};
    residentSeeds.forEach(resident => {
      departmentCounts[resident.department] = (departmentCounts[resident.department] || 0) + 1;
    });
    
    console.log('📊 Resident distribution by department:');
    Object.entries(departmentCounts).forEach(([dept, count]) => {
      console.log(`   ${dept}: ${count} residents`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding resident data:', (error as Error).message);
    throw error;
  }
}

// Function to get residents by department
export async function getResidentsByDepartment(department: string) {
  try {
    return await ResidentModel.find({ department, status: 'active' }).sort({ fullName: 1 });
  } catch (error) {
    console.error(`Error fetching residents for department ${department}:`, (error as Error).message);
    return [];
  }
}