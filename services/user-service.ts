import { api, type ApiResponse } from "@/lib/api";
import { mockApi } from "@/lib/mock-api";

// Usa mockApi en desarrollo, api en producción
const apiClient = (
  process.env.NODE_ENV === "development" ? mockApi : api
) as typeof api;

// Tipos para los usuarios
export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "client" | "trainer" | "admin";
  phoneNumber?: string;
  specialization?: string;
  picture?: string;
  bio?: string;
  backgroundImage?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  affiliateDiscount?: string;
};

export const userService = {
  // --- Administrador: CRUD sobre /users ---
  getUsers: async (): Promise<ApiResponse<UserData[]>> => {
    return apiClient.get<UserData[]>("/users");
  },

  getUserById: async (id: number | string): Promise<ApiResponse<UserData>> => {
    return apiClient.get<UserData>(`/users/${id}`);
  },

  createUser: async (
    userData: Omit<UserData, "id">
  ): Promise<ApiResponse<UserData>> => {
    return apiClient.post<UserData>("/users", userData);
  },

  updateUser: async (
    id: number | string,
    userData: Partial<UserData>
  ): Promise<ApiResponse<UserData>> => {
    return apiClient.put<UserData>(`/users/${id}`, userData);
  },

  deleteUser: async (id: number | string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/users/${id}`);
  },

  // --- Perfil propio: rutas especiales ---
  getCurrentUserProfile: async (): Promise<ApiResponse<UserData>> => {
    return apiClient.get<UserData>("/users/me");
  },

  updateTrainerProfile: async (
    profileData: Partial<UserData>
  ): Promise<ApiResponse<UserData>> => {
    return apiClient.put<UserData>("/profiles/trainer", profileData);
  },

  updateClientProfile: async (
    profileData: Partial<UserData>
  ): Promise<ApiResponse<UserData>> => {
    return apiClient.put<UserData>("/profiles/client", profileData);
  },

  uploadProfilePicture: async (
    file: File
  ): Promise<ApiResponse<{ pictureUrl: string }>> => {
    const formData = new FormData();
    formData.append("picture", file);
    return apiClient.post<{ pictureUrl: string }>(
      "/users/me/picture",
      formData,
      false
    );
  },
  updateCurrentUser: async (
    profileData: Partial<UserData>
  ): Promise<ApiResponse<UserData>> => {
    // Forzamos siempre usar la API real aquí:
    return api.put<UserData>("/users/me", profileData);
  },

  // --- Listados filtrados por rol ---
  getClients: async (): Promise<ApiResponse<UserData[]>> => {
    return apiClient.get<UserData[]>("/users?role=client");
  },

  getTrainers: async (): Promise<ApiResponse<UserData[]>> => {
    return apiClient.get<UserData[]>("/users?role=trainer");
  },
};
