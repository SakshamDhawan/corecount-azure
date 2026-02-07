import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import type { FrontendUser, UserPayload } from "@corecount/dbprisma/schemas";

import useTRPC, { api } from "../utils/api.tsx";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextType {
  user: FrontendUser | undefined;
  login: (username: string, password: string) => Promise<UserPayload | unknown>;
  logout: () => void;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setTRPCToken } = useTRPC();

  const verifyToken = api.auth.verify.useMutation();
  const [initialized, setInitialized] = useState(false);

  const [user, setUser] = useState<FrontendUser>();
  const [token, setToken, removeToken] = useLocalStorage<string>("token", "");

  useEffect(() => {
    if (token) {
      // Verify token
      verifyToken
        .mutateAsync(token)
        .then((res: UserPayload) => {
          setToken(res.token);
          setTRPCToken(res.token);
          setUser(res.user);
        })
        .catch(() => {
          console.log("JWT Expired");
          const callback = searchParams.get("callback") || location.pathname;
          navigate(`/login?callback=${encodeURIComponent(callback)}`);
          removeToken();
          setInitialized(true);
        })
        .finally(() => {
          setInitialized(true);

          if (location.pathname === "/login") {
            navigate(`/`);
          }
        });
    } else {
      setInitialized(true);
      navigate(`/login?callback=${encodeURIComponent(location.pathname)}`);
    }
  }, [token]);

  const loginMutation = api.auth.login.useMutation();

  async function login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      loginMutation
        .mutateAsync({ email, password })
        .then((res) => {
          setTRPCToken(res.token);
          setToken(res.token);
          setUser(res.user);
          resolve(res);
        })
        .catch(reject);
    });
  }

  function logout() {
    removeToken();
    setUser(undefined);
    navigate("/");
  }

  const memo = useMemo(
    () => ({
      user,
      login,
      logout,
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
