import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post("/auth/refresh-token", {
          refreshToken,
        });
        const { accessToken } = response.data;

        // Store the new token
        localStorage.setItem("accessToken", accessToken);

        // Update the Authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
