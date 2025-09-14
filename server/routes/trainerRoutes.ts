import express from 'express';
import { Trainer } from '../models/Trainers';
import { z } from 'zod';
import { isDemoAuthenticated } from '../demoAuth';

const router = express.Router();

// Validation schema
const createTrainerSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  parentType: z.string().optional(),
  parentName: z.string().optional(),
  gender: z.string(),
  province: z.string(),
  department: z.string(),
  specialty: z.string(),
  hospital: z.string().optional(),
  joiningDate: z.string(),
  trainingYear: z.string().optional(),
  supervisorName: z.string().optional(),
  birthDate: z.string(),
  idNumber: z.string(),
  phoneNumber: z.string(),
  whatsappNumber: z.string().optional(),
  email: z.string().email(),
  postNumberAndCode: z.string().optional(),
  appointmentType: z.string().optional(),
  status: z.string().optional(),
});

// 👆 Create trainer
router.post('/', isDemoAuthenticated, async (req, res) => {
  try {
    const validatedData = createTrainerSchema.parse(req.body);
    const trainer = new Trainer(validatedData);
    const savedTrainer = await trainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error creating trainer:', error);
    res.status(500).json({ message: 'Failed to create trainer' });
  }
});

// 👆 Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find().lean();
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ message: 'Failed to fetch trainers' });
  }
});

export { router as trainerRoutes };
