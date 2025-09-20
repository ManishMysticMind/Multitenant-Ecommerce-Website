import * as z from "zod";
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export const ResetPasswordSchema = z.object({
    password: z
       .string()
       .min(1, { message: 'Must have at least 1 character' })
       .regex(passwordValidation, {
         message: 'Your password must contain uppercase, lowercase, number and special characters',
       }),
    confirm_password: z
           .string()
           .min(1, { message: 'Must have at least 1 character' })
           .regex(passwordValidation, {
             message: 'Your password must contain uppercase, lowercase, number and special characters',
           }),
});

export type TResetPassword = z.infer<typeof ResetPasswordSchema>;