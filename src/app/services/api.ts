import axios from "axios";

// URL base de tu backend Django
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// =================== LOGIN ===================
export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post("/api/auth/token/", { username, password });

    // Guardar tokens en localStorage
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    return response.data; // { access, refresh }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { detail: "Error al iniciar sesión" };
    } else {
      throw { detail: "Error inesperado al iniciar sesión" };
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { detail: "Error al crear usuario" };
    } else {
      throw { detail: "Error inesperado al crear usuario" };
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { detail: "Error al refrescar token" };
    } else {
      throw { detail: "Error inesperado al refrescar token" };
    }
  }
}

// =================== REQUESTS PROTEGIDOS ===================
// Función helper para requests con JWT
export async function apiGet(path: string) {
  const token = localStorage.getItem("next-auth.session-token");
  if (!token) throw new Error("Usuario no autenticado");

  try {
    const response = await api.get(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { detail: "Error en la petición protegida" };
    } else {
      throw { detail: "Error inesperado en la petición protegida" };
    }
  }
}

export async function getIncidents(token: string) {
  try {
    const res = await api.get("/api/incidents/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { detail: "Error al obtener incidencias" };
    } else {
      throw { detail: "Error inesperado al obtener incidencias" };
    }
  }
}
