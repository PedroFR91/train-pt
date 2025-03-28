import type { ApiResponse } from "./api"

// Función para simular un retraso en las respuestas
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Función para generar respuestas de API simuladas
export async function mockApiResponse<T>(data: T, success = true, error?: string): Promise<ApiResponse<T>> {
  // Simular un retraso de red
  await delay(500)

  return {
    success,
    data: success ? data : undefined,
    error: success ? undefined : error || "Error simulado",
  }
}

// Datos de ejemplo para usuarios
const mockUsers = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    role: "trainer",
    picture: "/placeholder.svg?height=100&width=100&text=JP",
    bio: "Entrenador personal con 10 años de experiencia",
    phoneNumber: "+34600000001",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "García",
    email: "maria@example.com",
    role: "client",
    picture: "/placeholder.svg?height=100&width=100&text=MG",
    bio: "Cliente desde 2022",
    phoneNumber: "+34600000002",
    subscription: { status: "active", plan: "Premium", startDate: "2023-01-15", endDate: "2023-12-31" },
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos@example.com",
    role: "client",
    picture: "/placeholder.svg?height=100&width=100&text=CR",
    bio: "Cliente desde 2023",
    phoneNumber: "+34600000003",
    subscription: { status: "active", plan: "Básico", startDate: "2023-03-10", endDate: "2023-12-31" },
  },
]

// Datos de ejemplo para rutinas
const mockRoutines = [
  {
    id: 1,
    name: "Rutina de Pérdida de Peso",
    description: "Rutina diseñada para maximizar la quema de calorías y promover la pérdida de peso",
    goal: "Pérdida de peso",
    duration: 30,
    difficulty: "medium",
    workouts: [
      {
        id: 1,
        name: "Cardio HIIT",
        description: "Entrenamiento de alta intensidad",
        duration: 30,
        difficulty: "medium",
      },
      {
        id: 2,
        name: "Circuito Full Body",
        description: "Ejercicios para todo el cuerpo",
        duration: 45,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 2,
    name: "Rutina de Hipertrofia",
    description: "Rutina enfocada en el aumento de masa muscular",
    goal: "Ganancia muscular",
    duration: 60,
    difficulty: "hard",
    workouts: [
      { id: 3, name: "Entrenamiento de Pecho", description: "Ejercicios para pecho", duration: 60, difficulty: "hard" },
      {
        id: 4,
        name: "Entrenamiento de Espalda",
        description: "Ejercicios para espalda",
        duration: 60,
        difficulty: "hard",
      },
    ],
  },
]

// Datos de ejemplo para dietas
const mockDiets = [
  {
    id: 1,
    name: "Dieta Mediterránea",
    description: "Dieta basada en alimentos tradicionales de países mediterráneos",
    calories: 2000,
    meals: [
      {
        meal: "Desayuno",
        items: ["Yogur griego con miel", "Tostada de pan integral con aceite de oliva", "Fruta fresca"],
      },
      { meal: "Almuerzo", items: ["Ensalada de tomate y mozzarella", "Pescado a la plancha", "Verduras asadas"] },
      { meal: "Cena", items: ["Sopa de verduras", "Tortilla de espinacas", "Fruta fresca"] },
    ],
  },
  {
    id: 2,
    name: "Dieta Alta en Proteínas",
    description: "Dieta enfocada en el consumo de proteínas para la recuperación muscular",
    calories: 2500,
    meals: [
      { meal: "Desayuno", items: ["Batido de proteínas", "Avena con leche", "Claras de huevo"] },
      { meal: "Media mañana", items: ["Yogur con nueces", "Fruta"] },
      { meal: "Almuerzo", items: ["Pechuga de pollo", "Arroz integral", "Verduras"] },
      { meal: "Merienda", items: ["Batido de proteínas", "Tostada con aguacate"] },
      { meal: "Cena", items: ["Salmón", "Ensalada verde", "Patata al horno"] },
    ],
  },
]

// Datos de ejemplo para ejercicios
const mockExercises = [
  {
    id: 1,
    name: "Sentadillas",
    description: "Ejercicio para piernas",
    difficulty: "medium",
    duration: 15,
    muscleGroup: "Piernas",
  },
  {
    id: 2,
    name: "Press de banca",
    description: "Ejercicio para pecho",
    difficulty: "hard",
    duration: 20,
    muscleGroup: "Pecho",
  },
  {
    id: 3,
    name: "Dominadas",
    description: "Ejercicio para espalda",
    difficulty: "hard",
    duration: 15,
    muscleGroup: "Espalda",
  },
  { id: 4, name: "Plancha", description: "Ejercicio para core", difficulty: "easy", duration: 10, muscleGroup: "Core" },
  {
    id: 5,
    name: "Zancadas",
    description: "Ejercicio para piernas",
    difficulty: "medium",
    duration: 15,
    muscleGroup: "Piernas",
  },
]

// Datos de ejemplo para notificaciones
const mockNotifications = [
  {
    id: 1,
    userId: 2,
    message: "Tu entrenador ha actualizado tu rutina",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    userId: 2,
    message: "Tienes un nuevo mensaje de tu entrenador",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 3,
    userId: 2,
    message: "Recordatorio: Completar el formulario de seguimiento",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

// API mock para simular las respuestas del backend
export const mockApi = {
  // Auth
  login: async (email: string) => {
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      return mockApiResponse({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      })
    }
    return mockApiResponse(null, false, "Usuario no encontrado")
  },

  register: async (userData: any) => {
    return mockApiResponse({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    })
  },

  verifyOtp: async (email: string, otp: string) => {
    if (otp === "123456") {
      const user = mockUsers.find((u) => u.email === email)
      return mockApiResponse({
        token: "mock-verified-token",
        user,
      })
    }
    return mockApiResponse(null, false, "Código OTP inválido")
  },

  me: async () => {
    return mockApiResponse(mockUsers[0])
  },

  // Users
  getClients: async () => {
    return mockApiResponse(mockUsers.filter((u) => u.role === "client"))
  },

  getTrainers: async () => {
    return mockApiResponse(mockUsers.filter((u) => u.role === "trainer"))
  },

  getUserById: async (id: number) => {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      return mockApiResponse(user)
    }
    return mockApiResponse(null, false, "Usuario no encontrado")
  },

  // Routines
  getRoutines: async () => {
    return mockApiResponse(mockRoutines)
  },

  getRoutine: async (id: number) => {
    const routine = mockRoutines.find((r) => r.id === id)
    if (routine) {
      return mockApiResponse(routine)
    }
    return mockApiResponse(null, false, "Rutina no encontrada")
  },

  createRoutine: async (routineData: any) => {
    const newRoutine = {
      id: mockRoutines.length + 1,
      ...routineData,
      workouts: [],
    }
    mockRoutines.push(newRoutine)
    return mockApiResponse(newRoutine)
  },

  updateRoutine: async (id: number, routineData: any) => {
    const index = mockRoutines.findIndex((r) => r.id === id)
    if (index !== -1) {
      mockRoutines[index] = { ...mockRoutines[index], ...routineData }
      return mockApiResponse(mockRoutines[index])
    }
    return mockApiResponse(null, false, "Rutina no encontrada")
  },

  deleteRoutine: async (id: number) => {
    const index = mockRoutines.findIndex((r) => r.id === id)
    if (index !== -1) {
      mockRoutines.splice(index, 1)
      return mockApiResponse({})
    }
    return mockApiResponse(null, false, "Rutina no encontrada")
  },

  assignWorkouts: async (routineId: number, workoutIds: number[]) => {
    const routine = mockRoutines.find((r) => r.id === routineId)
    if (routine) {
      const workoutsToAdd = mockExercises
        .filter((e) => workoutIds.includes(e.id))
        .map((e) => ({
          id: e.id,
          name: e.name,
          description: e.description,
          duration: e.duration,
          difficulty: e.difficulty,
        }))

      routine.workouts = [...routine.workouts, ...workoutsToAdd]
      return mockApiResponse(routine)
    }
    return mockApiResponse(null, false, "Rutina no encontrada")
  },

  removeWorkout: async (routineId: number, workoutId: number) => {
    const routine = mockRoutines.find((r) => r.id === routineId)
    if (routine) {
      routine.workouts = routine.workouts.filter((w) => w.id !== workoutId)
      return mockApiResponse({})
    }
    return mockApiResponse(null, false, "Rutina no encontrada")
  },

  assignRoutine: async (routineId: number, clientId: number) => {
    return mockApiResponse({})
  },

  // Diets
  getDiets: async () => {
    return mockApiResponse(mockDiets)
  },

  getDiet: async (id: number) => {
    const diet = mockDiets.find((d) => d.id === id)
    if (diet) {
      return mockApiResponse(diet)
    }
    return mockApiResponse(null, false, "Dieta no encontrada")
  },

  createDiet: async (dietData: any) => {
    const newDiet = {
      id: mockDiets.length + 1,
      ...dietData,
    }
    mockDiets.push(newDiet)
    return mockApiResponse(newDiet)
  },

  updateDiet: async (id: number, dietData: any) => {
    const index = mockDiets.findIndex((d) => d.id === id)
    if (index !== -1) {
      mockDiets[index] = { ...mockDiets[index], ...dietData }
      return mockApiResponse(mockDiets[index])
    }
    return mockApiResponse(null, false, "Dieta no encontrada")
  },

  deleteDiet: async (id: number) => {
    const index = mockDiets.findIndex((d) => d.id === id)
    if (index !== -1) {
      mockDiets.splice(index, 1)
      return mockApiResponse({})
    }
    return mockApiResponse(null, false, "Dieta no encontrada")
  },

  assignDiet: async (dietId: number, clientId: number) => {
    return mockApiResponse({})
  },

  // Exercises
  getExercises: async () => {
    return mockApiResponse(mockExercises)
  },

  // Notifications
  getNotifications: async () => {
    return mockApiResponse(mockNotifications)
  },

  markAsRead: async (id: number) => {
    const notification = mockNotifications.find((n) => n.id === id)
    if (notification) {
      notification.read = true
      return mockApiResponse(notification)
    }
    return mockApiResponse(null, false, "Notificación no encontrada")
  },

  markAllAsRead: async () => {
    mockNotifications.forEach((n) => (n.read = true))
    return mockApiResponse({})
  },
}

