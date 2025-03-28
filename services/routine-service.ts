import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para las rutinas basados en el modelo
export type RoutineData = {
  id?: number
  name: string
  description?: string
  goal?: string
  duration: number
  workouts?: WorkoutData[]
  createdAt?: string
  updatedAt?: string
}

// Tipo para los entrenamientos asociados a rutinas
export type WorkoutData = {
  id: number
  name: string
  description?: string
  duration: number
  difficulty: "easy" | "medium" | "hard"
}

// Servicio de rutinas
export const routineService = {
  // Obtener todas las rutinas
  getRoutines: async (): Promise<ApiResponse<RoutineData[]>> => {
    return apiClient.getRoutines()
  },

  // Obtener una rutina específica
  getRoutine: async (id: number): Promise<ApiResponse<RoutineData>> => {
    return apiClient.getRoutine(id)
  },

  // Crear una nueva rutina
  createRoutine: async (routine: Omit<RoutineData, "id">): Promise<ApiResponse<RoutineData>> => {
    return apiClient.createRoutine(routine)
  },

  // Actualizar una rutina
  updateRoutine: async (id: number, routine: Partial<RoutineData>): Promise<ApiResponse<RoutineData>> => {
    return apiClient.updateRoutine(id, routine)
  },

  // Eliminar una rutina
  deleteRoutine: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.deleteRoutine(id)
  },

  // Asignar entrenamientos a una rutina
  assignWorkouts: async (routineId: number, workoutIds: number[]): Promise<ApiResponse<RoutineData>> => {
    return apiClient.assignWorkouts(routineId, workoutIds)
  },

  // Eliminar un entrenamiento de una rutina
  removeWorkout: async (routineId: number, workoutId: number): Promise<ApiResponse<void>> => {
    return apiClient.removeWorkout(routineId, workoutId)
  },

  // Asignar una rutina a un cliente
  assignRoutine: async (routineId: number, clientId: number): Promise<ApiResponse<void>> => {
    return apiClient.assignRoutine(routineId, clientId)
  },
}

