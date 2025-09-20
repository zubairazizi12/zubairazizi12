import { mongoose } from "../db"; // یا مسیر صحیح اتصال MongoDB شما

export interface Trainer extends mongoose.Document {
  name: string;
  lastName: string;
  parentType?: string;
  parentName?: string;
  gender?: string;
  province?: string;
  department?: string;
  specialty?: string;
  hospital?: string;
  joiningDate?: string;
  trainingYear?: string;
  supervisorName?: string;
  birthDate?: string;
  idNumber?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  email?: string;
  postNumberAndCode?: string;
  appointmentType?: string;
  status?: string;
}

const TrainerSchema = new mongoose.Schema<Trainer>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  parentType: String,
  parentName: String,
  gender: String,
  province: String,
  department: String,
  specialty: String,
  hospital: String,
  joiningDate: String,
  trainingYear: String,
  supervisorName: String,
  birthDate: String,
  idNumber: String,
  phoneNumber: String,
  whatsappNumber: String,
  email: String,
  postNumberAndCode: String,
  appointmentType: String,
  status: String,
});

export const Trainer = mongoose.model<Trainer>("Trainer", TrainerSchema);
