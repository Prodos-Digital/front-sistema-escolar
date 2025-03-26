import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .trim()
      .regex(/^[A-Za-z]+$/, "O nome deve conter apenas letras")
      .refine((value) => value.trim().length > 0, {
        message: "O nome não pode ser somente espaços",
      }),
    last_name: z.string().min(1, "O sobrenome é obrigatório"),
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/\d/, "A senha deve conter pelo menos um número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });
