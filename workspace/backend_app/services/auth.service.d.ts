import type { RegisterUser, UserPayload } from "@corecount/dbprisma/schemas";
export declare class AuthService {
    static login(email: string, password: string): Promise<UserPayload>;
    static register(data: RegisterUser): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
        token: string;
    }>;
    static verify(token: string): Promise<UserPayload>;
}
//# sourceMappingURL=auth.service.d.ts.map