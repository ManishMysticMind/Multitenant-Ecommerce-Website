import * as z from "zod";

export const ForgetPasswordSchema = z.object({
    email:z.string().email({ message: "Please enter valid email address" })
});

export type TForgetPassword = z.infer<typeof ForgetPasswordSchema>;