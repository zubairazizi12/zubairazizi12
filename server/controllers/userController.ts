import { Request, Response } from 'express';
import { UserModel } from '../models';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find().sort({ createdAt: -1 });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }

  static async getCurrentUser(req: any, res: Response) {
    try {
      const userId = req.user.claims.sub;
      const user = await UserModel.findById(userId);
      if (user) {
        res.json({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}