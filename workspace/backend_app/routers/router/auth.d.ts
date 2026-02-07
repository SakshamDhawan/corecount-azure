export declare const authRouter: {
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
//# sourceMappingURL=auth.d.ts.map