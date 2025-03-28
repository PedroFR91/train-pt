import { api, type ApiResponse } from "@/lib/api"

// Tipos para las tarifas basados en el modelo
export type RateData = {
  id?: number
  name: string
  description?: string
  price: number
  currency: string
  trainerId: number
  duration: string
  sessionType: string
  createdAt?: string
  updatedAt?: string
}

// Servicio de tarifas
export const rateService = {
  // Obtener todas las tarifas
  getRates: async (): Promise<ApiResponse<RateData[]>> => {
    return api.get<RateData[]>("/rates")
  },

  // Obtener una tarifa específica
  getRate: async (id: number): Promise<ApiResponse<RateData>> => {
    return api.get<RateData>(`/rates/${id}`)
  },

  // Crear una nueva tarifa
  createRate: async (rate: Omit<RateData, "id">): Promise<ApiResponse<RateData>> => {
    return api.post<RateData>("/rates", rate)
  },

  // Actualizar una tarifa
  updateRate: async (id: number, rate: Partial<RateData>): Promise<ApiResponse<RateData>> => {
    return api.put<RateData>(`/rates/${id}`, rate)
  },

  // Eliminar una tarifa
  deleteRate: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/rates/${id}`)
  },

  // Obtener tarifas por entrenador
  getRatesByTrainer: async (trainerId: number): Promise<ApiResponse<RateData[]>> => {
    return api.get<RateData[]>(`/rates?trainerId=${trainerId}`)
  },
}

