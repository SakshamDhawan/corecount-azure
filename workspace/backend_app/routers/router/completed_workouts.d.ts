export declare const completedWorkoutsRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.CompletedWorkoutFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: import("@corecount/dbprisma/zod").CompletedWorkoutWithPartialRelations[];
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.CompletedWorkoutFindUniqueOrThrowArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: import("@corecount/dbprisma/zod").CompletedWorkoutWithPartialRelations;
    }>;
    add: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.CompletedWorkoutCreateInput;
        output: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            workoutId: string;
            points: number;
            duration: number;
            completedProgrammeId?: string | null | undefined;
        };
    }>;
};
//# sourceMappingURL=completed_workouts.d.ts.map