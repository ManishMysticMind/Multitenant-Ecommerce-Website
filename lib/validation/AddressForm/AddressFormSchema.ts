import { z } from "zod";

export const AddressFormSchema = z.object({
  name: z.string().describe("User's name"),

  email: z.string().email("Invalid email format").describe("User's email"),

  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .regex(
      /^98\d{8}$/,
      "Phone number must start with 98 and be exactly 10 digits",
    )
    .describe("User's phone number"),

  country: z
    .string()
    .nonempty("Country is required")
    .describe("User's country"),

  state: z.string().nonempty("State is required").describe("User's state"),

  city: z.string().nonempty("City is required").describe("User's city"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must not exceed 100 characters")
    .describe("Street address"),

  postal_code: z
    .string()
    .trim()
    .regex(/^\d+$/, "ZIP code must contain only numbers")
    .min(4, "ZIP code must be at least 4 characters")
    .max(10, "ZIP code must not exceed 10 characters")
    .describe("User's postal ZIP code"),
});

export type TAddressFormSchema = z.infer<typeof AddressFormSchema>;
