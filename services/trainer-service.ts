import { api, type ApiResponse } from "@/lib/api"
import type { ProfileData } from "./profile-service"

// Tipos adicionales para entrenadores
export type TrainerData = ProfileData & {
  rating?: number
  reviews?: number
  plans?: PlanData[]
  testimonials?: TestimonialData[]
}

export type PlanData = {
  id: number
  name: string
  price: number
  description: string
  features: string[]
}

export type TestimonialData = {
  id: number
  name: string
  text: string
  rating: number
  date: string
}

// Servicio de entrenadores
export const trainerService = {
  // Obtener todos los entrenadores
  getTrainers: async (): Promise<ApiResponse<TrainerData[]>> => {
    return api.get<TrainerData[]>("/trainers")
  },

  // Obtener un entrenador específico
  getTrainer: async (id: string): Promise<ApiResponse<TrainerData>> => {
    return api.get<TrainerData>(`/trainers/${id}`)
  },

  // Obtener el perfil público de un entrenador
  getTrainerPublicProfile: async (id: string): Promise<ApiResponse<TrainerData>> => {
    return api.get<TrainerData>(`/trainers/${id}/public`, false)
  },

  // Enviar una solicitud de suscripción a un entrenador
  sendSubscriptionRequest: async (
    trainerId: string,
    planId: number,
    formData: { [key: string]: any },
  ): Promise<ApiResponse<{ requestId: number }>> => {
    return api.post<{ requestId: number }>(`/trainers/${trainerId}/subscribe`, {
      planId,
      formData,
    })
  },

  // Añadir un testimonio para un entrenador
  addTestimonial: async (
    trainerId: string,
    testimonial: Omit<TestimonialData, "id" | "date">,
  ): Promise<ApiResponse<TestimonialData>> => {
    return api.post<TestimonialData>(`/trainers/${trainerId}/testimonials`, testimonial)
  },
}

