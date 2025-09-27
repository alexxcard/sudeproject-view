"use client";
import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

interface RegisterFormValues {
  nombre: string;
  apellido: string;
  correo: string;
  username: string;
  password: string;
}

export default function RegisterContainer() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<RegisterFormValues>({
    nombre: "",
    apellido: "",
    correo: "",
    username: "",
    password: "",
  });

  const toast = useRef<Toast>(null);
  const router = useRouter();
  const primaryColor = "#48595B";

  const handleRegister = async () => {
    const { nombre, apellido, correo, username, password } = values;
    if (!nombre || !apellido || !correo || !username || !password) {
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
      await registerUser(values); // Llamada al backend

      toast.current?.show({
        severity: "success",
        summary: "Registro exitoso",
        detail: `Cuenta creada para ${username}`,
        life: 2500,
      });

      setTimeout(() => {
        router.push("/login"); // Redirige al login
      }, 1500);
    } catch (err: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error en el registro",
        detail: err.message || "No se pudo crear la cuenta",
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
            Registro de Usuario
          </h1>
          <p className="text-sm text-gray-700">
            Complete los datos para crear su cuenta
          </p>
        </div>

        <div className="space-y-4">
          <InputField
            label="Nombre"
            value={values.nombre}
            onChange={(v: any) => setValues({ ...values, nombre: v })}
            primaryColor={primaryColor}
          />
          <InputField
            label="Apellido"
            value={values.apellido}
            onChange={(v: any) => setValues({ ...values, apellido: v })}
            primaryColor={primaryColor}
          />
          <InputField
            label="Correo"
            value={values.correo}
            onChange={(v: any) => setValues({ ...values, correo: v })}
            primaryColor={primaryColor}
          />
          <InputField
            label="Usuario"
            value={values.username}
            onChange={(v: any) => setValues({ ...values, username: v })}
            primaryColor={primaryColor}
          />
          <InputField
            label="Contraseña"
            value={values.password}
            onChange={(v: any) => setValues({ ...values, password: v })}
            primaryColor={primaryColor}
            type="password"
            toggleMask={true} // <-- Ojo para mostrar/ocultar contraseña
          />

          <div className="text-center">
            <Button
              label="Crear cuenta"
              loading={loading}
              onClick={handleRegister}
              style={{ backgroundColor: "#608c3d", borderColor: primaryColor, width: 180, height: 36 }}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <Tag
            value="SUDEPROJECTS 2025"
            severity="info"
            style={{ backgroundColor: primaryColor, color: "#fff", fontSize: 10, padding: "4px 8px" }}
          />
        </div>
      </Card>
    </div>
  );
}

// Componente para inputs
function InputField({ label, value, onChange, primaryColor, type = "text", toggleMask = false }: any) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      {type === "password" ? (
        <Password
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Ingrese su ${label.toLowerCase()}`}
          toggleMask={toggleMask}
          style={{ width: 250, height: 32, borderColor: primaryColor }}
        />
      ) : (
        <InputText
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Ingrese su ${label.toLowerCase()}`}
          style={{ width: 250, height: 32, borderColor: primaryColor }}
        />
      )}
    </div>
  );
}

// Función para crear usuario en backend
async function registerUser(values: RegisterFormValues) {
  const payload = {
    username: values.username,
    password: values.password,
    nombre: values.nombre,
    apellido: values.apellido,
    correo: values.correo,
  };

  const res = await fetch("http://127.0.0.1:8000/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error en registro:", errorData);
    throw new Error(
      errorData.username?.[0] ||
      errorData.password?.[0] ||
      errorData.email?.[0] ||
      "Error al crear usuario"
    );
  }

  return res.json();
}
