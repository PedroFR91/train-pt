import { api, type ApiResponse } from "@/lib/api";
import { mockApi } from "@/lib/mock-api";

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api;

// Tipos para las solicitudes de autenticación
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: "client" | "trainer";
  phone: string;
};

export type VerifyRequest = {
  code: string;
};

// Tipos para las respuestas de autenticación
export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: "client" | "trainer";
    isVerified: boolean;
  };
  token: string;
};

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  login: async (
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    let response: ApiResponse<AuthResponse>;
    if ("login" in apiClient) {
      // mockApi
      const mockResponse = await (apiClient as typeof mockApi).login(
        credentials.email
      );
      if (mockResponse.success && mockResponse.data) {
        response = {
          success: true,
          data: {
            user: {
              id: "mock-id",
              name: credentials.email.split("@")[0],
              email: credentials.email,
              role: "client",
              isVerified: true,
            },
            token: mockResponse.data.accessToken,
          },
        };
      } else {
        response = { success: false, data: undefined };
      }
    } else {
      // real api
      response = await (apiClient as typeof api).post<AuthResponse>(
        "/auth/login",
        credentials
      );
    }

    if (response.success && response.data?.token) {
      // Guardar el token en localStorage
      localStorage.setItem("accessToken", response.data.token);
      // Guardar el refresh token en localStorage
      // localStorage.setItem("refreshToken", response.data.refreshToken); // Comentado porque AuthResponse no tiene refreshToken
    }

    return response;
  },

  // Registrar un nuevo usuario
  register: async (
    userData: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    let response: ApiResponse<any>;
    if ("register" in apiClient) {
      // mockApi
      response = await (apiClient as typeof mockApi).register(userData);
    } else {
      // real api
      response = await (apiClient as typeof api).post<AuthResponse>(
        "/auth/register",
        userData
      );
    }

    if (
      response.success &&
      (response.data?.accessToken || response.data?.token)
    ) {
      // Guardar el token en localStorage
      localStorage.setItem(
        "accessToken",
        response.data.accessToken || response.data.token
      );
      // Guardar el refresh token en localStorage si existe
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
    }

    return response;
  },

  // Verificar cuenta con código
  verify: async (
    verifyData: VerifyRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    let response: ApiResponse<AuthResponse>;
    if ("verifyOtp" in apiClient) {
      // mockApi
      response = await (apiClient as any).verifyOtp(
        "user@example.com",
        verifyData.code
      );
    } else {
      // real api
      response = await (apiClient as typeof api).post<AuthResponse>(
        "/auth/verify",
        verifyData
      );
    }

    if (response.success && response.data?.token) {
      // Actualizar el token en localStorage
      localStorage.setItem("accessToken", response.data.token);
      // Guardar los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response;
  },

  // Cerrar sesión
  logout: async (): Promise<void> => {
    try {
      // Llamar al endpoint de logout (opcional, depende de tu backend)
      // await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Eliminar el token y los datos del usuario del localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Recuperar contraseña
  forgotPassword: async (
    email: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return {
      success: true,
      data: { message: "Se ha enviado un correo para recuperar la contraseña" },
    };
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },

  // Obtener el usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
