import mongoose, { Schema, Document } from "mongoose";

export interface IConferenceEvaluation extends Document {
  year: string;
  name: string;
  fatherName: string;
  department: string;
  trainingYear: string;
  conferenceTitle: string;
  score: string;
  date: string;
  teacherName: string;
  teacherSigned: boolean;
  notes: boolean;
  departmentHead: string;
  programHead: string;
  hospitalHead: string;
}

const ConferenceEvaluationSchema: Schema = new Schema({
  year: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  department: { type: String, required: true },
  trainingYear: { type: String, required: true },
  conferenceTitle: { type: String, required: true },
  score: { type: String, required: true },
  date: { type: String, required: true },
  teacherName: { type: String, required: true },
  teacherSigned: { type: Boolean, default: false },
  notes: { type: Boolean, default: false },
  departmentHead: { type: String, required: true },
  programHead: { type: String, required: true },
  hospitalHead: { type: String, required: true },
});

export default mongoose.model<IConferenceEvaluation>(
  "ConferenceEvaluation",
  ConferenceEvaluationSchema
);
