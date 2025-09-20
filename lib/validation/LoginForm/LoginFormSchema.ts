import { z } from "zod";
export const LoginFormSchema = z.object({
  username: z.string().min(5,{ message: "Invalid username" }),
   password: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })
});
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;