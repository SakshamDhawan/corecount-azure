import "./instrument";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./routers/root";
import { appRouter } from "./routers/root";
import { createContext } from "./routers/trpc";
type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;
export { createContext, appRouter };
export type { AppRouter, RouterInputs, RouterOutputs };
//# sourceMappingURL=index.d.ts.map