import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para los usuarios
export type UserData = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "client" | "trainer"
  phoneNumber?: string
  specialization?: string
  picture?: string
  bio?: string
  backgroundImage?: string
  facebook?: string
  twitter?: string
  instagram?: string
  affiliateDiscount?: string
}

// Servicio de usuarios
export const userService = {
  // Obtener todos los usuarios (solo para administradores)
  getUsers: async (): Promise<ApiResponse<UserData[]>> => {
    // Simulamos una respuesta con datos de ejemplo
    return {
      success: true,
      data: [
        {
          id: 1,
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan@example.com",
          role: "trainer",
          picture: "/placeholder.svg?height=100&width=100&text=JP",
          bio: "Entrenador personal con 10 años de experiencia",
        },
        {
          id: 2,
          firstName: "María",
          lastName: "García",
          email: "maria@example.com",
          role: "client",
          picture: "/placeholder.svg?height=100&width=100&text=MG",
          bio: "Cliente desde 2022",
        },
      ],
    }
  },

  // Obtener un usuario por ID
  getUserById: async (id: number | string): Promise<ApiResponse<UserData>> => {
    return apiClient.getUserById(Number(id))
  },

  // Crear un usuario (solo para administradores)
  createUser: async (userData: Omit<UserData, "id">): Promise<ApiResponse<UserData>> => {
    // Simulamos la creación de un usuario
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000) + 10,
        ...userData,
      },
    }
  },

  // Actualizar un usuario
  updateUser: async (id: number | string, userData: Partial<UserData>): Promise<ApiResponse<UserData>> => {
    // Simulamos la actualización de un usuario
    return {
      success: true,
      data: {
        id: Number(id),
        firstName: userData.firstName || "Usuario",
        lastName: userData.lastName || "Apellido",
        email: userData.email || "usuario@example.com",
        role: userData.role || "client",
        ...userData,
      },
    }
  },

  // Eliminar un usuario (solo para administradores)
  deleteUser: async (id: number | string): Promise<ApiResponse<void>> => {
    // Simulamos la eliminación de un usuario
    return { success: true }
  },

  // Actualizar el perfil del entrenador
  updateTrainerProfile: async (profileData: Partial<UserData>): Promise<ApiResponse<UserData>> => {
    // Simulamos la actualización del perfil
    return {
      success: true,
      data: {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan@example.com",
        role: "trainer",
        ...profileData,
      },
    }
  },

  // Actualizar el perfil del cliente
  updateClientProfile: async (profileData: Partial<UserData>): Promise<ApiResponse<UserData>> => {
    // Simulamos la actualización del perfil
    return {
      success: true,
      data: {
        id: 2,
        firstName: "María",
        lastName: "García",
        email: "maria@example.com",
        role: "client",
        ...profileData,
      },
    }
  },

  // Subir foto de perfil
  uploadProfilePicture: async (file: File): Promise<ApiResponse<{ pictureUrl: string }>> => {
    // Simulamos la subida de una foto de perfil
    return {
      success: true,
      data: {
        pictureUrl: "/placeholder.svg?height=200&width=200&text=Profile",
      },
    }
  },

  // Obtener el perfil del usuario actual
  getCurrentUserProfile: async (): Promise<ApiResponse<UserData>> => {
    // Simulamos la obtención del perfil del usuario actual
    return {
      success: true,
      data: {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan@example.com",
        role: "trainer",
        picture: "/placeholder.svg?height=100&width=100&text=JP",
        bio: "Entrenador personal con 10 años de experiencia",
      },
    }
  },

  // Obtener clientes
  getClients: async (): Promise<ApiResponse<UserData[]>> => {
    return apiClient.getClients()
  },

  // Obtener entrenadores
  getTrainers: async (): Promise<ApiResponse<UserData[]>> => {
    return apiClient.getTrainers()
  },
}

