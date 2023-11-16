export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  categoryId: string;
  subcategoryId?: string;
}
