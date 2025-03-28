import { api, type ApiResponse } from "@/lib/api"

// Tipos para los videos basados en el modelo
export type VideoData = {
  id?: number
  title: string
  url: string
  createdAt?: string
  updatedAt?: string
}

// Servicio de videos
export const videoService = {
  // Obtener todos los videos
  getVideos: async (): Promise<ApiResponse<VideoData[]>> => {
    return api.get<VideoData[]>("/videos")
  },

  // Crear un nuevo video
  createVideo: async (video: Omit<VideoData, "id">): Promise<ApiResponse<VideoData>> => {
    return api.post<VideoData>("/videos", video)
  },

  // Eliminar un video
  deleteVideo: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/videos/${id}`)
  },
}

