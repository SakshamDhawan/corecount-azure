import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import * as Sentry from "@sentry/react-native";

import type {
  FrontendUser,
  RegisterUser,
  UserPayload,
} from "@corecount/dbprisma/schemas";

import { api } from "~/context/useTRPC";
import { deleteToken, getToken, setToken } from "~/utils/sessionStore";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextType {
  user: FrontendUser | undefined;
  register: (data: RegisterUser) => Promise<UserPayload>;
  login: (username: string, password: string) => Promise<UserPayload>;
  logout: () => void;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const verifyToken = api.auth.verify.useMutation();
  const registerMutation = api.auth.register.useMutation();
  const loginMutation = api.auth.login.useMutation();

  const [initialized, setInitialized] = useState(false);

  const [user, setUser] = useState<FrontendUser | undefined>();

  useEffect(() => {
    const token = getToken();
    if (token) {
      verifyToken
        .mutateAsync(token)
        .then((res: UserPayload) => {
          setToken(res.token);
          setUser(res.user);
        })
        .catch(() => {
          setInitialized(true);
        })
        .finally(() => {
          console.log("BWAAA");

          setInitialized(true);
        });
    } else {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      Sentry.setUser(user);
    }
  }, [user]);

  async function register(data: RegisterUser) {
    return new Promise((resolve, reject) => {
      registerMutation
        .mutateAsync(data)
        .then((res: UserPayload) => {
          setToken(res.token);
          setUser(res.user);
          resolve(res);
        })
        .catch(reject);
    });
  }

  async function login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      loginMutation
        .mutateAsync({ email, password })
        .then((res: UserPayload) => {
          setToken(res.token);
          setUser(res.user);
          resolve(res);
        })
        .catch(reject);
    });
  }

  function logout() {
    setUser(undefined);
    void deleteToken();
    router.replace("/");
  }

  const memo = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={memo}>
      {initialized && <>{children}</>}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
