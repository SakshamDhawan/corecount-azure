import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  CompletedWorkoutCreateInputSchema,
  CompletedWorkoutFindManyArgsSchema,
  CompletedWorkoutFindUniqueOrThrowArgsSchema,
  CompletedWorkoutSchema,
  CompletedWorkoutWithPartialRelationsSchema,
} from "@corecount/dbprisma/zod";

import { userProcedure } from "../trpc";

export const completedWorkoutsRouter = {
  list: userProcedure
    .input(CompletedWorkoutFindManyArgsSchema)
    .output(CompletedWorkoutWithPartialRelationsSchema.array())
    .query(({ input }) => prisma.completedWorkout.findMany(input)),
  byId: userProcedure
    .input(CompletedWorkoutFindUniqueOrThrowArgsSchema)
    .output(CompletedWorkoutWithPartialRelationsSchema)
    .query(({ input }) => prisma.completedWorkout.findUniqueOrThrow(input)),
  add: userProcedure
    .input(CompletedWorkoutCreateInputSchema)
    .output(CompletedWorkoutSchema)
    .mutation(({ input }) => prisma.completedWorkout.create({ data: input })),
} satisfies TRPCRouterRecord;
