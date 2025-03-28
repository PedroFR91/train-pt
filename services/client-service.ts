import { api, type ApiResponse } from "@/lib/api"
import type { ProfileData } from "./profile-service"

// Tipos adicionales para clientes
export type ClientData = ProfileData & {
  trainer?: {
    id: string
    name: string
  }
  subscription?: {
    status: "active" | "pending" | "inactive"
    plan: string
    startDate: string
    endDate: string
  }
  measurements?: MeasurementData[]
}

export type MeasurementData = {
  id: number
  date: string
  weight: number
  bodyFat?: number
  chest?: number
  waist?: number
  hips?: number
}

// Servicio de clientes
export const clientService = {
  // Obtener todos los clientes (para entrenadores)
  getClients: async (): Promise<ApiResponse<ClientData[]>> => {
    return api.get<ClientData[]>("/clients")
  },

  // Obtener un cliente específico (para entrenadores)
  getClient: async (id: string): Promise<ApiResponse<ClientData>> => {
    return api.get<ClientData>(`/clients/${id}`)
  },

  // Obtener el perfil del cliente actual (para clientes)
  getClientProfile: async (): Promise<ApiResponse<ClientData>> => {
    return api.get<ClientData>("/clients/profile")
  },

  // Actualizar medidas del cliente
  updateMeasurements: async (
    measurements: Omit<MeasurementData, "id" | "date">,
  ): Promise<ApiResponse<MeasurementData>> => {
    return api.post<MeasurementData>("/clients/measurements", measurements)
  },

  // Obtener historial de medidas
  getMeasurements: async (): Promise<ApiResponse<MeasurementData[]>> => {
    return api.get<MeasurementData[]>("/clients/measurements")
  },

  // Obtener estado de suscripción
  getSubscriptionStatus: async (): Promise<
    ApiResponse<{
      status: "active" | "pending" | "inactive"
      plan: string
      trainer: {
        id: string
        name: string
      }
      startDate: string
      endDate: string
      nextPayment: string
    }>
  > => {
    return api.get<{
      status: "active" | "pending" | "inactive"
      plan: string
      trainer: {
        id: string
        name: string
      }
      startDate: string
      endDate: string
      nextPayment: string
    }>("/clients/subscription")
  },

  // Cancelar suscripción
  cancelSubscription: async (): Promise<ApiResponse<void>> => {
    return api.post<void>("/clients/subscription/cancel", {})
  },

  // Reactivar suscripción
  reactivateSubscription: async (): Promise<ApiResponse<void>> => {
    return api.post<void>("/clients/subscription/reactivate", {})
  },
}

