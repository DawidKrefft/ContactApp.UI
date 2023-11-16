export interface UpdateContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  categoryName: string;
  subcategoryName?: string;
}
