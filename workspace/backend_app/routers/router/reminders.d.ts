export declare const remindersRouter: {
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.ReminderFindManyArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: import("@corecount/dbprisma/zod").ReminderWithPartialRelations[];
    }>;
    add: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.ReminderCreateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            workoutId: string | null;
            programmeId: string | null;
            userId: string;
            hour: number;
            minute: number;
            days: import(".prisma/client").$Enums.ReminderDay[];
        };
    }>;
    remove: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.ReminderDeleteArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            workoutId: string | null;
            programmeId: string | null;
            userId: string;
            hour: number;
            minute: number;
            days: import(".prisma/client").$Enums.ReminderDay[];
        };
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: import(".prisma/client").Prisma.ReminderWhereUniqueInput;
        output: {
            id: string;
            workoutId: string | null;
            programmeId: string | null;
            userId: string;
            hour: number;
            minute: number;
            days: import(".prisma/client").$Enums.ReminderDay[];
        };
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: import(".prisma/client").Prisma.ReminderUpdateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
        output: {
            id: string;
            workoutId: string | null;
            programmeId: string | null;
            userId: string;
            hour: number;
            minute: number;
            days: import(".prisma/client").$Enums.ReminderDay[];
        };
    }>;
};
//# sourceMappingURL=reminders.d.ts.map