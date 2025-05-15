"use client";

import type React from "react";
import {
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
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Types
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
  register: (userData: RegisterData) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
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

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
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
  const [user, setUser] = useState<UserData | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userStr = localStorage.getItem("user");

      if (accessToken) {
        try {
          setState((prev) => ({ ...prev, loading: true }));

          // Configure axios with the token
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // If we have user data in localStorage, use it
          if (userStr && userStr !== "undefined") {
            const userData = JSON.parse(userStr);
            setState({
              user: userData,
              accessToken,
              refreshToken,
              loading: false,
              error: null,
              otpSent: false,
              isAuthenticated: true,
            });
          } else {
            // Fetch user data from la API real
            const response = await axios.get(`${API_URL}/auth/me`);
            setState({
              user: response.data,
              accessToken,
              refreshToken,
              loading: false,
              error: null,
              otpSent: false,
              isAuthenticated: true,
            });
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
      } else {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    initAuth();
  }, []);

  // Check for tokens in URL (for Google OAuth callback)
  useEffect(() => {
    const handleOAuthCallback = () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (accessToken && refreshToken) {
          // Store tokens
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Update auth state
          setState((prev) => ({
            ...prev,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            loading: true,
          }));

          // Clean URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          // Fetch user data
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          axios
            .get(`${API_URL}/auth/me`)
            .then((response) => {
              setState((prev) => ({
                ...prev,
                user: response.data,
                loading: false,
              }));
            })
            .catch((error) => {
              console.error("Error fetching user data after OAuth:", error);
              setState((prev) => ({
                ...prev,
                error: "Failed to fetch user data",
                loading: false,
              }));
            });
        }
      }
    };

    handleOAuthCallback();
  }, []);

  // Login function - sends OTP
  const login = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await axios.post(`${API_URL}/auth/login`, { email });

      // Store tokens temporarily
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setState((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        loading: false,
        otpSent: true,
        error: null,
      }));

      // Redirect to OTP verification page
      router.push("/verify-otp?email=" + encodeURIComponent(email));
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle "User Not Found" error specifically
      if (error.response?.data?.nextStep === "register") {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "User not found. Please register first.",
        }));
        router.push("/auth/register?email=" + encodeURIComponent(email));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error.response?.data?.error || error.message || "Failed to login",
        }));
      }
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await axios.post(`${API_URL}/auth/register`, userData);

      // Store token
      localStorage.setItem("accessToken", response.data.token);

      setState((prev) => ({
        ...prev,
        accessToken: response.data.token,
        loading: false,
        otpSent: true,
        error: null,
      }));

      // Redirect to OTP verification
      router.push("/verify-otp?email=" + encodeURIComponent(userData.email));
    } catch (error: any) {
      console.error("Registration error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.error || error.message || "Failed to register",
      }));
    }
  };

  // Verify OTP function
  const verifyOtp = async (email: string, otp: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      // Update token with the new one
      localStorage.setItem("accessToken", response.data.token);

      // Configure axios with the token
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      // Fetch user data
      const userResponse = await axios.get(`${API_URL}/auth/me`);

      setState({
        user: userResponse.data,
        accessToken: response.data.token,
        refreshToken: state.refreshToken,
        loading: false,
        error: null,
        otpSent: false,
        isAuthenticated: true,
      });

      // Store user data
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      // Redirect based on user role
      router.push("/dashboard");
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || error.message || "Invalid OTP",
      }));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      // Clear tokens and state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Remove Authorization header
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
    } catch (error) {
      console.error("Logout error:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Clear error function
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  // Update user data
  const updateUser = async (userData: Partial<User>) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      // Llamo siempre a /users/me
      const response = await userService.updateCurrentUser(userData);

      if (response.success && response.data) {
        const updatedUser = { ...state.user!, ...response.data } as User;
        setState((prev) => ({
          ...prev,
          user: updatedUser,
          loading: false,
        }));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        throw new Error(response.error || "Failed to update user data");
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to update user data",
      }));
      throw error;
    }
  };

  // Helper functions to check user role
  const isTrainer = () => state.user?.role === "trainer";
  const isClient = () => state.user?.role === "client";
  const isAdmin = () => state.user?.role === "admin";

  // Context value
  const value = {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
