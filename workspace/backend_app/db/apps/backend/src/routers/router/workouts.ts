import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  WorkoutCreateArgsSchema,
  WorkoutCreateInputSchema,
  WorkoutDeleteArgsSchema,
  WorkoutFindManyArgsSchema,
  WorkoutUpdateArgsSchema,
  WorkoutWhereUniqueInputSchema,
  WorkoutWithPartialRelationsSchema,
} from "@corecount/dbprisma/zod";

import { adminProcedure, userProcedure } from "../trpc";

export const workoutsRouter = {
  list: userProcedure
    .input(WorkoutFindManyArgsSchema)
    .query(({ input }) => prisma.workout.findMany(input)),
  add: adminProcedure
    .input(WorkoutCreateArgsSchema)
    .mutation(({ input }) => prisma.workout.create(input)),
  remove: adminProcedure
    .input(WorkoutDeleteArgsSchema)
    .mutation(({ input }) => prisma.workout.delete(input)),
  byId: userProcedure
    .input(WorkoutWhereUniqueInputSchema)
    .output(WorkoutWithPartialRelationsSchema)
    .query(({ input }) => prisma.workout.findUniqueOrThrow({ where: input })),
  edit: adminProcedure.input(WorkoutUpdateArgsSchema).mutation(({ input }) => {
    return prisma.workout.update(input);
  }),
} satisfies TRPCRouterRecord;
