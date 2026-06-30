import { z } from "zod";
export const password = z.string().min(8, "Минимум 8 символов").regex(/[A-ZА-Я]/, "Нужна заглавная буква").regex(/[0-9]/, "Нужна цифра");
export const registerSchema = z.object({
  firstName: z.string().min(2), email: z.string().email(), password,
  role: z.enum(["CLIENT", "MASTER", "SALON_OWNER"]).default("CLIENT")
});
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
