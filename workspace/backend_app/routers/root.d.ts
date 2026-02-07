export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
}, {
    auth: {
        login: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email: string;
                password: string;
            };
            output: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                };
                token: string;
            };
        }>;
        verify: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                };
                token: string;
            };
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email: string;
                password: string;
                passwordConfirm: string;
            };
            output: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: "USER" | "ADMIN";
                };
                token: string;
            };
        }>;
    };
    users: {
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
    workouts: {
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
    articles: {
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: import(".prisma/client").Prisma.ArticleWhereInput;
            output: {
                id: string;
                title: string;
                label: string;
                content: string;
                image: string | null;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>;
        add: import("@trpc/server").TRPCMutationProcedure<{
            input: import(".prisma/client").Prisma.ArticleCreateInput;
            output: {
                id: string;
                title: string;
                label: string;
                content: string;
                image: string | null;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        remove: import("@trpc/server").TRPCMutationProcedure<{
            input: import(".prisma/client").Prisma.ArticleDeleteArgs<import("@prisma/client/runtime/library").DefaultArgs>;
            output: {
                id: string;
                title: string;
                label: string;
                content: string;
                image: string | null;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        byId: import("@trpc/server").TRPCQueryProcedure<{
            input: import(".prisma/client").Prisma.ArticleWhereUniqueInput;
            output: {
                id: string;
                title: string;
                label: string;
                content: string;
                image: string | null;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        edit: import("@trpc/server").TRPCMutationProcedure<{
            input: import(".prisma/client").Prisma.ArticleUpdateArgs<import("@prisma/client/runtime/library").DefaultArgs>;
            output: {
                id: string;
                title: string;
                label: string;
                content: string;
                image: string | null;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
    };
    reminders: {
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
    programmes: {
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
    completedWorkouts: {
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
    completedProgrammes: {
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
}>;
export type AppRouter = typeof appRouter;
//# sourceMappingURL=root.d.ts.map