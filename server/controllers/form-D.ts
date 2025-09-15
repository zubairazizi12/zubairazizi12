import { Request, Response } from "express";
import ConferenceEvaluation from "../models/form-D";

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const newEvaluation = new ConferenceEvaluation(req.body);
    await newEvaluation.save();
    res.status(201).json({ message: "دیتا با موفقیت ذخیره شد ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ذخیره دیتا ❌" });
  }
};

export const getEvaluations = async (_req: Request, res: Response) => {
  try {
    const evaluations = await ConferenceEvaluation.find();
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: "خطا در گرفتن دیتا" });
  }
};
