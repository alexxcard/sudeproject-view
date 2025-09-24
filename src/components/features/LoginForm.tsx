"use client";

import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { LoginFormValues } from "@/interface/index";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/services/api";

export default function LoginContainer() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });

  const toast = useRef<Toast>(null);
  const router = useRouter();
  const primaryColor = "#48595B";

  const handleLogin = async () => {
    if (!values.username || !values.password) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "Por favor complete todos los campos",
        life: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(values.username, values.password);

      // Guardar tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      toast.current?.show({
        severity: "success",
        summary: "Login exitoso",
        detail: `Bienvenido ${values.username}`,
        life: 2000,
      });

      setTimeout(() => router.push("/home"), 1200);
    } catch (err: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error de autenticación",
        detail: err.detail || "Usuario o contraseña incorrectos",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toast ref={toast} />
      <Card
        style={{
          padding: 32,
          width: 360,
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-2xl mb-1 text-gray-900">
            Control de Acceso
          </h1>
          <p className="text-sm text-gray-700">
            Ingrese sus credenciales para acceder
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Nombre de usuario
          </label>
          <InputText
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            placeholder="Ingrese su usuario"
            style={{ width: 250, height: 32, borderColor: primaryColor }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Contraseña
          </label>
          <Password
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            feedback={false}
            toggleMask
            placeholder="Ingrese su contraseña"
            inputStyle={{ width: 250, height: 32, borderColor: primaryColor }}
          />
        </div>

        {/* Botón Login */}
        <div className="text-center mb-4">
          <Button
            label={loading ? "Ingresando..." : "Iniciar sesión"}
            icon="pi pi-sign-in"
            loading={loading}
            onClick={handleLogin}
            style={{ backgroundColor: "#608c3d", borderColor: primaryColor, width: 180, height: 36 }}
          />
        </div>

        {/* Link a Registro */}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => router.push("/login/register")}
            className="text-blue-600 underline text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>

        <div className="text-center mt-4">
          <Tag value="SUDEPROJECTS 2025" severity="info" style={{ backgroundColor: primaryColor, color: "#fff", fontSize: 10, padding: "4px 8px" }} />
        </div>
      </Card>
    </div>
  );
}
