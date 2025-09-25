import axios from "axios";

// URL base de tu backend Django
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================== LOGIN ===================
export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post("/api/auth/token/", { username, password });

    // Guardar tokens en localStorage
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    return response.data; // { access, refresh }
  } catch (error: any) {
    throw error.response?.data || { detail: "Error al iniciar sesión" };
  }
}

// =================== REGISTRO ===================
export async function registerUser(values: {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}) {
  try {
    const response = await api.post("/api/users/", values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { detail: "Error al crear usuario" };
  }
}

// =================== REFRESCAR TOKEN ===================
export async function refreshToken() {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No hay refresh token disponible");

  try {
    const response = await api.post("/api/auth/token/refresh/", { refresh });
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  } catch (error: any) {
    throw error.response?.data || { detail: "Error al refrescar token" };
  }
}

// =================== REQUESTS PROTEGIDOS ===================
// Función helper para requests con JWT
export async function apiGet(path: string) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Usuario no autenticado");

  const response = await api.get(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default api;
