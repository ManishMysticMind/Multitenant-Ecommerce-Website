import * as z from "zod";

export const VerifyOTPSchema = z.object({
  num_1: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
  num_2: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
  num_3: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
  num_4: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
  num_5: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
  num_6: z
    .string()
    .regex(/^[0-9]$/, { message: "Please enter a number" }),
});

export type TVerifyOTP = z.infer<typeof VerifyOTPSchema>;
