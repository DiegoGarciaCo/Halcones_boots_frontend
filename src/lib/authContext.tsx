// lib/auth/context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isChecking: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  userRole: "user" | "admin" | null;
}

interface userRoles {
  role: "user" | "admin";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);

  // Check auth status by hitting the backend
  const checkAuth = async () => {
    try {
      let response = await fetch(
        "http://localhost:8080/api/auth/validate-jwt",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        response = await fetch("http://localhost:8080/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
      }

      if (!response.ok) {
        setIsLoggedIn(false);
      } else {
        const data: userRoles = await response.json();
        setUserRole(data.role);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsChecking(false);
    }
  };

  const logout = async () => {
    await fetch(`http://localhost:8080/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setIsChecking(true);
  };

  // Initial auth check on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isChecking,
        setIsLoggedIn,
        checkAuth,
        logout,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
