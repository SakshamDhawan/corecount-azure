import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  CompletedProgrammeCreateInputSchema,
  CompletedProgrammeFindManyArgsSchema,
  CompletedProgrammeFindUniqueOrThrowArgsSchema,
  CompletedProgrammeUpdateArgsSchema,
  CompletedProgrammeWithPartialRelationsSchema,
} from "@corecount/dbprisma/zod";

import { userProcedure } from "../trpc";

export const completedProgrammeRouter = {
  list: userProcedure
    .input(CompletedProgrammeFindManyArgsSchema)
    .output(CompletedProgrammeWithPartialRelationsSchema.array())
    .query(({ input }) => {
      return prisma.completedProgramme.findMany({ ...input });
    }),
  add: userProcedure.input(CompletedProgrammeCreateInputSchema).mutation(({ input }) => {
    return prisma.completedProgramme.create({ data: input });
  }),
  edit: userProcedure.input(CompletedProgrammeUpdateArgsSchema).mutation(({ input }) => {
    return prisma.completedProgramme.update(input);
  }),
  byId: userProcedure.input(CompletedProgrammeFindUniqueOrThrowArgsSchema).query(({ input }) => {
    return prisma.completedProgramme.findUniqueOrThrow({ ...input });
  }),
} satisfies TRPCRouterRecord;
