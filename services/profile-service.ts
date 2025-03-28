import { api, type ApiResponse } from "@/lib/api"

// Tipos para los perfiles basados en el modelo
export type ProfileData = {
  id?: number
  userId: number
  bio?: string
  specialization?: string
  website?: string
  createdAt?: string
  updatedAt?: string
}

// Tipo para las imágenes de clientes
export type ClientImageData = {
  id?: number
  imageUrl: string
  s3Key: string
  clientName?: string
  description?: string
  trainerId: number
  createdAt?: string
  updatedAt?: string
}

// Servicio de perfiles
export const profileService = {
  // Obtener perfil de entrenador
  getTrainerProfile: async (id: number): Promise<ApiResponse<ProfileData>> => {
    return api.get<ProfileData>(`/profile/trainer/${id}`)
  },

  // Actualizar perfil de entrenador
  updateTrainerProfile: async (profileData: Partial<ProfileData>): Promise<ApiResponse<ProfileData>> => {
    // Usamos FormData para poder enviar archivos
    const formData = new FormData()

    // Añadimos los campos del perfil al FormData
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    // Hacemos la petición con el FormData
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/trainer`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Error updating trainer profile",
      }
    }

    return {
      success: true,
      data: data,
    }
  },

  // Obtener imágenes de clientes
  getClientImages: async (): Promise<ApiResponse<ClientImageData[]>> => {
    return api.get<ClientImageData[]>("/profile/client-images")
  },

  // Subir imagen de cliente
  uploadClientImage: async (
    file: File,
    clientName?: string,
    description?: string,
  ): Promise<ApiResponse<ClientImageData>> => {
    const formData = new FormData()
    formData.append("image", file)

    if (clientName) {
      formData.append("clientName", clientName)
    }

    if (description) {
      formData.append("description", description)
    }

    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/client-images`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Error uploading client image",
      }
    }

    return {
      success: true,
      data: data,
    }
  },

  // Actualizar imagen de fondo del entrenador
  updateTrainerBackgroundImage: async (file: File): Promise<ApiResponse<{ backgroundUrl: string }>> => {
    const formData = new FormData()
    formData.append("background", file)

    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/trainer/background`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Error updating background image",
      }
    }

    return {
      success: true,
      data: data,
    }
  },

  // Eliminar imagen de cliente
  deleteClientImage: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/profile/client-images/${id}`)
  },
}

