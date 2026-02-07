import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";

import type { FrontendUser } from "@corecount/dbprisma/schemas";

import { secret } from "~/lib/secrets";

export const createContext = ({ req }: CreateFastifyContextOptions) => {
  function getUserFromHeader() {
    const token = req.headers["x-access-token"] as string | undefined;
    if (token && token !== "" && token !== "undefined") {
      return jwt.verify(token, secret) as FrontendUser;
    } else {
      return null;
    }
  }

  const user = getUserFromHeader();

  return {
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === "BAD_REQUEST" && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const middleware = t.middleware;

const isAuthed = t.middleware((opts) => {
  const user = opts.ctx.user;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
});

const isAdmin = t.middleware((opts) => {
  const user = opts.ctx.user;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const publicProcedure = t.procedure;
export const userProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
