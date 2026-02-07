import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  UserFindManyArgsSchema,
  UserFindUniqueArgsSchema,
  UserFindUniqueOrThrowArgsSchema,
  UserSchema,
  UserUpdateArgsSchema,
} from "@corecount/dbprisma/zod";

import { adminProcedure, userProcedure } from "../trpc";
import { DateTime } from "luxon";

export const usersRouter = {
  list: adminProcedure
    .input(UserFindManyArgsSchema)
    .query(({ input }) => prisma.user.findMany(input)),
  purge: adminProcedure
    .input(UserFindUniqueOrThrowArgsSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUniqueOrThrow(input);
      console.log(`Purging user ${user.name}`);

      await prisma.completedWorkout.deleteMany({ where: { userId: user.id } });
      await prisma.completedProgramme.deleteMany({
        where: { userId: user.id },
      });

      return user;
    }),
  byId: adminProcedure
    .input(UserFindUniqueArgsSchema)
    .output(UserSchema)
    .query(({ input }) => prisma.user.findUniqueOrThrow(input)),
  edit: adminProcedure
    .input(UserUpdateArgsSchema)
    .mutation(({ input }) => prisma.user.update(input)),
  getBadges: userProcedure.query(async ({ ctx, input }) => {
    const programmes = await prisma.completedProgramme.findMany({
      where: { userId: ctx.user?.id ?? null, completed: true },
      orderBy: [{ createdAt: "asc" }],
    });

    if (!programmes[0])
      return {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
      };

    const firstWeek = DateTime.fromJSDate(programmes[0].createdAt).weekNumber;
    const weekNumbers = Array.from(
      { length: 8 },
      (_, i) => (firstWeek + i) % 52,
    );

    return programmes.reduce(
      (acc, programme) => {
        const weekNumber = DateTime.fromJSDate(programme.createdAt).weekNumber;
        if (weekNumbers.includes(weekNumber)) {
          acc[weekNumber.toString()] = (acc[weekNumber.toString()] || 0) + 1;
        } else {
          //console.log("Week number not in range");
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }),
} satisfies TRPCRouterRecord;
