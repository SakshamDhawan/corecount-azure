export declare const articlesRouter: {
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
//# sourceMappingURL=articles.d.ts.map