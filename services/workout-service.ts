import { api, type ApiResponse } from "@/lib/api"

// Tipos para los entrenamientos basados en el modelo
export type WorkoutData = {
  id?: number
  name: string
  description?: string
  duration: number
  difficulty: "easy" | "medium" | "hard"
  exercises?: ExerciseData[]
  createdAt?: string
  updatedAt?: string
}

// Tipo para los ejercicios asociados a entrenamientos
export type ExerciseData = {
  id: number
  name: string
  description?: string
  difficulty: "easy" | "medium" | "hard"
  duration: number
  muscleGroup: string
}

// Servicio de entrenamientos
export const workoutService = {
  // Obtener todos los entrenamientos
  getWorkouts: async (): Promise<ApiResponse<WorkoutData[]>> => {
    return api.get<WorkoutData[]>("/workouts")
  },

  // Obtener un entrenamiento específico
  getWorkout: async (id: number): Promise<ApiResponse<WorkoutData>> => {
    return api.get<WorkoutData>(`/workouts/${id}`)
  },

  // Crear un nuevo entrenamiento
  createWorkout: async (workout: Omit<WorkoutData, "id">): Promise<ApiResponse<WorkoutData>> => {
    return api.post<WorkoutData>("/workouts", workout)
  },

  // Actualizar un entrenamiento
  updateWorkout: async (id: number, workout: Partial<WorkoutData>): Promise<ApiResponse<WorkoutData>> => {
    return api.put<WorkoutData>(`/workouts/${id}`, workout)
  },

  // Eliminar un entrenamiento
  deleteWorkout: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/workouts/${id}`)
  },

  // Asignar ejercicios a un entrenamiento
  assignExercises: async (workoutId: number, exerciseIds: number[]): Promise<ApiResponse<WorkoutData>> => {
    return api.post<WorkoutData>(`/workouts/${workoutId}/exercises`, { exerciseIds })
  },

  // Eliminar un ejercicio de un entrenamiento
  removeExercise: async (workoutId: number, exerciseId: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/workouts/${workoutId}/exercises/${exerciseId}`)
  },
}

