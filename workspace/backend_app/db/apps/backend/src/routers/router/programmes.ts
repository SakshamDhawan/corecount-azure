import assert from "node:assert";
import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  ProgrammeCreateWithoutUserInputSchema,
  ProgrammeFindManyArgsSchema,
  ProgrammeFindUniqueOrThrowArgsSchema,
  ProgrammeWithPartialRelationsSchema,
} from "@corecount/dbprisma/zod";

import { userProcedure } from "../trpc";

export const programmeRouter = {
  list: userProcedure.input(ProgrammeFindManyArgsSchema).query(({ input }) => {
    return prisma.programme.findMany({ ...input, include: { workouts: true, user: true } });
  }),
  add: userProcedure.input(ProgrammeCreateWithoutUserInputSchema).mutation(({ ctx, input }) => {
    assert(ctx.user?.id);
    return prisma.programme.create({
      data: { ...input, userId: ctx.user.id },
    });
  }),
  byId: userProcedure
    .input(ProgrammeFindUniqueOrThrowArgsSchema)
    .output(ProgrammeWithPartialRelationsSchema)
    .query(({ input }) => prisma.programme.findUniqueOrThrow(input)),
} satisfies TRPCRouterRecord;
