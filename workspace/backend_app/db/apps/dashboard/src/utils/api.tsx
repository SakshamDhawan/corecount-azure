import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "@corecount/backend";

import { AuthProvider } from "../context/useAuth.tsx";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@corecount/backend";

interface SessionProps {
  setTRPCToken: (token: string) => void;
}

export const getBaseURL = () => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars,@typescript-eslint/no-unsafe-return
  return import.meta.env.VITE_BACKEND;
};

export function TRPCProvider(props: { children: React.ReactNode }) {
  const token = useRef<string>();

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseURL()}/trpc`,
          headers() {
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "expo-react");

            if (token.current) headers.set("x-access-token", `${token.current}`);
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  const setTRPCToken = (tokenin: string) => {
    token.current = tokenin;
  };

  const memo = useMemo(
    () => ({
      setTRPCToken,
    }),
    [],
  );

  return (
    <TRPCContext.Provider value={memo}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{props.children}</AuthProvider>
        </QueryClientProvider>
      </api.Provider>
    </TRPCContext.Provider>
  );
}

//@ts-ignore
export const TRPCContext = createContext<SessionProps>();

export default function useTRPC() {
  return useContext(TRPCContext);
}
