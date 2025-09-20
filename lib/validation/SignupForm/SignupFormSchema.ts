import { z } from "zod";

const phoneValidation = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
);

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const SignupFormSchema = z
  .object({
    first_name: z.string().min(1, { message: "Firstname is required" }),
    last_name: z.string().min(1, { message: "Lastname is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    username: z.string().min(5, { message: "Username is required" }),
    phone: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .regex(phoneValidation, { message: "Invalid Phone Number" }),
    password: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .regex(passwordValidation, {
        message:
          "Your password must contain uppercase, lowercase, number, and special characters",
      }),
    confirm_password: z.string().min(5, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // The error will be shown under confirm_password field
  });

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;
