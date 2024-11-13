import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { DatabaseError } from "../models/UserModel";
import argon2 from "argon2";
import { UserValidator } from "../utilities/userValidation";

export class UserController {
  // create a new user
  static async createUser(req: Request, res: Response) {
    // validate the input given to our endpoint
    // const validationError = validateUser(req.body);
    const validator = new UserValidator(req.body, "create");
    const validationError = validator.validate();
    if (validationError) {
      //   console.log(req.body);
      // console.log(validationError);
      return res.status(400).json({ error: validationError });
    }

    // if the input passes the validation check, continue to create the user
    try {
      // const { username, email, password, phoneNumber, firstName, lastName, isSupplier } = req.body;
      const user = await UserModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      // const user = await UserModel.findById(Number(req.params.id));
      const userId = Number(req.params.id);
      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(400).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      // res.status(500).json({ error: "Failed to retrieve user" });
      if (error instanceof DatabaseError) {
        console.error(error.originalError);
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserByEmail(req: Request, res: Response) {
    try {
      const userEmail = req.params.email;
      const user = await UserModel.findByEmail(userEmail);

      if (!user) {
        res.status(400).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.error(error.originalError);
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const validator = new UserValidator(req.body, "update");
    const validationError = validator.validate();

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    try {
      const updatedUser = await UserModel.updateUser(userId, req.body);

      if (!updatedUser) {
        return res.status(400).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}
