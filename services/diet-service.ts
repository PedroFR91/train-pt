import { api, type ApiResponse } from "@/lib/api"
import { mockApi } from "@/lib/mock-api"

// Usar la API mock en lugar de la API real
const apiClient = process.env.NODE_ENV === "development" ? mockApi : api

// Tipos para las dietas basados en el modelo
export type DietData = {
  id?: number
  name: string
  description?: string
  calories: number
  meals?: MealData[]
  clientId?: number
  createdAt?: string
  updatedAt?: string
}

export type MealData = {
  meal: string
  items: string[]
}

// Tipo para recetas externas
export type ExternalRecipeData = {
  id: number
  title: string
  image: string
  calories: number
  protein: number
  fat: number
  carbs: number
  ingredients: string[]
  instructions: string[]
}

// Servicio de dietas
export const dietService = {
  // Obtener todas las dietas
  getDiets: async (): Promise<ApiResponse<DietData[]>> => {
    return apiClient.getDiets()
  },

  // Obtener una dieta específica
  getDiet: async (id: number): Promise<ApiResponse<DietData>> => {
    return apiClient.getDiet(id)
  },

  // Crear una nueva dieta
  createDiet: async (diet: Omit<DietData, "id">): Promise<ApiResponse<DietData>> => {
    return apiClient.createDiet(diet)
  },

  // Actualizar una dieta
  updateDiet: async (id: number, diet: Partial<DietData>): Promise<ApiResponse<DietData>> => {
    return apiClient.updateDiet(id, diet)
  },

  // Eliminar una dieta
  deleteDiet: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.deleteDiet(id)
  },

  // Asignar una dieta a un cliente
  assignDiet: async (dietId: number, clientId: number): Promise<ApiResponse<void>> => {
    return apiClient.assignDiet(dietId, clientId)
  },

  // Obtener recetas externas
  getExternalRecipes: async (query: string): Promise<ApiResponse<ExternalRecipeData[]>> => {
    // Simulamos una respuesta con datos de ejemplo
    return {
      success: true,
      data: [
        {
          id: 1,
          title: "Ensalada Mediterránea",
          image: "/placeholder.svg?height=200&width=300&text=Ensalada",
          calories: 350,
          protein: 15,
          fat: 20,
          carbs: 25,
          ingredients: ["Lechuga", "Tomate", "Pepino", "Aceitunas", "Queso feta", "Aceite de oliva"],
          instructions: [
            "Lavar las verduras",
            "Cortar en trozos",
            "Mezclar todos los ingredientes",
            "Aliñar con aceite",
          ],
        },
        {
          id: 2,
          title: "Pollo al Limón",
          image: "/placeholder.svg?height=200&width=300&text=Pollo",
          calories: 450,
          protein: 35,
          fat: 15,
          carbs: 10,
          ingredients: ["Pechuga de pollo", "Limón", "Ajo", "Romero", "Aceite de oliva"],
          instructions: [
            "Marinar el pollo",
            "Precalentar el horno",
            "Hornear 25 minutos",
            "Servir con rodajas de limón",
          ],
        },
      ],
    }
  },
}

