"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userService, type UserData } from "@/services/user-service";

// API base URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
axios.defaults.baseURL = API_URL;

// Extiende UserData con el campo role
export type User = UserData & {
  role: "client" | "trainer" | "admin";
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  isAuthenticated: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  isTrainer: () => boolean;
  isClient: () => boolean;
  isAdmin: () => boolean;
};

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

  // 1) Al montar, inicializa desde localStorage o API
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userStr = localStorage.getItem("user");

      if (!accessToken) {
        setState((s) => ({ ...s, loading: false }));
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      try {
        let user: User;
        if (userStr) {
          user = JSON.parse(userStr);
        } else {
          // Uso de tu servicio para perfil propio
          const res = await userService.getCurrentUserProfile();
          user = res.data as User;
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
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

  // 2) Handler para callback de OAuth (Google, etc)
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
        const res = await userService.getCurrentUserProfile();
        const u = res.data as User;
        localStorage.setItem("user", JSON.stringify(u));
        setState((s) => ({ ...s, user: u, loading: false, error: null }));
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

  // 3) Enviar OTP (login)
  const login = async (email: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await axios.post("/auth/login", { email });
      const { accessToken, refreshToken } = res.data;
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
      if (err.response?.data?.nextStep === "register") {
        setState((s) => ({
          ...s,
          loading: false,
          error: "Usuario no encontrado. Regístrate primero.",
        }));
        router.push(`/auth/register?email=${encodeURIComponent(email)}`);
      } else {
        setState((s) => ({
          ...s,
          loading: false,
          error: err.response?.data?.error || err.message,
        }));
      }
    }
  };

  // 4) Registro + OTP
  const register = async (data: RegisterData) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await axios.post("/auth/register", data);
      const token = res.data.token;
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

  // 5) Verificar OTP
  const verifyOtp = async (email: string, otp: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await axios.post("/auth/verify-otp", { email, otp });
      const token = res.data.token;
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userRes = await userService.getCurrentUserProfile();
      const u = userRes.data as User;
      localStorage.setItem("user", JSON.stringify(u));

      setState({
        user: u,
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

  // 6) Logout
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

  // 7) Limpiar error
  const clearError = () => {
    setState((s) => ({ ...s, error: null }));
  };

  // 8) Actualizar perfil
  const updateUser = async (data: Partial<User>) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const res = await userService.updateCurrentUser(data);
      const updated = { ...state.user!, ...res.data } as User;
      localStorage.setItem("user", JSON.stringify(updated));
      setState((s) => ({ ...s, user: updated, loading: false }));
    } catch (err: any) {
      console.error("updateUser error", err);
      setState((s) => ({ ...s, loading: false, error: err.message }));
      throw err;
    }
  };

  const isTrainer = () => state.user?.role === "trainer";
  const isClient = () => state.user?.role === "client";
  const isAdmin = () => state.user?.role === "admin";

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
        isTrainer,
        isClient,
        isAdmin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
