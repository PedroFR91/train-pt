// src/contexts/auth-context.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Configura base URL de la API
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Define el tipo User con el campo role
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "client" | "trainer" | "admin";
  bio: string;
  specialization: string;
  facebook: string;
  instagram: string;
  twitter: string;
  picture: string;
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login(email: string): Promise<void>;
  register(data: RegisterData): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
  logout(): Promise<void>;
  clearError(): void;
  updateUser(data: Partial<User>): Promise<void>;
  isTrainer(): boolean;
  isClient(): boolean;
  isAdmin(): boolean;
}

type RegisterData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "client" | "trainer";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
    otpSent: false,
    isAuthenticated: false,
  });

  // Inicializa auth desde localStorage o API
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken) {
        setState((s) => ({ ...s, loading: false }));
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      try {
        let user: User;
        const stored = localStorage.getItem("user");
        if (stored) {
          user = JSON.parse(stored) as User;
        } else {
          // Llama al endpoint /users/me
          const { data: fetchedUser } = await axios.get<User>("/users/me");
          if (!fetchedUser?.role) {
            throw new Error("User profile missing role");
          }
          user = fetchedUser;
          localStorage.setItem("user", JSON.stringify(user));
        }

        setState({
          user,
          accessToken,
          refreshToken,
          loading: false,
          error: null,
          otpSent: false,
          isAuthenticated: true,
        });
      } catch (err) {
        console.error("initAuth error", err);
        localStorage.clear();
        setState({
          user: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          error: null,
          otpSent: false,
          isAuthenticated: false,
        });
      }
    };
    initAuth();
  }, []);

  // OAuth callback handler
  useEffect(() => {
    const handleOAuth = async () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const at = params.get("accessToken");
      const rt = params.get("refreshToken");
      if (!at || !rt) return;

      localStorage.setItem("accessToken", at);
      localStorage.setItem("refreshToken", rt);
      axios.defaults.headers.common["Authorization"] = `Bearer ${at}`;
      setState((s) => ({
        ...s,
        accessToken: at,
        refreshToken: rt,
        loading: true,
        isAuthenticated: true,
      }));

      window.history.replaceState({}, document.title, window.location.pathname);
      try {
        const { data: userData } = await axios.get<User>("/users/me");
        if (!userData?.role) {
          throw new Error("User profile missing role");
        }
        localStorage.setItem("user", JSON.stringify(userData));
        setState((s) => ({
          ...s,
          user: userData,
          loading: false,
          error: null,
        }));
      } catch (err) {
        console.error("OAuth fetch user error", err);
        setState((s) => ({
          ...s,
          error: "Failed to fetch user data",
          loading: false,
        }));
      }
    };
    handleOAuth();
  }, []);

  // Login envía OTP
  const login = async (email: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { accessToken, refreshToken } = (
        await axios.post("/auth/login", { email })
      ).data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setState((s) => ({
        ...s,
        accessToken,
        refreshToken,
        loading: false,
        otpSent: true,
        error: null,
      }));
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error("login error", err);
      const message =
        err.response?.data?.nextStep === "register"
          ? "Usuario no encontrado. Regístrate primero."
          : err.response?.data?.error || err.message;
      setState((s) => ({ ...s, loading: false, error: message }));
      if (err.response?.data?.nextStep === "register") {
        router.push(`/auth/register?email=${encodeURIComponent(email)}`);
      }
    }
  };

  // Registro + OTP
  const register = async (data: RegisterData) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { token } = (await axios.post("/auth/register", data)).data;
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setState((s) => ({
        ...s,
        accessToken: token,
        loading: false,
        otpSent: true,
      }));
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      console.error("register error", err);
      setState((s) => ({
        ...s,
        loading: false,
        error: err.response?.data?.error || err.message,
      }));
    }
  };

  // Verificar OTP
  const verifyOtp = async (email: string, otp: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { token } = (await axios.post("/auth/verify-otp", { email, otp }))
        .data;
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Llama a /users/me para obtener perfil
      const { data: userData } = await axios.get<User>("/users/me");
      if (!userData?.role) {
        throw new Error("User profile missing role");
      }
      localStorage.setItem("user", JSON.stringify(userData));
      setState({
        user: userData,
        accessToken: token,
        refreshToken: state.refreshToken,
        loading: false,
        error: null,
        otpSent: false,
        isAuthenticated: true,
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("verifyOtp error", err);
      setState((s) => ({
        ...s,
        loading: false,
        error: err.response?.data?.error || err.message,
      }));
    }
  };

  const logout = async () => {
    setState((s) => ({ ...s, loading: true }));
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      otpSent: false,
      isAuthenticated: false,
    });
    router.push("/auth/login");
  };

  const clearError = () => setState((s) => ({ ...s, error: null }));
  const updateUser = async (data: Partial<User>) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const { data: updated } = await axios.put<User>("/users/me", data);
      localStorage.setItem("user", JSON.stringify(updated));
      setState((s) => ({ ...s, user: updated, loading: false }));
    } catch (err: any) {
      console.error("updateUser error", err);
      setState((s) => ({ ...s, loading: false, error: err.message }));
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        verifyOtp,
        logout,
        clearError,
        updateUser,
        isTrainer: () => state.user?.role === "trainer",
        isClient: () => state.user?.role === "client",
        isAdmin: () => state.user?.role === "admin",
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
