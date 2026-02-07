export declare const completedProgrammeRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.CompletedProgrammeFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: import("@corecount/dbprisma/zod").CompletedProgrammeWithPartialRelations[];
    }>;
    add: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.CompletedProgrammeCreateInput;
        output: {
            id: string;
            programmeId: string;
            userId: string;
            completed: boolean;
            strength: number;
            reps: number;
            rating: number;
            comments: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.CompletedProgrammeUpdateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            programmeId: string;
            userId: string;
            completed: boolean;
            strength: number;
            reps: number;
            rating: number;
            comments: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.CompletedProgrammeFindUniqueOrThrowArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            programmeId: string;
            userId: string;
            completed: boolean;
            strength: number;
            reps: number;
            rating: number;
            comments: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
};
//# sourceMappingURL=completed_programmes.d.ts.map