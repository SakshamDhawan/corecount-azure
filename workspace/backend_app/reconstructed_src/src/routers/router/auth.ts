import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { registerSchema, UserPayloadSchema } from "@corecount/dbprisma/schemas";

import { AuthService } from "~/services/auth.service";
import { publicProcedure } from "../trpc";

export const authRouter = {
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .output(UserPayloadSchema)
    .mutation(({ input }) => AuthService.login(input.email, input.password)),
  verify: publicProcedure
    .input(z.string())
    .output(UserPayloadSchema)
    .mutation(({ input }) => AuthService.verify(input)),
  register: publicProcedure
    .input(registerSchema)
    .output(UserPayloadSchema)
    .mutation(({ input }) => AuthService.register(input)),
} satisfies TRPCRouterRecord;
