// Cliente API para manejar las llamadas al backend

// Obtenemos la URL base de la API desde las variables de entorno
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Tipos básicos para las respuestas de la API
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Opciones para las peticiones
type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
};

// Función principal para hacer peticiones a la API
async function fetchApi<T>(
  endpoint: string,
  options: RequestOptions = { method: "GET", requiresAuth: true }
): Promise<ApiResponse<T>> {
  try {
    const { method, body, requiresAuth = true } = options;

    // Configuración básica de la petición
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Si la petición requiere autenticación, añadimos el token
    if (requiresAuth) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        // Si no hay token y la petición requiere autenticación, lanzamos un error
        throw new Error("No authentication token found");
      }
    }

    // Configuración completa de la petición
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: "include", // Para incluir cookies en las peticiones
    };

    // Si hay un cuerpo en la petición, lo añadimos
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Hacemos la petición
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    // Parseamos la respuesta como JSON
    const data = await response.json();

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    // Devolvemos los datos
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Funciones de utilidad para los diferentes tipos de peticiones
export const api = {
  get: <T>(endpoint: string, requiresAuth = true) =>
    fetchApi<T>(endpoint, { method: "GET", requiresAuth }),

  post: <T>(endpoint: string, data: any, requiresAuth = true) =>
    fetchApi<T>(endpoint, { method: "POST", body: data, requiresAuth }),

  put: <T>(endpoint: string, data: any, requiresAuth = true) =>
    fetchApi<T>(endpoint, { method: "PUT", body: data, requiresAuth }),

  delete: <T>(endpoint: string, requiresAuth = true) =>
    fetchApi<T>(endpoint, { method: "DELETE", requiresAuth }),
};
