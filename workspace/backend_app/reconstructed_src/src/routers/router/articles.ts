import type { TRPCRouterRecord } from "@trpc/server";

import { prisma } from "@corecount/dbprisma";
import {
  ArticleCreateInputSchema,
  ArticleDeleteArgsSchema,
  ArticleUpdateArgsSchema,
  ArticleWhereInputSchema,
  ArticleWhereUniqueInputSchema,
} from "@corecount/dbprisma/zod";

import { adminProcedure, userProcedure } from "../trpc";

export const articlesRouter = {
  list: userProcedure.input(ArticleWhereInputSchema).query(({ input }) => {
    return prisma.article.findMany({ where: input });
  }),
  add: adminProcedure.input(ArticleCreateInputSchema).mutation(({ input }) => {
    return prisma.article.create({ data: input });
  }),
  remove: adminProcedure.input(ArticleDeleteArgsSchema).mutation(({ input }) => {
    return prisma.article.delete(input);
  }),
  byId: userProcedure.input(ArticleWhereUniqueInputSchema).query(({ input }) => {
    return prisma.article.findUniqueOrThrow({ where: input });
  }),
  edit: adminProcedure.input(ArticleUpdateArgsSchema).mutation(({ input }) => {
    return prisma.article.update(input);
  }),
} satisfies TRPCRouterRecord;
