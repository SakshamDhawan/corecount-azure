export declare const programmeRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.ProgrammeFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: ({
            user: {
                id: string;
                email: string;
                hash: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
                salt: string;
                createdAt: Date;
                updatedAt: Date;
            } | null;
            workouts: {
                programmeId: string;
                workoutId: string;
                order: number;
            }[];
        } & {
            id: string;
            name: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    add: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.ProgrammeCreateWithoutUserInput;
        output: {
            id: string;
            name: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.ProgrammeFindUniqueOrThrowArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: import("@corecount/dbprisma/zod").ProgrammeWithPartialRelations;
    }>;
};
//# sourceMappingURL=programmes.d.ts.map