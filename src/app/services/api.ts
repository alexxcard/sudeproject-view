import axios from "axios";

// URL base de tu backend Django
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para login
export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post("/api/auth/token/", {
      username,
      password,
    });

    // Django devuelve access y refresh
    return response.data; 
    /*
      {
        access: "eyJ0eXAiOiJKV1QiLCJh...",
        refresh: "eyJhbGciOiJIUzI1NiIs..."
      }
    */
  } catch (error: any) {
    throw error.response?.data || { detail: "Error al iniciar sesión" };
  }
}

export default api;
