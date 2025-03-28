import { api, type ApiResponse } from "@/lib/api"

// Tipos para los formularios basados en el modelo
export type FormData = {
  id?: number
  title: string
  description?: string
  fields: FormFieldData[]
  status: "active" | "archived"
  userId?: number
  createdAt?: string
  updatedAt?: string
}

export type FormFieldData = {
  id?: string
  label: string
  type: "text" | "number" | "select" | "textarea" | "checkbox" | "date"
  options?: string[]
  required: boolean
}

export type FormResponseData = {
  id?: number
  formId: number
  userId: number
  answers: Record<string, any>
  createdAt?: string
  updatedAt?: string
}

// Servicio de formularios
export const formService = {
  // Obtener todos los formularios
  getForms: async (): Promise<ApiResponse<FormData[]>> => {
    return api.get<FormData[]>("/forms")
  },

  // Obtener un formulario específico
  getForm: async (id: number): Promise<ApiResponse<FormData>> => {
    return api.get<FormData>(`/forms/${id}`)
  },

  // Crear un nuevo formulario
  createForm: async (form: Omit<FormData, "id">): Promise<ApiResponse<FormData>> => {
    return api.post<FormData>("/forms", form)
  },

  // Actualizar un formulario
  updateForm: async (id: number, form: Partial<FormData>): Promise<ApiResponse<FormData>> => {
    return api.put<FormData>(`/forms/${id}`, form)
  },

  // Eliminar un formulario
  deleteForm: async (id: number): Promise<ApiResponse<void>> => {
    return api.delete<void>(`/forms/${id}`)
  },

  // Enviar respuesta a un formulario
  submitFormResponse: async (formId: number, answers: Record<string, any>): Promise<ApiResponse<FormResponseData>> => {
    return api.post<FormResponseData>(`/forms/${formId}/responses`, { answers })
  },

  // Obtener respuestas de un formulario
  getFormResponses: async (formId: number): Promise<ApiResponse<FormResponseData[]>> => {
    return api.get<FormResponseData[]>(`/forms/${formId}/responses`)
  },
}

