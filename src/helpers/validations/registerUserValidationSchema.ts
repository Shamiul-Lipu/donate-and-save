import { isLastDonationDateValid } from "@/utils/isLastDonationDateValid";
import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  location: z.string().min(1, "location is required"),
  division: z.string().min(1, "Division is required"),
  age: z
    .number()
    .int()
    .positive("Age must be a positive number")
    .min(15, "You must be at least 15 years old")
    .max(100, "You cannot be older than 100 years old"),
  address: z.string().min(1, "Address details is required"),
  bio: z.string().min(1, "Bio is required"),
  availability: z.boolean().default(false),
  lastDonationDate: z
    .string()
    .min(1, "Last donation date is required")
    .refine(isLastDonationDateValid, "Last donation date must be before today"),
});
