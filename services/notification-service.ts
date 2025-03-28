import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para las notificaciones
export type NotificationData = {
  id?: number
  userId: number
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  createdAt?: string
  updatedAt?: string
}

// Servicio de notificaciones
export const notificationService = {
  // Enviar una notificación
  sendNotification: async (
    notification: Omit<NotificationData, "id" | "read">,
  ): Promise<ApiResponse<NotificationData>> => {
    // Simulamos el envío de una notificación
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000) + 10,
        ...notification,
        read: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }
  },

  // Obtener notificaciones del usuario actual
  getNotifications: async (): Promise<ApiResponse<NotificationData[]>> => {
    return apiClient.getNotifications()
  },

  // Marcar una notificación como leída
  markAsRead: async (id: number): Promise<ApiResponse<NotificationData>> => {
    return apiClient.markAsRead(id)
  },

  // Marcar todas las notificaciones como leídas
  markAllAsRead: async (): Promise<ApiResponse<void>> => {
    return apiClient.markAllAsRead()
  },
}

