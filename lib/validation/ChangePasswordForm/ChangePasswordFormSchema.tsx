import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password1: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .max(20, "New password must be at most 20 characters long")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~.!@#$%^&*])[a-zA-Z\d~.!@#$%^&*]*$/,
        "New password must contain letters, numbers, and one of the allowed special characters (~.!@#$%^&*)",
      ),
    new_password2: z.string().min(1, "Confirm new password is required"),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "New passwords don't match",
    path: ["new_password2"], // path of error
  });

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
