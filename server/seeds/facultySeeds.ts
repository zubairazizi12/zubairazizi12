import { FacultyModel, type InsertFaculty } from "@shared/schema";

// Comprehensive faculty/trainer data for hospital departments
export const facultySeeds: InsertFaculty[] = [
  // Internal Medicine Department
  {
    name: "Dr. Sarah Mitchell",
    department: "Internal Medicine",
    role: "Chief of Internal Medicine",
    contactInfo: "sarah.mitchell@hospital.com | +1-555-0101",
    status: "active"
  },
  {
    name: "Dr. James Rodriguez",
    department: "Internal Medicine", 
    role: "Senior Attending Physician",
    contactInfo: "james.rodriguez@hospital.com | +1-555-0102",
    status: "active"
  },
  {
    name: "Dr. Emily Chen",
    department: "Internal Medicine",
    role: "Assistant Professor",
    contactInfo: "emily.chen@hospital.com | +1-555-0103",
    status: "active"
  },

  // Surgery Department
  {
    name: "Dr. Michael Thompson",
    department: "Surgery",
    role: "Chief of Surgery",
    contactInfo: "michael.thompson@hospital.com | +1-555-0201",
    status: "active"
  },
  {
    name: "Dr. Lisa Wang",
    department: "Surgery",
    role: "Senior Surgeon",
    contactInfo: "lisa.wang@hospital.com | +1-555-0202", 
    status: "active"
  },
  {
    name: "Dr. David Johnson",
    department: "Surgery",
    role: "Trauma Surgery Specialist",
    contactInfo: "david.johnson@hospital.com | +1-555-0203",
    status: "active"
  },

  // Cardiology Department
  {
    name: "Dr. Robert Harrison",
    department: "Cardiology",
    role: "Chief of Cardiology",
    contactInfo: "robert.harrison@hospital.com | +1-555-0301",
    status: "active"
  },
  {
    name: "Dr. Maria Santos",
    department: "Cardiology",
    role: "Interventional Cardiologist",
    contactInfo: "maria.santos@hospital.com | +1-555-0302",
    status: "active"
  },
  {
    name: "Dr. Ahmed Al-Rashid",
    department: "Cardiology",
    role: "Cardiac Electrophysiologist",
    contactInfo: "ahmed.alrashid@hospital.com | +1-555-0303",
    status: "active"
  },

  // Emergency Medicine Department
  {
    name: "Dr. Jennifer Lee",
    department: "Emergency Medicine",
    role: "Emergency Medicine Director",
    contactInfo: "jennifer.lee@hospital.com | +1-555-0401",
    status: "active"
  },
  {
    name: "Dr. Kevin O'Brien",
    department: "Emergency Medicine",
    role: "Senior Emergency Physician",
    contactInfo: "kevin.obrien@hospital.com | +1-555-0402",
    status: "active"
  },
  {
    name: "Dr. Rachel Green",
    department: "Emergency Medicine",
    role: "Trauma Emergency Specialist",
    contactInfo: "rachel.green@hospital.com | +1-555-0403",
    status: "active"
  },

  // Pediatrics Department
  {
    name: "Dr. Anna Williams",
    department: "Pediatrics",
    role: "Chief of Pediatrics",
    contactInfo: "anna.williams@hospital.com | +1-555-0501",
    status: "active"
  },
  {
    name: "Dr. Mark Davis",
    department: "Pediatrics",
    role: "Pediatric Cardiologist",
    contactInfo: "mark.davis@hospital.com | +1-555-0502",
    status: "active"
  },
  {
    name: "Dr. Sophie Taylor",
    department: "Pediatrics",
    role: "Pediatric Neurologist",
    contactInfo: "sophie.taylor@hospital.com | +1-555-0503",
    status: "active"
  },

  // Psychiatry Department
  {
    name: "Dr. Benjamin Clark",
    department: "Psychiatry",
    role: "Chief of Psychiatry",
    contactInfo: "benjamin.clark@hospital.com | +1-555-0601",
    status: "active"
  },
  {
    name: "Dr. Helena Martinez",
    department: "Psychiatry",
    role: "Adult Psychiatrist",
    contactInfo: "helena.martinez@hospital.com | +1-555-0602",
    status: "active"
  },
  {
    name: "Dr. Thomas Anderson",
    department: "Psychiatry",
    role: "Child & Adolescent Psychiatrist",
    contactInfo: "thomas.anderson@hospital.com | +1-555-0603",
    status: "active"
  },

  // Radiology Department
  {
    name: "Dr. Catherine Brown",
    department: "Radiology",
    role: "Chief of Radiology",
    contactInfo: "catherine.brown@hospital.com | +1-555-0701",
    status: "active"
  },
  {
    name: "Dr. Paul Wilson",
    department: "Radiology",
    role: "Interventional Radiologist",
    contactInfo: "paul.wilson@hospital.com | +1-555-0702",
    status: "active"
  },
  {
    name: "Dr. Nicole Kim",
    department: "Radiology",
    role: "Diagnostic Radiologist",
    contactInfo: "nicole.kim@hospital.com | +1-555-0703",
    status: "active"
  },

  // Anesthesiology Department
  {
    name: "Dr. Christopher Moore",
    department: "Anesthesiology",
    role: "Chief of Anesthesiology",
    contactInfo: "christopher.moore@hospital.com | +1-555-0801",
    status: "active"
  },
  {
    name: "Dr. Amanda Foster",
    department: "Anesthesiology",
    role: "Cardiac Anesthesiologist",
    contactInfo: "amanda.foster@hospital.com | +1-555-0802",
    status: "active"
  },
  {
    name: "Dr. Ryan Miller",
    department: "Anesthesiology",
    role: "Pediatric Anesthesiologist",
    contactInfo: "ryan.miller@hospital.com | +1-555-0803",
    status: "active"
  },

  // Obstetrics & Gynecology Department
  {
    name: "Dr. Patricia Garcia",
    department: "Obstetrics & Gynecology",
    role: "Chief of OB/GYN",
    contactInfo: "patricia.garcia@hospital.com | +1-555-0901",
    status: "active"
  },
  {
    name: "Dr. Steven White",
    department: "Obstetrics & Gynecology",
    role: "Maternal-Fetal Medicine Specialist",
    contactInfo: "steven.white@hospital.com | +1-555-0902",
    status: "active"
  },
  {
    name: "Dr. Laura Jackson",
    department: "Obstetrics & Gynecology",
    role: "Gynecologic Oncologist",
    contactInfo: "laura.jackson@hospital.com | +1-555-0903",
    status: "active"
  },

  // Orthopedic Surgery Department
  {
    name: "Dr. Daniel Thompson",
    department: "Orthopedic Surgery",
    role: "Chief of Orthopedic Surgery",
    contactInfo: "daniel.thompson@hospital.com | +1-555-1001",
    status: "active"
  },
  {
    name: "Dr. Michelle Liu",
    department: "Orthopedic Surgery",
    role: "Spine Surgeon",
    contactInfo: "michelle.liu@hospital.com | +1-555-1002",
    status: "active"
  },
  {
    name: "Dr. Samuel Harris",
    department: "Orthopedic Surgery",
    role: "Sports Medicine Specialist",
    contactInfo: "samuel.harris@hospital.com | +1-555-1003",
    status: "active"
  },

  // Neurology Department
  {
    name: "Dr. Elizabeth Turner",
    department: "Neurology",
    role: "Chief of Neurology",
    contactInfo: "elizabeth.turner@hospital.com | +1-555-1101",
    status: "active"
  },
  {
    name: "Dr. Jonathan Parker",
    department: "Neurology",
    role: "Stroke Neurologist",
    contactInfo: "jonathan.parker@hospital.com | +1-555-1102",
    status: "active"
  },
  {
    name: "Dr. Melissa Roberts",
    department: "Neurology",
    role: "Epilepsy Specialist",
    contactInfo: "melissa.roberts@hospital.com | +1-555-1103",
    status: "active"
  },

  // Dermatology Department
  {
    name: "Dr. Gregory Adams",
    department: "Dermatology",
    role: "Chief of Dermatology",
    contactInfo: "gregory.adams@hospital.com | +1-555-1201",
    status: "active"
  },
  {
    name: "Dr. Stephanie Young",
    department: "Dermatology",
    role: "Dermatopathologist",
    contactInfo: "stephanie.young@hospital.com | +1-555-1202",
    status: "active"
  },
  {
    name: "Dr. Brian Scott",
    department: "Dermatology",
    role: "Pediatric Dermatologist",
    contactInfo: "brian.scott@hospital.com | +1-555-1203",
    status: "active"
  }
];

// Function to seed faculty data to MongoDB
export async function seedFaculty(): Promise<void> {
  try {
    // Clear existing faculty data (for development purposes)
    await FacultyModel.deleteMany({});
    
    // Insert new faculty data
    const insertedFaculty = await FacultyModel.insertMany(facultySeeds);
    
    console.log(`✅ Successfully seeded ${insertedFaculty.length} faculty members to MongoDB`);
    
    // Log summary by department
    const departmentCounts: Record<string, number> = {};
    facultySeeds.forEach(faculty => {
      departmentCounts[faculty.department] = (departmentCounts[faculty.department] || 0) + 1;
    });
    
    console.log('📊 Faculty distribution by department:');
    Object.entries(departmentCounts).forEach(([dept, count]) => {
      console.log(`   ${dept}: ${count} members`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding faculty data:', (error as Error).message);
    throw error;
  }
}

// Function to get faculty by department
export async function getFacultyByDepartment(department: string) {
  try {
    return await FacultyModel.find({ department, status: 'active' }).sort({ name: 1 });
  } catch (error) {
    console.error(`Error fetching faculty for department ${department}:`, (error as Error).message);
    return [];
  }
}

// Function to get all departments with faculty
export async function getAllDepartmentsWithFaculty() {
  try {
    const departments = await FacultyModel.distinct('department', { status: 'active' });
    return departments.sort();
  } catch (error) {
    console.error('Error fetching departments:', (error as Error).message);
    return [];
  }
}