import { z } from "zod";

export const ShippingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Full name must be at least 5 characters long")
    .max(50, "Full name must not exceed 50 characters")
    .describe("User's full name"),

  phone: z
    .string()
    .trim()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .describe("User's phone number"),
  email: z.string().email({ message: "Please enter valid email address" }),
  country: z
    .string()
    .nonempty("Country is required")
    .describe("User's country"),
  state: z.string().nonempty("State is required").describe("User's state"),
  city: z.string().nonempty("City is required").describe("User's city"),

  apartment: z.string().optional().describe("Optional apartment/unit number"),

  postal_code: z
    .string()
    .trim()
    .min(4, "ZIP code must be at least 4 characters")
    .max(10, "ZIP code must not exceed 10 characters")
    .regex(/^\d+$/, "ZIP code must contain only numbers")
    .describe("User's postal ZIP code"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must not exceed 100 characters")
    .describe("Street address"),

  address_type: z
    .enum(["Home", "Office"], {
      errorMap: () => ({ message: "Invalid address type" }),
    })
    .default("Home")
    .describe("Type of address (Home/Office)"),
});

export type TShippingFormSchema = z.infer<typeof ShippingFormSchema>;
