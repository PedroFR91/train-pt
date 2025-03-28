import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para las solicitudes de autenticación
export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  role: "client" | "trainer"
  phone: string
}

export type VerifyRequest = {
  code: string
}

// Tipos para las respuestas de autenticación
export type AuthResponse = {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "trainer"
    isVerified: boolean
  }
  token: string
}

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.login(credentials.email)

    if (response.success && response.data?.accessToken) {
      // Guardar el token en localStorage
      localStorage.setItem("accessToken", response.data.accessToken)
      // Guardar el refresh token en localStorage
      localStorage.setItem("refreshToken", response.data.refreshToken)
    }

    return response
  },

  // Registrar un nuevo usuario
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.register(userData)

    if (response.success && response.data?.accessToken) {
      // Guardar el token en localStorage
      localStorage.setItem("accessToken", response.data.accessToken)
      // Guardar el refresh token en localStorage
      localStorage.setItem("refreshToken", response.data.refreshToken)
    }

    return response
  },

  // Verificar cuenta con código
  verify: async (verifyData: VerifyRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.verifyOtp("user@example.com", verifyData.code)

    if (response.success && response.data?.token) {
      // Actualizar el token en localStorage
      localStorage.setItem("accessToken", response.data.token)
      // Guardar los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }

    return response
  },

  // Cerrar sesión
  logout: async (): Promise<void> => {
    try {
      // Llamar al endpoint de logout (opcional, depende de tu backend)
      // await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      // Eliminar el token y los datos del usuario del localStorage
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
    }
  },

  // Recuperar contraseña
  forgotPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return { success: true, data: { message: "Se ha enviado un correo para recuperar la contraseña" } }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken")
  },

  // Obtener el usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },
}

