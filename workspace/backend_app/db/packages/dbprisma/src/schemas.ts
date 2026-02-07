import { z } from "zod";

import { RoleSchema } from "./generated";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().trim().min(8, "Must be at least 8 characters").trim(),
    passwordConfirm: z
      .string()
      .trim()
      .min(8, "Must be at least 8 characters")
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterUser = z.infer<typeof registerSchema>;

export const JWTPayloadSchema = z.object({
  id: z.string(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export const FrontendUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
});

export type FrontendUser = z.infer<typeof FrontendUserSchema>;

export const UserPayloadSchema = z.object({
  user: FrontendUserSchema.required(),
  token: z.string(),
});

export type UserPayload = z.infer<typeof UserPayloadSchema>;

export const editUserSchema = z.object({
  name: z.string(),
});

export type EditUser = z.infer<typeof editUserSchema>;

export const ProgrammeFeedbackSchema = z.object({
  rating: z.number(),
  comments: z.string().optional(),
});

export type ProgrammeFeedbackType = z.infer<typeof ProgrammeFeedbackSchema>;
