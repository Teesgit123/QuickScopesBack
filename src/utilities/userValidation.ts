/*
    List of validation rules for the user object
    1, username must be a string
    2, username must be between 8 and 20 characters long
    3, username must contain letters, numbers, or underscores
    4, the hashedpassword must be at least 12 characters long
    5, the email must be in the correct format
    6, the phone number must be formatted correctly
    7, the first name and last name must be a believable length
    8, the full name must have only letters
    9, the date must be in the proper format
    10, the date must not be in the future
    11, the isSupplier input must be a boolean value
*/

/*
  Potential For improvements
    1 - DRY principle... 
          Create a helper function to reduce reduncancy of checking if a field is undefined and handling isUpdate

    2 - Consistency of handling errors...
          All errors could start with the field name, this gives a more consistent tone and structure

  */

import { User } from "../types/userTypes";

// Define the ValidationFunction type
type ValidationFunction = (value: any) => string | null;

// Helper validation functions
const isRequiredWhenCreating =
  (operationType: string): ValidationFunction =>
  (value) =>
    operationType === "create" && (value === undefined || value === null)
      ? "Field is required"
      : null;

const isString: ValidationFunction = (value) =>
  typeof value !== "string" ? "Field must be a string" : null;

const minLength =
  (min: number): ValidationFunction =>
  (value) =>
    typeof value === "string" && value.length < min
      ? `Field must be at least ${min} characters long`
      : null;

const maxLength =
  (max: number): ValidationFunction =>
  (value) =>
    typeof value === "string" && value.length > max
      ? `Field must be no longer than ${max} characters`
      : null;

const matchesPattern =
  (pattern: RegExp, message: string): ValidationFunction =>
  (value) =>
    typeof value === "string" && !pattern.test(value) ? message : null;

// Utility function to combine multiple validators
const combineValidators =
  (...validators: ValidationFunction[]): ValidationFunction =>
  (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };

// UserValidator Class
export class UserValidator {
  private userData: Partial<User>;
  private errors: string[] = [];
  private operationType: "create" | "update" | "read" | "delete";
  private rules: { [key in keyof User]?: ValidationFunction };

  constructor(
    userData: Partial<User>,
    operationType: "create" | "update" | "read" | "delete"
  ) {
    this.userData = userData;
    this.operationType = operationType;
    this.rules = this.initializeRules();
  }

  // Initialize the rules after operationType is set
  private initializeRules(): { [key in keyof User]?: ValidationFunction } {
    return {
      username: combineValidators(
        isRequiredWhenCreating(this.operationType),
        isString,
        minLength(8),
        maxLength(20),
        matchesPattern(
          /^[a-zA-Z0-9_]+$/,
          "Username must contain letters, numbers, or underscores"
        )
      ),
      email: combineValidators(
        isRequiredWhenCreating(this.operationType),
        isString,
        matchesPattern(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Email must be a valid email address"
        )
      ),
      hashedPassword: combineValidators(
        isRequiredWhenCreating(this.operationType),
        isString,
        minLength(6),
        maxLength(100)
      ),
      
      // Add other fields similarly...
    };
  }

  public validate(): string | null {
    this.errors = [];

    for (const [field, rule] of Object.entries(this.rules)) {
      const value = this.userData[field as keyof User];
      if (rule) {
        const error = rule(value);
        if (error) this.errors.push(`${field}: ${error}`);
      }
    }

    return this.errors.length ? this.errors.join("; ") : null;
  }
}

