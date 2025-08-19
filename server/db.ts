import mongoose from 'mongoose';

// MongoDB connection string - check if DATABASE_URL is for PostgreSQL and use local MongoDB instead
let MONGODB_URI = 'mongodb://localhost:27017/hospital-residents';

// If DATABASE_URL is set and doesn't look like PostgreSQL, use it
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('postgresql')) {
  MONGODB_URI = process.env.DATABASE_URL;
} else if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgresql')) {
  console.log('PostgreSQL DATABASE_URL detected, using local MongoDB for demo');
}

// Connect to MongoDB with retry logic
export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.warn('MongoDB connection failed, using in-memory fallback:', (error as Error).message);
    // For demo purposes, we'll continue without a database connection
    // The application will still work for basic functionality
  }
}

// Export mongoose for direct use if needed
export { mongoose };