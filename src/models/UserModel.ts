import knex from "../config/database";
import { User } from "../types/userTypes";
// file for the database operations involving Users

// Custom error classes
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class UserModel {
  /**
   * Creates a new user in the database
   * @param user - Partial user object, containing user details
   * @returns The newly created user
   */
  static async createUser(user: Partial<User>): Promise<User> {
    // ensure sensitive details aren't returned
    const returnFields = [
      "id",
      "username",
      "email",
      "phoneNumber",
      "firstName",
      "lastName",
      "joinDate",
      "isSupplier",
    ];

    try {
      const [newUser] = await knex("users")
        .insert(user)
        .returning(returnFields);
      return newUser;
    } catch (error: any) {
      throw new DatabaseError("Unable to create new user", error);
    }
  }

  /**
   * Find a particular user, filtering by id
   * @param id - user's id (number)
   * @returns The user object if it exists, otherwise null
   */
  static async findById(id: number): Promise<User | null> {
    try {
      const user = await knex("users").where({ id }).first();
      return user || null;
    } catch (error: any) {
      throw new DatabaseError("Error fetching user by ID", error);
    }
  }

  /**
   * Find a particular user, filtering by their email
   * @param email - users email address, string
   * @returns The user object if it exists, otherwise null
   */
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await knex("users").where({ email }).first();
      return user || null;
    } catch (error: any) {
      throw new DatabaseError("Error fetching user by email", error);
    }
  }

  /**
   * Update information about a user, from their id
   * @param id - user's id, number
   * @param userUpdates - partial user object, containing details about what to update
   * @returns updatedUser if updates were successful, otherwise null.
   */
  static async updateUser(
    id: number,
    userUpdates: Partial<User>
  ): Promise<User | null> {
    // exclude fields that should not be updated
    const { id: _, ...updates } = userUpdates;

    // ensure sensitive fields are not returned
    const returnFields = [
      "id",
      "username",
      "email",
      "phoneNumber",
      "firstName",
      "lastName",
      "joinDate",
      "isSupplier",
    ];
    try {
      const [updatedUser] = await knex("users")
        .where({ id })
        .update(userUpdates)
        .returning(returnFields);
      return updatedUser || null;
    } catch (error: any) {
      throw new DatabaseError("Error updating user", error);
    }
  }

  /**
   *  Delete the user from the database
   * @param id - user's id, number
   * @returns returns true if the delete was successful
   */

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const rowsDeleted = await knex("users").where({ id }).del();
      return rowsDeleted > 0;
    } catch (error: any) {
      throw new DatabaseError("Error deleting the user", error);
    }
  }
}
