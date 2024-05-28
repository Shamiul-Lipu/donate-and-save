import * as z from "zod";

export const passwordChangeValidationSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    rewriteNewPassword: z
      .string()
      .min(6, "Rewrite new password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.rewriteNewPassword, {
    message: "New password and rewrite new password must match",
    path: ["rewriteNewPassword"],
  });
