import crypto from "crypto";
import assert from "node:assert";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

import type { JWTPayload, RegisterUser, UserPayload } from "@corecount/dbprisma/schemas";
import { prisma } from "@corecount/dbprisma";
import { pbkdf2Hash } from "@corecount/dbprisma/utils";

import logger from "~/lib/logger";
import { secret } from "~/lib/secrets";

export class AuthService {
  static async login(email: string, password: string): Promise<UserPayload> {
    const credentials = { email, password };

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (user === null) throw new Error("No valid credentials");

    // Try PBKDF2
    logger.info("Logging in with pbkdf2");
    const hash = await pbkdf2Hash(credentials.password, user.salt);

    const userPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    if (hash === user.hash) {
      const token = jwt.sign(userPayload, secret, {
        expiresIn: 86400, // 24 hours
      });
      logger.info(`User ${credentials.email} logged in successfully`);
      return {
        user: userPayload,
        token,
      };
    }
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  static async register(data: RegisterUser) {
    const salt = crypto.randomBytes(16).toString("hex");

    const hash = await pbkdf2Hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.email,
        email: data.email,
        role: "USER",
        hash,
        salt,
      },
    });

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userPayload, secret, {
      expiresIn: 86400, // 24 hours
    });
    return {
      user: userPayload,
      token,
    };
  }

  static async verify(token: string): Promise<UserPayload> {
    return new Promise((resolve, reject) => {
      //@ts-ignore
      jwt.verify(token, secret, { complete: false }, async (err, decoded: JWTPayload) => {
        if (err) {
          reject(
            new TRPCError({
              code: "PARSE_ERROR",
              message: err.message,
              cause: err,
            }),
          );
        }
        const user = await prisma.user.findUniqueOrThrow({
          where: { id: decoded.id },
        });

        const userPayload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        const token = jwt.sign(userPayload, secret, {
          expiresIn: 86400, // 24 hours
        });
        resolve({
          user: userPayload,
          token,
        });

        return;
      });
    });
  }
}
