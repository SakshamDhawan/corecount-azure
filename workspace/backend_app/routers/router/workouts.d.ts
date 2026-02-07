export declare const workoutsRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.WorkoutFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            title: string;
            description: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            hold_1: number;
            hold_2: number;
            hold_3: number;
            content: string;
            video: string | null;
            level: import(".prisma/client").$Enums.WorkoutLevel;
            sensors: import(".prisma/client").$Enums.Sensors[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    add: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.WorkoutCreateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            title: string;
            description: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            hold_1: number;
            hold_2: number;
            hold_3: number;
            content: string;
            video: string | null;
            level: import(".prisma/client").$Enums.WorkoutLevel;
            sensors: import(".prisma/client").$Enums.Sensors[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.WorkoutDeleteArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            title: string;
            description: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            hold_1: number;
            hold_2: number;
            hold_3: number;
            content: string;
            video: string | null;
            level: import(".prisma/client").$Enums.WorkoutLevel;
            sensors: import(".prisma/client").$Enums.Sensors[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.WorkoutWhereUniqueInput;
        output: import("@corecount/dbprisma/zod").WorkoutWithPartialRelations;
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.WorkoutUpdateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            title: string;
            description: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            hold_1: number;
            hold_2: number;
            hold_3: number;
            content: string;
            video: string | null;
            level: import(".prisma/client").$Enums.WorkoutLevel;
            sensors: import(".prisma/client").$Enums.Sensors[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
};
//# sourceMappingURL=workouts.d.ts.map