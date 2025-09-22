"use client";

import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

interface RegisterFormValues {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
}

export default function RegisterContainer() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<RegisterFormValues>({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  });

  const toast = useRef<Toast>(null);
  const router = useRouter();
  const primaryColor = "#48595B";

  const inputStyle = {
    width: "250px",
    height: "36px",
    borderColor: primaryColor,
    borderRadius: "6px",
  };

  const handleRegister = () => {
    if (!values.nombre || !values.apellido || !values.correo || !values.password) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "Por favor complete todos los campos",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.current?.show({
        severity: "success",
        summary: "Registro exitoso",
        detail: `Bienvenido ${values.nombre} ${values.apellido}`,
        life: 2000,
      });

      setTimeout(() => router.push("/login"), 2000);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Toast ref={toast} />
      <Card className="p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h1>
        <p className="text-center text-sm mb-6">Complete los datos para crear su cuenta</p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre:</label>
          <InputText
            value={values.nombre}
            onChange={(e) => setValues({ ...values, nombre: e.target.value })}
            placeholder="Ingrese su nombre"
            style={inputStyle}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido:</label>
          <InputText
            value={values.apellido}
            onChange={(e) => setValues({ ...values, apellido: e.target.value })}
            placeholder="Ingrese su apellido"
            style={inputStyle}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Correo:</label>
          <InputText
            value={values.correo}
            onChange={(e) => setValues({ ...values, correo: e.target.value })}
            placeholder="Ingrese su correo"
            style={inputStyle}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña:</label>
          <Password
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            placeholder="Ingrese su contraseña"
            toggleMask
            feedback={false}
            inputStyle={inputStyle}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            label="Registrar"
            loading={loading}
            onClick={handleRegister}
            className="bg-green-700 w-44"
          />
          <Button
            label="Volver al login"
            onClick={() => router.push("/login")}
            className="bg-blue-700 w-44"
          />
        </div>
      </Card>
    </div>
  );
}
