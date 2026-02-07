import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  ReminderCreateArgsSchema,
  ReminderCreateInputSchema,
  ReminderDeleteArgsSchema,
  ReminderFindManyArgsSchema,
  ReminderUpdateArgsSchema,
  ReminderWhereUniqueInputSchema,
  ReminderWithPartialRelationsSchema,
} from "@corecount/dbprisma/zod";

import { userProcedure } from "../trpc";

export const remindersRouter = {
  list: userProcedure
    .input(ReminderFindManyArgsSchema)
    .output(ReminderWithPartialRelationsSchema.array())
    .query(({ input }) => prisma.reminder.findMany(input)),
  add: userProcedure.input(ReminderCreateArgsSchema).mutation(({ input }) => prisma.reminder.create(input)),
  remove: userProcedure.input(ReminderDeleteArgsSchema).mutation(({ input }) => prisma.reminder.delete(input)),
  byId: userProcedure
    .input(ReminderWhereUniqueInputSchema)
    .query(({ input }) => prisma.reminder.findUniqueOrThrow({ where: input })),
  edit: userProcedure.input(ReminderUpdateArgsSchema).mutation(({ input }) => prisma.reminder.update(input)),
} satisfies TRPCRouterRecord;
