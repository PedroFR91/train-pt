import { api, type ApiResponse } from "@/lib/api"

// Tipos para los archivos basados en el modelo
export type FileData = {
  id?: number
  name: string
  url: string
  type: string
  createdAt?: string
  updatedAt?: string
}

// Servicio de archivos
export const fileService = {
  // Obtener todos los archivos
  getFiles: async (): Promise<ApiResponse<FileData[]>> => {
    return api.get<FileData[]>("/files")
  },

  // Subir un archivo
  uploadFile: async (file: File): Promise<ApiResponse<FileData>> => {
    const formData = new FormData()
    formData.append("file", file)

    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/upload`, {
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
        error: data.message || "Error uploading file",
      }
    }

    return {
      success: true,
      data: data,
    }
  },

  // Eliminar un archivo
  deleteFile: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/files/${id}`)
  },
}

