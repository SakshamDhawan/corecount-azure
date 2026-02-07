export declare const usersRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.UserFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            email: string;
            hash: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            salt: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    purge: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.UserFindUniqueOrThrowArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            email: string;
            hash: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            salt: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.UserFindUniqueArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            email: string;
            hash: string;
            name: string;
            role: "USER" | "ADMIN";
            salt: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.UserUpdateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            email: string;
            hash: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            salt: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getBadges: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: Record<string, number>;
    }>;
};
//# sourceMappingURL=users.d.ts.map