import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  username: z
    .string()
    .min(3, "Username must be at least 3 charecters")
    .max(63, "Username must be at less  than 63 charecters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or a number"
    )
    .refine(
      val => !val.includes("--"),
      "Username cannot contain consecutivve hyphens"
    )
    .transform(val => val.toLowerCase()),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
