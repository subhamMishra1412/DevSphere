import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "@/services/authService";

const AuthContext = createContext();

function isTokenValid(token) {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const stored = localStorage.getItem("token");

      if (isTokenValid(stored)) {
        setToken(stored);
        try {
          const me = await authService.getMe();
          setUser(me);
        } catch {
          localStorage.removeItem("token");
          setToken(null);
        }
      } else {
        localStorage.removeItem("token");
      }

      setIsInitializing(false);
    }

    bootstrap();
  }, []);

  async function login(email, password) {
    const data = await authService.login({ email, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);

    const me = await authService.getMe();
    setUser(me);

    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        isInitializing,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}