import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para los ejercicios basados en el modelo
export type ExerciseData = {
  id?: number
  name: string
  description?: string
  difficulty: "easy" | "medium" | "hard"
  duration: number
  muscleGroup: string
  createdAt?: string
  updatedAt?: string
}

// Tipo para ejercicios externos
export type ExternalExerciseData = {
  id: string
  name: string
  bodyPart: string
  equipment: string
  gifUrl: string
  target: string
}

// Servicio de ejercicios
export const exerciseService = {
  // Obtener todos los ejercicios
  getExercises: async (): Promise<ApiResponse<ExerciseData[]>> => {
    return apiClient.getExercises()
  },

  // Obtener un ejercicio específico
  getExercise: async (id: number): Promise<ApiResponse<ExerciseData>> => {
    const exercises = await apiClient.getExercises()
    if (exercises.success) {
      const exercise = exercises.data?.find((e) => e.id === id)
      if (exercise) {
        return { success: true, data: exercise }
      }
    }
    return { success: false, error: "Ejercicio no encontrado" }
  },

  // Crear un nuevo ejercicio
  createExercise: async (exercise: Omit<ExerciseData, "id">): Promise<ApiResponse<ExerciseData>> => {
    // Simulamos la creación de un ejercicio
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000) + 10,
        ...exercise,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }
  },

  // Actualizar un ejercicio
  updateExercise: async (id: number, exercise: Partial<ExerciseData>): Promise<ApiResponse<ExerciseData>> => {
    // Simulamos la actualización de un ejercicio
    return {
      success: true,
      data: {
        id,
        name: exercise.name || "Ejercicio",
        description: exercise.description || "",
        difficulty: exercise.difficulty || "medium",
        duration: exercise.duration || 30,
        muscleGroup: exercise.muscleGroup || "General",
        updatedAt: new Date().toISOString(),
      },
    }
  },

  // Eliminar un ejercicio
  deleteExercise: async (id: number): Promise<ApiResponse<void>> => {
    // Simulamos la eliminación de un ejercicio
    return { success: true }
  },

  // Obtener ejercicios externos
  getExternalExercises: async (): Promise<ApiResponse<ExternalExerciseData[]>> => {
    // Simulamos una respuesta con datos de ejemplo
    return {
      success: true,
      data: [
        {
          id: "ex1",
          name: "Sentadillas",
          bodyPart: "piernas",
          equipment: "peso corporal",
          gifUrl: "/placeholder.svg?height=200&width=200&text=Sentadillas",
          target: "cuádriceps",
        },
        {
          id: "ex2",
          name: "Press de banca",
          bodyPart: "pecho",
          equipment: "barra",
          gifUrl: "/placeholder.svg?height=200&width=200&text=Press",
          target: "pectoral",
        },
        {
          id: "ex3",
          name: "Dominadas",
          bodyPart: "espalda",
          equipment: "barra",
          gifUrl: "/placeholder.svg?height=200&width=200&text=Dominadas",
          target: "dorsal",
        },
      ],
    }
  },

  // Obtener partes del cuerpo
  getBodyParts: async (): Promise<ApiResponse<string[]>> => {
    // Simulamos una respuesta con datos de ejemplo
    return {
      success: true,
      data: ["piernas", "pecho", "espalda", "hombros", "brazos", "abdomen", "core"],
    }
  },

  // Obtener ejercicios por parte del cuerpo
  getExercisesByBodyPart: async (bodyPart: string): Promise<ApiResponse<ExternalExerciseData[]>> => {
    // Simulamos una respuesta con datos de ejemplo filtrados por parte del cuerpo
    const allExercises = [
      {
        id: "ex1",
        name: "Sentadillas",
        bodyPart: "piernas",
        equipment: "peso corporal",
        gifUrl: "/placeholder.svg?height=200&width=200&text=Sentadillas",
        target: "cuádriceps",
      },
      {
        id: "ex2",
        name: "Press de banca",
        bodyPart: "pecho",
        equipment: "barra",
        gifUrl: "/placeholder.svg?height=200&width=200&text=Press",
        target: "pectoral",
      },
      {
        id: "ex3",
        name: "Dominadas",
        bodyPart: "espalda",
        equipment: "barra",
        gifUrl: "/placeholder.svg?height=200&width=200&text=Dominadas",
        target: "dorsal",
      },
    ]

    return {
      success: true,
      data: allExercises.filter((ex) => ex.bodyPart === bodyPart),
    }
  },
}

