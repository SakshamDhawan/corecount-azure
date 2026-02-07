import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { TRPCError } from "@trpc/server";
import superjson from "superjson";
export declare const createContext: ({ req }: CreateFastifyContextOptions) => {
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
};
export type Context = Awaited<ReturnType<typeof createContext>>;
export declare const t: {
    _config: import("@trpc/server/unstable-core-do-not-import").RootConfig<{
        ctx: {
            user: {
                id: string;
                email: string;
                name: string;
                role: "USER" | "ADMIN";
            } | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }>;
    procedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
        user: {
            id: string;
            email: string;
            name: string;
            role: "USER" | "ADMIN";
        } | null;
    }, object, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
    middleware: <$ContextOverrides>(fn: import("@trpc/server/unstable-core-do-not-import").MiddlewareFunction<{
        user: {
            id: string;
            email: string;
            name: string;
            role: "USER" | "ADMIN";
        } | null;
    }, object, object, $ContextOverrides, unknown>) => import("@trpc/server/unstable-core-do-not-import").MiddlewareBuilder<{
        user: {
            id: string;
            email: string;
            name: string;
            role: "USER" | "ADMIN";
        } | null;
    }, object, $ContextOverrides, unknown>;
    router: {
        <TInput extends import("@trpc/server").RouterRecord>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
            ctx: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                } | null;
            };
            meta: object;
            errorShape: undefined extends (opts: {
                error: TRPCError;
                type: import("@trpc/server").TRPCProcedureType | "unknown";
                path: string | undefined;
                input: unknown;
                ctx: {
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        role: "USER" | "ADMIN";
                    } | null;
                } | undefined;
                shape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
            }) => {
                data: {
                    zodError: import("zod").typeToFlattenedError<any, string> | null;
                    code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                    httpStatus: number;
                    path?: string;
                    stack?: string;
                };
                message: string;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
            } ? import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape : {
                data: {
                    zodError: import("zod").typeToFlattenedError<any, string> | null;
                    code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                    httpStatus: number;
                    path?: string;
                    stack?: string;
                };
                message: string;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
            };
            transformer: undefined extends typeof superjson ? false : true;
        }, TInput>;
        <TInput extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
            ctx: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                } | null;
            };
            meta: object;
            errorShape: undefined extends (opts: {
                error: TRPCError;
                type: import("@trpc/server").TRPCProcedureType | "unknown";
                path: string | undefined;
                input: unknown;
                ctx: {
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        role: "USER" | "ADMIN";
                    } | null;
                } | undefined;
                shape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
            }) => {
                data: {
                    zodError: import("zod").typeToFlattenedError<any, string> | null;
                    code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                    httpStatus: number;
                    path?: string;
                    stack?: string;
                };
                message: string;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
            } ? import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape : {
                data: {
                    zodError: import("zod").typeToFlattenedError<any, string> | null;
                    code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                    httpStatus: number;
                    path?: string;
                    stack?: string;
                };
                message: string;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
            };
            transformer: undefined extends typeof superjson ? false : true;
        }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput>>;
    };
    mergeRouters: typeof import("@trpc/server/unstable-core-do-not-import").mergeRouters;
    createCallerFactory: <TRecord extends import("@trpc/server").RouterRecord>(router: Pick<import("@trpc/server/unstable-core-do-not-import").Router<{
        ctx: {
            user: {
                id: string;
                email: string;
                name: string;
                role: "USER" | "ADMIN";
            } | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, TRecord>, "_def">) => import("@trpc/server/unstable-core-do-not-import").RouterCaller<{
        ctx: {
            user: {
                id: string;
                email: string;
                name: string;
                role: "USER" | "ADMIN";
            } | null;
        };
        meta: object;
        errorShape: undefined extends (opts: {
            error: TRPCError;
            type: import("@trpc/server").TRPCProcedureType | "unknown";
            path: string | undefined;
            input: unknown;
            ctx: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                } | null;
            } | undefined;
            shape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        }) => {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        } ? import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape : {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        };
        transformer: undefined extends typeof superjson ? false : true;
    }, TRecord>;
};
export declare const middleware: <$ContextOverrides>(fn: import("@trpc/server/unstable-core-do-not-import").MiddlewareFunction<{
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
}, object, object, $ContextOverrides, unknown>) => import("@trpc/server/unstable-core-do-not-import").MiddlewareBuilder<{
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
}, object, $ContextOverrides, unknown>;
export declare const publicProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
}, object, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
export declare const userProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
}, object, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    };
}, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
export declare const adminProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    } | null;
}, object, {
    user: {
        id: string;
        email: string;
        name: string;
        role: "USER" | "ADMIN";
    };
}, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
//# sourceMappingURL=trpc.d.ts.map