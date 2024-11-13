export interface User {
  id: number;
  username: string;
  hashedPassword: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  joinDate: Date;
  isSupplier: boolean;
}
