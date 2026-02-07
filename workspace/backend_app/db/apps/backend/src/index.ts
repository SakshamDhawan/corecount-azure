import "./instrument";

import fs from "fs";
import { pipeline } from "node:stream";
import util from "node:util";
import path from "path";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import corsF from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import staticFiles from "@fastify/static";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import dotenv from "dotenv";
import fastify from "fastify";

import type { AppRouter } from "./routers/root";
import { appRouter } from "./routers/root";
import { createContext } from "./routers/trpc";

dotenv.config();

const pump = util.promisify(pipeline);

const server = fastify({
  maxParamLength: 5000,
});
server.register(corsF, {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  // headers: '*',
  preflightContinue: false,
  optionsSuccessStatus: 200,
});
server.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 100 * 1000 * 1000, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
    parts: 1000, // For multipart forms, the max number of parts (fields + files)
  },
});
server.post("/upload", async (req, reply) => {
  const data = await req.file();
  console.log(data);
  if (data) {
    const filePath = path.join("uploads", data.filename);
    pump(data.file, fs.createWriteStream(filePath))
      .then((res) => {
        console.log(res);
        reply.send();
      })
      .catch((err) => {
        console.error(err);
        reply.status(500).send();
      });
  } else {
    reply.status(500).send();
  }
});

const currentPath = process.cwd();
server.register(staticFiles, {
  root: path.join(currentPath, "uploads"),
  prefix: "/uploads/", // optional: default '/'
  constraints: {}, // optional: default {}
  index: false,
  list: true,
});

server.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error);
  // Send error response
  reply.status(409).send({ ok: false });
});

const getFiles = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir("uploads", (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

server.get("/files", async (req, reply) => {
  const files = await getFiles();
  reply.send({ files });
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  logLevel: "trace",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});
void (async () => {
  try {
    await server.listen({ port: 3003, host: "::" });
    console.info("Fastify started on port 3003");
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
})();

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createContext, appRouter };
export type { AppRouter, RouterInputs, RouterOutputs };
