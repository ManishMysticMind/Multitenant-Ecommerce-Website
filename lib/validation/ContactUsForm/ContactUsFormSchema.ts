import { z } from "zod";

export const ContactUsFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Full name must be at least 5 characters long")
    .max(50, "Full name must not exceed 50 characters")
    .describe("User's full name"),

  phone_number: z
    .string()
    .trim()
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .length(10, "Phone number must be exactly 10 digits")
    .describe("User's phone number"),

  email: z.string().email({ message: "Please enter valid email address" }),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must not exceed 1000 characters")
    .describe("User's message"),
});

export type TContactUsFormSchema = z.infer<typeof ContactUsFormSchema>;
