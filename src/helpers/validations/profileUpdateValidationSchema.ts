import * as z from "zod";

export const profileUpdateValidationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  availability: z.boolean(),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  division: z.string().min(1, "Division is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female"]),
  location: z.string().min(1, "Location is required"),
  name: z.string().min(1, "Name is required"),
  userProfile: z.object({
    age: z.number().min(0, "Age must be a positive number"),
    bio: z.string().min(1, "Bio is required"),
    lastDonationDate: z.string().optional(),
    phoneNumber: z.string().min(1, "Phone number is required"),
  }),
});
