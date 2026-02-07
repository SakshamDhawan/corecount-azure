import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      // eslint-disable-next-line no-restricted-properties
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
// eslint-disable-next-line no-restricted-properties
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
